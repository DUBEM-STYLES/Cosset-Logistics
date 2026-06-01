export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  image: string;
  text: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "moving" | "fleet" | "hauling" | "team";
  image: string;
  description: string;
}

export interface QuoteRequest {
  pickupAddress: string;
  deliveryAddress: string;
  serviceType: "moving" | "delivery" | "hauling";
  distance: number; // in km
  itemsCount: number;
  date: string;
}

export interface Booking {
  id: string;
  customerName: string;
  pickup: string;
  destination: string;
  serviceType: string;
  distance: number;
  itemsCount: number;
  date: string;
  price: number;
  status: "pending" | "dispatched" | "in_transit" | "delivered";
  trackingId: string;
}

export interface TrackingDetails {
  id: string;
  pickup: string;
  destination: string;
  serviceType: string;
  status: "pending" | "dispatched" | "in_transit" | "delivered";
  currentCity: string;
  distance: number;
  price: number;
  itemsCount: number;
  date: string;
  progress: number;
  isGenerated?: boolean;
  timeline: {
    status: string;
    description: string;
    time: string;
    completed: boolean;
  }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

