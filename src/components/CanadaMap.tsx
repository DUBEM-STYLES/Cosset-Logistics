import { useState } from "react";
import { Pin, MapPin, Navigation, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export interface CityData {
  name: string;
  lat: number;
  lng: number;
  province: string;
  description: string;
  activeDrivers: number;
  deliveryTime: string;
  specialty: string;
}

export const CITY_COORDINATES: Record<string, CityData> = {
  "Winnipeg": {
    name: "Winnipeg",
    lat: 49.8951,
    lng: -97.1384,
    province: "Manitoba",
    description: "Cosset Logistics Canadian Headquarters. Centrally located for high-speed cross-border shipping, transloading, and major household relocations.",
    activeDrivers: 24,
    deliveryTime: "Same-day locally & 24h regional dispatch",
    specialty: "Cross-Canada Hub & Local Moving"
  },
  "Toronto": {
    name: "Toronto",
    lat: 43.6532,
    lng: -79.3832,
    province: "Ontario",
    description: "Our largest multi-lane eastern terminal. Managing high-density parcel deliveries, industrial hauling logistics, and premium commercial moving.",
    activeDrivers: 48,
    deliveryTime: "Hourly local couriers & next-day express",
    specialty: "E-Commerce Logistics & Container Hauling"
  },
  "Calgary": {
    name: "Calgary",
    lat: 51.0447,
    lng: -114.0719,
    province: "Alberta",
    description: "Centennial industrial facility. Focuses on flatbed shipping, specialized household relocations, and Rocky Mountain transport corridors.",
    activeDrivers: 18,
    deliveryTime: "Same-day Calgary wide & peak hauling routing",
    specialty: "Heavy Hauling & Rocky Corridor Moving"
  },
  "Edmonton": {
    name: "Edmonton",
    lat: 53.5461,
    lng: -113.4938,
    province: "Alberta",
    description: "Northern Alberta dispatch depot. Dedicated to heavy industrial cargo, appliance hauling, and large construction relocation frameworks.",
    activeDrivers: 15,
    deliveryTime: "Scheduled custom departures every 6 hours",
    specialty: "Industrial Moving & Debris Removal"
  },
  "Vancouver": {
    name: "Vancouver",
    lat: 49.2827,
    lng: -123.1207,
    province: "British Columbia",
    description: "Major maritime-connected shipping hub. Specialized in urban container shipping, multi-story apartment relocations, and green rapid delivery grids.",
    activeDrivers: 29,
    deliveryTime: "Same-day urban priority & Vancouver-to-Calgary direct",
    specialty: "Ocean Port Drayage & Apartment Removals"
  },
  "Ottawa": {
    name: "Ottawa",
    lat: 45.4215,
    lng: -75.6972,
    province: "Ontario",
    description: "Government-compliant secure transport carrier. Providing high-security relocations, fast corporate delivery networks, and office setup experts.",
    activeDrivers: 12,
    deliveryTime: "Direct dispatch & rigid scheduling guarantees",
    specialty: "Office Relocations & Secure Document Delivery"
  },
  "Regina": {
    name: "Regina",
    lat: 50.4452,
    lng: -104.6189,
    province: "Saskatchewan",
    description: "Prairie agricultural transit station. Offers fast-track farm logistics, residential moving packages, and cost-effective commercial courier lines.",
    activeDrivers: 10,
    deliveryTime: "Within 24 hours provincial wide dispatch",
    specialty: "Prairie Transit & Farm Logistics"
  },
  "Saskatoon": {
    name: "Saskatoon",
    lat: 52.1332,
    lng: -106.6700,
    province: "Saskatchewan",
    description: "Central Saskatchewan depot. Fast local residential movers, junk appliance hauling, and e-commerce regional warehouse management.",
    activeDrivers: 11,
    deliveryTime: "Scheduled residential moves & junk hauling slots",
    specialty: "Urban Junk Hauling & Home Packers"
  }
};

export default function CanadaMap() {
  const [selectedCity, setSelectedCity] = useState<string>("Winnipeg");
  const activeCity = CITY_COORDINATES[selectedCity];

  // Helper to project lat/lng onto a visual SVG viewport representing Canada.
  // We specify a bounding box that encapsulates Canada nicely.
  // Latitude ranges from ~42N to ~60N for these cities, Longitude from -125W to -75W.
  const projectCoords = (lat: number, lng: number) => {
    const minLng = -128;
    const maxLng = -70;
    const minLat = 41;
    const maxLat = 56;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    // Map is inverted visually (y starts at top, latitude increases going north)
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;

    // Constrain to slightly padded bounds (10% to 90%)
    const paddedX = 10 + (x * 0.8);
    const paddedY = 15 + (y * 0.7);

    return { x: paddedX, y: paddedY };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Visual Map Render Column */}
      <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-inner relative overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-between">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-royal-blue/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top bar with map status */}
        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-505 uppercase tracking-widest font-mono">
              Canada Regional Dispatches: Operational
            </span>
          </div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full shadow-xs">
            <Navigation className="w-3.5 h-3.5 text-royal-blue animate-pulse" />
            Active provincial corridors: Trans-Canada Hwy
          </div>
        </div>

        {/* The Canada Map Canvas */}
        <div className="relative flex-1 w-full flex items-center justify-center my-4">
          {/* Abstract background map outline structure */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none" preserveAspectRatio="none">
            {/* Draw schematic Canadian border lines */}
            <path d="M 10,25 C 20,20 40,30 50,28 C 60,26 80,18 90,22 L 95,50 L 92,60 C 85,62 72,55 70,62 L 68,75 L 50,72 L 40,88 L 22,86 L 15,62 Z" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
            <path d="M 10,85 L 90,85" stroke="currentColor" strokeWidth="0.5" />
          </svg>

          {/* Interactive city markers layered on top */}
          <svg viewBox="0 0 100 100" className="w-full h-[320px] sm:h-[380px] z-10 relative">
            {/* Draw active lines connecting selected city to other cities to simulate real logistics routes */}
            {Object.keys(CITY_COORDINATES).map((key) => {
              if (key === selectedCity) return null;
              const source = projectCoords(activeCity.lat, activeCity.lng);
              const dest = projectCoords(CITY_COORDINATES[key].lat, CITY_COORDINATES[key].lng);
              return (
                <g key={`route-${key}`}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={dest.x}
                    y2={dest.y}
                    className="stroke-royal-blue/30 dark:stroke-royal-blue/40"
                    strokeWidth="0.75"
                  />
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={dest.x}
                    y2={dest.y}
                    className="stroke-royal-blue animate-route-line"
                    strokeWidth="1.2"
                  />
                </g>
              );
            })}

            {/* City Nodes */}
            {Object.keys(CITY_COORDINATES).map((key) => {
              const city = CITY_COORDINATES[key];
              const { x, y } = projectCoords(city.lat, city.lng);
              const isSelected = key === selectedCity;

              return (
                <g
                  key={key}
                  className="cursor-pointer group"
                  onClick={() => setSelectedCity(key)}
                >
                  {/* Outer pulsing focus effect */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r="4.5"
                      className="fill-royal-blue/20 stroke-royal-blue animate-ping"
                    />
                  )}
                  {/* Standard hover ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r="2.5"
                    className={`transition-all duration-300 ${
                      isSelected
                        ? "fill-royal-blue stroke-white stroke-2 shadow-lg"
                        : "fill-slate-400 dark:fill-slate-600 group-hover:fill-royal-blue stroke-transparent"
                    }`}
                  />
                  {/* Miniature text tag label */}
                  <text
                    x={x}
                    y={y - 3}
                    textAnchor="middle"
                    className={`font-sans tracking-tight text-[3.8px] font-bold select-none transition-colors duration-250 ${
                      isSelected
                        ? "fill-royal-blue dark:fill-blue-400"
                        : "fill-slate-500 dark:fill-slate-400 group-hover:fill-slate-800 dark:group-hover:fill-slate-200"
                    }`}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Interactive bottom guide */}
        <div className="text-center text-[11px] text-slate-400 z-10 flex items-center justify-center gap-1 bg-white/70 dark:bg-slate-850/60 py-1.5 px-3 rounded-xl backdrop-blur-xs font-medium">
          <HelpCircle className="w-3.5 h-3.5 text-royal-blue" />
          Click on any city node on the map to switch regional hubs and view operations data.
        </div>
      </div>

      {/* Selected City Details Panel Column */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-xs font-bold text-royal-blue tracking-widest uppercase bg-royal-blue/10 dark:bg-royal-blue/20 px-3 py-1.5 rounded-lg">
            Active Hub Hub Highlight
          </span>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            {activeCity.name}, <span className="text-royal-blue">{activeCity.province}</span>
          </h3>
        </div>

        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-850 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xs">
          {activeCity.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              Active Regional Fleet
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <span>{activeCity.activeDrivers} Trucks</span>
              <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Live
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              Guaranteed Response
            </span>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2.5">
              {activeCity.deliveryTime}
            </div>
          </div>
        </div>

        {/* Primary Specializations */}
        <div className="bg-slate-900 text-white rounded-[24px] p-5 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 p-3 opacity-10">
            <ShieldCheck className="w-24 h-24 stroke-1" />
          </div>
          
          <span className="text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase block mb-1">
            Regional Core Competency
          </span>
          <h4 className="text-lg font-bold text-white mb-2">
            {activeCity.specialty}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            All freight, commercial, and residential moving structures deploying from the {activeCity.name} hub are backed by Cosset's fully bonded liability guarantee.
          </p>
        </div>

        {/* Dispatch Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              const calcSec = document.getElementById("calculator");
              if (calcSec) calcSec.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-1 px-5 py-3.5 bg-royal-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-royal-blue-hover transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            Calculate From {activeCity.name}
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href={`tel:+14313735054`}
            className="px-5 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-royal-blue" />
            Contact Hub
          </a>
        </div>
      </div>
    </div>
  );
}
