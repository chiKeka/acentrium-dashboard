import { BrowserRouter as Router, Routes, Route } from "react-router";
import Calendar from "./pages/Calendar";
import Research from "./pages/Research";
import Programs from "./pages/Programs";
import Initiatives from "./pages/Initiatives";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <>
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
    </>
  );
}
