import { Route, Routes } from 'react-router-dom';

import Dashboard from '@pages/Admin/Dashboard';
import Users from '@pages/Admin/Users';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
    </Routes>
  );
};

export default AdminRoutes;
