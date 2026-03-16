import React from "react";
import { motion } from "framer-motion";
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const Blog = () => {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-orange-600 selection:text-white">
      <Navigation />

      {/* ================= NEW PREMIUM BLOG HERO ================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-black text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop" 
            alt="Blogs Background" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Main Heading */}
            <div className="text-center relative">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[clamp(2.5rem,10vw,12rem)] leading-[0.85] font-normal uppercase tracking-tight" 
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                STORIES &
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[clamp(2.5rem,10vw,12rem)] leading-[0.85] font-normal uppercase tracking-tight mt-1" 
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                <span>GLOBAL</span>
                <div className="relative inline-block w-[1.5em] h-[0.6em] md:w-[2em] md:h-[0.8em] overflow-hidden rounded-full ring-2 ring-orange-500/20 shadow-xl vertical-middle mx-2 mt-[0.05em]">
                  <img 
                    src="/abstract_oval.png" 
                    alt="Articles Decorative" 
                    className="w-full h-full object-cover scale-150 animate-pulse-slow"
                  />
                </div>
                <span>ARTICLES</span>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed font-medium mt-12 mb-8 px-4"
            >
              A place to read, write, and deepen your understanding of the digital landscape.
            </motion.p>
          </motion.div>

          {/* scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex justify-center"
          >
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
            >
              <div className="w-1 h-2 bg-orange-500 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= RECENT BLOGS - MOBILE FIRST ================= */}
      <section className="w-full bg-black">
        <div className="container-responsive section-spacing-lg">

          {/* Section heading */}
          <h2 className="text-heading-md text-white mb-8 sm:mb-10 md:mb-14">
            Recent Blogs
          </h2>

          {/* Blog grid - Mobile first: 1 col → 2 cols (tablet) → 3 cols (desktop) */}
          <div className="grid-3-col">

            {/* Blog Card 1 */}
            <article className="rounded-2xl md:rounded-3xl overflow-hidden bg-[#1A1A1A] hover:bg-[#222] transition-colors">
              <div className="relative">
                <img
                  src="https://cdn.prod.website-files.com/6730614b3d201ddcf88f344b/67308a182c39026fe235e8e2_blog-thumb-1-p-800.jpg"
                  className="w-full aspect-[16/10] object-cover"
                  alt="Blog thumbnail"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                  Design
                </span>
              </div>

              <div className="element-padding-sm">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">
                  How to create stunning visual designs
                </h3>
                <p className="text-caption text-gray-400 mb-3 md:mb-4 line-clamp-2">
                  Learn the essential principles of visual design that will elevate your creative work.
                </p>

                <div className="flex items-center justify-between text-caption text-gray-500">
                  <span>📅 Nov 10, 2024</span>
                  <span>⏱ 5 mins</span>
                </div>

                <button className="mt-4 md:mt-5 w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 md:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                  Read Article
                </button>
              </div>
            </article>

            {/* Blog Card 2 */}
            <article className="rounded-2xl md:rounded-3xl overflow-hidden bg-[#1A1A1A] hover:bg-[#222] transition-colors">
              <div className="relative">
                <img
                  src="https://cdn.prod.website-files.com/6730614b3d201ddcf88f344b/67308a18f359e3de76889259_blog-thumb-2-p-800.jpg"
                  className="w-full aspect-[16/10] object-cover"
                  alt="Blog thumbnail"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                  Development
                </span>
              </div>

              <div className="element-padding-sm">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">
                  Modern web development practices
                </h3>
                <p className="text-caption text-gray-400 mb-3 md:mb-4 line-clamp-2">
                  Explore the latest tools and techniques shaping the future of web development.
                </p>

                <div className="flex items-center justify-between text-caption text-gray-500">
                  <span>📅 Nov 9, 2024</span>
                  <span>⏱ 7 mins</span>
                </div>

                <button className="mt-4 md:mt-5 w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 md:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                  Read Article
                </button>
              </div>
            </article>

            {/* Blog Card 3 */}
            <article className="rounded-2xl md:rounded-3xl overflow-hidden bg-[#1A1A1A] hover:bg-[#222] transition-colors">
              <div className="relative">
                <img
                  src="https://cdn.prod.website-files.com/6730614b3d201ddcf88f344b/67308a18e8d7e1c06df02cb6_blog-thumb-3-p-800.jpg"
                  className="w-full aspect-[16/10] object-cover"
                  alt="Blog thumbnail"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                  Marketing
                </span>
              </div>

              <div className="element-padding-sm">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">
                  Digital marketing strategies that work
                </h3>
                <p className="text-caption text-gray-400 mb-3 md:mb-4 line-clamp-2">
                  Discover proven marketing tactics to grow your online presence and reach.
                </p>

                <div className="flex items-center justify-between text-caption text-gray-500">
                  <span>📅 Nov 8, 2024</span>
                  <span>⏱ 6 mins</span>
                </div>

                <button className="mt-4 md:mt-5 w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 md:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                  Read Article
                </button>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ================= ALL BLOGS - MOBILE FIRST ================= */}
      <section className="w-full bg-white">
        <div className="container-responsive section-spacing-lg">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-heading-md text-black">
              All Blog Posts
            </h2>

            {/* Filter buttons - Stack on mobile, row on tablet+ */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button className="px-4 py-2 text-xs sm:text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                All
              </button>
              <button className="px-4 py-2 text-xs sm:text-sm font-medium bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors">
                Design
              </button>
              <button className="px-4 py-2 text-xs sm:text-sm font-medium bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors">
                Development
              </button>
              <button className="px-4 py-2 text-xs sm:text-sm font-medium bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors">
                Marketing
              </button>
            </div>
          </div>

          {/* Blog grid - Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
          <div className="grid-3-col">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all group">
                <div className="relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${1600000000000 + i * 1000000}?auto=format&fit=crop&w=800&q=80`}
                    className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={`Blog post ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="element-padding-sm">
                  <span className="inline-block text-xs sm:text-sm font-medium text-orange-500 mb-2">
                    {i % 3 === 0 ? 'Design' : i % 3 === 1 ? 'Development' : 'Marketing'}
                  </span>

                  <h3 className="text-lg sm:text-xl font-semibold text-black mb-2 group-hover:text-orange-500 transition-colors">
                    Blog Post Title {i + 1}
                  </h3>

                  <p className="text-caption text-gray-600 mb-4 line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                  </p>

                  <div className="flex items-center justify-between text-caption text-gray-500">
                    <span>📅 Nov {7 - i}, 2024</span>
                    <span>⏱ {4 + i} mins</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load more button */}
          <div className="flex justify-center mt-10 sm:mt-12 md:mt-16">
            <button className="btn-responsive-lg bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Load More Articles
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blog;
