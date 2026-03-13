import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ReasonItem = {
  number: string;
  title: string;
  image: string;
};

const items: ReasonItem[] = [
  {
    number: "01.",
    title: "EXPERTISE &\nSPECIALIZATION",
    image: "/images/testimonial-bg.webp",
  },
  {
    number: "02.",
    title: "24/7 CUSTOMER\nSUPPORT",
    image:
      "https://cdn.prod.website-files.com/67a1ba0a889270647730e779/6807591402397500a733b507_banner%20img-p-1600.webp",
  },
  {
    number: "03.",
    title: "COST-EFFECTIVE\nSOLUTIONS",
    image: "/images/service-branding.webp",
  },
  {
    number: "04.",
    title: "EXPERTISE &\nSPECIALIZATION",
    image: "/images/service-dev.webp",
  },
];

export const ReasonsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const switchRef = useRef<HTMLDivElement | null>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndex = useRef(0);

  useEffect(() => {
    if (!sectionRef.current || !switchRef.current) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      /* ================= HEADING ANIMATION ================= */
      gsap.fromTo(
        ".reason-line",
        {
          y: 60,
          opacity: 0,
          rotateX: -20,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      /* ================= SWITCH SCROLL ================= */
      const backgrounds = bgRefs.current.filter(Boolean) as HTMLDivElement[];
      const cards = itemRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(backgrounds, { opacity: 0, scale: 1.1, filter: "blur(10px)" });
      gsap.set(backgrounds[0], { opacity: 1, scale: 1, filter: "blur(0px)" });
      cards[0]?.classList.add("active");

      ScrollTrigger.create({
        trigger: switchRef.current,
        start: "top top",
        end: `+=${items.length * (isMobile ? 80 : 120)}%`, // Increased distance for mobile smoothness
        scrub: 1, 
        pin: true,
        anticipatePin: 1,

        onUpdate: (self) => {
          const index = Math.min(
            items.length - 1,
            Math.floor(self.progress * (items.length - 0.01))
          );

          if (index === activeIndex.current) return;
          
          const prevIndex = activeIndex.current;
          activeIndex.current = index;

          // Background transition
          gsap.to(backgrounds[index], {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(backgrounds[prevIndex], {
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            duration: 0.6,
            ease: "power2.inOut",
          });

          cards.forEach((card) => card.classList.remove("active"));
          cards[index]?.classList.add("active");
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      {/* ================= HEADING ================= */}
      <div className="py-24 md:py-0 md:min-h-[70vh] flex items-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 md:px-16 lg:px-24">
          <h2
            className="uppercase font-black leading-[0.9] text-black
            text-[38px] sm:text-[3.2rem] md:text-[4.2rem] lg:text-[6.2rem]
            tracking-[-2px] lg:tracking-tighter"
          >
            <span className="reason-line block">HERE ARE A FEW</span>
            <span className="reason-line block">REASONS WHY</span>
            <span className="reason-line block text-gray-200">
              YOU&apos;LL LOVE US
            </span>
          </h2>
        </div>
      </div>

      {/* ================= SWITCH SECTION ================= */}
      <div ref={switchRef} className="relative">
        {/* GRID */}
        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            border-t border-gray-100
            bg-white
          "
        >
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className="
                reason-item
                p-6 sm:p-10
                border-b lg:border-b-0
                border-r
                border-gray-100
                transition-all
                duration-500
                flex flex-col justify-between
                min-h-[160px] md:min-h-[220px]
              "
            >
              <p className={`text-[10px] md:text-sm font-bold transition-colors duration-500 
                ${activeIndex.current === i ? "text-black" : "text-gray-300"}
              `}>
                {item.number}
              </p>

              <h3 className="text-sm sm:text-lg md:text-xl font-bold whitespace-pre-line leading-[1.2] text-black mt-4">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* IMAGE SWITCH */}
        <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => (bgRefs.current[i] = el)}
              className="absolute inset-0"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </div>
          ))}
        </div>
      </div>

      {/* ================= ACTIVE STYLE ================= */}
      <style>{`
        .reason-item {
          position: relative;
          overflow: hidden;
        }

        .reason-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 4px;
          background: #000;
          transition: width 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 10;
        }

        .reason-item.active::before {
          width: 100%;
        }

        .reason-item.active {
          background-color: #fafafa;
        }
        
        @media (max-width: 768px) {
          .reason-item h3 {
            font-size: 14px;
            letter-spacing: -0.02em;
          }
        }
      `}</style>
    </section>
  );
};
