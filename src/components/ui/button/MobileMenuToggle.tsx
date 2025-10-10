import MenuIcon from "../../../icons/menu.svg?react";
import { useSidebar } from "../../../context/SidebarContext";

const MobileMenuToggle: React.FC = () => {
  // Extract mobile sidebar state and toggle function from context
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  return (
    <button
      onClick={toggleMobileSidebar}
      className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 lg:hidden"
      aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
    >
      {/* @ts-expect-error: SVG imported as ReactComponent may not accept className prop */}
      <MenuIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
    </button>
  );
};

export default MobileMenuToggle;