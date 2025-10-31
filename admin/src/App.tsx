import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Dashboard from './admin/Dashboard';
import Orders from './admin/Orders';
import Users from './admin/Users';
import Products from './admin/Products';
import Designs from './admin/Designs';
import Messages from './admin/Messages';
import Analytics from './admin/Analytics';
import Settings from './admin/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Welcome to PrinterGuys</h1>
              <p className="text-slate-600 mb-6">E-commerce platform for custom printing</p>
              <a
                href="/admin/login"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Admin Login
              </a>
            </div>
          </div>
        } />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="designs" element={<Designs />} />
          <Route path="messages" element={<Messages />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
