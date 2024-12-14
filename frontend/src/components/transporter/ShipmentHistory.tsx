import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from "@services/firebase";
import { Shipment } from "@schemas/shipmentSchema";
import { useAuthUser } from "@hooks/useAuthUser";

const ShipmentHistory = () => {
  const db = getFirestore(app);
  const { userInfo } = useAuthUser();
  const [shipmentHistory, setShipmentHistory] = useState<Shipment[]>([]);

  const fetchShipments = async () => {
    try {
      const shipmentsQuery = query(
        collection(db, "shipments"),
        where("status", "==", "delivered"),
        where("transporterID", "==", userInfo?.uid)
      );
      const querySnapshot = await getDocs(shipmentsQuery);
      const fetchedShipments: Shipment[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        fetchedShipments.push(data as Shipment);
      });
      setShipmentHistory(fetchedShipments);
    } catch (error) {
      console.error("Error fetching shipments: ", error);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, [db]);

  return (
    <div className="w-full max-w-3xl h-full">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">Shipment History</h2>
      </div>
      <div className="p-4">
        <div className="h-full w-full">
          <div className="space-y-4">
            {shipmentHistory.length > 0 ? (
              shipmentHistory.map((shipment) => (
                <div
                  key={shipment.shipmentID}
                  className="flex flex-col space-y-2 w-full rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex justify-between w-full">
                    <span className="font-semibold">
                      Shipment ID: {shipment.shipmentID}
                    </span>
                    <span className="px-2 py-1 rounded text-white bg-blue-700">
                      {shipment.deliveredDate.toDate().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Order ID: {shipment.orderID}
                  </div>
                  {/* <div className="font-medium">{shipment.productName}</div> */}
                  <div className="text-sm text-gray-500">
                    Transporter ID: {shipment.transporterID}
                  </div>
                </div>
              ))
            ) : (
              <p>No shipments delivered.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentHistory;
