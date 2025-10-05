import { useCallback } from "react";
import { Link, useLocation } from "react-router";

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

  return (
            <aside
              className={`fixed flex flex-col top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                        <span className="text-gray-600 font-bold text-xl relative z-10">A</span>
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                            {[...Array(12)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-gray-600 logo-radiating-lines sidebar"
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
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-gray-600 logo-radiating-lines sidebar"
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
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
