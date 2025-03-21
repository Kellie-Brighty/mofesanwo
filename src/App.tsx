import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import WorkerLayout from "./layouts/WorkerLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployerDashboard from "./pages/EmployerDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerManagement from "./pages/employer/WorkerManagement";
import InvoiceManagement from "./pages/employer/InvoiceManagement";
import PaymentHistory from "./pages/employer/PaymentHistory";
import QRScanner from "./pages/employer/QRScanner";
import CreateInvoice from "./pages/worker/CreateInvoice";
import InviteHandler from "./pages/InviteHandler";
import ScrollToTop from "./components/ScrollToTop";
import MyInvoices from "./pages/worker/MyInvoices";
import Wallet from "./pages/worker/Wallet";
import Employers from "./pages/worker/Employers";
import PaymentVerification from "./pages/admin/PaymentVerification";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="invite" element={<InviteHandler />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/payment-verification"
            element={<PaymentVerification />}
          />
        </Route>

        {/* Employer Routes */}
        <Route
          path="/dashboard/employer/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route index element={<EmployerDashboard />} />
                <Route path="invoices" element={<InvoiceManagement />} />
                <Route path="payments" element={<PaymentHistory />} />
                <Route path="workers" element={<WorkerManagement />} />
                <Route path="scanner" element={<QRScanner />} />
              </Routes>
            </DashboardLayout>
          }
        />

        {/* Worker Routes */}
        <Route element={<WorkerLayout />}>
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/my-invoices" element={<MyInvoices />} />
          <Route path="/worker/wallet" element={<Wallet />} />
          <Route path="/worker/employers" element={<Employers />} />
          <Route path="create-invoice" element={<CreateInvoice />} />
          <Route
            path="invoices"
            element={<div>Your Invoices (Coming Soon)</div>}
          />
        </Route>

        {/* Redirect /dashboard to worker dashboard by default */}
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/worker" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
