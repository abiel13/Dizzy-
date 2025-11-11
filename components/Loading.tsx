"use client";

import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLParagraphElement>(null);
  const loadingTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || !titleRef.current) return;

    // Initial animations
    gsap.set([titleRef.current, spinnerRef.current, progressBarRef.current, progressTextRef.current, loadingTextRef.current], {
      opacity: 0,
      y: 20,
    });

    const tl = gsap.timeline();

    // Animate elements in
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .to(spinnerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.4")
    .to([progressBarRef.current, progressTextRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.3")
    .to(loadingTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.3");

    // Animate progress bar
    const progressTween = gsap.to(
      {},
      {
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function () {
          const prog = Math.min(this.progress() * 100, 100);
          setProgress(prog);
        },
        onComplete: () => {
          setIsComplete(true);
        },
      }
    );

    return () => {
      progressTween.kill();
    };
  }, [mounted]);

  useGSAP(() => {
    if (!isComplete || !mounted) return;

    const container = document.querySelector(".loading-container");
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.3 });
    
    // Fade out loading screen
    tl.to(container, {
      opacity: 0,
      scale: 1.05,
      duration: 0.6,
      ease: "power2.out",
    })
    .set(container, {
      display: "none",
    });
  }, [isComplete, mounted]);

  return (
    <div className="loading-container fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 via-orange-300 to-rose-400">
      {/* Animated Logo/Title */}
      <div ref={titleRef} className="mb-12">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl">
          DRIZZY
        </h1>
      </div>

      {/* Animated Cans Spinner */}
      <div ref={spinnerRef} className="relative mb-12 h-24 w-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-4 border-white/20 border-r-white animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-4 border-white/10 border-b-white animate-spin" style={{ animationDuration: '0.6s' }}></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div ref={progressBarRef} className="w-64 md:w-80 mb-4">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-white to-amber-100 rounded-full transition-all duration-300 ease-out shadow-md"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress Text */}
      <p ref={progressTextRef} className="text-white/90 text-lg md:text-xl font-bold">
        {Math.round(progress)}%
      </p>

      {/* Loading Text Animation */}
      <div ref={loadingTextRef} className="mt-8">
        <p className="text-white/80 text-sm md:text-base font-medium animate-pulse">
          Loading your refreshment...
        </p>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}
