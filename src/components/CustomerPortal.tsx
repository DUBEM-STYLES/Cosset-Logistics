import { useState } from "react";
import { Booking } from "../types";
import { FolderHeart, Printer, BellRing, Route, AlertCircle, Ban, ArrowRight, ShieldCheck, FileSpreadsheet, Check } from "lucide-react";

interface CustomerPortalProps {
  bookingsList: Booking[];
  onUpdateStatus: (id: string, newStatus: any) => void;
  onCancelBooking: (id: string) => void;
}

export default function CustomerPortal({ bookingsList, onUpdateStatus, onCancelBooking }: CustomerPortalProps) {
  const [activeTab, setActiveTab] = useState<"bookings" | "manifest">("bookings");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const selectedBooking = bookingsList.find(b => b.id === selectedBookingId) || bookingsList[0];

  const handleSimulateAlert = (id: string, message: string) => {
    setNotification(`ALERT: ${message}`);
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-205/60 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm">
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
        <div>
          <span className="text-xs font-bold text-royal-blue uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3.5 py-1.5 rounded-lg font-mono">
            Secure Customer Portal & Active Ledgers
          </span>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2.5">
            Operational Control Panel
          </h4>
        </div>

        {/* Tab triggers */}
        <div className="flex gap-2 bg-slate-50 dark:bg-slate-850 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "bookings"
                ? "bg-royal-blue text-white shadow-xs"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            My Consignments
          </button>
          <button
            onClick={() => {
              setActiveTab("manifest");
              if (bookingsList.length > 0 && !selectedBookingId) {
                setSelectedBookingId(bookingsList[0].id);
              }
            }}
            className={`px-4.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "manifest"
                ? "bg-royal-blue text-white shadow-xs"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            Bill of Lading Slip
          </button>
        </div>
      </div>

      {notification && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-250 dark:border-amber-900/40 text-amber-800 dark:text-amber-400 p-4 rounded-xl mb-6 flex items-start gap-3.5 shadow-sm animate-bounce text-xs font-semibold">
          <BellRing className="w-4 h-4 mt-0.5 animate-pulse shrink-0 text-royal-blue" />
          <div>{notification}</div>
        </div>
      )}

      {bookingsList.length === 0 ? (
        <div className="py-16 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-450 rounded-full flex items-center justify-center mx-auto">
            <FolderHeart className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <h5 className="font-bold text-lg text-slate-900 dark:text-white">No active shipping records found</h5>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2.5 leading-relaxed">
              You haven't generated any estimates or scheduled pick-up appointments yet. Use our interactive **Live Quote Calculator** above to quickly reserve a delivery dispatch!
            </p>
          </div>
          <button
            onClick={() => {
              const calcSection = document.getElementById("calculator");
              if (calcSection) calcSection.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-3 bg-royal-blue text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-royal-blue-hover transition-colors inline-block cursor-pointer shadow-md shadow-blue-500/10"
          >
            Calculate Free Quote
          </button>
        </div>
      ) : (
        activeTab === "bookings" ? (
          /* Bookings Overview list */
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
              TOTAL COMMITTED FREIGHT UNITS: {bookingsList.length}
            </span>

            <div className="overflow-x-auto rounded-2xl border border-slate-150 dark:border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-850/50 border-b border-slate-150 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-widest text-[9px] font-mono">
                    <th className="p-4">Cargo ID</th>
                    <th className="p-4">Classification</th>
                    <th className="p-4">Route Pathway</th>
                    <th className="p-4">Dispatch Date</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Frictionless Sandbox Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bookingsList.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors font-medium text-slate-700 dark:text-slate-300">
                      <td className="p-4 font-mono font-black text-slate-900 dark:text-white">
                        {booking.id}
                      </td>
                      <td className="p-4">
                        <span className="bg-blue-50 dark:bg-blue-900/10 text-royal-blue font-bold px-2.5 py-1 rounded text-[10px] uppercase tracking-wider">
                          {booking.serviceType}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="max-w-[200px] truncate text-xs text-slate-900 dark:text-white font-semibold">
                          {booking.pickup} &rarr; {booking.destination}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Distance limit: {booking.distance} km</span>
                      </td>
                      <td className="p-4">
                        {booking.date}
                      </td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white font-mono">
                        ${booking.price.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          booking.status === "delivered" 
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : booking.status === "in_transit"
                            ? "bg-blue-105 text-royal-blue dark:bg-blue-500/10 dark:text-blue-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4 text-right flex flex-wrap justify-end gap-1.5 focus-within:z-10">
                        {/* Simulation trigger buttons */}
                        {booking.status === "pending" && (
                          <button
                            onClick={() => {
                              onUpdateStatus(booking.id, "dispatched");
                              handleSimulateAlert(booking.id, `Consignment ${booking.id} has been dispatched! Assigned driver: Mark R. in Freight Truck #301.`);
                            }}
                            className="p-2.5 bg-slate-100 hover:bg-royal-blue hover:text-white text-slate-700 dark:bg-slate-800 dark:text-slate-350 dark:hover:bg-royal-blue rounded-lg transition-all"
                            title="Simulate Dispatch Truck"
                          >
                            <Route className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {booking.status === "dispatched" && (
                          <button
                            onClick={() => {
                              onUpdateStatus(booking.id, "in_transit");
                              handleSimulateAlert(booking.id, `Dispatch ${booking.id} has reached highway trans-provincial corridors. Approaching mid-point hub.`);
                            }}
                            className="p-2.5 bg-slate-100 hover:bg-royal-blue hover:text-white text-slate-700 dark:bg-slate-800 dark:text-slate-350 dark:hover:bg-royal-blue rounded-lg transition-all"
                            title="Simulate Hwy Transit"
                          >
                            <Route className="w-3.5 h-3.5 animate-pulse" />
                          </button>
                        )}

                        {booking.status === "in_transit" && (
                          <button
                            onClick={() => {
                              onUpdateStatus(booking.id, "delivered");
                              handleSimulateAlert(booking.id, `Shipment ${booking.id} successfully completed. Consignment verifiably left at target dock or loading entrance.`);
                            }}
                            className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-605 hover:text-white dark:bg-emerald-900/10 dark:text-emerald-400 rounded-lg transition-all font-mono"
                            title="Simulate Completed Offload"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setActiveTab("manifest");
                            setSelectedBookingId(booking.id);
                          }}
                          className="p-2.5 bg-slate-10s text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 rounded-lg transition-all"
                          title="Generate Freight manifest Slip"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm("Are you sure you want to retract and cancel this logistical dispatch?")) {
                              onCancelBooking(booking.id);
                              handleSimulateAlert(booking.id, `Retracted shipment reservation ${booking.id} successfully.`);
                            }
                          }}
                          className="p-2.5 bg-red-50 text-red-650 hover:bg-red-500 hover:text-white dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-550 rounded-lg transition-all"
                          title="Cancel Booking"
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="text-xs text-slate-400 bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800 flex gap-1.5 items-center">
              <AlertCircle className="w-4 h-4 text-royal-blue shrink-0 animate-pulse" />
              <span>Use the custom action icons on the right side of any row to simulate live updates: dispatching trucks, highways, delivering, and printing.</span>
            </div>
          </div>
        ) : (
          /* Printable Bill of Lading Slip view */
          selectedBooking ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Displaying details for:</span>
                  <select
                    value={selectedBookingId || ""}
                    onChange={(e) => setSelectedBookingId(e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono font-bold font-semibold focus:outline-none"
                  >
                    {bookingsList.map((b) => (
                      <option key={b.id} value={b.id}>{b.id}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handlePrintSlip}
                  className="px-4.5 py-2 bg-slate-900 border border-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Carrier Slip (Window)
                </button>
              </div>

              {/* PDF Container Mock */}
              <div id="printable-manifest" className="bg-white text-slate-900 border-[10px] border-double border-slate-300 p-6 sm:p-8 space-y-6 rounded-2xl max-w-xl mx-auto font-sans shadow-xl">
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5">
                  <div>
                    <h5 className="font-extrabold text-lg uppercase tracking-tight">Cosset Logistics Inc.</h5>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500">CANADIAN CARRIER SYSTEM</span>
                    <span className="text-[9px] block text-slate-500 mt-1">HQ Office: Winnipeg, MB, Canada | info@cossetlogistics.com</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold bg-slate-900 text-white px-3 py-1 uppercase tracking-wider rounded">
                      BILL OF LADING
                    </span>
                    <span className="text-[10px] font-mono block mt-2 text-slate-600">ID Ref: {selectedBooking.id}</span>
                  </div>
                </div>

                {/* Sender Receiver Coordinates */}
                <div className="grid grid-cols-2 gap-4 text-[11px] leading-snug border-b border-slate-200 pb-4">
                  <div>
                    <span className="font-bold text-slate-600 uppercase block mb-1 font-mono text-[9px]">SHIP FROM (ORIGIN):</span>
                    <span className="font-bold block">Cosset Logistics Depot</span>
                    <span className="text-slate-500">{selectedBooking.pickup}</span>
                    <span className="text-slate-500 mt-1 block">Canada Interprovincial Network</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-600 uppercase block mb-1 font-mono text-[9px]">SHIP TO (CONSIGNEE):</span>
                    <span className="font-bold block">Guest Customer Base Residence</span>
                    <span className="text-slate-500">{selectedBooking.destination}</span>
                    <span className="text-[9px] text-slate-500 mt-1 block">Carrier: Direct Highway Transport</span>
                  </div>
                </div>

                {/* Payload Manifest Tables */}
                <div className="text-[11px]">
                  <span className="font-bold text-slate-600 uppercase block mb-2 font-mono text-[9px]">CARRIER ROUTE SUMMARY AND INVENTORY DESCRIPTION:</span>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 font-bold uppercase text-slate-500 text-[8.5px] font-mono">
                        <th className="py-2">Svc Classification</th>
                        <th className="py-2">Cargo Units Sizing</th>
                        <th className="py-2">Calculated Miles</th>
                        <th className="py-2 text-right">Freight Rate Charge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 font-bold uppercase">{selectedBooking.serviceType}</td>
                        <td className="py-2.5">{selectedBooking.itemsCount} standard load items</td>
                        <td className="py-2.5 font-mono">{selectedBooking.distance} km</td>
                        <td className="py-2.5 text-right font-mono font-bold">${selectedBooking.price.toFixed(2)} CAD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Digital Barcode Generator simulation */}
                <div className="flex flex-col items-center justify-center pt-4 border-t-2 border-slate-200 text-center space-y-1.5 select-none text-slate-900 font-mono">
                  {/* Pseudo Barcode Lines */}
                  <div className="flex h-12 w-48 justify-center gap-[1.5px] items-stretch">
                    {Array.from({ length: 35 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-black" 
                        style={{ width: `${(i % 5 === 0 || i % 7 === 0) ? "4px" : "1.5px"}` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-600">
                    *{selectedBooking.id}*
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-emerald-700 bg-emerald-50 p-2.5 rounded-lg font-semibold">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Freight fully insured, documented and compliant with Canada's Transport Act requirements. Copy filed in Central Ledger Winnipeg.</span>
                </div>
              </div>
            </div>
          ) : (
             <div className="py-12 text-center text-slate-450 text-xs">
               Select an active shipment from your list to review printable slips.
             </div>
          )
        )
      )}
    </div>
  );
}
