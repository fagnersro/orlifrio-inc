"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L, { Map as LeafletMapType } from "leaflet"
import "leaflet/dist/leaflet.css"

// Coordenadas aproximadas: Av. Farrapos, 3857 - Floresta, Porto Alegre
const POSITION: [number, number] = [-29.9938, -51.2039]

const customIcon = L.divIcon({
  className: "",
  html: `
    <div style="width: 32px; height: 42px; position: relative; transform: translate(-50%, -100%);">
      <svg viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.2 0 0 7.2 0 16c0 11 16 26 16 26s16-15 16-26C32 7.2 24.8 0 16 0z" fill="#1d4ed8" />
        <circle cx="16" cy="16" r="6" fill="white" />
      </svg>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
})

export default function LeafletMap() {
  const mapRef = useRef<LeafletMapType | null>(null)

  useEffect(() => {
    // Força o Leaflet a recalcular o tamanho — corrige tiles cinzas
    // quando o container é montado dinamicamente ou em mobile.
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize()
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <MapContainer
      center={POSITION}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <Marker position={POSITION} icon={customIcon} />
    </MapContainer>
  )
}
