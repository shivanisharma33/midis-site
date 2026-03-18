"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChevronDown, ArrowRight } from "lucide-react";

/* ───────────────────────── ANIMATION HELPERS ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ───────────────────────── DATA ───────────────────────── */

const whyMidisReasons = [
  {
    emoji: "🌍",
    title: "Global Perspective",
    desc: "We understand how people behave online in different cultures, so our strategies adapt—they are not copy-paste.",
  },
  {
    emoji: "🎯",
    title: "Return on Investment",
    desc: "We don't celebrate likes or impressions. We celebrate leads, sales, and revenue growth.",
  },
  {
    emoji: "🤝",
    title: "Real Collaboration",
    desc: "We don't disappear after sending a report. We work alongside you, adjusting strategy when the market shifts.",
  },
  {
    emoji: "💡",
    title: "Ideas & Data Balance",
    desc: "We love creative campaigns, but numbers keep us grounded.",
  },
];



const gains = [
  { text: "Experience across borders — we know what works globally." },
  { text: "All-in-one solutions — no need to hire five different agencies." },
  { text: "Clear communication — no jargon, just results explained simply." },
  { text: "Growth strategies — designed to scale with your business." },
];

const faqs = [
  { q: "WHAT SERVICES DO YOU OFFER?", a: "We provide end-to-end creative solutions including UI/UX Design, Branding, Web Development, SEO & Ads, Content Writing, Video Editing, Email Marketing, and Digital Strategy." },
  { q: "HOW DO YOU APPROACH A NEW PROJECT?", a: "Our process starts with deep research and discovery, followed by strategic planning, creative execution, and rigorous testing—all with clear communication at every step." },
  { q: "WHO WILL BE WORKING ON MY PROJECT?", a: "You'll have a dedicated team of senior designers and developers working directly with you throughout the lifecycle." },
  { q: "DO YOU PROVIDE SUPPORT?", a: "Yes, we offer comprehensive maintenance and support packages to ensure your digital products stay ahead of the curve." },
];

/* ═══════════════════════════════════════════════════════
   COMPONENT 1 — ABOUT HERO
   ═══════════════════════════════════════════════════════ */

const AboutHero = () => {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "25K", label: "Happy Clients" },
  ];

  const headlineWords = ["CRAFTING", "THE", "FUTURE"];
  const sublineWords = ["OF", "DIGITAL", "EXCELLENCE"];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#06060e] text-white">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, #f97316, #ea580c, transparent)" }}
          animate={{ x: ["-10%", "15%", "-5%"], y: ["-20%", "10%", "-15%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          initial={{ top: "-10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
          style={{ background: "radial-gradient(circle, #8b5cf6, #6d28d9, transparent)" }}
          animate={{ x: ["10%", "-20%", "5%"], y: ["15%", "-10%", "20%"] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          initial={{ bottom: "10%", right: "5%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[90px] opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4, #0891b2, transparent)" }}
          animate={{ x: ["-5%", "20%", "-10%"], y: ["10%", "-20%", "5%"] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          initial={{ top: "40%", left: "50%" }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')", backgroundRepeat: "repeat" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#06060e_70%)]" />
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-white" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full flex flex-col items-center justify-center px-6 pt-40 pb-16 min-h-screen">
        {/* Top Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex items-center gap-3 mb-12">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-white/50 text-[11px] uppercase font-semibold tracking-[0.3em]">About Midis</span>
          <div className="w-12 h-px bg-white/20" />
        </motion.div>

        {/* Headline */}
        <div className="text-center mb-6">
          <div className="flex flex-wrap justify-center items-center gap-x-[0.2em] md:gap-x-[0.35em]">
            {headlineWords.map((word, i) => (
              <motion.span key={`h-${i}`} initial={{ opacity: 0, y: 80, rotateX: 90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }} className="text-[clamp(2.8rem,11vw,10rem)] leading-[0.9] font-normal uppercase tracking-tight inline-block" style={{ fontFamily: "Anton, sans-serif" }}>
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-[0.2em] md:gap-x-[0.35em] mt-1">
            {sublineWords.map((word, i) => (
              <motion.span key={`s-${i}`} initial={{ opacity: 0, y: 80, rotateX: 90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.8, delay: 0.55 + i * 0.12, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center">
                {i === 1 && (
                  <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }} className="relative inline-block w-[1.8em] h-[0.6em] md:w-[2.5em] md:h-[0.75em] overflow-hidden rounded-full mx-3 ring-1 ring-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.2)] mt-[0.04em]">
                    <img src="/abstract_oval.png" alt="Decorative" className="w-full h-full object-cover scale-150" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-purple-500/20 mix-blend-overlay" />
                  </motion.div>
                )}
                <span className={`text-[clamp(2.8rem,11vw,10rem)] leading-[0.9] font-normal uppercase tracking-tight ${i === 2 ? "bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200 bg-clip-text text-transparent" : "text-white"}`} style={{ fontFamily: "Anton, sans-serif" }}>
                  {word}
                </span>
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="text-white/40 text-sm md:text-base max-w-lg text-center leading-relaxed font-medium tracking-wide">
          We specialize in accelerating startup growth — building bold, memorable brands with precision, creativity, and impact.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.3 }} className="mt-10">
          <button className="group relative px-10 py-4 rounded-full border border-white/15 text-white text-[11px] uppercase font-bold tracking-[0.25em] overflow-hidden transition-all duration-500 hover:border-orange-500/40 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]">
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-orange-300">
              Explore Our Story
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </motion.div>

        <div className="flex-1" />

        {/* Bottom Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.5 }} className="w-full mt-auto pt-8">
          <div className="border-t border-white/10 pt-8 flex flex-wrap justify-between items-center gap-y-6 gap-x-4">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.6 + i * 0.1 }} className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-black tracking-tighter text-white" style={{ fontFamily: "Anton, sans-serif" }}>{stat.value}</span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/30 font-semibold">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-orange-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 2 — WHO WE ARE
   ═══════════════════════════════════════════════════════ */

const WhoWeAreSection = () => {
  return (
    <section className="bg-white py-28 md:py-40 px-6 lg:px-24">
      <div className="max-w-[1300px] mx-auto">
        {/* Label */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-10">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-black font-bold text-[11px] tracking-[0.25em] uppercase">Who We Are</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Big heading + paragraphs */}
          <div className="space-y-8">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[30px] md:text-5xl lg:text-6xl font-black uppercase text-[#0C0E12] leading-[0.95] tracking-tight">
              NOT JUST ANOTHER <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">DIGITAL AGENCY</span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-base md:text-lg leading-relaxed font-medium">
              If you've been looking around for a digital agency, you already know the challenge: everyone says they can build websites, run ads, or "do SEO." The problem is, most of them stop there.
            </motion.p>

            <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-base md:text-lg leading-relaxed font-medium">
              At Midis, we look at things differently. We're not just about delivering a service and moving on. We're about building a <strong className="text-[#0C0E12]">brand presence that lasts</strong>. A website that isn't just pretty but also fast. Content that isn't just SEO-friendly but actually enjoyable to read. Campaigns that don't just get clicks but bring customers who stick.
            </motion.p>
          </div>

          {/* Right — Continued text + accent card */}
          <div className="space-y-8 lg:pt-6">
            <motion.p variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-base md:text-lg leading-relaxed font-medium">
              We've worked with businesses in different corners of the world. Some were startups trying to get noticed. Others were established companies looking for smarter growth. Different goals, different markets—but the same outcome: <strong className="text-[#0C0E12]">measurable results that make sense for the business</strong>.
            </motion.p>

            {/* Accent highlight card */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-[#0C0E12] rounded-3xl p-8 md:p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <span className="text-orange-400 text-5xl mb-4 block">→</span>
                <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
                  We don't chase vanity metrics. We build <strong className="text-white">systems that help you grow</strong> month after month.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 3 — WHY MIDIS
   ═══════════════════════════════════════════════════════ */

const WhyMidisSection = () => {
  return (
    <section className="bg-[#faf9f7] py-28 md:py-40 px-6 lg:px-24">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-black font-bold text-[11px] tracking-[0.25em] uppercase">Why Choose Us</span>
        </motion.div>

        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[30px] md:text-5xl lg:text-7xl font-black uppercase text-[#0C0E12] leading-[0.9] tracking-tight mb-6">
          WHY MIDIS AND <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">NOT SOMEONE ELSE?</span>
        </motion.h2>

        <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-base md:text-lg max-w-2xl leading-relaxed font-medium mb-16">
          Let's be honest: there are plenty of agencies out there. So why us? Here's what clients tell us:
        </motion.p>

        {/* Reason Cards */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyMidisReasons.map((reason, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="group relative bg-white rounded-3xl p-8 md:p-10 border border-black/5 hover:border-orange-500/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)] cursor-default overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="relative z-10">
                <div className="flex items-start gap-5">
                  <span className="text-4xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">{reason.emoji}</span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-[#0C0E12] tracking-tight mb-3 leading-tight">{reason.title}</h3>
                    <p className="text-[#5a5a6a] text-base leading-relaxed font-medium">{reason.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};



/* ═══════════════════════════════════════════════════════
   COMPONENT 5 — WHAT YOU'LL GAIN
   ═══════════════════════════════════════════════════════ */

const GainsSection = () => {
  return (
    <section className="bg-white py-28 md:py-40 px-6 lg:px-24">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-black font-bold text-[11px] tracking-[0.25em] uppercase">Partnership</span>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[30px] md:text-5xl lg:text-6xl font-black uppercase text-[#0C0E12] leading-[0.95] tracking-tight mb-6">
              WHAT YOU'LL <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">GAIN WITH MIDIS</span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-base md:text-lg leading-relaxed font-medium mb-10">
              When you work with Midis, you're not just outsourcing tasks — you're building a partnership.
            </motion.p>
          </div>

          {/* Right — Gains list */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-5">
            {gains.map((gain, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group flex items-start gap-5 p-6 rounded-2xl bg-[#faf9f7] border border-black/5 hover:border-orange-500/20 hover:shadow-lg transition-all duration-500"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[#2a2a3a] text-base md:text-lg font-semibold leading-relaxed">{gain.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 6 — MARQUEE
   ═══════════════════════════════════════════════════════ */

const AboutMarquee = () => {
  return (
    <div className="bg-[#0C0E12] py-16 overflow-hidden relative flex border-y border-white/5">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-20"
      >
        {[1, 2, 3].map(i => (
          <span key={i} className="text-[12vw] font-black uppercase text-white/5 tracking-[0.05em] leading-none">
            MIDIS AGENCY * MIDIS AGENCY * MIDIS AGENCY *
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 7 — FAQ
   ═══════════════════════════════════════════════════════ */

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-28 md:py-40 px-6 lg:px-24">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-black font-bold text-[11px] tracking-[0.25em] uppercase">FAQ</span>
        </motion.div>

        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[30px] md:text-5xl lg:text-6xl font-black uppercase text-[#0C0E12] leading-[0.95] tracking-tight mb-16">
          FREQUENTLY ASKED <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">QUESTIONS</span>
        </motion.h2>

        <div className="divide-y divide-black/10">
          {faqs.map((f, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-8 md:py-10">
              <button onClick={() => setOpenIndex(openIndex === i ? -1 : i)} className="w-full flex justify-between items-center group gap-4">
                <h4 className={`text-lg md:text-2xl font-black uppercase tracking-tighter transition-all text-left ${openIndex === i ? "text-orange-500" : "text-[#0C0E12]/80"}`}>{f.q}</h4>
                <div className={`w-11 h-11 border border-black/10 rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0 ${openIndex === i ? "rotate-180 bg-[#0C0E12] text-white" : ""}`}>
                  <ChevronDown size={22} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="pt-6 text-lg text-[#5a5a6a] font-medium max-w-3xl leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 8 — LET'S START BUILDING (CTA)
   ═══════════════════════════════════════════════════════ */

const StartBuildingCTA = () => {
  return (
    <section className="relative bg-[#0C0E12] py-32 md:py-44 px-6 lg:px-24 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-white/40 font-bold text-[11px] tracking-[0.25em] uppercase">Get Started</span>
        </motion.div>

        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[30px] md:text-5xl lg:text-7xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
          LET'S START <br />
          <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">BUILDING</span>
        </motion.h2>

        <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium mb-12">
          At the end of the day, you don't just need a website or a campaign. You need a partner who understands your goals and knows how to get you there. That's Midis.
        </motion.p>

        <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <a
            href="/contact"
            className="group inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full text-black font-black uppercase text-[12px] tracking-[0.2em] hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] transition-all duration-500 hover:scale-105"
          >
            Book a Free Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <motion.p variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/20 text-sm font-medium mt-8">
          Let's talk about where you want your business to be six months from now.
        </motion.p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════ */

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">
      <Navigation />

      {/* 1. Hero */}
      <AboutHero />

      {/* 2. Who We Are */}
      <WhoWeAreSection />

      {/* 3. Why Midis */}
      <WhyMidisSection />



      {/* 5. What You'll Gain */}
      <GainsSection />

      {/* 6. Marquee Divider */}
      <AboutMarquee />

      {/* 7. FAQ */}
      <FAQSection />

      {/* 8. Let's Start Building CTA */}
      <StartBuildingCTA />

      <Footer />
    </main>
  );
};

export default AboutPage;
