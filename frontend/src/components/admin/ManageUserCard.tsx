import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { PersonStanding } from "lucide-react";

const ManageUserCard: React.FC = () => {
  return (
    <Link to={"/admin/users"}>
        <Card className="h-[200px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin</CardTitle>
              <PersonStanding className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">Manage Users</div>
              <p className="text-xs text-muted-foreground">Users management portal</p>
          </CardContent>
        </Card>
    </Link>
  );
};

export default ManageUserCard;