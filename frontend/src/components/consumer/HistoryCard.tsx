import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { FolderClock } from "lucide-react";

const HistoryCard: React.FC = () => {
  return (
    <Link to={"/consumer/history"}>
        <Card className="h-[200px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consumer</CardTitle>
              <FolderClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">Order History</div>
              <p className="text-xs text-muted-foreground">Get all your past orders history</p>
          </CardContent>
        </Card>
    </Link>
  );
};

export default HistoryCard;