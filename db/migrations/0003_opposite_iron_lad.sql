CREATE TYPE "public"."maintenance_type" AS ENUM('preventiva', 'corretiva', 'instalação');--> statement-breakpoint
CREATE TABLE "event_signature" (
	"event_id" text NOT NULL,
	"user_id" text NOT NULL,
	"signed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "event_signature_event_id_user_id_pk" PRIMARY KEY("event_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "maintenance_event" (
	"id" text PRIMARY KEY NOT NULL,
	"store_slug" text NOT NULL,
	"type" "maintenance_type" NOT NULL,
	"date" date NOT NULL,
	"time" text NOT NULL,
	"description" text NOT NULL,
	"location" text NOT NULL,
	"technician_name" text NOT NULL,
	"attendees" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event_signature" ADD CONSTRAINT "event_signature_event_id_maintenance_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."maintenance_event"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_signature" ADD CONSTRAINT "event_signature_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_event" ADD CONSTRAINT "maintenance_event_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "maintenance_event_store_slug_idx" ON "maintenance_event" USING btree ("store_slug");--> statement-breakpoint
CREATE INDEX "maintenance_event_date_idx" ON "maintenance_event" USING btree ("date");