import React from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router-dom";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import MobileMenuToggle from "../components/ui/button/MobileMenuToggle";
import { LoginModal } from "../components/auth/LoginModal";
import { useModal } from "../hooks/useModal";
import { useUser } from "../context/UserContext";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { isOpen: isLoginOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();
  const { hasAttemptedLogin, setHasAttemptedLogin } = useUser();

  // Show login modal when user has attempted login but is not authenticated
  React.useEffect(() => {
    if (hasAttemptedLogin) {
      openLoginModal();
    }
  }, [hasAttemptedLogin, openLoginModal]);

  return (
    <div className="min-h-screen xl:flex">
      {/* Keep MobileMenuToggle at the top level to ensure it's always accessible */}
      <MobileMenuToggle />
      <div>
        <AppSidebar />
        <Backdrop />
      </div>

      {/* Main content area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out pb-20 lg:pb-0 ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <div className="p-4 mx-auto max-w-7xl md:p-6">
          <Outlet />
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => {
          closeLoginModal();
          setHasAttemptedLogin(false);
        }} 
      />
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
