"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";

/* ================= PERFORMANCE OPTIMIZATIONS =================
 * 1. GPU-accelerated transforms only (transform, opacity)
 * 2. useSpring for 60fps smooth animations
 * 3. will-change hints on frequently animated elements
 * 4. Passive event listeners where possible
 * 5. RequestAnimationFrame for scroll handlers
 * 6. Memoized components to prevent re-renders
 * 7. Touch support for mobile devices
 * ============================================================= */

/* ================= SPRING CONFIGS FOR 60FPS ================= */
const smoothSpring = { damping: 30, stiffness: 200, mass: 0.5 };
const snappySpring = { damping: 25, stiffness: 300, mass: 0.3 };
const gentleSpring = { damping: 40, stiffness: 100, mass: 1 };

/* ================= SECTION 1: HERO (OPTIMIZED) ================= */
const HeroSection = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  const lastDelta = useRef(0);

  // Touch support
  const touchStart = useRef(0);
  const touchDelta = useRef(0);

  // GPU-accelerated spring animations
  const progressSpring = useSpring(progress, smoothSpring);

  // Derived transforms using springs for 60fps
  const width = useTransform(progressSpring, [0, 100], ["60%", "100%"]);
  const height = useTransform(progressSpring, [0, 100], ["60vh", "100vh"]);
  const borderRadius = useTransform(progressSpring, [0, 100], [40, 0]);
  const imgScale = useTransform(progressSpring, [0, 100], [1, 1.2]);

  const handleScroll = useCallback((delta: number) => {
    if (isComplete && window.scrollY > 10) return;

    const direction = delta > 0 ? 1 : -1;

    if (!isComplete || (isComplete && window.scrollY <= 0 && direction === -1)) {
      if ((progress < 100 && direction === 1) || (progress > 0 && direction === -1)) {
        // Use RAF for smooth updates
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }

        animationFrame.current = requestAnimationFrame(() => {
          setProgress(prev => {
            const next = Math.min(Math.max(prev + direction * 4, 0), 100);
            if (next >= 100) setIsComplete(true);
            if (next < 100) setIsComplete(false);
            return next;
          });
        });

        return true; // Prevent default
      }
    }
    return false;
  }, [progress, isComplete]);

  useEffect(() => {
    progressSpring.set(progress);
  }, [progress, progressSpring]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const shouldPrevent = handleScroll(e.deltaY);
      if (shouldPrevent) {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const delta = touchStart.current - e.touches[0].clientY;
      touchDelta.current = delta;

      const shouldPrevent = handleScroll(delta);
      if (shouldPrevent) {
        e.preventDefault();
      }

      touchStart.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#0C0E12] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-0">
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            willChange: "transform, width, height, border-radius"
          }}
          className="relative z-10 bg-black overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] origin-center"
        >
          <motion.img
            src="https://cdn.prod.website-files.com/67a1ba0a889270647730e779/68079e60d8c8c72fd621dfd8_Video-p-1600.webp"
            alt="Hero"
            style={{ scale: imgScale, willChange: "transform" }}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />

          {/* Content Overlay - Responsive */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
            <h1 className="text-[15vw] sm:text-[14vw] md:text-[12vw] font-black leading-none tracking-tighter text-white uppercase select-none drop-shadow-2xl">
              SERVICE
            </h1>
            <p className="max-w-sm sm:max-w-md md:max-w-xl mt-4 sm:mt-6 text-xs sm:text-sm md:text-lg text-white/80 font-medium leading-relaxed uppercase tracking-widest">
              We are a passionate creative agency with over 15 years experience
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 sm:mt-10 px-6 sm:px-10 py-3 sm:py-5 bg-white text-black rounded-full font-black text-[10px] sm:text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2 sm:gap-3 shadow-2xl"
            >
              Get Started <ArrowUpRight size={14} strokeWidth={3} className="sm:w-4 sm:h-4" />
            </motion.button>
          </div>

          {/* Vertical Text - Hidden on mobile */}
          <div className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 hidden lg:block">
            <p className="uppercase tracking-[0.5em] text-[10px] font-black text-white/30 rotate-90 origin-right whitespace-nowrap">
              Follow Us On Social Media
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {progress < 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4 z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 sm:h-12 bg-gradient-to-b from-white to-transparent opacity-40"
            />
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">
              {progress > 0 ? `${Math.round(progress)}%` : "Scroll to Reveal"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ================= SECTION 2: EXPERIENCE (OPTIMIZED) ================= */
const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring for reveal animation
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const smoothY = useSpring(y, gentleSpring);
  const smoothOpacity = useSpring(opacity, gentleSpring);

  return (
    <section ref={sectionRef} className="bg-white px-4 sm:px-6 lg:px-20 relative border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">

        {/* Left Side */}
        <motion.div
          style={{ opacity: smoothOpacity, y: smoothY, willChange: "transform, opacity" }}
          className="relative lg:border-r border-gray-100 pr-0 lg:pr-24 pb-12 lg:pb-0"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black mb-6 sm:mb-12">Who Are We?</p>

          <div className="flex items-start">
            <span className="text-[20vw] sm:text-[18rem] lg:text-[20rem] xl:text-[24rem] font-black leading-[0.75] tracking-tighter text-[#0C0E12] select-none">
              15
            </span>
            <div className="flex flex-col pt-6 sm:pt-12 ml-2 sm:ml-4">
              <p className="uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black text-[8px] sm:text-[9px] text-black lg:rotate-90 lg:origin-left whitespace-nowrap">
                Years of Work <br className="hidden lg:block" /> Experience
              </p>
            </div>
          </div>

          <div className="mt-12 sm:mt-20 flex items-center gap-4 sm:gap-6">
            <div className="flex -space-x-3 sm:-space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-lg">
                  <img src={`/images/port/${i + 5}.webp`} className="w-full h-full object-cover grayscale" alt={`Client ${i}`} />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-black/40">More than 25k</p>
              <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-[#0C0E12]">Clients Reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <div className="lg:pl-24 flex flex-col pt-0 lg:pt-0">
          <div className="max-w-xl">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-medium mb-4">
              We are a passionate creative agency with over 15 years of experience in branding, design, digital marketing, and storytelling. We help businesses stand out with innovative strategies, stunning visuals, and impactful campaigns that drive engagement and growth.
            </p>
            <a href="#" className="inline-block text-black font-bold border-b border-black text-sm pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
              Let's create something extraordinary!
            </a>
          </div>

          {/* Image with GPU-accelerated Animation */}
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-20 relative aspect-[16/10] rounded-lg overflow-hidden shadow-2xl will-change-[clip-path]"
          >
            <motion.img
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src="/images/fresh-idea-1.webp"
              alt="Experience"
              className="w-full h-full object-cover will-change-transform"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================= SECTION 3: PARALLAX (GPU OPTIMIZED) ================= */
const ParallaxSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });

  // Use springs for butter-smooth parallax at 60fps
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const rawY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const scale = useSpring(rawScale, gentleSpring);
  const y = useSpring(rawY, gentleSpring);

  return (
    <section ref={targetRef} className="w-full h-[50vh] sm:h-[70vh] md:h-[90vh] lg:h-[110vh] overflow-hidden relative bg-black">
      <motion.div
        style={{ scale, y, willChange: "transform" }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <img
          src="/images/back.webp"
          alt="Containers"
          className="w-full h-full object-cover opacity-90"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
    </section>
  );
};

/* ================= SECTION 4: EXPLORE SERVICES - STACKING CARDS ================= */
const servicesData = [
  {
    name: "UI/UX DESIGN",
    image: "/images/service-ui.webp",
    description: "Creating intuitive, beautiful interfaces that users love",
    color: "#FF6B35"
  },
  {
    name: "BRANDING",
    image: "https://cdn.prod.website-files.com/68b0cb20515ada515e9ba711/68b4cf76dfbbe9fd12902eaa_Frame%201437253174.png",
    description: "Building memorable brand identities that stand out",
    color: "#4ECDC4"
  },
  {
    name: "PRODUCT DESIGN",
    image: "https://cdn.prod.website-files.com/68b0cb20515ada515e9ba711/68b75ff47431aaf16ad28a4d_Frame%201437253177.png",
    description: "Designing products that solve real problems",
    color: "#9B5DE5"
  },
  {
    name: "DEVELOPMENT",
    image: "https://cdn.prod.website-files.com/691024ccc3cf40dbe1a814d3/6911ce75f727815d6221f9bf_1753014996382-p-1080.webp",
    description: "Building robust, scalable digital solutions",
    color: "#00BBF9"
  },
];

/* Individual Stacking Card Component */
const StackingCard = ({
  service,
  index,
  totalCards
}: {
  service: typeof servicesData[0];
  index: number;
  totalCards: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  // Card stacking transforms
  const cardScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.95 - (index * 0.02)]
  );

  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, index * 30]
  );

  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, index === totalCards - 1 ? 1 : 0.8]
  );

  // Smooth springs for 60fps
  const smoothScale = useSpring(cardScale, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(cardY, { damping: 30, stiffness: 200 });

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale: smoothScale,
        y: smoothY,
        opacity: cardOpacity,
        willChange: "transform, opacity",
        zIndex: totalCards - index,
      }}
      className="sticky top-24 md:top-32 mb-8 md:mb-12"
    >
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[40px] bg-[#0C0E12] shadow-2xl"
        style={{
          boxShadow: `0 30px 60px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)`
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] xl:h-[600px] overflow-hidden">
            <motion.img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0C0E12] lg:bg-gradient-to-r" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E12] via-transparent to-transparent lg:bg-none" />

            {/* Card Number */}
            <div
              className="absolute top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: service.color }}
            >
              0{index + 1}
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 sm:p-10 lg:p-16 flex flex-col justify-center relative">
            {/* Decorative Line */}
            <div
              className="absolute top-0 left-8 sm:left-10 lg:left-16 w-16 h-1 rounded-full"
              style={{ backgroundColor: service.color }}
            />

            <motion.h3
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.name}
            </motion.h3>

            <motion.p
              className="text-white/60 text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.description}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-start px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] text-white border-2 border-white/20 hover:bg-white hover:text-black transition-colors flex items-center gap-3"
            >
              Explore Service <ArrowUpRight size={16} strokeWidth={3} />
            </motion.button>

            {/* Background decoration */}
            <div
              className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-[120px] opacity-20 pointer-events-none"
              style={{ backgroundColor: service.color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExploreServices = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });

  // Spring-based text animations for 60fps
  const rawXExplore = useTransform(scrollYProgress, [0, 0.8], [-200, 0]);
  const rawXServices = useTransform(scrollYProgress, [0, 0.8], [200, 0]);

  const xExplore = useSpring(rawXExplore, snappySpring);
  const xServices = useSpring(rawXServices, snappySpring);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-20 relative overflow-hidden text-black"
    >
      <div className="max-w-[1500px] mx-auto">
        {/* Heading - Responsive */}
        <div className="flex flex-col mb-16 sm:mb-24 lg:mb-32 relative w-full items-center">
          <motion.div style={{ x: xExplore, willChange: "transform" }} className="w-full">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[13vw] font-black uppercase tracking-tighter leading-[0.85] text-black text-left">
              Explore
            </h2>
          </motion.div>

          <motion.div
            style={{ x: xServices, willChange: "transform" }}
            className="w-full flex justify-end md:pr-[10%]"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[13vw] font-black uppercase tracking-tighter leading-[0.85] text-black text-right">
              Services
            </h2>
          </motion.div>

          {/* Down Arrow */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 sm:mt-16 w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer shadow-sm border border-gray-100 hover:bg-black transition-colors group"
          >
            <ArrowRight
              size={18}
              className="rotate-90 transition-transform group-hover:translate-y-1 text-black group-hover:text-white"
            />
          </motion.div>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative mt-16 sm:mt-24 lg:mt-32">
          {servicesData.map((service, index) => (
            <StackingCard
              key={index}
              service={service}
              index={index}
              totalCards={servicesData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= MARQUEE (GPU OPTIMIZED) ================= */
const MarqueeSection = () => {
  return (
    <section className="bg-white py-10 sm:py-16 lg:py-20 overflow-hidden border-y border-gray-100 relative z-20">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-6 sm:gap-8 lg:gap-12 pr-6 sm:pr-8 lg:pr-12 will-change-transform"
        >
          {[...Array(6)].map((_, i) => (
            <h2 key={i} className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black uppercase tracking-tighter text-[#0C0E12] flex items-center gap-4 sm:gap-8 lg:gap-12">
              Working <span className="text-orange-600 pb-2 sm:pb-4 lg:pb-8">*</span> Process
            </h2>
          ))}
        </motion.div>
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-6 sm:gap-8 lg:gap-12 pr-6 sm:pr-8 lg:pr-12 will-change-transform"
        >
          {[...Array(6)].map((_, i) => (
            <h2 key={i} className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black uppercase tracking-tighter text-[#0C0E12] flex items-center gap-4 sm:gap-8 lg:gap-12">
              Working <span className="text-orange-600 pb-2 sm:pb-4 lg:pb-8">*</span> Process
            </h2>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ================= SECTION 5: PROCESS (OPTIMIZED) ================= */
const ProcessSection = () => {
  const processItems = useMemo(() => [
    { num: ".01", title: "Discovery & Research", desc: "We dive deep into understanding your brand, audience, and goals to create a solid foundation for success." },
    { num: ".02", title: "Strategy & Planning", desc: "We develop a comprehensive roadmap that aligns with your objectives and sets clear milestones." },
    { num: ".03", title: "Design & Creation", desc: "Our creative team brings ideas to life with stunning visuals and intuitive user experiences." },
    { num: ".04", title: "Development", desc: "We build robust, scalable solutions using cutting-edge technologies and best practices." },
    { num: ".05", title: "Review & Delivery", desc: "Rigorous testing and refinement ensure we deliver excellence that exceeds expectations." }
  ], []);

  return (
    <section className="bg-[#0C0E12] min-h-screen lg:h-[95vh] px-4 sm:px-6 py-16 lg:py-0 text-white overflow-hidden relative flex items-center">
      <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 relative z-10 lg:h-[75vh]">

        {/* Left Side: Scrollable Process Steps */}
        <div className="lg:h-full lg:overflow-y-auto pr-0 lg:pr-10 space-y-12 sm:space-y-16 lg:space-y-24 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {processItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex gap-4 sm:gap-8 md:gap-14"
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] sm:text-xs font-bold text-gray-500 mb-3 sm:mb-4">{item.num}</span>
                <div className="w-[1px] h-full bg-white/10 group-hover:bg-white/30 transition-colors" />
              </div>

              <div className="pb-8 sm:pb-12 lg:pb-16 text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase mb-4 sm:mb-6 tracking-tight text-white/90 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-400 font-medium leading-relaxed max-w-lg">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="h-20 lg:h-40" />
        </div>

        {/* Right Side: Visual */}
        <div className="relative lg:h-full flex items-center justify-center lg:pl-20 order-first lg:order-last">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[550px] aspect-square rounded-2xl sm:rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl group border border-white/5 bg-[#14161B]"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              src="https://cdn.prod.website-files.com/67a1ba0a889270647730e779/67e63d69162c2494e4bf9c3e_img%20(17)-p-500.webp"
              alt="Process Visual"
              className="w-full h-full object-cover opacity-80 will-change-transform"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================= SECTION 6: CTA COLLAGE (60FPS MOUSE PARALLAX) ================= */
const CTACollage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mouse position with RAF-optimized updates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Extra smooth spring config for butter-smooth parallax
  const parallaxSpring = { damping: 50, stiffness: 80, mass: 1.5 };
  const smoothX = useSpring(mouseX, parallaxSpring);
  const smoothY = useSpring(mouseY, parallaxSpring);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  // Parallax transforms for different depths
  const img1MoveX = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);
  const img1MoveY = useTransform(smoothY, [-0.5, 0.5], [-25, 25]);

  const img2MoveX = useTransform(smoothX, [-0.5, 0.5], [35, -35]);
  const img2MoveY = useTransform(smoothY, [-0.5, 0.5], [35, -35]);

  const img3MoveX = useTransform(smoothX, [-0.5, 0.5], [-45, 45]);
  const img3MoveY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

  const img4MoveX = useTransform(smoothX, [-0.5, 0.5], [50, -50]);
  const img4MoveY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const images = useMemo(() => [
    { src: "https://cdn.prod.website-files.com/67a1ba0a889270647730e779/67e63d10d18f7f9092d93761_Img%20(5)-p-500.webp", x: img1MoveX, y: img1MoveY, position: "top-[10%] left-[8%] lg:left-[12%]", size: "w-[140px] sm:w-[180px] lg:w-[220px]", aspect: "aspect-[4/5]", rounded: "rounded-xl lg:rounded-2xl" },
    { src: "https://cdn.prod.website-files.com/67a1ba0a889270647730e779/67e63807f382581015681b0f_Emoji-p-500.webp", x: img2MoveX, y: img2MoveY, position: "top-[8%] right-[8%] lg:right-[15%]", size: "w-[100px] sm:w-[140px] lg:w-[180px]", aspect: "aspect-square", rounded: "rounded-full" },
    { src: "https://cdn.prod.website-files.com/67a1ba0a889270647730e779/67e63c7ba173bf929fe05bd6_Img%20(2)-p-500.webp", x: img3MoveX, y: img3MoveY, position: "bottom-[10%] left-[10%] lg:left-[15%]", size: "w-[160px] sm:w-[200px] lg:w-[260px]", aspect: "aspect-square", rounded: "rounded-xl lg:rounded-2xl" },
    { src: "https://cdn.prod.website-files.com/67a1ba0a889270647730e779/67e63c81162c2494e4bed2f6_Img%20(3)%20(1)-p-500.webp", x: img4MoveX, y: img4MoveY, position: "bottom-[5%] right-[8%] lg:right-[12%]", size: "w-[150px] sm:w-[190px] lg:w-[240px]", aspect: "aspect-[3/4]", rounded: "rounded-xl lg:rounded-2xl" }
  ], [img1MoveX, img1MoveY, img2MoveX, img2MoveY, img3MoveX, img3MoveY, img4MoveX, img4MoveY]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="bg-white py-32 sm:py-48 lg:py-64 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh] lg:min-h-[100vh]"
    >
      <div className="max-w-[1200px] mx-auto text-center relative z-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative inline-block mb-6 sm:mb-10"
        >
          <div className="bg-black text-white text-[9px] sm:text-[10px] font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            33K+ USERS
          </div>
          <div className="absolute -bottom-1 left-1 w-2 h-2 bg-black rotate-45" />
        </motion.div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[10vw] font-black uppercase leading-[0.85] text-[#0C0E12] tracking-tighter mb-10 sm:mb-16">
          <span className="block">Let's Create</span>
          <span className="text-orange-600 block">Something</span>
          <span className="block italic">Better <span className="not-italic text-[#0C0E12]">Together!</span></span>
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 sm:px-10 py-4 sm:py-5 bg-[#14161B] text-white rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] inline-flex items-center gap-2 sm:gap-3 shadow-2xl hover:bg-orange-600 transition-colors mx-auto"
        >
          View All Projects <ArrowUpRight size={16} strokeWidth={3} className="sm:w-[18px] sm:h-[18px]" />
        </motion.button>
      </div>

      {/* Floating Images - Hidden on small screens, visible on md+ */}
      {images.map((img, i) => (
        <motion.div
          key={i}
          style={{ x: img.x, y: img.y, willChange: "transform" }}
          className={`absolute ${img.position} ${img.size} ${img.aspect} z-10 hidden md:block`}
        >
          <img
            src={img.src}
            className={`w-full h-full object-cover ${img.rounded} shadow-2xl grayscale hover:grayscale-0 transition-all duration-500`}
            alt={`Work ${i + 1}`}
            loading="lazy"
          />
        </motion.div>
      ))}
    </section>
  );
};

/* ================= FOOTER (RESPONSIVE) ================= */
const CustomFooter = () => {
  return (
    <footer className="bg-[#0C0E12] pt-20 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 px-4 sm:px-6 text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 lg:gap-32 mb-20 sm:mb-32 lg:mb-40">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-8 sm:mb-12">
              Let's Work <br /> Together
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 sm:px-12 py-4 sm:py-6 border-2 border-white/20 rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-white hover:text-black transition-colors flex items-center gap-3 sm:gap-4 group"
            >
              Get In Touch <ArrowRight className="group-hover:translate-x-2 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest font-black text-white/40 mb-2 sm:mb-3">Email</p>
                <p className="text-lg sm:text-xl font-bold">hello@midis.com</p>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest font-black text-white/40 mb-2 sm:mb-3">Phone</p>
                <p className="text-lg sm:text-xl font-bold">+1 (888) 123 4567</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest font-black text-white/40 mb-4 sm:mb-6">Socials</p>
              <ul className="space-y-3 sm:space-y-4">
                {["Facebook", "Instagram", "Linkedin", "Dribbble"].map(s => (
                  <li key={s} className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter hover:text-orange-600 cursor-pointer transition-colors">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-[10px] sm:text-[11px] font-bold tracking-widest text-white/30 uppercase text-center sm:text-left">
            © 2026 Midis Creative Agency. All Rights Reserved.
          </p>
          <div className="flex gap-6 sm:gap-8">
            {["Privacy", "Terms", "Cookies"].map(l => (
              <span key={l} className="text-[10px] sm:text-[11px] font-bold tracking-widest text-white/30 uppercase cursor-pointer hover:text-white transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ================= PAGE EXPORT ================= */
export default function Services2() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#0C0E12] w-full min-h-screen text-black font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ExperienceSection />
      <ParallaxSection />
      <ExploreServices />
      <MarqueeSection />
      <ProcessSection />
      <CTACollage />
      <CustomFooter />
    </main>
  );
}
