'use client'

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || !formRef.current) return;

    const formElements = Array.from(formRef.current.elements);
    const elements = [titleRef.current, ...formElements].filter(Boolean);
    gsap.set(elements, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    })
    .to(formElements, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.5");
  }, [mounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-32">
        <div ref={titleRef} className="mb-16 text-center opacity-0">
          <h1 className="text-7xl font-black text-gray-900 md:text-9xl mb-6">Get in Touch</h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form ref={formRef} className="space-y-6 bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
            <div className="opacity-0">
              <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-lg"
                placeholder="Your name"
              />
            </div>

            <div className="opacity-0">
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-lg"
                placeholder="your@email.com"
              />
            </div>

            <div className="opacity-0">
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-lg resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <div className="opacity-0 pt-4">
              <button
                type="submit"
                className="w-full px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:scale-105 transition-transform shadow-xl"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-12 text-center opacity-0" ref={(el) => {
            if (el && mounted) {
              gsap.to(el, { opacity: 1, duration: 1, delay: 1.2 });
            }
          }}>
            <Link 
              href="/" 
              className="inline-block px-10 py-4 text-lg font-bold text-gray-900 border-4 border-gray-900 rounded-full hover:scale-105 transition-transform hover:bg-gray-900 hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

