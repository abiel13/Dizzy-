"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  {
    icon: "🍃",
    title: "Natural Ingredients",
    description: "Made with real fruit extracts and natural flavors for authentic taste",
  },
  {
    icon: "⚡",
    title: "Energy Boost",
    description: "Get the energy you need without the crash, powered by natural sources",
  },
  {
    icon: "💧",
    title: "Hydration",
    description: "Stay refreshed and hydrated throughout your day with every sip",
  },
  {
    icon: "🌍",
    title: "Eco-Friendly",
    description: "Committed to sustainable packaging and environmentally conscious practices",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!featuresRef.current || !titleRef.current || !mounted) return;

    const cards = Array.from(featuresRef.current.children);
    gsap.set([titleRef.current, ...cards], { opacity: 0, y: 60 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        })
        .to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }, "-=0.5");
      },
    });
  }, [mounted]);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="mb-20 text-center opacity-0">
          <h2 className="text-6xl font-black text-gray-900 md:text-8xl mb-6">Why Choose Drizzy?</h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            More than just a drink, it's an experience
          </p>
        </div>
        <div ref={featuresRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white/90 backdrop-blur-sm p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-110 hover:-translate-y-3 border-2 border-transparent hover:border-orange-200"
            >
            <div className="mb-6 text-7xl transform transition-all duration-500 hover:scale-125 hover:rotate-12 hover:drop-shadow-2xl">
              {feature.icon}
            </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

