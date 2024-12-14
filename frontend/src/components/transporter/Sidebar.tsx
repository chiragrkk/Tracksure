import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { Home, FileText, Truck, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthContext } from "@context/AuthContext";
import { toast } from "react-hot-toast";

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", icon: Home, href: "/transporter/dashboard" },
  { name: "Current Shipments", icon: Truck, href: "/transporter/currentshipment" },
  { name: "Shipment History", icon: FileText, href: "/transporter/shipmenthistory" },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { signOut } = useContext(AuthContext);  

  const handleLogout = async () => {
    try {
      await signOut(); 
      toast.success("Successfully logged out!", {
        style: {
          background: "white",
          color: "black",
        },
        iconTheme: {
          primary: "black",
          secondary: "white",
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Error logging out. Please try again.", {
        style: {
          background: "white",
          color: "black",
        },
        iconTheme: {
          primary: "red",
          secondary: "white",
        },
      });
    }
  };

  return (
    <div className={cn(
      "relative flex flex-col border-r bg-background",
      collapsed ? "w-16" : "w-64"
    )}>
      <ScrollArea className="flex-grow">
        <nav className="flex flex-col gap-2 p-2">
          {sidebarItems.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button variant="ghost" className="w-full justify-start">
                <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>{item.name}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-2">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-10 rounded-full border bg-background"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default Sidebar;
