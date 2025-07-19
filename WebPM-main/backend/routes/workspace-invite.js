// routes/workspace-invite.js
import express from "express";
import authenticateUser from "../middleware/auth-middleware.js";
import {
  createWorkspaceInvite,
  acceptWorkspaceInvite,
  rejectWorkspaceInvite,
  getWorkspaceInvites,
  cancelWorkspaceInvite
} from "../controllers/workspace-invite.js";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";

const router = express.Router();

// Workspace invite routes
router.post(
  "/:workspaceId/invite",
  authenticateUser,
  validateRequest({
    params: z.object({
      workspaceId: z.string()
    }),
    body: z.object({
      email: z.string().email(),
      role: z.enum(["member", "admin", "viewer"]).default("member")
    })
  }),
  createWorkspaceInvite
);

router.get(
  "/:workspaceId/invites", 
  authenticateUser,
  validateRequest({
    params: z.object({
      workspaceId: z.string()
    })
  }),
  getWorkspaceInvites
);

router.post(
  "/:workspaceId/invites/:inviteId/accept",
  authenticateUser,
  validateRequest({
    params: z.object({
      workspaceId: z.string(),
      inviteId: z.string()
    })
  }),
  acceptWorkspaceInvite
);

router.post(
  "/:workspaceId/invites/:inviteId/reject",
  authenticateUser,
  validateRequest({
    params: z.object({
      workspaceId: z.string(),
      inviteId: z.string()
    })
  }),
  rejectWorkspaceInvite
);

router.delete(
  "/:workspaceId/invites/:inviteId",
  authenticateUser,
  validateRequest({
    params: z.object({
      workspaceId: z.string(),
      inviteId: z.string()
    })
  }),
  cancelWorkspaceInvite
);

export default router;