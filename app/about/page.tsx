'use client'

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted) return;

    const elements = [titleRef.current, ...Array.from(contentRef.current?.children || [])].filter(Boolean);
    gsap.set(elements, { opacity: 0, y: 50 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    })
    .to(contentRef.current?.children, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    }, "-=0.5");
  }, [mounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-32">
        <div ref={titleRef} className="mb-20 text-center opacity-0">
          <h1 className="text-7xl font-black text-gray-900 md:text-9xl mb-6">About Drizzy</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Crafting exceptional beverages that bring life to every moment
          </p>
        </div>

        <div ref={contentRef} className="max-w-4xl mx-auto space-y-12">
          <div className="opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Drizzy was born from a simple idea: drinks should be more than just refreshment. 
              They should be an experience, a moment of joy, a burst of flavor that makes your day better. 
              We've spent years perfecting our recipes, sourcing the finest ingredients, and creating 
              flavors that truly stand out.
            </p>
          </div>

          <div className="opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To revolutionize the beverage industry by creating drinks that are not only delicious 
              but also made with care for our planet. Every can of Drizzy represents our commitment 
              to quality, sustainability, and bringing people together through great taste.
            </p>
          </div>

          <div className="opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-2xl mr-3">✨</span>
                <span>Premium natural ingredients sourced from trusted partners</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">🌱</span>
                <span>Eco-friendly packaging and sustainable production methods</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">🎯</span>
                <span>Unique flavor combinations crafted by expert mixologists</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">💪</span>
                <span>Natural energy boost without the crash</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center opacity-0" ref={(el) => {
          if (el && mounted) {
            gsap.to(el, { opacity: 1, duration: 1, delay: 1.5 });
          }
        }}>
          <Link 
            href="/" 
            className="inline-block px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

