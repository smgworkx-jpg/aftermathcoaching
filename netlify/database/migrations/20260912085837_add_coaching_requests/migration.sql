CREATE TABLE "coaching_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text,
	"email" text,
	"age" integer,
	"sex" text,
	"bodyweight_kg" numeric(6,2),
	"goals" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"identity_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "coaching_requests_status_idx" ON "coaching_requests" ("status","created_at");