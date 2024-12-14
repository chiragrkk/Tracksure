import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Package } from "lucide-react";

interface ManageOrdersCardProps {
  orders: {
    id: string;
    status: string;
    customer: string;
    total: number;
  }[];
}

const ManageOrdersCard: React.FC<ManageOrdersCardProps> = ({ orders }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Manage Orders</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{orders.length}</div>
        <p className="text-xs text-muted-foreground">Total orders</p>
        <ul className="mt-2 space-y-1">
          {orders.map((order) => (
            <li key={order.id} className="text-sm flex justify-between">
              <span className="font-medium">{order.customer}</span>
              <span className="text-muted-foreground">
                ${order.total.toFixed(2)} - {order.status}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ManageOrdersCard;