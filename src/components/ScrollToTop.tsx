"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 left-10 w-14 h-14 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40 border border-white/20 z-[90] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
          role="button"
          aria-label="Back to Top"
        >
          <span className="material-symbols-rounded text-2xl group-hover:-translate-y-1 transition-transform">
            keyboard_double_arrow_up
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
