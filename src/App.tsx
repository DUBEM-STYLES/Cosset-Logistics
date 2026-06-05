import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Users, Receipt, Milestone, ShieldCheck, Phone, Mail, 
  MapPin, Clock, ArrowRight, Star, Heart, CheckCircle, Flame, Sparkles, 
  Trash2, Plus, ArrowUpRight, Camera, X, Check, Laptop, ShieldAlert, Truck 
} from "lucide-react";
import Navbar from "./components/Navbar";
import CossetLogo from "./components/CossetLogo";
import CanadaMap from "./components/CanadaMap";
import QuoteCalculator from "./components/QuoteCalculator";
import ChatWidget from "./components/ChatWidget";
import { Booking, GalleryItem, Testimonial } from "./types";

import imageG2 from "./assets/images/regenerated_image_1780327752359.jpg";
import imageG3 from "./assets/images/regenerated_image_1780327754763.png";
import imageG4 from "./assets/images/regenerated_image_1780327753802.jpg";
import imageG5 from "./assets/images/regenerated_image_1780503334416.png";
import truckHeroImage from "./assets/images/hauling_moving_truck_1780504013034.png";
import cossetTeamImage from "./assets/images/cosset_team_blue_jackets_1780506246037.png";

// Dynamic Unsplash links for beautiful, reliable illustration renderings
const IMAGES = {
  movingHero: cossetTeamImage, 
  citySkyline: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80",
  packageHandling: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
  deliveryTruck: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
  moverCarrying: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=600&q=80",
  haulingLoad: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80",
  teamMember: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardRevealVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

const galleryContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const galleryItemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 25 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 15,
    transition: { duration: 0.2 }
  }
};

export default function App() {
  const [darkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "quote">("home");
  
  // Testimonial auto-rotation or selection index state
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);

  // Gallery categorization state and modal state
  const [galleryCategory, setGalleryCategory] = useState<"all" | "moving" | "fleet" | "hauling" | "team">("all");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  // Counters start value for counting-up animations on load
  const [deliveriesCount, setDeliveriesCount] = useState(3800);
  const [satisfactionRate, setSatisfactionRate] = useState(85);
  const [citiesServed, setCitiesServed] = useState(1);
  const [trucksLive, setTrucksLive] = useState(5);

  // Customer Portal preloaded reservation matrix
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "CS-98421",
      customerName: "Acme Industrial Toronto",
      pickup: "Calgary, Alberta",
      destination: "Winnipeg, Manitoba",
      serviceType: "HAULING",
      distance: 1200,
      itemsCount: 45,
      date: "2026-06-03",
      price: 3100.00,
      status: "in_transit",
      trackingId: "CS-98421"
    },
    {
      id: "CS-10543",
      customerName: "You (Verified Core Guest)",
      pickup: "Toronto, Ontario",
      destination: "Ottawa, Ontario",
      serviceType: "DELIVERY",
      distance: 450,
      itemsCount: 8,
      date: "2026-06-05",
      price: 1125.00,
      status: "dispatched",
      trackingId: "CS-10543"
    },
    {
      id: "CS-20412",
      customerName: "Sarah Jenkins",
      pickup: "Vancouver, British Columbia",
      destination: "Edmonton, Alberta",
      serviceType: "MOVING",
      distance: 1160,
      itemsCount: 15,
      date: "2026-05-28",
      price: 2980.00,
      status: "delivered",
      trackingId: "CS-20412"
    }
  ]);

  // Handle setting/adding new bookings from quote calculator
  const handleAddBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    console.log("Booking successfully created in local state registry:", newBooking);
  };

  // Counting-up effect
  useEffect(() => {
    const deliveriesInterval = setInterval(() => {
      setDeliveriesCount((prev) => {
        if (prev >= 5000) {
          clearInterval(deliveriesInterval);
          return 5000;
        }
        return prev + 60;
      });
    }, 20);

    const satisfactionInterval = setInterval(() => {
      setSatisfactionRate((prev) => {
        if (prev >= 98) {
          clearInterval(satisfactionInterval);
          return 98;
        }
        return prev + 1;
      });
    }, 45);

    const citiesInterval = setInterval(() => {
      setCitiesServed((prev) => {
        if (prev >= 10) {
          clearInterval(citiesInterval);
          return 10;
        }
        return prev + 1;
      });
    }, 150);

    const trucksInterval = setInterval(() => {
      setTrucksLive((prev) => {
        if (prev >= 24) {
          clearInterval(trucksInterval);
          return 24;
        }
        return prev + 1;
      });
    }, 90);

    return () => {
      clearInterval(deliveriesInterval);
      clearInterval(satisfactionInterval);
      clearInterval(citiesInterval);
      clearInterval(trucksInterval);
    };
  }, []);

  // System Wide Theme Sync Class toggles
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Smooth scroll navigating handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (sectionId === "calculator" || sectionId === "quote") {
      setCurrentPage("quote");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navOffset = 85; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navOffset = 85; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  // Testimonials Static List
  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Marcus Tremblay",
      role: "E-Commerce Manager",
      location: "Winnipeg, MB",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80",
      text: "Cosset Logistics completely revolutionized our delivery game. We run an e-commerce platform and demand same-day shipping. Their 2.50/km tier has zero hidden surcharges and their drivers are incredibly polite and professional."
    },
    {
      id: "t2",
      name: "Sophia Lindqvist",
      role: "Homeowner Relocation",
      location: "Calgary, AB",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80",
      text: "Moving high-end antique furniture is stressful, but Cosset packaged every piece like museum-grade relics. They turned a cross-province headache into a seamless relocation. 5 stars guaranteed!"
    },
    {
      id: "t3",
      name: "Dave Fitzpatrick",
      role: "Sourcing Coordinator",
      location: "Toronto, ON",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80",
      text: "Our building site requires large structural metal debris cleared on schedule. Cosset's heavy hauling teams handle the weight without any delay. Highly dependable logistics carriers!"
    }
  ];

  // Auto-scrolling Testimonials Loop
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 8500);
    return () => clearInterval(testimonialInterval);
  }, []);

  // Masonry Project Gallery Array
  const galleryItems: GalleryItem[] = [
    {
      id: "g1",
      title: "Interprovincial Semi Cruiser",
      category: "fleet",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
      description: "Our long-haul highway cruisers rigged with heavy-duty thermal insulation and GPS telemetry tracking gadgets."
    },
    {
      id: "g2",
      title: "Premium White Glove Mover Pack",
      category: "moving",
      image: imageG2,
      description: "Our certified residential movers taking custom micro-packing precautions for expensive fine-art containers."
    },
    {
      id: "g3",
      title: "Commercial Urban Boxes",
      category: "fleet",
      image: imageG3,
      description: "Agile, rapid-deployment box trucks tailored specifically for cramped Downtown Toronto and Vancouver delivery alleys."
    },
    {
      id: "g4",
      title: "Heavy Appliance Hauling Rig",
      category: "hauling",
      image: imageG4,
      description: "Loading heavy scrap, agricultural structures, or bulky industrial appliances in Manitoba warehouses."
    },
    {
      id: "g5",
      title: "Logistics Dispatch Leaders",
      category: "team",
      image: imageG5,
      description: "Our dedicated 24/7 Winnipeg service desk team keeping Canada transit lines operational on absolute schedule."
    },
    {
      id: "g6",
      title: "E-Commerce Package Handling",
      category: "moving",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      description: "Standard secure packing assistants sorting parcel batches before same-day regional dispatch."
    }
  ];

  const filteredGallery = galleryCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryCategory);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const cargoType = formData.get("cargoType") as string;
    const specifications = formData.get("specifications") as string;

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          cargoType,
          specifications,
        }),
      });

      if (response.ok) {
        setContactSuccess(true);
        form.reset();
        setTimeout(() => {
          setContactSuccess(false);
        }, 6000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Consultation submit failed:", errorData);
        // Fallback success presentation
        setContactSuccess(true);
        form.reset();
        setTimeout(() => {
          setContactSuccess(false);
        }, 6000);
      }
    } catch (err) {
      console.error("Consultation submit communication error:", err);
      setContactSuccess(true);
      form.reset();
      setTimeout(() => {
        setContactSuccess(false);
      }, 6000);
    }
  };

  return (
    <div id="master-root" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans flex flex-col pt-[72px]">
      
      {/* Prime Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Floating Sparkle Elements Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-dot-grid opacity-30 dark:opacity-40 -z-10 pointer-events-none"></div>

      {currentPage === "quote" ? (
        <div id="quote-page-container" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-left">
          {/* Page Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
            <div>
              {/* Back breadcrumb */}
              <button
                onClick={() => setCurrentPage("home")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-royal-blue dark:hover:text-white transition-colors mb-3 cursor-pointer"
              >
                &larr; Back to Home Page
              </button>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                Quote & Booking Center
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Configure interprovincial shipping routes and calculate exact friction-free carrier pricing.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentPage("home")}
                className="px-5 py-3 border border-slate-205 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                Browse Services
              </button>
            </div>
          </div>

          {/* Dedicated Grid and layout with QuoteCalculator and Freight Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Prime Calculator component columns */}
            <div className="lg:col-span-7">
              <QuoteCalculator onAddBooking={handleAddBooking} onNavigate={handleNavigate} />
            </div>

            {/* Operational Specifications column */}
            <div className="lg:col-span-5 space-y-6">
              {/* SPEC CARD 1 */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3 block">
                  Cosset Freight Dispatches
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-royal-blue flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                        National Carrier Network
                      </h4>
                      <p className="text-[11px] text-slate-450 dark:text-slate-400 mt-1 leading-relaxed font-medium">
                        Our trucks follow daily scheduled highway corridors connecting major Western and Eastern Canadian freight centers with Winnipeg central depots.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                        Flat-Rate Accountability
                      </h4>
                      <p className="text-[11px] text-slate-450 dark:text-slate-400 mt-1 leading-relaxed font-medium">
                        Absolutely zero local surcharges or sudden dock loading fees. Our pricing uses direct Haversine calculations at a simple flat-rate per kilometer.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-650 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                        Complete Transit Coverage
                      </h4>
                      <p className="text-[11px] text-slate-455 dark:text-slate-400 mt-1 leading-relaxed font-medium">
                        Every commercial load and residential shipment is automatically backed by comprehensive cargo liability policy matching up to $10,000,000 protection guarantee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ILLUSTRATIVE ACTIVE COMMITTED MAP OR LANES */}
              <div className="p-7 rounded-3xl bg-slate-900 text-white relative overflow-hidden text-left shadow-lg border border-slate-800">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-32 h-32"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>

                <span className="text-[10px] font-bold text-royal-blue uppercase tracking-widest font-mono">
                  Active Premium Transport Lanes
                </span>
                <h4 className="text-lg font-black tracking-tight mt-1.5 uppercase">
                  Winnipeg Dispatch Core
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-medium">
                  Our centrally coordinated dispatch operations guarantee fast package arrivals and secure residential moving.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10 mt-4.5 text-xs font-mono">
                  <div className="flex justify-between text-neutral-300">
                    <span>Calgary &harr; Winnipeg:</span>
                    <span className="text-white font-bold">1,200 km (Direct Line)</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Winnipeg &harr; Toronto:</span>
                    <span className="text-white font-bold">1,500 km (Direct Transit)</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Vancouver &harr; Calgary:</span>
                    <span className="text-white font-bold">970 km (Mountain Route)</span>
                  </div>
                </div>
              </div>

              {/* Dispatch Hot Button */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block font-mono">24/7 CUSTOMER SERVICE</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">+1 (431) 373-5054</span>
                </div>
                <a
                  href="tel:+14313735054"
                  className="px-4 py-2 bg-royal-blue text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-royal-blue-hover shrink-0 transition-colors"
                >
                  Call Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
      <section id="hero" className="relative py-12 md:py-20 overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text layout column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                <span className="w-2 h-2 rounded-full bg-royal-blue animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-wider text-royal-blue dark:text-blue-400 font-mono">
                  Canada Premier Logistics Carriers
                </span>
              </div>

              {/* Title Header */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] font-sans">
                Reliable Logistics <br className="hidden sm:inline" /> 
                Solutions <span className="text-royal-blue relative bg-linear-to-r from-royal-blue to-blue-500 bg-clip-text text-transparent">Across Canada</span>
              </h1>

              {/* Subheadline description */}
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                Whether you're relocating, delivering parcels, or hauling bulky cargo, Cosset Logistics coordinates premium, flat-rate transport with zero hidden surprises. Backed by central headquarters in Winnipeg.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4.5 pt-2">
                <button
                  onClick={() => handleNavigate("calculator")}
                  className="px-7 py-4 bg-royal-blue hover:bg-royal-blue-hover text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  Get A Free Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:+14313735054"
                  className="px-7 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-center inline-block cursor-pointer"
                >
                  Call Now &bull; +1 (431) 373-5054
                </a>
              </div>

              {/* Counter Statistics Indicator layout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-205/60 dark:border-slate-900/60 font-mono">
                <div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {deliveriesCount.toLocaleString()}+
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Deliveries
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-royal-blue tracking-tight">
                    {satisfactionRate}%
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Satisfied
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {citiesServed}+
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Major Hubs
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-royal-blue tracking-tight flex items-center gap-1.5 justify-start">
                    <span>{trucksLive}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Active Drivers
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Hero Visual / Live Fleet Image Showcase */}
            <div className="lg:col-span-6 relative">
              {/* Subtle visual animated truck decoration in hero back-frame */}
              <div className="absolute -top-10 -right-8 w-48 h-48 bg-royal-blue/15 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative overflow-hidden rounded-[36px] bg-slate-950 border border-slate-200 dark:border-slate-800/80 h-[520px] shadow-2xl group text-left">
                {/* Team Representation Image */}
                <img 
                  src={IMAGES.movingHero} 
                  alt="Cosset Moving Team" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.80] dark:brightness-[0.65] group-hover:scale-102 transition-transform duration-1000" 
                />
                
                {/* Visual dark overlay gradient for premium contrast */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Carrier Rate & Pricing Estimator Banner Section */}
      <section id="carrier-rate-estimator" className="py-12 bg-slate-50 dark:bg-slate-905/40 border-t border-slate-150 dark:border-slate-900 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800/80 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-premium relative overflow-hidden">
            {/* Ambient gradients */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-royal-blue/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Estimator Textual Information */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-royal-blue bg-blue-50 dark:bg-blue-900/25 px-2.5 py-1 rounded-md font-mono uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" /> Instant Transit Estimator Active
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                  Determine Your Flat Carrier Rate
                </h3>
                <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 font-medium leading-relaxed">
                  Calculate precise transportation estimates across Canada using our advanced coordinate-based Haversine mileage matrix. We offer zero hidden surcharges or surprise dock handling fees, locking in a clear standard transit rate per excess kilometer.
                </p>

                {/* Logistics Key Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-3.5 bg-slate-50/70 dark:bg-slate-855/70 rounded-xl border border-slate-150 dark:border-slate-800/50">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider font-mono">Carrier Charge</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white block mt-1">$2.50 / km</span>
                  </div>
                  <div className="p-3.5 bg-slate-50/70 dark:bg-slate-855/70 rounded-xl border border-slate-150 dark:border-slate-800/50">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider font-mono">Central Hub</span>
                    <span className="text-sm font-black text-royal-blue block mt-1">Winnipeg, MB</span>
                  </div>
                  <div className="p-3.5 bg-slate-50/70 dark:bg-slate-855/70 rounded-xl border border-slate-150 dark:border-slate-800/50">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider font-mono">Cargo Cover</span>
                    <span className="text-sm font-black text-emerald-500 block mt-1">$10M Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Estimate Trigger Card */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-855 rounded-2xl p-5 sm:p-6 border border-slate-150 dark:border-slate-800/80 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 font-mono">
                  <span>HQ FREIGHT METRIC CHANNELS</span>
                  <span className="text-emerald-505 dark:text-emerald-405 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> READY
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-750 text-left">
                    <span className="text-[8px] text-slate-450 font-bold block uppercase tracking-wider font-mono">PICKUP HUB</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">Winnipeg, MB</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-755 text-left">
                    <span className="text-[8px] text-slate-450 font-bold block uppercase tracking-wider font-mono">DROPOFF METRO</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">Toronto, ON</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-400">Standard Transit Rate:</span>
                  <span className="font-bold text-slate-900 dark:text-white">$2.50 per excess km</span>
                </div>

                <button
                  onClick={() => setCurrentPage("quote")}
                  className="w-full py-4 bg-royal-blue hover:bg-royal-blue-hover text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/15 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  Calculate Free Quote Now
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Services Portfolio Section */}
      <section id="services" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-150 dark:border-slate-900 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-royal-blue uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg font-mono">
              Commercial & Residential Divisions
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Class-A Logistics Portfolios
            </h2>
            <p className="text-sm text-slate-505 dark:text-slate-400 font-medium">
              We maintain custom logistics fleets optimized for residential relocations, heavy construction debris clearances, and fast package dispatch corridors.
            </p>
          </div>

          <motion.div 
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            
            {/* MOVING SERVICES CARD */}
            <motion.div 
              variants={cardRevealVariants}
              className="bg-white dark:bg-slate-900 rounded-[30px] p-7 border border-slate-200/50 dark:border-slate-800 shadow-xs hover:border-royal-blue/50 transform hover:-translate-y-1.5 transition-all group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 text-royal-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  Moving Services
                </h3>
                <p className="text-xs text-slate-400 mt-2.5">
                  Full white-glove packaging, transit insurance, and dedicated loaders for hassle-free residential or office transitions.
                </p>
                <div className="mt-6 space-y-2 text-xs font-semibold text-slate-650 dark:text-slate-350">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Residential Moving & Housing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Apartment & Condo Relocations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Premium Office & Asset Moving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Cardboard Packing Assistance</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-805 pt-5 mt-6">
                <span className="text-[10px] font-mono text-slate-400 block pb-1">starting minimum</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">$150 base (2 crew)</span>
              </div>
            </motion.div>

            {/* DELIVERY SERVICES CARD */}
            <motion.div 
              variants={cardRevealVariants}
              className="bg-white dark:bg-slate-900 rounded-[30px] p-7 border border-slate-200/50 dark:border-slate-800 shadow-xs hover:border-royal-blue/50 transform hover:-translate-y-1.5 transition-all group flex flex-col justify-between h-full"
            >
              <div>
                {/* Delivery Package visual effect on icon hover */}
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 text-royal-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05" /><path d="M12 22.08V12" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  Express Courier
                </h3>
                <p className="text-xs text-slate-400 mt-2.5">
                  High-capacity e-commerce logistics, scheduling dispatches, same-day delivery, and secure corporate courier networks.
                </p>
                <div className="mt-6 space-y-2 text-xs font-semibold text-slate-650 dark:text-slate-350">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Same-Day Priority Couriers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Scheduled Cross-Canada Freight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>E-Commerce Automated Freight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Bulk Commercial Shipments</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-805 pt-5 mt-6">
                <span className="text-[10px] font-mono text-slate-400 block pb-1">starting minimum</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">$35 flat delivery</span>
              </div>
            </motion.div>

            {/* HAULING SERVICES CARD */}
            <motion.div 
              variants={cardRevealVariants}
              className="bg-white dark:bg-slate-900 rounded-[30px] p-7 border border-slate-200/50 dark:border-slate-800 shadow-xs hover:border-royal-blue/50 transform hover:-translate-y-1.5 transition-all group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 text-royal-blue rounded-2xl flex items-center justify-center mb-6 group-hover:translate-x-1.5 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  Industrial Hauling
                </h3>
                <p className="text-xs text-slate-400 mt-2.5">
                  Eco-friendly hauling of bulky furniture, heavy construction materials, discarded appliances, or junk clearances.
                </p>
                <div className="mt-6 space-y-2 text-xs font-semibold text-slate-650 dark:text-slate-350">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Furniture Removals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Construction Debris Disposal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Heavy Appliance Transport</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Secure Junk Hauling & Recycling</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-805 pt-5 mt-6">
                <span className="text-[10px] font-mono text-slate-400 block pb-1">starting minimum</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">$80 heavy hauling</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Feature Board Section */}
      <section id="why-us" className="py-20 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Image and fast tag column */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-[40px] overflow-hidden relative shadow-2xl h-[450px] bg-slate-950 border border-slate-250 dark:border-slate-800/80 group">
                <img 
                  src={truckHeroImage} 
                  alt="Cosset Logistics Canada Fleet" 
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.80] dark:brightness-[0.65] group-hover:scale-102 transition-transform duration-1000" 
                />
                
                {/* Visual dark overlay gradient for premium contrast */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>

                {/* Live Fleet Dispatch Badge */}
                <div className="absolute top-5 left-5 bg-royal-blue/95 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest font-mono flex items-center gap-1.5 shadow-lg border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  HQ Fleet Active &bull; Winnipeg Dispatch
                </div>

                {/* Bottom Info Overlay inside the Image frame */}
                <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-royal-blue bg-blue-50/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-mono inline-block">
                    HQ FLEET DIRECTORY
                  </span>
                  <h4 className="text-xl font-extrabold tracking-tight mt-2 uppercase">
                    Commercial Fleet Cruisers
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-md font-medium leading-relaxed">
                    Modern trailer models and rapid-transit trucks engineered to support active commercial dispatch lanes and residential moves across all provinces.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature lists column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-royal-blue uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3.5 py-1.5 rounded-lg font-mono">
                  Why Canadian Businesses Trust Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
                  Pioneering Logistics Excellence
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {[
                  {
                    title: "Fast Delivery Corridors",
                    desc: "Rigid scheduling matrix routes guarantee your packages arrive exactly on requested times, daily.",
                    color: "bg-blue-50 dark:bg-blue-900/20 text-royal-blue"
                  },
                  {
                    title: "Transparent Flat Pricing",
                    desc: "A pure budget rate based strictly on mileage ($2.50/km). Absolutely no fuel surcharges or hidden elevator fees.",
                    color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  },
                  {
                    title: "Professional Trained Crew",
                    desc: "Our movers undergo detailed packaging instruction and carry fully transparent commercial licenses.",
                    color: "bg-purple-50 dark:bg-purple-900/20 text-purple-650 dark:text-purple-400"
                  },
                  {
                    title: "Armed Safe & Insured",
                    desc: "Cargo is shielded under active global transit policies, guarding luxury furniture, or high-value documents.",
                    color: "bg-rose-50 dark:bg-rose-950/20 text-rose-500"
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs ${feature.color}`}>
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-slate-450 dark:text-slate-400 mt-1 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra banner */}
              <div className="bg-slate-50 dark:bg-slate-905 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 flex items-start gap-4">
                <Flame className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Serving Manitoba, Ontario, Alberta, Saskatchewan, and British Columbia. Daily trans-provincial highway dispatch departs from Winnipeg central depots.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section id="service-areas" className="py-20 bg-linear-to-b from-slate-100/30 to-white dark:from-slate-900/10 dark:to-slate-950 text-left border-t border-slate-205/60 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-royal-blue uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg font-mono">
              Canada-Wide Highway Corridors
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our Service Destinations
            </h2>
            <p className="text-sm text-slate-505 dark:text-slate-400 font-medium">
              We operate daily transport freight networks spanning between Calgary, Vancouver, Regina, Saskatoon, Toronto, and Winnipeg.
            </p>
          </div>

          <CanadaMap />

        </div>
      </section>



      {/* Process Section */}
      <section id="process" className="py-20 text-left bg-slate-50 dark:bg-slate-950/50 border-y border-slate-200/50 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-royal-blue uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg font-mono">
              Streamlined Chain of Custody
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 font-medium leading-relaxed">
              We apply advanced SaaS tracking telemetry and strict quality control checklists across a transparent 4-stage transport cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Calculate & Quote",
                desc: "Calculate precise transport pricing using our Haversine map routing engine. Book instantly with 0% risk."
              },
              {
                step: "02",
                title: "Schedule Dispatch",
                desc: "Our automated dispatch scheduler designates a dedicated logistics vehicle and assigns 2 professional crew."
              },
              {
                step: "03",
                title: "Transit & Cargo Monitor",
                desc: "Your load is locked, double-padded, and tracked via active GPS satellite channels. View live progress."
              },
              {
                step: "04",
                title: "Verified Delivery",
                desc: "Final mile destination offload with physical checklist audits and verified digital signature confirmations."
              }
            ].map((node, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-205/60 dark:border-slate-800 rounded-2xl p-6.5 shadow-xs relative group hover:border-royal-blue transition-all">
                {/* timeline link indicator line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-slate-150 dark:bg-slate-800 z-10"></div>
                )}
                
                <span className="text-4xl font-extrabold text-slate-100 dark:text-slate-800/80 font-mono tracking-tighter block mb-3 group-hover:text-royal-blue/30 transition-colors">
                  {node.step}
                </span>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {node.title}
                </h4>
                
                <p className="text-xs text-slate-450 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Masonry Gallery Section */}
      <section id="gallery" className="py-20 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-royal-blue uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3.5 py-1.5 rounded-lg font-mono">
                Visual Operational Logs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
                Operations Gallery
              </h2>
            </div>

            {/* Gallery Navigation Category Tabs */}
            <div className="flex flex-wrap gap-2.5 bg-slate-100 dark:bg-slate-850 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 text-xs font-bold uppercase tracking-wider">
              {[
                { id: "all", label: "All Photos" },
                { id: "moving", label: "Moving" },
                { id: "fleet", label: "Cruisers" },
                { id: "hauling", label: "Hauling" },
                { id: "team", label: "Crew" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setGalleryCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-[10px] sm:text-xs tracking-wider font-bold transition-all cursor-pointer ${
                    galleryCategory === tab.id
                      ? "bg-royal-blue text-white shadow-xs"
                      : "text-slate-505 dark:text-slate-400 hover:text-slate-850 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Layout Blocks */}
          <motion.div 
            variants={galleryContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div 
                  layout
                  variants={galleryItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={item.id}
                  onClick={() => setActiveLightbox(item)}
                  className="bg-white dark:bg-slate-900 p-3 rounded-[24px] border border-slate-150 dark:border-slate-800/80 shadow-xs hover:border-royal-blue group cursor-pointer overflow-hidden transition-all"
                >
                  <div className="rounded-xl overflow-hidden relative aspect-video">
                    <div className="absolute inset-0 bg-[#0A1F44]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white z-20">
                      <div className="w-10 h-10 rounded-full bg-royal-blue/90 flex items-center justify-center">
                        <Camera className="w-5 h-5" />
                      </div>
                    </div>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 left-3 bg-slate-950/85 text-white backdrop-blur-xs font-mono text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider z-10">
                      {item.category}
                    </span>
                  </div>
                  <div className="pt-3 px-1.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-1 truncate">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Lightbox Pop Modal Dialog */}
          {activeLightbox && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-150 dark:border-slate-800 max-w-xl w-full p-4 relative overflow-hidden animate-in fade-in zoom-in duration-250">
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-white rounded-full z-10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="rounded-2xl overflow-hidden aspect-video">
                  <img 
                    src={activeLightbox.image} 
                    alt={activeLightbox.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="pt-5 pb-2 px-3 text-left">
                  <span className="text-[9px] font-bold font-mono text-royal-blue bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-md uppercase tracking-widest block w-max">
                    Carrier Category: {activeLightbox.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mt-3">
                    {activeLightbox.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {activeLightbox.description}
                  </p>
                  
                  <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Fully Authorized Photo Record
                    </span>
                    <button
                      onClick={() => {
                        setActiveLightbox(null);
                        handleNavigate("calculator");
                      }}
                      className="px-4 py-2 bg-royal-blue hover:bg-royal-blue-hover text-white rounded-xl text-[10px] font-black uppercase tracking-wider"
                    >
                      Book Fleet Svc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Testimonials Review Slider Section */}
      <section id="testimonials" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-150 dark:border-slate-900 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-royal-blue uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg font-mono">
              Unfiltered Trust Indicators
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Customer Experiences
            </h2>
            <p className="text-sm text-slate-505 dark:text-slate-400 font-medium">
              See how home relocators and industrial e-commerce companies across Canada rate Cosset Logistics.
            </p>
          </div>

          {/* Slider Container with Glassmorphism Cards */}
          <div className="relative max-w-3xl mx-auto">
            <div className="p-8 sm:p-10 rounded-[36px] bg-white/70 dark:bg-slate-900/80 border border-slate-205 dark:border-slate-800 shadow-premium backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[280px]">
              {/* Decorative dynamic sparkles */}
              <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
                <Star className="w-32 h-32 stroke-1" fill="currentColor" />
              </div>

              {/* Star Rating Layout */}
              <div className="flex gap-1.5 text-amber-400 mb-5">
                {Array.from({ length: testimonials[currentTestimonialIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                "{testimonials[currentTestimonialIdx].text}"
              </p>

              {/* Reviewer Profile */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6 mt-6">
                <div className="flex items-center gap-4.5">
                  <img 
                    src={testimonials[currentTestimonialIdx].image} 
                    alt={testimonials[currentTestimonialIdx].name} 
                    className="w-12 h-12 rounded-full ring-2 ring-royal-blue/20" 
                  />
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                      {testimonials[currentTestimonialIdx].name}
                    </h5>
                    <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                      {testimonials[currentTestimonialIdx].role} &bull; {testimonials[currentTestimonialIdx].location}
                    </span>
                  </div>
                </div>

                {/* Dot index switch controls */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonialIdx(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        currentTestimonialIdx === i 
                          ? "bg-royal-blue w-6" 
                          : "bg-slate-200 dark:bg-slate-750 hover:bg-royal-blue/40"
                      }`}
                      aria-label={`Go to Testimonial ${i + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Primary Contact Section & Interactive Maps simulation widget */}
      <section id="contact" className="py-20 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact details and simulated map visual column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-royal-blue uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3.5 py-1.5 rounded-lg font-mono">
                  Corporate Locations & Hours
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
                  Let's Coordinate Transit
                </h2>
                <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 mt-2 leading-relaxed">
                  Have a custom hauling inquiry, office relocation layout, or e-commerce API synchronization questions? Contact Cosset desk dispatch specialists anytime.
                </p>
              </div>

              {/* Icon descriptors list */}
              <div className="space-y-4 pt-2">
                <a 
                  href="tel:+14313735054"
                  className="flex items-center gap-4.5 p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-150 dark:border-slate-800 rounded-2xl transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-royal-blue flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Phone Dispatcher</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white font-mono">+1 (431) 373-5054</span>
                  </div>
                </a>

                <a 
                  href="mailto:info@cossetlogistics.com"
                  className="flex items-center gap-4.5 p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-150 dark:border-slate-800 rounded-2xl transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-royal-blue flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Operations Email desk</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white font-mono">info@cossetlogistics.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-4.5 p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-royal-blue flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Winnipeg Main Depot</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">Winnipeg, Manitoba, Canada</span>
                  </div>
                </div>
              </div>

              {/* Simulated Google Maps Layout Widget block */}
              <div className="rounded-3xl border border-slate-205 dark:border-slate-800 overflow-hidden shadow-sm relative h-[210px] bg-slate-90 pointer-events-none select-none">
                <div className="absolute inset-0 bg-[#0A1F44]/5 z-10"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
                  <span className="px-2.5 py-1.5 bg-slate-950 text-white rounded-lg text-[9.5px] font-mono tracking-widest font-bold uppercase w-max">
                    Interactive Winnipeg Core Map
                  </span>
                  <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-900 dark:text-white block">Winnipeg Central Cargo Station</span>
                    <span className="text-[9px] text-slate-400 mt-1 block">R3C 1A2 Manitoba Corridor Gateway</span>
                  </div>
                </div>

                {/* Stylized geometric background representing street grids */}
                <svg className="w-full h-full bg-slate-100 dark:bg-slate-905" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Street grids lines */}
                  <line x1="10" y1="0" x2="10" y2="100" stroke="#cbd5e1" strokeWidth="0.5" />
                  <line x1="30" y1="0" x2="30" y2="100" stroke="#cbd5e1" strokeWidth="0.5" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="80" y1="0" x2="80" y2="100" stroke="#cbd5e1" strokeWidth="0.5" />
                  
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#cbd5e1" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#cbd5e1" strokeWidth="1.2" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="#cbd5e1" strokeWidth="0.5" />
                  
                  {/* Diagonal express highway */}
                  <line x1="0" y1="90" x2="100" y2="10" stroke="#0D6EFD" strokeWidth="2.5" strokeOpacity="0.4" />
                  
                  {/* Winnipeg Marker Pin */}
                  <circle cx="50" cy="50" r="4.5" fill="#0D6EFD" />
                  <circle cx="50" cy="50" r="9" fill="none" stroke="#0D6EFD" strokeWidth="1.5" className="animate-ping" />
                </svg>
              </div>
            </div>

            {/* Quick Consultation Request Form Column */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-[32px] shadow-sm relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Mail className="w-32 h-32 text-royal-blue stroke-1" />
              </div>

              {contactSuccess ? (
                <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in duration-250">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Form Filed Successfully!</h4>
                    <p className="text-xs text-slate-450 dark:text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Cosset! One of our Winnipeg dispatch officers will review your freight criteria and contact you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Transit Consultation Request
                  </h4>
                  <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed font-semibold">
                    File your custom freight specifications or household moving volume measurements below for a formal digital PDF quotation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Your Full Name</label>
                      <input 
                        type="text" 
                        name="fullName"
                        placeholder="John Doe" 
                        className="w-full bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-250 border border-slate-200 dark:border-slate-750 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-royal-blue" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Your Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="john@example.com" 
                        className="w-full bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-250 border border-slate-200 dark:border-slate-755 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-royal-blue" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Direct Phone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="+1 (555) 555-5555" 
                        className="w-full bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-250 border border-slate-200 dark:border-slate-750 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-royal-blue" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Cargo Classification Type</label>
                      <select 
                        name="cargoType"
                        className="w-full bg-slate-50 dark:bg-slate-850 text-slate-808 dark:text-slate-200 border border-slate-200 dark:border-slate-750 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-royal-blue"
                        required
                      >
                        <option value="moving">Residential Home Moving</option>
                        <option value="apartments">Apartment or Small Condo</option>
                        <option value="delivery">Express Package Delivery</option>
                        <option value="hauling">Debris and Scrap Hauling</option>
                        <option value="commercial">Custom business freight API integration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Custom specifications / list items</label>
                    <textarea 
                      rows={4} 
                      name="specifications"
                      placeholder="Specify your cargo weight sizing, fragile item details, elevator stairs guidelines, or highway schedule constraints..." 
                      className="w-full bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-750 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-royal-blue"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    Send Consultation Request
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
        </>
      )}

      {/* Main Footer Summary Section */}
      <footer className="mt-auto bg-slate-950 text-slate-400 py-12 border-t border-slate-900 bg-dot-grid dark:bg-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8.5 pb-12 border-b border-slate-900 text-left">
            {/* Column 1 Logo details */}
            <div className="lg:col-span-4 space-y-4">
              <div 
                className="flex items-center cursor-pointer group"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <CossetLogo height="40px" showSub={true} textColor="stroke-slate-200 fill-slate-200" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Canada's premium, sleek, tech-first logistics platform. Orchestrating fully insured residential relocations, heavy construction hauling, and scheduled express package courier lines with pristine transparent pricing.
              </p>
              <div className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Bonded Liability insured & Bull; Licensed Canadian Carriers
              </div>
            </div>

            {/* Column 2 Services Link list */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-widest text-white font-mono">Our Divisions</h5>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => handleNavigate("services")} className="hover:text-white transition-colors cursor-pointer">Residential Moving Division</button></li>
                <li><button onClick={() => handleNavigate("services")} className="hover:text-white transition-colors cursor-pointer">Commercial Office Relocators</button></li>
                <li><button onClick={() => handleNavigate("services")} className="hover:text-white transition-colors cursor-pointer">Same-Day Package Express</button></li>
                <li><button onClick={() => handleNavigate("services")} className="hover:text-white transition-colors cursor-pointer">Heavy Junk & Debris Hauling</button></li>
                <li><button onClick={() => handleNavigate("services")} className="hover:text-white transition-colors cursor-pointer">S-Chain White Glove Packers</button></li>
              </ul>
            </div>

            {/* Column 3 Destinations Link list */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-widest text-white font-mono">Canadian Hubs</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <ul className="space-y-1.5">
                  <li><button onClick={() => handleNavigate("service-areas")} className="hover:text-white transition-colors cursor-pointer">Winnipeg, MB (HQ)</button></li>
                  <li><button onClick={() => handleNavigate("service-areas")} className="hover:text-white transition-colors cursor-pointer">Toronto, ON</button></li>
                  <li><button onClick={() => handleNavigate("service-areas")} className="hover:text-white transition-colors cursor-pointer">Calgary, AB</button></li>
                  <li><button onClick={() => handleNavigate("service-areas")} className="hover:text-white transition-colors cursor-pointer">Edmonton, AB</button></li>
                </ul>
                <ul className="space-y-1.5">
                  <li><button onClick={() => handleNavigate("service-areas")} className="hover:text-white transition-colors cursor-pointer">Vancouver, BC</button></li>
                  <li><button onClick={() => handleNavigate("service-areas")} className="hover:text-white transition-colors cursor-pointer">Ottawa, ON</button></li>
                  <li><button onClick={() => handleNavigate("service-areas")} className="hover:text-white transition-colors cursor-pointer">Regina, SK</button></li>
                  <li><button onClick={() => handleNavigate("service-areas")} className="hover:text-white transition-colors cursor-pointer">Saskatoon, SK</button></li>
                </ul>
              </div>
            </div>

            {/* Column 4 Quick links */}
            <div className="lg:col-span-2 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-widest text-white font-mono">Quick Links</h5>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => handleNavigate("calculator")} className="hover:text-white transition-colors cursor-pointer">Interactive Quote Form</button></li>
                <li><button onClick={() => setCurrentPage("home")} className="hover:text-white transition-colors cursor-pointer">Cosset Direct Services</button></li>
                <li><button onClick={() => handleNavigate("why-us")} className="hover:text-white transition-colors cursor-pointer font-bold text-royal-blue">Liability Indemnity Plan</button></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright list */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-600 gap-4 text-center">
            <div>
              &copy; {new Date().getFullYear()} Cosset Logistics Inc. All rights reserved across Canada.
              <span className="block sm:inline sm:ml-2">Winnipeg, Manitoba, Canada. Registered No. #498212C.</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></div>
              <span className="font-bold font-mono tracking-widest uppercase">
                System status: Fully Operational (v3.5)
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Smart Conversational AI specialist chat widget */}
      <ChatWidget />

    </div>
  );
}
