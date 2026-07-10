import {
  boolean,
  date,
  decimal,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["admin", "coach", "client"]);
export const subscriptionStatus = pgEnum("subscription_status", [
  "trialing",
  "active",
  "past_due",
  "canceled",
  "inactive",
]);
export const checkInStatus = pgEnum("check_in_status", ["submitted", "reviewed"]);
export const habitFrequency = pgEnum("habit_frequency", ["daily", "weekly"]);
export const goalType = pgEnum("goal_type", [
  "fat_loss",
  "muscle_gain",
  "recomposition",
  "performance",
  "lifestyle",
]);
export const programStatus = pgEnum("program_status", ["draft", "active", "completed", "archived"]);
export const workoutStatus = pgEnum("workout_status", ["in_progress", "completed", "skipped"]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    identityId: text("identity_id").notNull(),
    email: text("email").notNull(),
    fullName: text("full_name").notNull(),
    role: userRole("role").default("client").notNull(),
    avatarUrl: text("avatar_url"),
    timezone: text("timezone").default("America/New_York").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("users_identity_id_idx").on(table.identityId),
    uniqueIndex("users_email_idx").on(table.email),
    index("users_role_idx").on(table.role),
  ],
);

export const clientProfiles = pgTable("client_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  age: integer("age"),
  heightCm: decimal("height_cm", { precision: 6, scale: 2 }),
  currentWeightKg: decimal("current_weight_kg", { precision: 6, scale: 2 }),
  unitPreference: text("unit_preference").default("imperial").notNull(),
  primaryGoal: goalType("primary_goal"),
  trainingExperience: text("training_experience"),
  daysAvailablePerWeek: integer("days_available_per_week"),
  equipmentAccess: text("equipment_access"),
  injuries: text("injuries"),
  cardioPreference: text("cardio_preference"),
  stepGoalBaseline: integer("step_goal_baseline"),
  sleepQuality: integer("sleep_quality"),
  stressLevel: integer("stress_level"),
  biggestChallenge: text("biggest_challenge"),
  preferredCheckInDay: integer("preferred_check_in_day"),
  onboardingCompletedAt: timestamp("onboarding_completed_at", { withTimezone: true }),
  ...timestamps,
});

export const coachClientRelationships = pgTable(
  "coach_client_relationships",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    coachId: uuid("coach_id").notNull().references(() => users.id),
    clientId: uuid("client_id").notNull().references(() => users.id),
    active: boolean("active").default(true).notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("coach_client_unique_idx").on(table.coachId, table.clientId),
    index("coach_client_coach_idx").on(table.coachId),
    index("coach_client_client_idx").on(table.clientId),
  ],
);

export const subscriptionPlans = pgTable("subscription_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  stripeProductId: text("stripe_product_id").unique(),
  stripePriceId: text("stripe_price_id").unique(),
  amountCents: integer("amount_cents").notNull(),
  interval: text("interval").default("month").notNull(),
  active: boolean("active").default(true).notNull(),
  ...timestamps,
});

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id").notNull().references(() => users.id),
    planId: uuid("plan_id").references(() => subscriptionPlans.id),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id").unique(),
    status: subscriptionStatus("status").default("inactive").notNull(),
    currentPeriodStart: timestamp("current_period_start", { withTimezone: true }),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
    ...timestamps,
  },
  (table) => [index("subscriptions_client_idx").on(table.clientId, table.status)],
);

export const exercises = pgTable(
  "exercises",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdById: uuid("created_by_id").references(() => users.id),
    name: text("name").notNull(),
    primaryMuscleGroup: text("primary_muscle_group").notNull(),
    secondaryMuscleGroups: text("secondary_muscle_groups").array(),
    equipment: text("equipment").notNull(),
    instructions: text("instructions").notNull(),
    coachingCues: text("coaching_cues"),
    demoUrl: text("demo_url"),
    tags: text("tags").array(),
    isGlobal: boolean("is_global").default(false).notNull(),
    ...timestamps,
  },
  (table) => [index("exercises_search_idx").on(table.name, table.primaryMuscleGroup)],
);

export const programTemplates = pgTable("program_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  coachId: uuid("coach_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  goal: goalType("goal"),
  durationWeeks: integer("duration_weeks"),
  isArchived: boolean("is_archived").default(false).notNull(),
  ...timestamps,
});

export const programs = pgTable(
  "programs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    coachId: uuid("coach_id").notNull().references(() => users.id),
    clientId: uuid("client_id").references(() => users.id),
    sourceTemplateId: uuid("source_template_id").references(() => programTemplates.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    description: text("description"),
    goal: goalType("goal"),
    status: programStatus("status").default("draft").notNull(),
    startDate: date("start_date"),
    endDate: date("end_date"),
    ...timestamps,
  },
  (table) => [index("programs_client_status_idx").on(table.clientId, table.status)],
);

export const programDays = pgTable("program_days", {
  id: uuid("id").defaultRandom().primaryKey(),
  programId: uuid("program_id").references(() => programs.id, { onDelete: "cascade" }),
  templateId: uuid("template_id").references(() => programTemplates.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  dayNumber: integer("day_number").notNull(),
  notes: text("notes"),
  ...timestamps,
});

export const programExercises = pgTable(
  "program_exercises",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    programDayId: uuid("program_day_id").notNull().references(() => programDays.id, { onDelete: "cascade" }),
    exerciseId: uuid("exercise_id").notNull().references(() => exercises.id),
    orderIndex: integer("order_index").notNull(),
    sets: integer("sets").notNull(),
    repMin: integer("rep_min"),
    repMax: integer("rep_max"),
    targetLoad: decimal("target_load", { precision: 7, scale: 2 }),
    targetRpe: decimal("target_rpe", { precision: 3, scale: 1 }),
    targetRir: integer("target_rir"),
    restSeconds: integer("rest_seconds"),
    notes: text("notes"),
    ...timestamps,
  },
  (table) => [uniqueIndex("program_exercise_order_idx").on(table.programDayId, table.orderIndex)],
);

export const workoutLogs = pgTable(
  "workout_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id").notNull().references(() => users.id),
    programId: uuid("program_id").notNull().references(() => programs.id),
    programDayId: uuid("program_day_id").notNull().references(() => programDays.id),
    status: workoutStatus("status").default("in_progress").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    durationMinutes: integer("duration_minutes"),
    notes: text("notes"),
    ...timestamps,
  },
  (table) => [index("workout_logs_client_idx").on(table.clientId, table.startedAt)],
);

export const workoutExerciseLogs = pgTable("workout_exercise_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  workoutLogId: uuid("workout_log_id").notNull().references(() => workoutLogs.id, { onDelete: "cascade" }),
  programExerciseId: uuid("program_exercise_id").notNull().references(() => programExercises.id),
  setNumber: integer("set_number").notNull(),
  weight: decimal("weight", { precision: 7, scale: 2 }),
  reps: integer("reps"),
  rpe: decimal("rpe", { precision: 3, scale: 1 }),
  notes: text("notes"),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  ...timestamps,
});

export const checkIns = pgTable(
  "check_ins",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id").notNull().references(() => users.id),
    coachId: uuid("coach_id").notNull().references(() => users.id),
    status: checkInStatus("status").default("submitted").notNull(),
    submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow().notNull(),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    bodyweightKg: decimal("bodyweight_kg", { precision: 6, scale: 2 }),
    measurementNotes: text("measurement_notes"),
    energyRating: integer("energy_rating").notNull(),
    sleepRating: integer("sleep_rating").notNull(),
    stressRating: integer("stress_rating").notNull(),
    trainingAdherenceRating: integer("training_adherence_rating").notNull(),
    nutritionAdherenceRating: integer("nutrition_adherence_rating").notNull(),
    wentWell: text("went_well").notNull(),
    hardThisWeek: text("hard_this_week").notNull(),
    supportNeeded: text("support_needed").notNull(),
    ...timestamps,
  },
  (table) => [index("check_ins_coach_status_idx").on(table.coachId, table.status, table.submittedAt)],
);

export const checkInResponses = pgTable("check_in_responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  checkInId: uuid("check_in_id").notNull().references(() => checkIns.id, { onDelete: "cascade" }).unique(),
  coachId: uuid("coach_id").notNull().references(() => users.id),
  feedback: text("feedback").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const progressPhotos = pgTable("progress_photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id").notNull().references(() => users.id),
  checkInId: uuid("check_in_id").references(() => checkIns.id, { onDelete: "set null" }),
  storageKey: text("storage_key").notNull(),
  angle: text("angle"),
  takenAt: timestamp("taken_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const bodyweightEntries = pgTable(
  "bodyweight_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id").notNull().references(() => users.id),
    weightKg: decimal("weight_kg", { precision: 6, scale: 2 }).notNull(),
    recordedOn: date("recorded_on").notNull(),
    source: text("source").default("manual").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("bodyweight_client_date_idx").on(table.clientId, table.recordedOn)],
);

export const measurementEntries = pgTable("measurement_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id").notNull().references(() => users.id),
  recordedOn: date("recorded_on").notNull(),
  values: jsonb("values").$type<Record<string, number>>().notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const habits = pgTable("habits", {
  id: uuid("id").defaultRandom().primaryKey(),
  coachId: uuid("coach_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  defaultFrequency: habitFrequency("default_frequency").default("daily").notNull(),
  ...timestamps,
});

export const habitAssignments = pgTable("habit_assignments", {
  id: uuid("id").defaultRandom().primaryKey(),
  habitId: uuid("habit_id").notNull().references(() => habits.id),
  clientId: uuid("client_id").notNull().references(() => users.id),
  frequency: habitFrequency("frequency").notNull(),
  targetCount: integer("target_count").default(1).notNull(),
  active: boolean("active").default(true).notNull(),
  startedOn: date("started_on").notNull(),
  endedOn: date("ended_on"),
  ...timestamps,
});

export const habitLogs = pgTable(
  "habit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    assignmentId: uuid("assignment_id").notNull().references(() => habitAssignments.id, { onDelete: "cascade" }),
    clientId: uuid("client_id").notNull().references(() => users.id),
    loggedOn: date("logged_on").notNull(),
    value: integer("value").default(1).notNull(),
    completed: boolean("completed").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("habit_log_assignment_date_idx").on(table.assignmentId, table.loggedOn)],
);

export const messageThreads = pgTable(
  "message_threads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    relationshipId: uuid("relationship_id").notNull().references(() => coachClientRelationships.id).unique(),
    lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("message_threads_last_message_idx").on(table.lastMessageAt)],
);

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    threadId: uuid("thread_id").notNull().references(() => messageThreads.id, { onDelete: "cascade" }),
    senderId: uuid("sender_id").notNull().references(() => users.id),
    body: text("body").notNull(),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("messages_thread_created_idx").on(table.threadId, table.createdAt)],
);

export const coachNotes = pgTable("coach_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  coachId: uuid("coach_id").notNull().references(() => users.id),
  clientId: uuid("client_id").notNull().references(() => users.id),
  body: text("body").notNull(),
  ...timestamps,
});
