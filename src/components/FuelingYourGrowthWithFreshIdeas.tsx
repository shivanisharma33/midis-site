import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FuelingYourGrowthWithFreshIdeas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imagesWrapper = imagesRef.current;
    if (!container || !imagesWrapper) return;

    const imgs = gsap.utils.toArray<HTMLImageElement>(
      imagesWrapper.querySelectorAll("img")
    );

    if (imgs.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop setup
      imgs.forEach((img, i) => {
        gsap.set(img, {
          y: i === 0 ? 0 : 150,
          autoAlpha: i === 0 ? 1 : 0,
        });
      });

      const tl = gsap.timeline();

      imgs.forEach((img, i) => {
        if (i !== 0) {
          tl.to(
            img,
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            "+=0.15"
          );

          tl.to(
            imgs[i - 1],
            {
              autoAlpha: 0,
              duration: 1.0,
              ease: "power2.out",
            },
            "<"
          );
        }
      });

      ScrollTrigger.create({
        animation: tl,
        trigger: container,
        start: "top top",
        end: () => `+=${imgs.length * window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      });
    });

    mm.add("(max-width: 767px)", () => {
      // On mobile we don't need GSAP animations, 
      // Tailwind will handle the responsive layout naturally
      gsap.set(imgs, { clearProps: "all" });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full">

      {/* MAIN FLEX */}
      <div className="flex flex-col md:flex-row w-full">

        {/* LEFT IMAGE SLIDER */}
        <div
          ref={imagesRef}
          className="
            relative w-full md:w-1/2
            flex flex-col md:block
            md:overflow-hidden md:min-h-[100svh]
          "
        >
          <img
            src="/images/fresh-idea-3.webp"
            alt="Growth Idea 1"
            className="w-full h-[50vh] sm:h-[60vh] object-cover md:absolute md:top-0 md:left-0 md:h-full md:w-full"
          />
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80"
            alt="Growth Idea 2"
            className="hidden md:block w-full h-[50vh] sm:h-[60vh] object-cover mb-1 md:mb-0 md:absolute md:top-0 md:left-0 md:h-full md:w-full"
          />
          <img
            src="/images/fresh-idea-2.webp"
            alt="Growth Idea 3"
            className="hidden md:block w-full h-[50vh] sm:h-[60vh] object-cover md:absolute md:top-0 md:left-0 md:h-full md:w-full"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 bg-white">
          <div
            className="
              md:sticky md:top-0
              flex flex-col justify-center
              px-6 sm:px-10 md:px-20
              py-16 md:py-0 md:min-h-[100svh]
            "
          >
            <h1 className="font-extrabold text-black leading-[1.1] mb-6 text-[38px] sm:text-[45px] md:text-[55px]">
              EMPOWERING <br />
              DIGITAL GROWTH <br />
              FOR STARTUPS
            </h1>

            <p className="text-[16px] sm:text-[17px] text-gray-600 leading-7 max-w-[480px] mb-8">
              We blend performance with creativity to offer powerful digital marketing strategies—SEO,
              branding, and social media solutions that get results for global brands.
            </p>

            <div className="mb-10">
              <p className="text-[16px] sm:text-[18px] font-medium text-black">
                +91 91703 14141
              </p>
              <a
                href="mailto:info@midis.in"
                className="text-black border-b border-gray-700 pb-[3px] text-[14px] sm:text-[16px]"
              >
                INFO@MIDIS.IN
              </a>
            </div>

            <button
              className="
                bg-black text-white
                px-6 sm:px-8 py-3 sm:py-4
                rounded-full text-[15px] sm:text-[16px]
                font-semibold w-fit hover:bg-gray-900
                transition
              "
            >
              LET’S COLLABORATE →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuelingYourGrowthWithFreshIdeas;
