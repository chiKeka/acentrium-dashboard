import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Asset from "../icons/Asset 4.svg"
import DesktopMenuToggle from "../components/ui/button/DesktopMenuToggle";

// Acentrium Africa Dashboard Icons
import {
  CalenderIcon,
  GridIcon,
  HorizontaLDots,
  PieChartIcon,
  ListIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <PieChartIcon />,
    name: "Research",
    path: "/research",
  },
  {
    icon: <ListIcon />,
    name: "Programs",
    path: "/programs",
  },
  {
    icon: <UserCircleIcon />,
    name: "Initiatives",
    path: "/initiatives",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );


  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => (
        <li key={nav.name}>
          <Link
            to={nav.path}
            className={`menu-item group ${
              isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
            }`}
          >
            <span
              className={`menu-item-icon-size ${
                isActive(nav.path)
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
              }`}
            >
              {nav.icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">{nav.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered && !isMobile ? "lg:justify-center" : "justify-between"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen || isMobile ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg ">
                <img src={Asset} alt="Acentrium Logo"  />
                <div>
                  <div>
                    {[...Array(12)].map((_, i) => (
                      <div
                      key={i}
                        style={{
                          '--rotation': `${i * 30}deg`,
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Acentrium
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Africa Dashboard
                </p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
              <span className="text-gray-600 font-bold text-xl relative z-10">A</span>
              <div>
                <div className=" top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="top-1/2 left-1/2 w-0.5 h-3 bg-gray-600 logo-radiating-lines sidebar"
                      style={{
                        '--rotation': `${i * 30}deg`,
                      } as React.CSSProperties}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Link>
        {(!isExpanded || !isHovered || !isMobileOpen) && !isMobile && <DesktopMenuToggle />}
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered && !isMobile
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
              </h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
        {(isExpanded || isHovered || isMobileOpen || isMobile) ? <SidebarWidget /> : null}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex fixed flex-col top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
          ${
            isExpanded || isMobileOpen
              ? "w-[290px]"
              : isHovered
              ? "w-[290px]"
              : "w-[90px]"
          }`}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (slide-out) */}
      <aside
        className={`lg:hidden fixed flex flex-col top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 w-[290px]
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent isMobile={true} />
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
        <div className="flex justify-around items-center py-2 px-4">
          {navItems.slice(0, 3).map((nav) => (
            <Link
              key={nav.name}
              to={nav.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
                isActive(nav.path)
                  ? "text-brand-500 bg-brand-50 dark:bg-brand-500/10"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <span className="menu-item-icon-size mb-1">
                {nav.icon}
              </span>
              <span className="text-xs font-medium">{nav.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default AppSidebar;
