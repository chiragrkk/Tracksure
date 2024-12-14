import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icon handling without require statements
const createCustomIcon = () => {
  return L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

interface MapLocation {
  position: LatLngExpression;
  popupText: string;
  icon?: 'origin' | 'destination' | 'current';
}

interface MapCardProps {
  center: LatLngExpression;
  popupText?: string;
  locations?: MapLocation[];
}

const MapCard: React.FC<MapCardProps> = ({ 
  center, 
  popupText = "Shipment Location", 
  locations = [] 
}) => {
  useEffect(() => {
    // Set the custom icon globally
    L.Marker.prototype.options.icon = createCustomIcon();
  }, []);

  // If no locations provided, create a default location
  const displayLocations = locations.length > 0 
    ? locations 
    : [{ position: center, popupText }];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Shipment Location</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px]">
          <MapContainer 
            center={center} 
            zoom={13} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {displayLocations.map((location, index) => (
              <Marker 
                key={index} 
                position={location.position}
              >
                <Popup>{location.popupText}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapCard;