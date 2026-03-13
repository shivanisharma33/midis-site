import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !imageWrap) return;

    const ctx = gsap.context(() => {
      /* ================= TEXT REVEAL ================= */
      gsap.from(".cta-text span", {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });

      /* ================= PIN + IMAGE ZOOM ================= */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%", // ~2 scrolls
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(imageWrap, {
          width: "150vw",
          height: "150vh",
          borderRadius: "0px",
          ease: "power2.inOut",
        });
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%", // Much shorter 1-scroll on mobile
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(imageWrap, {
          width: "150vw",
          height: "150vh",
          borderRadius: "0px",
          ease: "power2.inOut",
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60svh] md:min-h-[100svh] bg-white overflow-hidden flex items-center"
    >
      {/* 👇 text-black added here */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-black">

        {/* 👇 color changed to black */}
        <p className="text-xs tracking-widest uppercase mb-10 text-black">
          JOIN US TODAY!
        </p>

        {/* LINE 1 */}
        <div className="flex justify-center mb-6">
          <span className="cta-text text-[clamp(30px,6vw,5rem)] font-extrabold overflow-hidden tracking-[-1.6px] lg:tracking-tighter">
            <span className="inline-block">PARTNER WITH</span>
          </span>
        </div>

        {/* LINE 2 */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <span className="cta-text text-[clamp(30px,6vw,5rem)] font-extrabold overflow-hidden tracking-[-1.6px] lg:tracking-tighter">
            <span className="inline-block">EXPERIENCED</span>
          </span>

          {/* INLINE IMAGE */}
          <span className="relative inline-flex w-28 h-16 lg:w-36 lg:h-20 shrink-0 align-middle">
            <span
              ref={imageWrapRef}
              className="
                absolute
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-full h-full
                rounded-full
                overflow-hidden
                will-change-transform
                z-50
              "
            >
              <img
                src="/images/testimonial-bg.webp"
                alt="CTA"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </span>
          </span>

          <span className="cta-text text-[clamp(30px,6vw,5rem)] font-extrabold overflow-hidden tracking-[-1.6px] lg:tracking-tighter">
            <span className="inline-block">DESIGNER</span>
          </span>
        </div>

        {/* LINE 3 */}
        <div className="flex justify-center mb-14">
          <span className="cta-text text-[clamp(30px,6vw,5rem)] font-extrabold overflow-hidden tracking-[-1.6px] lg:tracking-tighter">
            <span className="inline-block">PARTNER WITH</span>
          </span>
        </div>

        {/* BUTTON */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-black text-white text-sm font-semibold"
        >
          LET&apos;S GET STARTED →
        </motion.a>
      </div>
    </section>
  );
};
