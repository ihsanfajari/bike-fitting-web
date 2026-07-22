// Helper untuk catat tindakan admin ke admin_action_logs.
import "server-only";
import { prisma } from "@/lib/prisma";
import type { AdminTargetType } from "@/lib/generated/prisma/enums";

type LogInput = {
  adminId: string;
  action: string;
  targetType: AdminTargetType;
  targetId: string;
  reason?: string | null;
  metadata?: Record<string, unknown> | null;
};

export async function logAdminAction(input: LogInput) {
  await prisma.adminActionLog.create({
    data: {
      adminId: input.adminId,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId,
      reason: input.reason ?? null,
      metadata: input.metadata ? (input.metadata as object) : undefined,
    },
  });
}
