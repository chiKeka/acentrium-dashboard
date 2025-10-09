import MenuIcon  from "../../../icons/menu.svg?react";
import { useSidebar } from "../../../context/SidebarContext";


const DesktopMenuToggle: React.FC = () => {
  // Extract sidebar toggle function from context
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 hidden lg:block"
      aria-label="Toggle sidebar"
    >
      {/* @ts-expect-error: SVG imported as ReactComponent may not accept className prop */}
      <MenuIcon className="w-5 h-5 text-gray-400 dark:text-gray-400" />
    </button>
  );
};

export default DesktopMenuToggle;
