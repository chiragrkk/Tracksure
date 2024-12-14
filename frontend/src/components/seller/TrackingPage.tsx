import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from "@services/firebase";  // Adjust the path based on your project structure
import { Shipment } from "@schemas/shipmentSchema";
import { useAuthUser } from "@hooks/useAuthUser";

const TrackingPage = () => {
  const db = getFirestore(app);
  const { userInfo } = useAuthUser();
  const [tracking, setTracking] = useState<Shipment[]>([]);

  const fetchShipments = async () => {
    try {
      const trackingQuery = query(
        collection(db, "shipments"),
        where("status", "in", ["pending", "in-transit"]),
        where("sellerID", "==", userInfo?.uid)
      );
      const querySnapshot = await getDocs(trackingQuery);
      const fetchedShipments: Shipment[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedShipments.push(data as Shipment);
      });
      setTracking(fetchedShipments);
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
        <h2 className="text-xl font-bold items-center justify-center">Tracking</h2>
      </div>
      <div className="p-4 onClick={}">
        <div className="h-full w-full">
          <div className="space-y-4">
            {tracking.length > 0 ? (
              tracking.map((shipment) => (
                <div
                  key={shipment.shipmentID}
                  className="flex flex-col space-y-2 w-full rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex justify-between w-full">
                    <span className="font-semibold">
                      Shipment ID: {shipment.shipmentID}
                    </span>
                    <span className="px-2 py-1 rounded text-white bg-blue-700">
                      {shipment.deliveryDate.toDate().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Order ID: {shipment.orderID}
                  </div>
                  {/* <div className="font-medium">{shipment.productName}</div> */}
                  <div className="text-sm text-gray-500">
                    Transporter ID: {shipment.transporterID}
                  </div>
                  <div className="text-sm text-gray-500">
                    Status: {shipment.status}
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

export default TrackingPage;
