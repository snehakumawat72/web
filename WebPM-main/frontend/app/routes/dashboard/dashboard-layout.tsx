import { useAuth } from "@/provider/auth-context";
import { SidebarComponent } from "@/components/layout/sidebar-component";
import { Header } from "@/components/layout/header";
import { CreateWorkspace } from "@/components/workspace/create-workspace";
import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import type { Workspace } from "@/types";
import { useState, useEffect } from "react";
import { Outlet, useSearchParams, useNavigate, Navigate } from "react-router";
import { Loader } from "@/components/loader";

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

  const { data: workspaces, isLoading: isLoadingWorkspaces } = useGetWorkspacesQuery();

  // Handle workspace selection from URL params
  useEffect(() => {
    const workspaceIdFromUrl = searchParams.get("workspaceId");
    
    if (workspaceIdFromUrl && workspaces) {
      const workspace = workspaces.find((ws: Workspace) => ws._id === workspaceIdFromUrl);
      if (workspace) {
        setSelectedWorkspace(workspace);
      }
    } else if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      // Auto-select first workspace if none selected
      setSelectedWorkspace(workspaces[0]);
    }
  }, [workspaces, searchParams, selectedWorkspace]);

  if (isLoading || isLoadingWorkspaces) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarComponent currentWorkspace={selectedWorkspace} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          selectedWorkspace={selectedWorkspace}
          onWorkspaceSelected={setSelectedWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet context={{ workspaces, selectedWorkspace }} />
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashboardLayout;