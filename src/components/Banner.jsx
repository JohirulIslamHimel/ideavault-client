"use client";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    title: "Validate Your Next Big Startup Idea",
    desc: "Join a global community of forward-thinking innovators. Share your concepts, get real-world validation, and refine your vision collective intelligence.",
    bg: "from-blue-600 via-indigo-700 to-purple-800",
  },
  {
    title: "Collaborate with Elite Co-Founders",
    desc: "Great ideas need great teams. Discover trending concepts, provide high-value feedback, and connect with potential partners to build the future.",
    bg: "from-purple-700 via-pink-600 to-red-600",
  },
  {
    title: "Secure Value & Feedback Before Launch",
    desc: "Skip the guesswork. Put your problem statements and proposed solutions in front of a community hungry for market disruption.",
    bg: "from-cyan-600 via-teal-600 to-emerald-700",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-138 w-full overflow-hidden flex items-center justify-center text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-linear-to-tr ${slides[current].bg} flex flex-col items-center justify-center text-center p-6`}
        >
          {/* Overlay Grid for Unique UI look */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[30px_30px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none drop-shadow-md">
              {slides[current].title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90 font-light leading-relaxed">
              {slides[current].desc}
            </p>
            <Link
              href="/ideas"
              className="inline-flex items-center justify-center font-bold border-2 border-white px-8 py-3 rounded-xl bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 gap-2"
            >
              Explore Ideas <ArrowRight size={18} className="shrink-0" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
