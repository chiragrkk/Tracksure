import { Route, Routes } from 'react-router-dom';

import Dashboard from '@pages/Seller/Dashboard';
import Products from '@pages/Seller/Products';
import Shipments from '@pages/Seller/Shipments';
import Tracking from '@pages/Seller/Tracking';
import ShipmentCurrentTracking from '@components/seller/ShipmentCurrentTracking';

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="shipments" element={<Shipments />} />
      <Route path="tracking" element={<Tracking/>} />
      <Route path="tracking/:shipmentId" element={<ShipmentCurrentTracking />} />
    </Routes>
  );
};

export default SellerRoutes;
