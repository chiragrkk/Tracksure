import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { BringToFront } from "lucide-react";

const ShipmentHistoryCard: React.FC = () => {
  return (
    <Link to={"/transporter/shipmenthistory"}>
        <Card className="h-[200px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Seller</CardTitle>
              <BringToFront className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">Shipment History</div>
              <p className="text-xs text-muted-foreground">Track your past Shipments here</p>
          </CardContent>
        </Card>
    </Link>
  );
};

export default ShipmentHistoryCard;