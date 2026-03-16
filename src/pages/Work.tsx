"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
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

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    return (
        <div className="w-full max-w-[1400px] mx-auto mb-8 sm:mb-12 md:mb-20 px-4 sm:px-0 group">
            <div className="relative overflow-hidden cursor-pointer bg-[#0A0A0A]">
                {/* Natural image sizing so absolutely nothing is ever cut off */}
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto transform transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                


                {/* Elegant bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100" />
            </div>
        </div>
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
            <section className="pt-36 pb-12 px-6">
                <div className="max-w-[1400px] mx-auto">
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
            <section className="px-0 sm:px-6 pb-20">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </section>







            <Footer />
        </main>
    );
};

export default WorkPage;
