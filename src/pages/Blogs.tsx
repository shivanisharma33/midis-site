"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowUpRight } from "lucide-react";

/* ───────────────────────── MOCK DATA ───────────────────────── */

const BLOG_POSTS = [
  {
    id: 1,
    title: "AI-GENERATED ART IS MORE THAN JUST A TREND",
    excerpt: "AI art is often dismissed as \"soulless\" or \"effortless,\" but is that really true?",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "HOW TO PREPARE AI ART FOR PRINTING",
    excerpt: "Essential steps covering resolution, upscaling techniques, color correction, and the best file formats.",
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "HOW AI AND HUMANS WORK TOGETHER",
    excerpt: "How artists guide AI tools to bring unique visions to life, refine outputs, and add the final human touch.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252728f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "THE FUTURE OF CREATIVE AUTOMATION",
    excerpt: "Exploring how automation is changing the workflow of modern creative agencies.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "BEYOND THE PIXEL: THE NEW DESIGN FRONTIER",
    excerpt: "Moving past traditional UI limits into immersive, spatial computing experiences.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "SCALING STARTUPS WITH AI SYSTEMS",
    excerpt: "How lean teams are using AI to compete with industry giants and win.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop",
  }
];

/* ───────────────────────── COMPONENTS ───────────────────────── */

const BlogCard = ({ post }: { post: any }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[1.4/1] overflow-hidden mb-6">
        <img 
          src={post.image} 
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          alt={post.title}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100">
          <span className="text-[10px] font-bold tracking-[0.3em] text-white/70 uppercase">READ THIS POST</span>
          <div className="self-end">
            <ArrowUpRight className="text-white" size={24} />
          </div>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-[22px] md:text-[24px] font-bold leading-[1.1] text-white uppercase mb-3 tracking-tight group-hover:text-orange-500 transition-colors" style={{ fontFamily: 'Anton, sans-serif' }}>
        {post.title}
      </h3>
      <p className="text-[14px] leading-relaxed text-white/40 font-medium">
        {post.excerpt}
      </p>
    </motion.article>
  );
};

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-black min-h-screen text-white selection:bg-orange-600 selection:text-white pb-20">
            <Navigation />

            {/* Immersive Header Section with Hero Image */}
            <header className="relative min-h-[70vh] flex items-center pt-48 pb-24 px-6 lg:px-24 overflow-hidden">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2000&auto=format&fit=crop" 
                        alt="Blog Hero" 
                        className="w-full h-full object-cover grayscale opacity-40 animate-pulse-slow scale-110"
                    />
                    {/* Gradient Overlays for a clean transition */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="max-w-[1400px] mx-auto relative z-10 w-full">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="text-[14vw] md:text-[10vw] font-black leading-tight tracking-tighter uppercase mb-4"
                        style={{ fontFamily: 'Anton, sans-serif' }}
                    >
                         BLOGS
                    </motion.h1>
                    <p className="text-[12px] md:text-[14px] font-black tracking-[0.6em] text-orange-500 uppercase mt-4">
                        INSIGHTS • STRATEGY • INNOVATION
                    </p>
                </div>
            </header>

            {/* Grid Section */}
            <section className="py-16 md:py-24 px-6 lg:px-24">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-10 md:gap-y-20">
                        {BLOG_POSTS.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Pagination / Load More (Stylized) */}
            <div className="flex justify-center mt-20 mb-32">
                <button className="px-12 py-4 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
                    Load More Entries
                </button>
            </div>

            <Footer />

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }} />
        </main>
    );
};

export default BlogPage;
