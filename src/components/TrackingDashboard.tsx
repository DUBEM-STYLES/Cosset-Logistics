import React, { useState, useEffect } from "react";
import { Search, Loader2, MapPin, Calendar, Boxes, Check, Circle, AlertCircle } from "lucide-react";
import { TrackingDetails } from "../types";

export default function TrackingDashboard() {
  const [trackingId, setTrackingId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<TrackingDetails | null>(null);

  const performSearch = async (code: string) => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingId: code }),
      });

      if (!response.ok) {
        throw new Error("Unable to contact tracking database.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setDetails(data);
    } catch (err: any) {
      setError(err?.message || "Invalid tracking request.");
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If search query is changed, process lookup
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(trackingId.trim());
  };

  const handleDemoClick = (code: string) => {
    setTrackingId(code);
    setSearchQuery(code);
  };

  return (
    <div className="space-y-8">
      {/* Search Bar Block */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Real-Time Shipment Tracking Portal
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
          Input your freight consignment tracking ID (starting with "CS-") to view active driver positions, completed provincial tollways, and estimated final-mile arrival times.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="tracking-input-search"
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. CS-98421, CS-10543, CS-20412"
              className="w-full bg-white dark:bg-slate-850 text-slate-850 dark:text-slate-150 pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 dark:border-slate-750 focus:outline-none focus:ring-1 focus:ring-royal-blue focus:border-royal-blue font-mono font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-royal-blue space-x-2 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-royal-blue-hover active:translate-y-0.5 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Search</span>}
          </button>
        </form>

        {/* Quick presets helper */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Active Demo Dispatches:
          </span>
          {["CS-98421", "CS-10543", "CS-20412"].map((code) => (
            <button
              key={code}
              onClick={() => handleDemoClick(code)}
              className="px-2.5 py-1 text-xs font-mono font-bold text-royal-blue bg-blue-50 dark:bg-blue-900/20 hover:bg-royal-blue hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-16 space-y-3">
          <Loader2 className="w-10 h-10 animate-spin text-royal-blue mx-auto" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono block">
            Retrieving Canada Satellite Positioning Logs...
          </span>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-5 rounded-2xl border border-red-150 dark:border-red-900/30 flex gap-3.5 items-start">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-sm">Tracking Resolution Error</h5>
            <p className="text-xs mt-1 leading-relaxed text-red-500/95 dark:text-red-400/90">
              {error}. Verify the format begins with "CS-" followed by a valid 5-digit assignment identifier.
            </p>
          </div>
        </div>
      )}

      {details && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-royal-blue font-bold tracking-widest uppercase font-mono block mb-1">
                    SHIPMENT MANIFEST
                  </span>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {details.id}
                  </h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  details.status === "delivered" 
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 animate-pulse"
                }`}>
                  {details.status.replace("_", " ")}
                </span>
              </div>

              {/* Transit Core Info */}
              <div className="bg-slate-50 dark:bg-slate-850 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase font-mono block">Pickup location</span>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-150">{details.pickup}</span>
                  </div>
                </div>
                <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 ml-1.2"></div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase font-mono block">Destination location</span>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-150">{details.destination}</span>
                  </div>
                </div>
              </div>

              {/* Multi details list */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-4.5 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 flex items-center gap-1.5 font-mono text-[9px] uppercase font-bold">
                    <Calendar className="w-3.5 h-3.5 text-royal-blue" /> Scheduled date
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block pl-5">{details.date}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 flex items-center gap-1.5 font-mono text-[9px] uppercase font-bold">
                    <Boxes className="w-3.5 h-3.5 text-royal-blue" /> Cargo Load Sizing
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block pl-5">{details.itemsCount} load units</span>
                </div>
              </div>

              {/* Driver Positioning Location */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4.5">
                <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-widest block mb-2">
                  LATEST GPS POIGNANT HUB
                </span>
                <div className="flex items-center gap-2.5 bg-slate-900 text-white rounded-xl p-3 shadow-xs">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-450 uppercase block font-mono">Current Corridor</span>
                    <span className="text-xs font-bold">{details.currentCity}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Sizer */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold font-mono text-slate-400 uppercase">
                  <span>Guaranteed Progress</span>
                  <span>{details.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-royal-blue to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${details.progress}%` }}
                  ></div>
                </div>
              </div>

              {details.isGenerated && (
                <div className="text-[10px] text-yellow-600 dark:text-yellow-400 font-semibold bg-yellow-50 dark:bg-yellow-500/10 p-2.5 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
                  ⚠️ Simulated Dispatch View. This custom ID was dynamically computed base on current active driver layouts.
                </div>
              )}
            </div>
          </div>

          {/* Stepper Timeline Column */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <h5 className="text-md font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Consignment Ledger S-Chain Logs
            </h5>

            {/* Stepper timeline vertical track */}
            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 pl-6 space-y-6">
              {details.timeline.map((step, index) => {
                const isCompleted = step.completed;
                return (
                  <div key={index} className="relative group">
                    {/* Node Dot icon indexer */}
                    <div className="absolute -left-[31px] top-1 flex items-center justify-center">
                      {isCompleted ? (
                        <div className="w-4 h-4 rounded-full bg-royal-blue border-4 border-white dark:border-slate-900 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[4.5]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900">
                          <Circle className="w-1.5 h-1.5 text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Timeline box detail details */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h6 className={`text-sm font-bold ${
                          isCompleted ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-550"
                        }`}>
                          {step.status}
                        </h6>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
                          {step.time}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed mt-1.5 ${
                        isCompleted ? "text-slate-500 dark:text-slate-400" : "text-slate-400 dark:text-slate-600"
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
