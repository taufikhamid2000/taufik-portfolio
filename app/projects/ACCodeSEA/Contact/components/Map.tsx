/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import '../../../../../styles/commonStyles.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});


export default function ContactMap() {
  const position: [number, number] = [3.139, 101.6869]; // Kuala Lumpur coordinates

  return (
    <div className="contact-map-container max-w-2xl mx-auto p-6 border rounded-lg bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Our Location</h2>
      <MapContainer center={position} zoom={13} className="h-96 w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Our Office Location<br /> Kuala Lumpur, Malaysia.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}