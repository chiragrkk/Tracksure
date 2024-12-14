import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { GalleryVerticalEnd } from "lucide-react";

const ProductsCard: React.FC = () => {
  return (
    <Link to={"/seller/products"}>
        <Card className="h-[200px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Seller</CardTitle>
              <GalleryVerticalEnd className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">Products</div>
              <p className="text-xs text-muted-foreground">Select and Order products</p>
          </CardContent>
        </Card>
    </Link>
  );
};

export default ProductsCard;