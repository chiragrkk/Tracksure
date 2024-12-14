import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Alert } from "@schemas/shipmentSchema";

interface AlertsCardProps {
  alerts: Alert[];
}

const AlertsCard: React.FC<AlertsCardProps> = ({ alerts }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Alerts</CardTitle>
        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{alerts.length}</div>
        <p className="text-xs text-muted-foreground">Active alerts</p>
        <div className="max-h-40 overflow-y-auto mt-2 pr-2">
          <ul className="space-y-1">
            {alerts.map((alert, index) => (
              <li 
                key={index} 
                className="text-sm rounded-sm px-2 py-1 hover:bg-accent/50 transition-colors"
              >
                {alert.message}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;