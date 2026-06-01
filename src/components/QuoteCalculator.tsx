import React, { useState, useEffect } from "react";
import { Calculator, ArrowRight, ShieldAlert, CheckCircle2, Ticket, Sparkles } from "lucide-react";
import { Booking } from "../types";

// Coordinates corresponding to CITY_COORDINATES file
const CITY_MATH_COORDS: Record<string, { lat: number; lng: number; province: string }> = {
  "Winnipeg": { lat: 49.8951, lng: -97.1384, province: "Manitoba" },
  "Toronto": { lat: 43.6532, lng: -79.3832, province: "Ontario" },
  "Calgary": { lat: 51.0447, lng: -114.0719, province: "Alberta" },
  "Edmonton": { lat: 53.5461, lng: -113.4938, province: "Alberta" },
  "Vancouver": { lat: 49.2827, lng: -123.1207, province: "British Columbia" },
  "Ottawa": { lat: 45.4215, lng: -75.6972, province: "Ontario" },
  "Regina": { lat: 50.4452, lng: -104.6189, province: "Saskatchewan" },
  "Saskatoon": { lat: 52.1332, lng: -106.6700, province: "Saskatchewan" }
};

interface QuoteCalculatorProps {
  onAddBooking: (booking: Booking) => void;
  onNavigate: (sectionId: string) => void;
}

export default function QuoteCalculator({ onAddBooking, onNavigate }: QuoteCalculatorProps) {
  const [pickupCity, setPickupCity] = useState("Winnipeg");
  const [dropoffCity, setDropoffCity] = useState("Toronto");
  const [serviceType, setServiceType] = useState<"moving" | "delivery" | "hauling">("moving");
  const [itemsCount, setItemsCount] = useState(5);
  const [preferredDate, setPreferredDate] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoStatus, setPromoStatus] = useState<"none" | "valid" | "invalid">("none");
  const [isBooked, setIsBooked] = useState(false);
  const [lastAssignedTracking, setLastAssignedTracking] = useState("");

  // Auto set tomorrow's date by default
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Compute precise Haversine distance
  const calculateHaversine = (cityA: string, cityB: string): number => {
    if (cityA === cityB) return 15; // Local area base distance
    const coordA = CITY_MATH_COORDS[cityA];
    const coordB = CITY_MATH_COORDS[cityB];
    if (!coordA || !coordB) return 15;

    const R = 6371; // Earth radius in km
    const dLat = ((coordB.lat - coordA.lat) * Math.PI) / 180;
    const dLng = ((coordB.lng - coordA.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((coordA.lat * Math.PI) / 180) *
        Math.cos((coordB.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const calculatedDistance = calculateHaversine(pickupCity, dropoffCity);

  // Core pricing calculations
  const getBaseFee = () => {
    switch (serviceType) {
      case "moving":
        return 150; // includes 2 movers
      case "delivery":
        return 35;
      case "hauling":
        return 80;
    }
  };

  const getDistanceRate = () => {
    // $2.50 per excess km over first 15 free local km
    const chargeableKm = Math.max(0, calculatedDistance - 15);
    return parseFloat((chargeableKm * 2.50).toFixed(2));
  };

  const getItemSurcharge = () => {
    switch (serviceType) {
      case "moving":
        return itemsCount * 15; // items charge
      case "delivery":
        return itemsCount * 5; // package volume surcharge
      case "hauling":
        return itemsCount * 20; // heavy weight hauling charge
    }
  };

  const subtotal = getBaseFee() + getDistanceRate() + getItemSurcharge();
  const rawTotal = subtotal * (1 - promoDiscount);
  const finalPrice = parseFloat(rawTotal.toFixed(2));

  // Handle promotional logic
  const handlePromoCheck = () => {
    const codeNormalized = promoCode.trim().toUpperCase();
    if (codeNormalized === "WELCOME26" || codeNormalized === "CANADA10") {
      setPromoDiscount(0.1); // 10% discount
      setPromoStatus("valid");
    } else if (codeNormalized === "HQWINNIPEG") {
      setPromoDiscount(0.15); // 15% Winnipeg dispatch discount
      setPromoStatus("valid");
    } else if (codeNormalized === "") {
      setPromoDiscount(0);
      setPromoStatus("none");
    } else {
      setPromoDiscount(0);
      setPromoStatus("invalid");
    }
  };

  // Convert to full Booking object with dispatcher integration
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const mockTrackingId = `CS-${randomSuffix}`;

    const newBooking: Booking = {
      id: mockTrackingId,
      customerName: "You (Verified Core Guest)",
      pickup: `${pickupCity}, ${CITY_MATH_COORDS[pickupCity].province}`,
      destination: `${dropoffCity}, ${CITY_MATH_COORDS[dropoffCity].province}`,
      serviceType: serviceType.toUpperCase(),
      distance: calculatedDistance,
      itemsCount: itemsCount,
      date: preferredDate,
      price: finalPrice,
      status: "pending",
      trackingId: mockTrackingId,
    };

    onAddBooking(newBooking);
    setLastAssignedTracking(mockTrackingId);
    setIsBooked(true);

    // Auto clear booking presentation state after 8 seconds
    setTimeout(() => {
      setIsBooked(false);
    }, 8000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-250/60 dark:border-slate-800/80 shadow-premium p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative Top Frame */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-royal-blue to-blue-500"></div>

      {isBooked ? (
        <div className="py-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Booking Successfully Dispatched!
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
              Your pickup has been logged directly into our Canada central scheduling matrix. Live vehicle assignment is in progress.
            </p>
          </div>

          {/* Golden Ticket Badge with live tracking */}
          <div className="bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-750 rounded-2xl p-4.5 max-w-sm mx-auto flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                FREIGHT TRACKING ID
              </span>
              <span className="text-lg font-black text-slate-950 dark:text-white tracking-wide font-mono">
                {lastAssignedTracking}
              </span>
            </div>
            <button
              onClick={() => {
                // Auto trigger lookup with prefilled state in parent window
                const trackingSection = document.getElementById("tracking");
                if (trackingSection) {
                  const input = document.getElementById("tracking-input-search") as HTMLInputElement;
                  if (input) {
                    input.value = lastAssignedTracking;
                    // Trigger input change
                    const event = new Event("input", { bubbles: true });
                    input.dispatchEvent(event);
                  }
                  trackingSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-4 py-2 bg-royal-blue hover:bg-royal-blue-hover text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all"
            >
              Track Now
            </button>
          </div>

          <div className="flex justify-center gap-3 pt-3">
            <button
              onClick={() => onNavigate("portal")}
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Open My Portal
            </button>
            <button
              onClick={() => setIsBooked(false)}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              New Calculation
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleConfirmBooking} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-royal-blue flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Live Quote Calculator
              </h4>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Frictionless 2.50/km Carrier Rate
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                Pickup Center
              </label>
              <select
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-750 px-3.5 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:border-royal-blue focus:ring-1 focus:ring-royal-blue"
              >
                {Object.keys(CITY_MATH_COORDS).map((city) => (
                  <option key={`pickup-${city}`} value={city}>
                    {city}, {CITY_MATH_COORDS[city].province === "Manitoba" ? "MB (HQ)" : CITY_MATH_COORDS[city].province.substring(0, 2).toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropoff */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                Dropoff Address
              </label>
              <select
                value={dropoffCity}
                onChange={(e) => setDropoffCity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-750 px-3.5 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:border-royal-blue focus:ring-1 focus:ring-royal-blue"
              >
                {Object.keys(CITY_MATH_COORDS).map((city) => (
                  <option key={`dropoff-${city}`} value={city}>
                    {city}, {CITY_MATH_COORDS[city].province.substring(0, 2).toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Service Grid Selection */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
              Core Service Classification
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "moving", name: "Moving" },
                { id: "delivery", name: "Delivery" },
                { id: "hauling", name: "Hauling" },
              ].map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setServiceType(category.id as any)}
                  className={`py-3.5 px-3 text-center rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    serviceType === category.id
                      ? "bg-royal-blue text-white shadow-md shadow-blue-500/10"
                      : "bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 border border-slate-150 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Additional parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Range slider for load sizing */}
            <div className="bg-slate-50 dark:bg-slate-855 rounded-2xl p-4 border border-slate-150 dark:border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Surcharge Load Units
                </span>
                <span className="text-sm font-black text-royal-blue">
                  {itemsCount} {itemsCount === 1 ? "Item" : "Items"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={itemsCount}
                onChange={(e) => setItemsCount(parseInt(e.target.value))}
                className="w-full accent-royal-blue mt-2 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
              />
              <span className="text-[9px] font-semibold text-slate-400 block mt-1">
                {serviceType === "moving" && "Base rate includes 2 professional crew. Over 15 items adds extra loader."}
                {serviceType === "delivery" && "Small envelopes/parcels count as 1. Full palettes count as 10 per unit."}
                {serviceType === "hauling" && "Heavy debris or industrial furniture weight tier applies."}
              </span>
            </div>

            {/* Date Picker & Promo container */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-mono">
                  Target Schedule Dispatch Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-750 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-royal-blue"
                  required
                />
              </div>
            </div>
          </div>

          {/* Haversine distance calculator visualization */}
          <div className="bg-slate-50 dark:bg-slate-850 rounded-2xl p-4 border border-dashed border-slate-200 dark:border-slate-750 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Logistical Highway Route Range
              </span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {calculatedDistance.toLocaleString()} km
              </span>
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 text-center sm:text-right">
              {pickupCity} &rarr; {dropoffCity} Corridor <br/>
              <span className="text-[10px] text-royal-blue font-semibold">
                {calculatedDistance <= 50 ? "Local Area Transit Tier" : "Interprovincial Direct Dispatch Tier"}
              </span>
            </div>
          </div>

          {/* Promo Code Checker */}
          <div className="bg-white dark:bg-slate-850/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-350">
                <Ticket className="w-3.5 h-3.5 text-royal-blue" />
              </div>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO CODE (e.g. WELCOME26)"
                className="w-full bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 pl-9 pr-3 py-2 rounded-lg text-xs font-mono tracking-wider focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handlePromoCheck}
              className="px-4 py-2 bg-slate-950 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold uppercase rounded-lg transition-all"
            >
              Apply
            </button>
          </div>

          {/* Promo Feedback Status */}
          {promoStatus === "valid" && (
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Promo code applied! Saved {(promoDiscount * 100)}% off your estimated logistics transit.
            </div>
          )}
          {promoStatus === "invalid" && (
            <div className="text-xs text-rose-500 font-medium flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Invalid promo code. Try WELCOME26 (10% Off) or HQWINNIPEG (15% Off Winnipeg region).
            </div>
          )}

          {/* Quote breakdown presentation block */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Calculator className="w-32 h-32 stroke-1" />
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Transparent Rate Breakdown</span>
              <span className="font-mono">Est ID: CS-#{Math.floor(1000 + Math.random() * 9000)}</span>
            </div>

            <div className="space-y-2 text-sm text-slate-300 border-b border-white/10 pb-4">
              <div className="flex justify-between">
                <span>Class Base Minimum Fee:</span>
                <span className="font-mono font-medium text-white">${getBaseFee()}</span>
              </div>
              <div className="flex justify-between">
                <span>Distance Rate Charge ({calculatedDistance} km):</span>
                <span className="font-mono font-medium text-white">${getDistanceRate().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Surcharges ({itemsCount} load units):</span>
                <span className="font-mono font-medium text-white">${getItemSurcharge()}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-yellow-400 font-bold">
                  <span>Special Promo Offer Discount:</span>
                  <span className="font-mono">-${(subtotal * promoDiscount).toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-450 uppercase font-bold tracking-widest font-mono">
                  Fully Insured Estimate
                </span>
                <span className="text-3xl font-black text-white tracking-tight">
                  ${finalPrice.toLocaleString()} <span className="text-xs text-neutral-400 font-medium">CAD</span>
                </span>
              </div>
              
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-4 bg-royal-blue hover:bg-royal-blue-hover text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Dispatch
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
