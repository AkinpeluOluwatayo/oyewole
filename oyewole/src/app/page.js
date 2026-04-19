"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';

// Register the plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio() {
  const container = useRef();

  useGSAP(() => {
    // 1. Hero Reveal
    const heroSplit = new SplitType('.hero-reveal', { types: 'lines,words' });

    gsap.from(heroSplit.lines, {
      y: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.5
    });

    // 2. Section Headers Reveal on Scroll
    const headers = gsap.utils.toArray('.section-header');
    headers.forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out"
      });
    });

    // Cleanup
    return () => {
      heroSplit.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: container });

  const keynoteFeatures = [
    {
      title: "The 2026 Summit Keynote",
      category: "Global Tech Conference",
      year: "Dubai",
      image: "/images/image1.PNG",
      link: "https://www.instagram.com/reel/DXSgMdlArMD/?igsh=MXQ2ZjN0NnFqeXJoNA=="
    },
    {
      title: "Creative Authenticity",
      category: "Vogue Creative Series",
      year: "Virtual",
      image: "/images/image2.PNG",
      link: "https://www.instagram.com/reel/DXMtnHPgn5d/?igsh=OWgwMHJkNnJuY240"
    },
    {
      title: "Leading with Presence",
      category: "Executive Seminar",
      year: "Lagos",
      image: "/images/image3.PNG",
      link: "https://www.instagram.com/reel/DV_364bDohU/?igsh=dTY1M3F4aHdvOTMy"
    },
  ];

  return (
      <main ref={container} className="relative overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-8 md:px-16 md:py-10 mix-blend-difference text-white">
          <div className="text-lg md:text-xl font-serif font-bold tracking-tighter uppercase">DANIEL OYEWOLE</div>
          <div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.4em] font-bold">
            <a href="#about" className="hover:opacity-50 transition-opacity">Perspective</a>
            <a href="#features" className="hover:opacity-50 transition-opacity">Featured Talks</a>
            <a href="#speaking" className="hover:opacity-50 transition-opacity">Keynotes</a>
          </div>
          <div className="md:hidden text-[9px] uppercase tracking-widest font-bold">Menu // 26</div>
        </nav>

        {/* Hero Section - UPDATED TO GROBOLD */}
        <section className="min-h-screen flex items-center px-6 md:px-16 pt-20 md:pt-0">
          <div className="max-w-7xl w-full mx-auto">
            <h1 className="hero-reveal text-[18vw] md:text-[10vw] leading-[0.85] font-grobold tracking-tight mb-8 md:mb-12 uppercase">
              Public <br /> <span className="ml-[5vw] md:ml-[10vw]">Speaker</span>
            </h1>
            <p className="hero-reveal max-w-lg text-lg md:text-2xl font-light opacity-60 leading-relaxed">
              An international public speaker and creative visionary crafting narratives that define the future of human presence in the digital age.
            </p>
          </div>
        </section>

        {/* Philosophy & Portrait Section */}
        <section id="about" className="py-24 md:py-48 px-6 md:px-16 bg-foreground text-background">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="aspect-[3/4] relative overflow-hidden group border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000 order-2 md:order-1 bg-zinc-900">
              <Image
                  src="/images/Daniel.PNG"
                  alt="Daniel Oyewole"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
              />
              <div className="absolute bottom-4 left-4 text-[8px] uppercase tracking-widest opacity-40">Portrait // 001</div>
            </div>

            <div className="flex flex-col justify-center space-y-6 md:space-y-10 order-1 md:order-2">
              <h2 className="section-header text-4xl md:text-7xl font-serif leading-tight text-background">
                Presence <br /><span className="italic text-background/60">as a Platform.</span>
              </h2>
              <p className="text-lg md:text-2xl text-background/70 font-light leading-relaxed">
                I tell real stories that face the truth, spark deep thinking, and push real change.
              </p>
            </div>
          </div>
        </section>

        {/* Swiper Gallery */}
        <section id="features" className="py-24 md:py-40 px-6 md:px-16 bg-[#f0f0f0] dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-16 gap-4">
              <h2 className="section-header text-5xl md:text-8xl font-serif tracking-tighter italic">Featured Engagements</h2>
              <div className="text-[10px] uppercase tracking-widest opacity-40 pb-2">Swipe to explore</div>
            </div>

            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1.05}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                breakpoints={{
                  768: { slidesPerView: 2.2, spaceBetween: 40 }
                }}
                pagination={{ clickable: true }}
                className="w-full h-[60vh] md:h-[75vh]"
            >
              {keynoteFeatures.map((project, index) => (
                  <SwiperSlide key={index}>
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block h-full w-full overflow-hidden bg-zinc-900"
                    >
                      <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                      />
                      <div className="relative z-10 h-full w-full flex flex-col justify-between p-8 md:p-10 text-white">
                        <div className="flex justify-between text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold opacity-80">
                          <span>{project.year}</span>
                          <span>{project.category}</span>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-3xl md:text-5xl font-serif italic tracking-tighter leading-[1.1]">
                            {project.title}
                          </h3>
                          <div className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            View Reel →
                          </div>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Speaking Topics */}
        <section id="speaking" className="py-24 md:py-48 px-6 md:px-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-header text-5xl md:text-8xl font-serif mb-12 md:mb-24 tracking-tighter">Signature Keynotes</h2>
            <div className="divide-y divide-foreground/10 border-t border-foreground/10">
              {[
                { title: "The Architecture of Influence", desc: "Understanding how presence shapes professional trajectory." },
                { title: "Digital Authenticity", desc: "Commanding the stage while navigating an automated world." },
                { title: "Unredacted Speaker", desc: "How storytelling optimizes life clarity and growth." }
              ].map((topic, i) => (
                  <div key={i} className="group py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 hover:px-0 md:hover:px-8 transition-all duration-700 cursor-pointer">
                    <h4 className="text-2xl md:text-5xl font-serif italic group-hover:opacity-40 transition-opacity">{topic.title}</h4>
                    <p className="text-sm opacity-50 md:max-w-xs font-light tracking-wide italic leading-relaxed">{topic.desc}</p>
                    <div className="hidden md:flex h-10 w-10 border border-foreground/20 rounded-full items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                      →
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-32 md:py-64 px-6 md:px-16 text-center">
          <h2 className="text-6xl md:text-[14vw] font-serif leading-none tracking-tighter italic mb-12 md:mb-20">Dialogue.</h2>
          <div className="space-y-4">
            <a href="mailto:oyewoleope28@gmail.com" className="text-xl md:text-5xl font-serif border-b border-foreground/20 pb-2 md:pb-3 hover:opacity-50 transition-opacity inline-block tracking-tight">
              hello@oyewole.me
            </a>
            <div className="pt-12 md:pt-20 flex justify-center flex-wrap gap-8 md:gap-12 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">
              <a href="https://www.instagram.com/daniel_oyewole1?igsh=MTVoNjU4bTB2eXU1Zg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Instagram</a>
              <a href="https://www.linkedin.com/in/daniel-oyewole-7b898722a?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">LinkedIn</a>
              <a href="https://wa.me/2349015037984" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">WhatsApp</a>
              <a href="https://x.com/danieloyewole12?s=21" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Twitter / X</a>
            </div>
          </div>
        </footer>
      </main>
  );
}