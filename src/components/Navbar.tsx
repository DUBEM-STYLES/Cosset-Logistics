import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Truck, Phone, Moon, Sun, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import CossetLogo from "./CossetLogo";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ darkMode, setDarkMode, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "Why Us", id: "why-us" },
    { name: "Quote Calculator", id: "calculator" },
    { name: "Destinations", id: "service-areas" },
    { name: "Our Process", id: "process" },
    { name: "Tracking", id: "tracking" },
    { name: "Portal", id: "portal" },
    { name: "Contact", id: "contact" },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header id="nav-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => handleLinkClick("hero")}
            className="flex flex-col items-start cursor-pointer group transition-transform duration-200"
          >
            <CossetLogo height="38px" showSub={true} />
            <div className="hidden sm:flex items-center gap-1 text-[8px] text-emerald-600 dark:text-emerald-400 font-mono tracking-wider mt-1.5 ml-0.5">
              <ShieldCheck className="w-3 h-3 inline" /> 100% BONDED & LIABILITY INSURED
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-royal-blue dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Phone Quick-Call */}
            <a
              href="tel:+14313735040"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-royal-blue dark:hover:text-royal-blue transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-royal-blue">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs">+1 (431) 373-5040</span>
            </a>

            {/* Main CTA */}
            <button
              onClick={() => handleLinkClick("calculator")}
              className="px-5 py-2.5 text-sm font-medium text-white bg-royal-blue hover:bg-royal-blue-hover rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer font-sans"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-3 lg:hidden">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-850 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-royal-blue dark:hover:text-white"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-150 dark:border-slate-800 flex flex-col sm:flex-row gap-3 px-4">
                <a
                  href="tel:+14313735040"
                  className="flex items-center justify-center gap-2.5 px-4 py-3 border border-slate-250 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 font-mono text-sm"
                >
                  <Phone className="w-4 h-4 text-royal-blue" />
                  +1 (431) 373-5040
                </a>
                <button
                  onClick={() => handleLinkClick("calculator")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-royal-blue text-white font-medium rounded-xl text-sm"
                >
                  Get A Free Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
