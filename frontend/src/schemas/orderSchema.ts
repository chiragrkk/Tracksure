import { Timestamp } from "firebase/firestore";

interface Order {
    orderID: string;
    consumerID: string;
    supplierID: string;
    productID: string; // productID
    quantity: number;
    price: number;
    delivered: boolean;
    createdAt: Timestamp; // timestamp
    shipmentID: string; // Reference to the shipment
}

export type { Order };
