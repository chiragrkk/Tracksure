import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from "@services/firebase";
import { useAuthUser } from "@hooks/useAuthUser";
import { Order } from "@schemas/orderSchema";

const OrderHistory = () => {
  const db = getFirestore(app);
  const { userInfo } = useAuthUser();
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const ordersQuery = query(
        collection(db, "orders"),
        where("delivered", "==", true),
        where("consumerID", "==", userInfo?.uid)
      );
      const querySnapshot = await getDocs(ordersQuery);
      const fetchedOrders: Order[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        fetchedOrders.push(data as Order);
      });
      setOrderHistory(fetchedOrders);
    } catch (error) {
      console.error("Error fetching shipments: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [db]);

  return (
    <div className="w-full max-w-3xl h-full">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">Order History</h2>
      </div>
      <div className="p-4">
        <div className="h-full w-full">
          <div className="space-y-4">
            {orderHistory.length > 0 ? (
              orderHistory.map((order) => (
                <div
                  key={order.orderID}
                  className="flex flex-col space-y-2 w-full rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex justify-between w-full">
                    <span className="font-semibold">
                      Order ID: {order.orderID}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Product ID: {order.orderID}
                  </div>
                  {/* <div className="font-medium">{shipment.productName}</div> */}
                  <div className="text-sm text-gray-500">
                    Shipment ID: {order.shipmentID}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
