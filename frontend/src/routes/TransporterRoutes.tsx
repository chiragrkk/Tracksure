import { Route, Routes } from 'react-router-dom';

import Dashboard from '@pages/Transporter/Dashboard';
import CurrentShipment from '@pages/Transporter/CurrentShipment';
import ShipmentHistory from '@pages/Transporter/ShipmentHistory';
import ShipmentCurrentTracking from '@components/transporter/CurrentShipment';

const TransporterRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="currentshipment" element={<CurrentShipment />} />
      <Route path="currentshipment/:shipmentId" element={<ShipmentCurrentTracking />} />
      <Route path="shipmenthistory" element={<ShipmentHistory/>} />
    </Routes>
  );
};

export default TransporterRoutes;
