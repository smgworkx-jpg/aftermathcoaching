CREATE TYPE "check_in_status" AS ENUM('submitted', 'reviewed');--> statement-breakpoint
CREATE TYPE "goal_type" AS ENUM('fat_loss', 'muscle_gain', 'recomposition', 'performance', 'lifestyle');--> statement-breakpoint
CREATE TYPE "habit_frequency" AS ENUM('daily', 'weekly');--> statement-breakpoint
CREATE TYPE "program_status" AS ENUM('draft', 'active', 'completed', 'archived');--> statement-breakpoint
CREATE TYPE "subscription_status" AS ENUM('trialing', 'active', 'past_due', 'canceled', 'inactive');--> statement-breakpoint
CREATE TYPE "user_role" AS ENUM('admin', 'coach', 'client');--> statement-breakpoint
CREATE TYPE "workout_status" AS ENUM('in_progress', 'completed', 'skipped');--> statement-breakpoint
CREATE TABLE "bodyweight_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"weight_kg" numeric(6,2) NOT NULL,
	"recorded_on" date NOT NULL,
	"source" text DEFAULT 'manual' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "check_in_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"check_in_id" uuid NOT NULL UNIQUE,
	"coach_id" uuid NOT NULL,
	"feedback" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "check_ins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"coach_id" uuid NOT NULL,
	"status" "check_in_status" DEFAULT 'submitted'::"check_in_status" NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reviewed_at" timestamp with time zone,
	"bodyweight_kg" numeric(6,2),
	"measurement_notes" text,
	"energy_rating" integer NOT NULL,
	"sleep_rating" integer NOT NULL,
	"stress_rating" integer NOT NULL,
	"training_adherence_rating" integer NOT NULL,
	"nutrition_adherence_rating" integer NOT NULL,
	"went_well" text NOT NULL,
	"hard_this_week" text NOT NULL,
	"support_needed" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL UNIQUE,
	"age" integer,
	"height_cm" numeric(6,2),
	"current_weight_kg" numeric(6,2),
	"unit_preference" text DEFAULT 'imperial' NOT NULL,
	"primary_goal" "goal_type",
	"training_experience" text,
	"days_available_per_week" integer,
	"equipment_access" text,
	"injuries" text,
	"cardio_preference" text,
	"step_goal_baseline" integer,
	"sleep_quality" integer,
	"stress_level" integer,
	"biggest_challenge" text,
	"preferred_check_in_day" integer,
	"onboarding_completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coach_client_relationships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"coach_id" uuid NOT NULL,
	"client_id" uuid NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "coach_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"coach_id" uuid NOT NULL,
	"client_id" uuid NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"created_by_id" uuid,
	"name" text NOT NULL,
	"primary_muscle_group" text NOT NULL,
	"secondary_muscle_groups" text[],
	"equipment" text NOT NULL,
	"instructions" text NOT NULL,
	"coaching_cues" text,
	"demo_url" text,
	"tags" text[],
	"is_global" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habit_assignments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"habit_id" uuid NOT NULL,
	"client_id" uuid NOT NULL,
	"frequency" "habit_frequency" NOT NULL,
	"target_count" integer DEFAULT 1 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"started_on" date NOT NULL,
	"ended_on" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"assignment_id" uuid NOT NULL,
	"client_id" uuid NOT NULL,
	"logged_on" date NOT NULL,
	"value" integer DEFAULT 1 NOT NULL,
	"completed" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"coach_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"default_frequency" "habit_frequency" DEFAULT 'daily'::"habit_frequency" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "measurement_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"recorded_on" date NOT NULL,
	"values" jsonb NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message_threads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"relationship_id" uuid NOT NULL UNIQUE,
	"last_message_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"thread_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"body" text NOT NULL,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_days" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"program_id" uuid,
	"template_id" uuid,
	"name" text NOT NULL,
	"day_number" integer NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_exercises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"program_day_id" uuid NOT NULL,
	"exercise_id" uuid NOT NULL,
	"order_index" integer NOT NULL,
	"sets" integer NOT NULL,
	"rep_min" integer,
	"rep_max" integer,
	"target_load" numeric(7,2),
	"target_rpe" numeric(3,1),
	"target_rir" integer,
	"rest_seconds" integer,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"coach_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"goal" "goal_type",
	"duration_weeks" integer,
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"coach_id" uuid NOT NULL,
	"client_id" uuid,
	"source_template_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"goal" "goal_type",
	"status" "program_status" DEFAULT 'draft'::"program_status" NOT NULL,
	"start_date" date,
	"end_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "progress_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"check_in_id" uuid,
	"storage_key" text NOT NULL,
	"angle" text,
	"taken_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"description" text,
	"stripe_product_id" text UNIQUE,
	"stripe_price_id" text UNIQUE,
	"amount_cents" integer NOT NULL,
	"interval" text DEFAULT 'month' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"plan_id" uuid,
	"stripe_customer_id" text,
	"stripe_subscription_id" text UNIQUE,
	"status" "subscription_status" DEFAULT 'inactive'::"subscription_status" NOT NULL,
	"current_period_start" timestamp with time zone,
	"current_period_end" timestamp with time zone,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"identity_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"role" "user_role" DEFAULT 'client'::"user_role" NOT NULL,
	"avatar_url" text,
	"timezone" text DEFAULT 'America/New_York' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workout_exercise_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"workout_log_id" uuid NOT NULL,
	"program_exercise_id" uuid NOT NULL,
	"set_number" integer NOT NULL,
	"weight" numeric(7,2),
	"reps" integer,
	"rpe" numeric(3,1),
	"notes" text,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workout_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"program_id" uuid NOT NULL,
	"program_day_id" uuid NOT NULL,
	"status" "workout_status" DEFAULT 'in_progress'::"workout_status" NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"duration_minutes" integer,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "bodyweight_client_date_idx" ON "bodyweight_entries" ("client_id","recorded_on");--> statement-breakpoint
CREATE INDEX "check_ins_coach_status_idx" ON "check_ins" ("coach_id","status","submitted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "coach_client_unique_idx" ON "coach_client_relationships" ("coach_id","client_id");--> statement-breakpoint
CREATE INDEX "coach_client_coach_idx" ON "coach_client_relationships" ("coach_id");--> statement-breakpoint
CREATE INDEX "coach_client_client_idx" ON "coach_client_relationships" ("client_id");--> statement-breakpoint
CREATE INDEX "exercises_search_idx" ON "exercises" ("name","primary_muscle_group");--> statement-breakpoint
CREATE UNIQUE INDEX "habit_log_assignment_date_idx" ON "habit_logs" ("assignment_id","logged_on");--> statement-breakpoint
CREATE INDEX "message_threads_last_message_idx" ON "message_threads" ("last_message_at");--> statement-breakpoint
CREATE INDEX "messages_thread_created_idx" ON "messages" ("thread_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "program_exercise_order_idx" ON "program_exercises" ("program_day_id","order_index");--> statement-breakpoint
CREATE INDEX "programs_client_status_idx" ON "programs" ("client_id","status");--> statement-breakpoint
CREATE INDEX "subscriptions_client_idx" ON "subscriptions" ("client_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "users_identity_id_idx" ON "users" ("identity_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" ("email");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" ("role");--> statement-breakpoint
CREATE INDEX "workout_logs_client_idx" ON "workout_logs" ("client_id","started_at");--> statement-breakpoint
ALTER TABLE "bodyweight_entries" ADD CONSTRAINT "bodyweight_entries_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "check_in_responses" ADD CONSTRAINT "check_in_responses_check_in_id_check_ins_id_fkey" FOREIGN KEY ("check_in_id") REFERENCES "check_ins"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "check_in_responses" ADD CONSTRAINT "check_in_responses_coach_id_users_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_coach_id_users_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "client_profiles" ADD CONSTRAINT "client_profiles_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "coach_client_relationships" ADD CONSTRAINT "coach_client_relationships_coach_id_users_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "coach_client_relationships" ADD CONSTRAINT "coach_client_relationships_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "coach_notes" ADD CONSTRAINT "coach_notes_coach_id_users_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "coach_notes" ADD CONSTRAINT "coach_notes_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_created_by_id_users_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "habit_assignments" ADD CONSTRAINT "habit_assignments_habit_id_habits_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id");--> statement-breakpoint
ALTER TABLE "habit_assignments" ADD CONSTRAINT "habit_assignments_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "habit_logs" ADD CONSTRAINT "habit_logs_assignment_id_habit_assignments_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "habit_assignments"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "habit_logs" ADD CONSTRAINT "habit_logs_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_coach_id_users_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "measurement_entries" ADD CONSTRAINT "measurement_entries_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_8oR9rwpKL1bb_fkey" FOREIGN KEY ("relationship_id") REFERENCES "coach_client_relationships"("id");--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_thread_id_message_threads_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "message_threads"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "program_days" ADD CONSTRAINT "program_days_program_id_programs_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "program_days" ADD CONSTRAINT "program_days_template_id_program_templates_id_fkey" FOREIGN KEY ("template_id") REFERENCES "program_templates"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "program_exercises" ADD CONSTRAINT "program_exercises_program_day_id_program_days_id_fkey" FOREIGN KEY ("program_day_id") REFERENCES "program_days"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "program_exercises" ADD CONSTRAINT "program_exercises_exercise_id_exercises_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id");--> statement-breakpoint
ALTER TABLE "program_templates" ADD CONSTRAINT "program_templates_coach_id_users_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "programs" ADD CONSTRAINT "programs_coach_id_users_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "programs" ADD CONSTRAINT "programs_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "programs" ADD CONSTRAINT "programs_source_template_id_program_templates_id_fkey" FOREIGN KEY ("source_template_id") REFERENCES "program_templates"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "progress_photos" ADD CONSTRAINT "progress_photos_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "progress_photos" ADD CONSTRAINT "progress_photos_check_in_id_check_ins_id_fkey" FOREIGN KEY ("check_in_id") REFERENCES "check_ins"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_subscription_plans_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "subscription_plans"("id");--> statement-breakpoint
ALTER TABLE "workout_exercise_logs" ADD CONSTRAINT "workout_exercise_logs_workout_log_id_workout_logs_id_fkey" FOREIGN KEY ("workout_log_id") REFERENCES "workout_logs"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "workout_exercise_logs" ADD CONSTRAINT "workout_exercise_logs_h6IwHu7bFdPt_fkey" FOREIGN KEY ("program_exercise_id") REFERENCES "program_exercises"("id");--> statement-breakpoint
ALTER TABLE "workout_logs" ADD CONSTRAINT "workout_logs_client_id_users_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "workout_logs" ADD CONSTRAINT "workout_logs_program_id_programs_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id");--> statement-breakpoint
ALTER TABLE "workout_logs" ADD CONSTRAINT "workout_logs_program_day_id_program_days_id_fkey" FOREIGN KEY ("program_day_id") REFERENCES "program_days"("id");