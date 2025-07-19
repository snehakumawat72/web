import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // This is the single, top-level layout that points to your RootLayout.
  // All paths are resolved relative to the `frontend/app/` directory.
  layout("root.tsx", [
    // The homepage is the main index route for the entire application.
    // When a user visits "/", this component will be rendered inside RootLayout.
    index("routes/root/home.tsx"),

    // Authentication routes are grouped under their own layout.
    // These will render inside the AuthLayout, which in turn renders inside the RootLayout.
    layout("routes/auth/auth-layout.tsx", [
      route("sign-in", "routes/auth/sign-in.tsx"),
      route("sign-up", "routes/auth/sign-up.tsx"),
      route("forgot-password", "routes/auth/forgot-password.tsx"),
      route("reset-password", "routes/auth/reset-password.tsx"),
      route("verify-email", "routes/auth/verify-email.tsx"),
    ]),

    // Dashboard routes are protected under their own layout.
    layout("routes/dashboard/dashboard-layout.tsx", [
      route("dashboard", "routes/dashboard/index.tsx"),
      route("workspaces", "routes/dashboard/workspaces/index.tsx"),
      route("workspaces/:workspaceId", "routes/dashboard/workspaces/workspace-details.tsx"),
      route("workspaces/:workspaceId/settings", "routes/dashboard/workspaces/workspace-settings.tsx"),
      route(
        "workspaces/:workspaceId/projects/:projectId",
        "routes/dashboard/project/project-details.tsx"
      ),
      route(
        "workspaces/:workspaceId/projects/:projectId/tasks/:taskId",
        "routes/dashboard/task/task-details.tsx"
      ),
      route("my-tasks", "routes/dashboard/my-tasks.tsx"),
      route("members", "routes/dashboard/members.tsx"),
      route("achieved", "routes/dashboard/achieved.tsx"),
      route("notifications", "routes/dashboard/notifications.tsx"),
    ]),
    
    // Standalone route for workspace invites.
    route(
      "workspace-invite/:workspaceId",
      "routes/dashboard/workspaces/workspace-invite.tsx"
    ),
    
    // User-specific routes like profile pages.
    layout("routes/user/user-layout.tsx", [
      route("user/profile", "routes/user/profile.tsx"),
    ]),
  ]), // This closes the single top-level layout definition
] satisfies RouteConfig;