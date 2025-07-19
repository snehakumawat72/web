import Notification from "../models/notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate('sender', 'name email profilePicture')
      .populate('workspace', 'name')
      .populate('project', 'name')
      .populate('task', 'title')
      .sort({ createdAt: -1 });

    // Transform notifications to match frontend interface
    const transformedNotifications = notifications.map(notification => ({
      _id: notification._id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      actionUrl: notification.actionUrl,
      senderName: notification.sender?.name,
      senderAvatar: notification.sender?.profilePicture,
      workspaceName: notification.workspace?.name,
      projectName: notification.project?.name,
      taskName: notification.task?.title,
      inviteId: notification.inviteId,
      workspaceId: notification.workspace?._id
    }));

    res.json(transformedNotifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: "Failed to get notifications" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { isRead: true }
    );
    res.json({ message: "Marked as read" });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ message: "Failed to mark as read" });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id }, 
      { isRead: true }
    );
    res.json({ message: "All marked as read" });
  } catch (err) {
    console.error('Error marking all notifications as read:', err);
    res.status(500).json({ message: "Failed to mark all as read" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ message: "Failed to delete notification" });
  }
};