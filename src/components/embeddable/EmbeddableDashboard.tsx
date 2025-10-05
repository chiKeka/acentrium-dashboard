import { BrowserRouter as Router, Routes, Route } from "react-router";
import Calendar from "../../pages/Calendar";
import Research from "../../pages/Research";
import Programs from "../../pages/Programs";
import Initiatives from "../../pages/Initiatives";
import AppLayout from "../../layout/AppLayout";
import { ScrollToTop } from "../common/ScrollToTop";
import Home from "../../pages/Dashboard/Home";

interface EmbeddableDashboardProps {
  className?: string;
}

export default function EmbeddableDashboard({ 
  className = "" 
}: EmbeddableDashboardProps) {
  return (
    <div className={`acentrium-dashboard-embed ${className}`}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/research" element={<Research />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/initiatives" element={<Initiatives />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

// CSS classes for embedding
export const embedStyles = `
.acentrium-dashboard-embed {
  font-family: 'Outfit', sans-serif;
  min-height: 100vh;
}

.acentrium-dashboard-embed * {
  box-sizing: border-box;
}

.acentrium-dashboard-embed .sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
}

.acentrium-dashboard-embed .main-content {
  margin-left: 90px; /* Default sidebar width */
  transition: margin-left 0.3s ease-in-out;
}

.acentrium-dashboard-embed .main-content.sidebar-expanded {
  margin-left: 290px;
}

@media (max-width: 1024px) {
  .acentrium-dashboard-embed .main-content {
    margin-left: 0;
  }
}
`;
