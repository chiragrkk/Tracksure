import { Timestamp } from "firebase/firestore";

interface Location {
    latitude: string;
    longitude: string;
}
  
  interface TrackingDetails {
    currentLocation: Location;
    temperature: number;
    humidity: number;
    lastUpdated: Timestamp; // timestamp
}
  
interface Shipment {
    shipmentID: string;
    orderID: string;
    transporterID: string;
    sellerID: string;
    source: string;
    destination: string;
    trackingDetails: TrackingDetails[];
    status: "pending" | "in-transit" | "delivered"; 
    deliveredDate: Timestamp; // timestamp
    createdAt: Timestamp; // timestamp
}

interface Alert {
    shipmentID: string;
    message: string;
    timestamp: Timestamp;
}

export type { Location, TrackingDetails, Shipment, Alert };
