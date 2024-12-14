import { Timestamp } from "firebase/firestore";

interface TemperatureRange {
    min: number;
    max: number;
}

interface HumidityRange {
    min: number;
    max: number;
}

interface Product {
    productID: string;
    name: string;
    sellerID: string;
    price: number;
    quantity: number;
    temperatureRange: TemperatureRange;
    humidityRange: HumidityRange;
    expiryDate: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    imageURL: string;
}

export type { TemperatureRange, HumidityRange, Product };
  