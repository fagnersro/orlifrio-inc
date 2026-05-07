CREATE TYPE "public"."user_role" AS ENUM('admin', 'manager', 'technical', 'customer');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "user_role" DEFAULT 'customer' NOT NULL;