import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Droplets } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Timestamp } from "firebase/firestore";

interface HumidityCardProps {
  data: { time: Timestamp; humidity: number }[];
  currentHumidity: number;
}

const HumidityCard: React.FC<HumidityCardProps> = ({ data, currentHumidity }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Humidity</CardTitle>
        <Droplets className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currentHumidity}%</div>
        <p className="text-xs text-muted-foreground">Optimal level</p>
        <div className="h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HumidityCard;