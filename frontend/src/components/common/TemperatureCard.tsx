import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Thermometer } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Timestamp } from "firebase/firestore";

interface TemperatureCardProps {
  data: { time: Timestamp; temp: number }[];
  currentTemp: number;
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ data, currentTemp }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Temperature</CardTitle>
        <Thermometer className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currentTemp}°C</div>
        <p className="text-xs text-muted-foreground">Normal range</p>
        <div className="h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="temp" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureCard;