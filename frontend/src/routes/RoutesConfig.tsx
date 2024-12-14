import AdminRoutes from "./AdminRoutes";
import ConsumerRoutes from "./ConsumerRoutes";
import SellerRoutes from "./SellerRoutes";
import TransporterRoutes from "./TransporterRoutes";

interface AppRoute {
  path: string;
  element: React.ReactNode;
  roles: string[];
}

const routes: AppRoute[] = [
    {
        path: "/admin/*",
        element: <AdminRoutes />,
        roles: ["admin"],
    },
    {
        path: "/consumer/*",
        element: <ConsumerRoutes />,
        roles: ["consumer"],
    },
    {
        path: "/seller/*",
        element: <SellerRoutes />,
        roles: ["seller"],
    },
    {
        path: "/transporter/*",
        element: <TransporterRoutes />,
        roles: ["transporter"],
    },
];

export default routes;
