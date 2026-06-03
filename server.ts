import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with lazy check
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize GoogleGenAI with key:", err);
      }
    }
  }
  return aiClient;
}

// System prompt for Cosset Logistics AI Assistant
const SYSTEM_INSTRUCTION = `You are "Cosset AI", the premium intelligent customer agent for Cosset Logistics - Canada's leading tech-first logistics, moving, delivery, and hauling company.
Your home office and central dispatch is in Winnipeg, Manitoba, serving all of Canada from coast to coast.

Company Details:
- Name: Cosset Logistics
- Phone: +1 (431) 373-5054
- Email: info@cossetlogistics.com
- Website: www.cossetlogistics.com
- Central Hub: Winnipeg, MB
- Major Transit Hubs: Winnipeg, Toronto, Calgary, Edmonton, Vancouver, Ottawa, Regina, Saskatoon.

Operational Services & Detailed Processes:

1. THE RESIDENTIAL & OFFICE MOVING PROCESS:
   - Phase 1: Inquiry & Accurate Distance Estimation
     We analyze custom cargo criteria using our online high-precision Haversine coordinate formula which measures direct routes between any Canadian pickup and dropoff coordinates. The standard transit rate is $2.50 per kilometer.
   - Phase 2: Booking & Capacity Planning
     Secured with zero deposit. A Winnipeg dispatch officer reviews specific requirements, ensuring optimal truck size (from standard box trucks to 53-foot freight rigs) and correct crew count (moving base rate starts at $150 and includes 2 highly-trained professionals).
   - Phase 3: Packing & Preparation
     Full or partial packing services. We use premium double-walled corrugated boxes, shock-absorbing clean bubble wraps, scratch-preventative stretch film, and custom heavy-duty wood framing for premium furniture or high-end antiques. Items are labeled meticulously for modular offloading.
   - Phase 4: Dispatch, Protection & Loading
     On moving day, our team runs clean-floor runners to preserve hardwoods and carpets. We drape all large furniture in clean, thick microfiber moving blankets, binding them securely with heavy-duty bands. We utilize hydraulic lift gates and heavy-duty industrial dollies for safe, secure truck loading.
   - Phase 5: Long-Haul Transit & GPS Synchronization
     Fleet trucks are assigned official tracking codes starting with "CS-" (e.g., CS-10543, CS-98421, CS-20412). Freight paths are continuously monitored by Winnipeg desk dispatchers, with live status coordinates synchronized onto client dashboards.
   - Phase 6: Unloading, Basic Assembly & Final Sign-off
     Upon arrival, we position all boxes and furniture directly into customer-designated rooms. We assemble beds, tables, and desks that were disassembled at origin, clear all left-over packing debris, and conduct a final walkthrough with the client to verify absolute satisfaction before paperless sign-off.

2. THE HEAVY HAULING & JUNK DISPOSAL PROCESS:
   - Phase 1: Heavy Waste Evaluation
     Hauling rates start at a minimum of $80. Clients specify the debris or items to clear (broken concrete, drywall cutoffs, scrap structural metals, old refrigerators, massive washers, and household junk).
   - Phase 2: Heavy Rig Dispatch & Loading
     We dispatch heavy-duty flatbed trailers or high-volume open-box trucks equipped with safety winches and professional lift-straps. Our background-checked crew handles all structural lifts safely so clients never lift a finger.
   - Phase 3: Material Sorting & Eco-Friendly Salvaging
     At Cosset, environmental sustainability is a core commitment. Every hauling load is brought to our sorting depots where metals, electronics, and recyclable lumbers are separated. We salvage metals and recycle usable plastics at local Winnipeg and regional eco-recycling stations, reducing landfill loads. Residual waste is discarded solely at certified municipal environmental landfill zones. We strictly prohibit illegal dumping.
   - Phase 4: Clean Sweep & Area Handover
     After loading all hauled scrap, we sweep the concrete, soil, or driveway area to ensure the zone is entirely free of nails, glass, and residual clutter, presenting a safe, clean space back to the client.

3. LOGISTICS, EXPRESS CHANNELS & E-COMMERCE DELIVERIES:
   - Same-Day & Scheduled Express: Delivering fragile parcels or mission-critical corporate documents directly across metro regions starting at $35.
   - E-Commerce Integration: Web shops synchronizing directly with our shipping matrix API to generate instantaneous flat-rate quotes and automated scheduling during checkouts.
   - Supply Chain & B2B Hauling: Dedicated, contract-grade regular freight shipments between industrial warehouses and Canadian distribution networks.

Guidelines for Conversing with Customers:
- Extremely professional, reliable, informative, modern, and warm. Avoid dry, low-quality automated responses.
- Detail the actual step-by-step processes above to answer questions thoroughly. Make clients feel extremely secure about how Cosset handles their items.
- If they ask for quotes, encourage them to use our interactive Live Quote Calculator on the homepage, or do a quick estimate if they specify distance and service type.
- NEVER invent a tracking number. If they ask to track, explain that they can enter their code starting with "CS-" directly into our Tracking Dashboard on the web app for live real-time GPS tracking.
- Highlight our $10 Million Liability & Cargo Indemnity Protection Plan for complete peace of mind.`;

// API routes
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  // Formatting messages for the Gemini SDK
  // The SDK expects a search prompt or conversational contents
  const parsedContents = messages.map(msg => ({
    role: msg.role === "assistant" ? "model" as const : "user" as const,
    parts: [{ text: msg.content }]
  }));

  const client = getGeminiClient();

  if (!client) {
    // If API Key is missing or default, generate a smart, simulated response
    const lastUserMessage = messages[messages.length - 1]?.content || "Hello";
    let simulatedReply = "";
    const msgLower = lastUserMessage.toLowerCase();

    if (msgLower.includes("process") && (msgLower.includes("move") || msgLower.includes("moving") || msgLower.includes("relocat"))) {
      simulatedReply = `### Cosset 6-Phase Professional Moving Process 📦

At Cosset Logistics, we coordinate residential and corporate moves with precision. Here is our exact process:

1. **Inquiry & Distance Estimation (Phase 1):** We analyze your inventory criteria and use our precise **Haversine coordinate system** to calculate actual transit distances from hub to destination with flat-rate transparent fees ($2.50/km).
2. **Booking & Rig Planning (Phase 2):** Your booking is confirmed with **$0 deposit**. Winnipeg dispatch designates a correctly sized truck (from local box trucks to 53ft highway carriers) and maps your professional crew.
3. **Meticulous Packing (Phase 3):** We pack your items using premium double-walled corrugated boxes, shock-absorbent bubble wraps, heavy stretch film, and custom wood frames for fragile antiques.
4. **Loading & Surface Protection (Phase 4):** On moving day, we lay out clean floor runners. Large furniture is daped in pristine microfiber blankets. Everything is loaded safely using advanced hydraulic lift gates.
5. **Real-time Long-Haul GPS (Phase 5):** Your shipment is labeled with a tracking code starting with **CS-** (e.g., **CS-98421** or **CS-10543**). You can view the truck routing live on our tracking screen.
6. **Room Setup & Furniture Assembly (Phase 6):** At your destination, we offload items in room-by-room slots, assemble standard bed frames and desks, clear all waste materials, and perform a live walkthrough before final sign-off.

Would you like to calculate a free estimate or check out our booking options?`;
    } else if (msgLower.includes("process") && (msgLower.includes("haul") || msgLower.includes("debris") || msgLower.includes("junk") || msgLower.includes("appliance"))) {
      simulatedReply = `### Cosset 4-Phase Heavy Hauling & Eco-Friendly Disposal Process 🪵

We handle massive concrete debris, junk, retired construction supplies, and appliance extractions safely. Here is how we do it:

1. **Heavy Waste Evaluation (Phase 1):** Hauling starts at an $80 minimum. You list the items (brick, drywall, heavy structural steel, refrigerators, washing machines), and we confirm dispatch.
2. **Heavy-Duty Rig Dispatch (Phase 2):** We send heavy flatbed trailers or high-volume open-box vehicles armed with professional winches and lifting straps. Our background-checked team completes all manual lifts.
3. **Certified Eco-Sorting Depot (Phase 3):** To reduce landfill loads, we bring the haul to our dedicated sorting yards. Scrap metals, functional plastics, and timbers are salvaged and brought to Winnipeg recycling centers. Residual waste is officially disposed of only at authorized municipal landfills.
4. **Final Site Sweep (Phase 4):** Once the cargo is securely loaded, our crew sweeps the hauling ground clean, leaving your driveway or property immediately occupancy-ready.

How can we assist you with hauling or site cleanups today?`;
    } else if (msgLower.includes("process") || msgLower.includes("logistics") || msgLower.includes("delivery") || msgLower.includes("deliveries")) {
      simulatedReply = `### Cosset Logistics & Delivery Infrastructure 🚚

We operate Canada's master high-tech courier network from our primary hub in Winnipeg, Manitoba.

- **Same-Day & Scheduled Express:** Dynamic courier drops across major metro grids (Winnipeg, Toronto, Calgary, Edmonton, Vancouver, Ottawa, Regina, Saskatoon) starting at a low $35 flat rate.
- **E-Commerce API Integrations:** Auto-calculating distance matrices and delivery routes at e-commerce checkouts for live flat-rates.
- **Integrated Storage & Cargo Insurance:** Backed by our premium **$10 Million General Liability and Cargo Indemnity Plan** for ultimate freight security.
- **24/7 Dispatch Control:** Every freight line is continuously logged and guided by Winnipeg dispatch leaders to guarantee on-time arrival.

Can I assist you with standard courier deliveries, corporate freight, or API configurations?`;
    } else if (msgLower.includes("quote") || msgLower.includes("cost") || msgLower.includes("price") || msgLower.includes("pricing") || msgLower.includes("estimate")) {
      simulatedReply = `Cosset Logistics operates on highly clear, transparent pricing grids with **zero hidden surcharges**:

- 📦 **Residential/Office Moving:** Starts at **$150** flat-rate minimum (includes 2 professional movers).
- 🚚 **Local Metro Deliveries of fragile freight/parcels:** Starts at **$35** flat-rate minimum.
- 🪵 **Heavy Hauling & Construction Disposal:** Starts at **$80** flat-rate minimum.
- 📍 **Inter-Hub Shipping Rate:** Calculated flatly at **$2.50 per kilometer**.

You can try out our **Live Quote Calculator** on the home page for real-time rates and live route scheduling!`;
    } else if (msgLower.includes("track") || msgLower.includes("where is")) {
      simulatedReply = "To track a shipment, please enter your tracking code starting with **CS-** (e.g., **CS-98421** or **CS-10543**) in the tracking dashboard below! You will be able to see the live truck route, current city, and estimated delivery status in real-time.";
    } else if (msgLower.includes("contact") || msgLower.includes("phone") || msgLower.includes("email") || msgLower.includes("help") || msgLower.includes("support")) {
      simulatedReply = "You can contact Cosset Logistics anytime!\n\n- 📞 Phone: **+1 (431) 373-5054**\n- ✉️ Email: **info@cossetlogistics.com**\n- 📍 Main Office Support: **Winnipeg, Manitoba, Canada**\n\nOur customer desk is active 24/7 to support your logistics, moving, or hauling needs.";
    } else {
      simulatedReply = "Hello! I am **Cosset AI**, your professional logistics assistant. Welcome to Cosset Logistics.\n\nHow can I help you manage your logistics today? I can guide you through our exact, secure processes for:\n\n- 📦 **Residential or Office Moving** (Meticulous 6-Phase process with full packing/blanket wrapping)\n- 🪵 **Heavy Hauling & Disposal** (Eco-sorting, metal salvage, and certified grounds cleaning)\n- 🚚 **E-Commerce & Same-Day Logistics** (Automated APIs, courier drops, and regional hub transits)\n- 📍 **Instant Cost Quotes** via our Flat-Rate calculator ($2.50/km distance matrix)\n\nWhat would you like to know more about?";
    }

    return res.json({
      content: simulatedReply,
      isDemo: true
    });
  }

  try {
    const lastMsgContent = messages[messages.length - 1]?.content || "";
    
    // We pass the conversation context as contents
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: parsedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return res.json({
      content: response.text || "I was unable to formulate a response. Please reach out to info@cossetlogistics.com or call +1 (431) 373-5054.",
      isDemo: false
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ 
      error: "Error from AI core", 
      message: error.message || String(error)
    });
  }
});

// Seed tracking data
const TRACKING_DATA: Record<string, any> = {
  "CS-98421": {
    id: "CS-98421",
    pickup: "Calgary, AB",
    destination: "Winnipeg, MB",
    serviceType: "moving",
    status: "in_transit",
    currentCity: "Regina, SK",
    distance: 1200,
    price: 3100,
    itemsCount: 45,
    date: "June 2, 2026",
    progress: 65,
    timeline: [
      { status: "Order Received", description: "Booking confirmed and loaded into scheduling matrix.", time: "May 30, 09:12 AM", completed: true },
      { status: "Dispatched", description: "Assigned team and container designated.", time: "June 1, 08:30 AM", completed: true },
      { status: "In Transit", description: "En route via Trans-Canada Hwy. Currently approaching Regina hub.", time: "June 1, 04:15 PM", completed: true },
      { status: "Out for Delivery", description: "Dispatch from local Winnipeg transfer yard.", time: "June 2, Expected 10:00 AM", completed: false },
      { status: "Successful Delivery", description: "Offloaded, unpacked, and verified at customer residence.", time: "June 2, Expected 02:00 PM", completed: false },
    ]
  },
  "CS-10543": {
    id: "CS-10543",
    pickup: "Toronto, ON",
    destination: "Ottawa, ON",
    serviceType: "delivery",
    status: "dispatched",
    currentCity: "Scarborough, ON",
    distance: 450,
    price: 1125,
    itemsCount: 8,
    date: "June 3, 2026",
    progress: 25,
    timeline: [
      { status: "Order Received", description: "Commercial parcel pickup confirmed.", time: "June 1, 07:05 AM", completed: true },
      { status: "Dispatched", description: "Loaded onto local box truck for Ottawa direct haul.", time: "June 1, 11:45 AM", completed: true },
      { status: "In Transit", description: "En route via Hwy 7.", time: "June 2, Expected", completed: false },
      { status: "Out for Delivery", description: "Ottawa rapid final mile delivery courier.", time: "June 2, Expected", completed: false },
      { status: "Successful Delivery", description: "Recipient signed off.", time: "June 3, Expected", completed: false },
    ]
  },
  "CS-20412": {
    id: "CS-20412",
    pickup: "Vancouver, BC",
    destination: "Edmonton, AB",
    serviceType: "hauling",
    status: "delivered",
    currentCity: "Edmonton, AB",
    distance: 1160,
    price: 2900,
    itemsCount: 15,
    date: "May 28, 2026",
    progress: 100,
    timeline: [
      { status: "Order Received", description: "Large heavy machinery junk and furniture haul. Verified logistics requirements.", time: "May 25, 10:00 AM", completed: true },
      { status: "Dispatched", description: "Heavy flatbed trailer assigned and dispatched.", time: "May 26, 06:15 AM", completed: true },
      { status: "In Transit", description: "Cleared Rocky Mountain routes successfully.", time: "May 27, 02:30 PM", completed: true },
      { status: "Out for Delivery", description: "Arrival in Edmonton regional sorting depot.", time: "May 28, 08:00 AM", completed: true },
      { status: "Successful Delivery", description: "Disposed and recycled of construct debris and items. Complete sign-off.", time: "May 28, 01:45 PM", completed: true },
    ]
  }
};

app.post("/api/tracking", (req, res) => {
  const { trackingId } = req.body;
  if (!trackingId) {
    return res.status(400).json({ error: "Tracking ID is required" });
  }

  const id = trackingId.trim().toUpperCase();
  const trackingData = TRACKING_DATA[id];

  if (!trackingData) {
    // Generate a random-looking but persistent-for-session mock tracking structure if users type their own
    // to give them a rich experience
    const randomProgress = Math.floor(Math.random() * 50) + 20; // 20-70%
    return res.json({
      id: id,
      pickup: "Winnipeg, MB",
      destination: "Toronto, ON",
      serviceType: "delivery",
      status: "in_transit",
      currentCity: "Thunder Bay, ON",
      distance: 1300,
      price: Math.floor(1300 * 2.5),
      itemsCount: 5,
      date: "June 4, 2026",
      progress: randomProgress,
      isGenerated: true,
      timeline: [
        { status: "Order Received", description: "Custom shipment logged.", time: "June 1, 09:00 AM", completed: true },
        { status: "Dispatched", description: "Local driver dispatched.", time: "June 1, 01:00 PM", completed: true },
        { status: "In Transit", description: "Currently moving through highway grids.", time: "June 1, 09:30 PM", completed: true },
        { status: "Out for Delivery", description: "Transit in progress.", time: "Expected June 3", completed: false },
        { status: "Successful Delivery", description: "Delivering to your doorstep.", time: "Expected June 4", completed: false },
      ]
    });
  }

  return res.json(trackingData);
});

// Handle serving the React + Vite frontend
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cosset Logistics Server running on http://localhost:${PORT}`);
  });
}

startServer();
