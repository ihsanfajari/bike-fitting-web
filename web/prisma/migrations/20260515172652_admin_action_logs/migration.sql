-- CreateEnum
CREATE TYPE "AdminTargetType" AS ENUM ('user', 'listing', 'order', 'dispute', 'report');

-- CreateTable
CREATE TABLE "admin_action_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "admin_id" UUID NOT NULL,
    "action" VARCHAR(50) NOT NULL,
    "target_type" "AdminTargetType" NOT NULL,
    "target_id" UUID NOT NULL,
    "reason" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_action_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "admin_action_logs_admin_id_idx" ON "admin_action_logs"("admin_id");

-- CreateIndex
CREATE INDEX "admin_action_logs_target_type_target_id_idx" ON "admin_action_logs"("target_type", "target_id");

-- CreateIndex
CREATE INDEX "admin_action_logs_action_created_at_idx" ON "admin_action_logs"("action", "created_at");

-- AddForeignKey
ALTER TABLE "admin_action_logs" ADD CONSTRAINT "admin_action_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
