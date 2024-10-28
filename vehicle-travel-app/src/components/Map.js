import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const Map = ({ positions }) => {
  return (
    <MapContainer center={[positions[0].latitude, positions[0].longitude]} zoom={13} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={positions.map(pos => [pos.latitude, pos.longitude])} color="blue" />
    </MapContainer>
  );
};

export default Map;