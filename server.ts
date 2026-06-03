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
Your home office is in Winnipeg, Manitoba.

Company details:
- Name: Cosset Logistics
- Phone: +1 (431) 373-5054
- Email: info@cossetlogistics.com
- Major Hubs: Winnipeg, Toronto, Calgary, Edmonton, Vancouver, Ottawa, Regina, Saskatoon.
- Services Offered:
  1. Moving Services: Residential Moving, Apartment Relocation, Office Moving, Packing Assistance.
  2. Delivery Services: Same-Day Delivery, Scheduled Delivery, E-commerce Delivery, Commercial Deliveries.
  3. Hauling Services: Furniture Removal, Construction Debris Removal, Appliance Removal, Junk Hauling.

Pricing Guidelines (Estimates):
- Distance fee: Roughly $2.50 per kilometer across Canada.
- Minimum Charges:
  * Moving: $150 minimum (includes 2 movers).
  * Deliveries: $35 minimum.
  * Hauling & Junk Removal: $80 minimum.

Tone & Style:
- Extremely professional, reliable, modern, and warm.
- Keep replies relatively concise, scannable, and helpful. Use bullet points for options.
- If they ask for quotes, encourage them to use our interactive Live Quote Calculator on the website, or provide a rough calculation.
- Be supportive of moving logistics, packing tips, or booking confirmations.
- NEVER invent a tracking number. If they ask about tracking, say they can use the tracking screen with their code (e.g., CS-10543, CS-98421, or any code starting with CS-).`;

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

    if (lastUserMessage.toLowerCase().includes("quote") || lastUserMessage.toLowerCase().includes("cost")) {
      simulatedReply = "I can certainly give you a rough estimate! Our moving services start at a base rate of **$150** (which includes 2 professional crew members), deliveries start at **$35**, and hauling services start at **$80**. The precise cost depends on distance ($2.50/km) and number of items. \n\nI highly recommend using our **Live Quote Calculator** right here on the homepage for an instant, real-time calculation and booking!";
    } else if (lastUserMessage.toLowerCase().includes("track") || lastUserMessage.toLowerCase().includes("where is")) {
      simulatedReply = "To track a shipment, please enter your tracking code starting with **CS-** (e.g., **CS-98421** or **CS-10543**) in the tracking dashboard below! You will be able to see the live truck route, current city, and estimated delivery status in real-time.";
    } else if (lastUserMessage.toLowerCase().includes("contact") || lastUserMessage.toLowerCase().includes("phone") || lastUserMessage.toLowerCase().includes("email")) {
      simulatedReply = "You can contact Cosset Logistics anytime!\n\n- 📞 Phone: **+1 (431) 373-5054**\n- ✉️ Email: **info@cossetlogistics.com**\n- 📍 Main Office: **Winnipeg, Manitoba, Canada**\n\nOur customer desk is active 24/7 to support your logistics, moving, or hauling needs.";
    } else {
      simulatedReply = "Hello! I am **Cosset AI**, your logistics assistant. Welcome to Cosset Logistics. \n\nHow can I assist you today? I can help with:\n\n- 📦 Relocating your home or office\n- 🚚 Same-Day or scheduled dispatch across Canada\n- 🪵 Construction hauling or appliance removal\n- 📍 Service service coverage updates\n\nFeel free to ask a question, or use our **Live Quote Calculator** for an instant estimate!";
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
