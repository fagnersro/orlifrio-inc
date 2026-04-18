"use client"

import dynamic from "next/dynamic"

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />,
})

export default function MapSection() {
  return (
    <section className="relative w-full h-[450px] overflow-hidden">
      {/* Mapa em escala de cinza */}
      <div className="absolute inset-0 [&_.leaflet-tile]:grayscale [&_.leaflet-tile]:contrast-110">
        <LeafletMap />
      </div>

      {/* Barra decorativa superior gradiente */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-blue-700 z-[500]" />

      {/* Card "onde estamos" */}
      <div className="absolute top-8 left-8 md:left-20 bg-white rounded-lg shadow-2xl p-5 w-64 z-[500]">
        <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-3">
          onde
          <br />
          estamos
        </h3>
        <p className="text-sm text-gray-700 font-semibold leading-snug mb-1">
          Av. Farrapos, 3857
        </p>
        <p className="text-sm text-gray-600 mb-4">Floresta - Porto Alegre</p>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Av.+Farrapos,+3857,+Porto+Alegre"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-white text-xs font-bold uppercase tracking-wide px-4 py-2 rounded transition-all"
        >
          Como chegar
        </a>
      </div>
    </section>
  )
}
