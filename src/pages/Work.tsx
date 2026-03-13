"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// dynamically build a list of projects based on the images stored in public
// folder "New folder (8)". We encode the folder name to handle spaces and
// parentheses; the files are numbered sequentially starting at 1. Adjust
// IMAGE_COUNT if more images are added later.
const FOLDER_NAME = "New folder (8)";
const IMAGE_COUNT = 47; // update if images are added/removed
const encodedFolder = encodeURI(FOLDER_NAME);
const projects = Array.from({ length: IMAGE_COUNT }, (_, idx) => ({
    title: `Project ${idx + 1}`,
    image: `/${encodedFolder}/${idx + 1}.jpg`,
}));

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.33, 1, 0.68, 1] }}
            style={{ scale, rotateX, transformPerspective: 1000 }}
            className="w-full max-w-[900px] mx-auto mb-6"
        >
            <div className="relative overflow-hidden rounded-xl aspect-[16/9] cursor-pointer">
                <motion.div style={{ y }} className="absolute inset-0">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30" />
            </div>
        </motion.div>
    );
};

const WorkPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-black min-h-screen">
            <Navigation />

            {/* Header */}
            <section className="pt-36 pb-10 px-6">
                <div className="max-w-[900px] mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl font-medium text-white"
                    >
                        Featured Works
                    </motion.h1>
                    {/* scroll hint */}
                    <motion.div
                        className="mt-6"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.4 }}
                    >
                        <svg
                            className="w-6 h-6 text-white mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* Projects */}
            <section className="px-6 pb-20">
                {projects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} />
                ))}
            </section>







            <Footer />
        </main>
    );
};

export default WorkPage;
