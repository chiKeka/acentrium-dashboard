import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Research from "./pages/Research";
import Programs from "./pages/Programs";
import Initiatives from "./pages/Initiatives";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { DataProvider } from "./context/DataContext";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <>
      <UserProvider>
        <DataProvider>
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
              
              {/* Admin Routes - Protected */}
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </DataProvider>
      </UserProvider>
    </>
  );
}
