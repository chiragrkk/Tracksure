import axios from 'axios';
import * as admin from 'firebase-admin';
import path from 'path';

const serviceAccount = path.join(__dirname, '../account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thenomaddevs-69420-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

interface TrackingDetail {
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    temperature: number;
    humidity: number;
    lastUpdated: admin.firestore.Timestamp;
}

async function getSensorData(sensorID: string, pin: string): Promise<number> {
    const url = `https://blynk.cloud/external/api/get?token=${sensorID}&V${pin}`;
    try {
        const response = await axios.get<{ value: string }>(url);
        return Number(response.data);
    } catch (error) {
        console.error(`Failed to fetch data for sensorID ${sensorID} and pin ${pin}:`, error);
        throw new Error(`Failed to fetch data for ${pin}`);
    }
}

async function setSensorData(sensorID: string, pin: string, value: number): Promise<void> {
    const url = `https://blynk.cloud/external/api/update?token=${sensorID}&V${pin}=${value}`;
    try {
        await axios.get(url);
    } catch (error) {
        console.error(`Failed to update data for sensorID ${sensorID} and pin ${pin}:`, error);
        throw new Error(`Failed to update data for ${pin}`);
    }
}

async function pollRfIDs(): Promise<void> {
    console.log('Polling RFIDs...');
    try{
        const usersSnapshot = await db.collection('users').get();
        if (usersSnapshot.empty) {
            console.log('No users found.');
            return;
        }
        usersSnapshot.forEach(async (userDoc) => {
            const userData = userDoc.data();
            const rfID = userData.rfID;
            if (rfID) {
                console.log(`Checking sensor for user: ${userData.name} with RFID: ${rfID}`);
                const sensorValue = await getSensorData(rfID, '0');
                console.log(`Sensor value for user: ${userData.name} is ${sensorValue}`);
                if (sensorValue === 1) {
                    console.log(`Sensor value is 1 for user: ${userData.name}. Updating shipment status to 'in-transit'.`);
                    const shipmentsSnapshot = await db.collection('shipments')
                    .where('transporterID', '==', userData.uid)
                    .where('status', '==', 'pending')
                    .get();
                    if (!shipmentsSnapshot.empty) {
                        const shipment = shipmentsSnapshot.docs[0];
                        const shipmentID = shipment.id;
                        await db.collection('shipments').doc(shipmentID).update({
                            status: 'in-transit',
                        });
                        console.log(`Shipment ${shipmentID} status updated to 'in-transit'.`);
                        await setSensorData(rfID, '0', 0);
                    } else {
                        console.log(`No pending shipments for transporter ${userData.name}.`);
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error polling RFIDs:', error);
    }
    finally {
        console.log('Polling RFIDs complete.');
    }
}

async function pollSensors(): Promise<void> {
    console.log('Polling sensors...');
    try {
        const shipmentsSnapshot = await db.collection('shipments').where('status', '==', 'in-transit').get();
        if (shipmentsSnapshot.empty) {
            console.log('No in-transit shipments found.');
            return;
        }
        console.log(`Found ${shipmentsSnapshot.size} in-transit shipments.`);
        shipmentsSnapshot.forEach(async (doc) => {
            const shipment = doc.data();
            const transporterID = shipment.transporterID;
            const transporterSnapshot = await db.collection('users').doc(transporterID).get();
            const transporter = transporterSnapshot.data();
            const sensorID = transporter?.sensorID;
            if (!sensorID) {
                console.log(`No sensor ID found for transporter: ${transporterID}`);
                return;
            }
            try {
                const temperature = await getSensorData(sensorID, '0');
                const humidity = await getSensorData(sensorID, '1');
                const latitude = await getSensorData(sensorID, '2');
                const longitude = await getSensorData(sensorID, '3');

                const newTrackingDetail: TrackingDetail = {
                    currentLocation: {
                        latitude: latitude,
                        longitude: longitude,
                    },
                    temperature: temperature,
                    humidity: humidity,
                    lastUpdated: admin.firestore.Timestamp.now(),
                };

                await db.collection('shipments').doc(shipment.shipmentID).update({
                    trackingDetails: admin.firestore.FieldValue.arrayUnion(newTrackingDetail),
                });

                console.log(`Shipment ${shipment.id} updated with new tracking details.`);
            } catch (error) {
                console.error(`Error updating shipment ${shipment.id}:`, error);
            }
        });
    } catch (error) {
        console.error('Error polling shipments:', error);
    } finally {
        console.log('Polling sensors complete.');
    }
}

////// Alerts //////
async function setAlerts(): Promise<void> {
    console.log('Setting alerts...');
    try {
        const shipmentsSnapshot = await db.collection('shipments').where('status', '==', 'in-transit').get();
        if (shipmentsSnapshot.empty) {
            console.log('No in-transit shipments found.');
            return;
        }
        console.log(`Found ${shipmentsSnapshot.size} in-transit shipments.`);
        shipmentsSnapshot.forEach(async (shipmentDoc) => {
            const shipment = shipmentDoc.data();
            if (!shipment.trackingDetails || shipment.trackingDetails.length === 0) {
                console.log(`No tracking details for shipment: ${shipment.shipmentID}`);
                return;
            }
            const latestTrackingDetail = shipment.trackingDetails[shipment.trackingDetails.length - 1];
            const { temperature, humidity } = latestTrackingDetail;
            const productID = shipment.productID;
            if (!productID) {
                console.log(`No productID found for shipment: ${shipment.shipmentID}`);
                return;
            }
            const productDoc = await db.collection('products').doc(productID).get();
            if (!productDoc.exists) {
                console.log(`Product not found for productID: ${productID}`);
                return;
            }
            const product = productDoc.data();
            const { temperatureRange, humidityRange } = product!;
            if (!temperatureRange || !humidityRange) {
                console.log(`Temperature or humidity range missing for product: ${productID}`);
                return;
            }
            const tempOutOfRange = temperature < temperatureRange.min || temperature > temperatureRange.max;
            const humidityOutOfRange = humidity < humidityRange.min || humidity > humidityRange.max;
            if (tempOutOfRange || humidityOutOfRange) {
                const alertMessage = tempOutOfRange
                    ? `Temperature (${temperature}°C) is out of the safe range (${temperatureRange.min}°C - ${temperatureRange.max}°C).`
                    : `Humidity (${humidity}%) is out of the safe range (${humidityRange.min}% - ${humidityRange.max}%).`;
                const alertData = {
                    shipmentID: shipment.shipmentID,
                    message: alertMessage,
                    timestamp: admin.firestore.Timestamp.now(),
                };
                await db.collection('alerts').add(alertData);
                console.log(`Alert added for shipment ${shipment.shipmentID}: ${alertMessage}`);
            } else {
                console.log(`All conditions are within range for shipment: ${shipment.shipmentID}`);
            }
        });
    } catch (error) {
        console.error('Error setting alerts:', error);
    } finally {
        console.log('Setting alerts complete.');
    }
}


setInterval(
    async () => {
        await pollSensors();
        await pollRfIDs();
        await setAlerts();
    },
    20000
);

pollSensors();
pollRfIDs();
setAlerts();
