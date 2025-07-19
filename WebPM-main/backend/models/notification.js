import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    type: {
      type: String,
      enum: [
        "workspace_invite",
        "task_assigned",
        "task_completed",
        "project_updated",
        "member_joined",
        "deadline_reminder",
        "comment_added",
      ],
      required: true,
    },
    title: { 
      type: String, 
      required: true 
    },
    message: { 
      type: String, 
      required: true 
    },
    isRead: { 
      type: Boolean, 
      default: false 
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace"
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    },
    inviteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkspaceInvite"
    },
    actionUrl: String,
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);