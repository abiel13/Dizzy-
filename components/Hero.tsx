"use client";

import { useRef, useEffect, useState } from "react";
import { Environment, Float } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Canvas3D from "./Canvas3D";
import { SodaCan } from "./SodaCan";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function HeroScene() {
  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  useGSAP(() => {
    if (!can1Ref.current || !can2Ref.current || !can3Ref.current || 
        !can4Ref.current || !can5Ref.current || !groupRef.current) return;

    // Final positions - centered and visible on screen
    gsap.set(can1Ref.current.position, { x: -1.8, y: 0, z: 0 });
    gsap.set(can2Ref.current.position, { x: 1.8, y: 0, z: 0 });
    gsap.set(can3Ref.current.position, { x: 0, y: 1.2, z: 0 });
    gsap.set(can4Ref.current.position, { x: -1.2, y: -1, z: 0 });
    gsap.set(can5Ref.current.position, { x: 1.2, y: -1, z: 0 });

    // Matrix-style smooth materialization - cans materialize from particles
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Start as invisible particles (scale 0) at different starting positions
    gsap.set(can1Ref.current.scale, { x: 0, y: 0, z: 0 });
    gsap.set(can2Ref.current.scale, { x: 0, y: 0, z: 0 });
    gsap.set(can3Ref.current.scale, { x: 0, y: 0, z: 0 });
    gsap.set(can4Ref.current.scale, { x: 0, y: 0, z: 0 });
    gsap.set(can5Ref.current.scale, { x: 0, y: 0, z: 0 });
    
    // Start positions - far from center, different directions
    gsap.set(can1Ref.current.position, { x: -6, y: -4, z: -5 }); // Bottom left
    gsap.set(can2Ref.current.position, { x: 6, y: -4, z: -5 }); // Bottom right
    gsap.set(can3Ref.current.position, { x: 0, y: 6, z: -5 }); // Top center
    gsap.set(can4Ref.current.position, { x: -5, y: 3, z: -5 }); // Top left
    gsap.set(can5Ref.current.position, { x: 5, y: 3, z: -5 }); // Top right
    
    // Start rotations - spinning fast
    gsap.set(can1Ref.current.rotation, { x: 0, y: Math.PI * 2, z: 0 });
    gsap.set(can2Ref.current.rotation, { x: 0, y: -Math.PI * 2, z: 0 });
    gsap.set(can3Ref.current.rotation, { x: 0, y: Math.PI, z: 0 });
    gsap.set(can4Ref.current.rotation, { x: 0, y: Math.PI * 1.5, z: 0 });
    gsap.set(can5Ref.current.rotation, { x: 0, y: -Math.PI * 1.5, z: 0 });
    
    // Can 1 - materializes from particle (scale 0 -> 3.5) while moving
    tl.to(can1Ref.current.scale, {
      x: 3.5,
      y: 3.5,
      z: 3.5,
      duration: 0.8,
      ease: "back.out(1.5)",
    })
    .to(can1Ref.current.position, {
      x: -1.8,
      y: 0,
      z: 0,
      duration: 1,
      ease: "power3.out",
    }, "<0.1")
    .to(can1Ref.current.rotation, {
      x: 0,
      y: 0,
      z: 0.3,
      duration: 1,
      ease: "power2.out",
    }, "<")
    
    // Can 2 - materializes from particle
    .to(can2Ref.current.scale, {
      x: 3.5,
      y: 3.5,
      z: 3.5,
      duration: 0.8,
      ease: "back.out(1.5)",
    }, "-=0.5")
    .to(can2Ref.current.position, {
      x: 1.8,
      y: 0,
      z: 0,
      duration: 1,
      ease: "power3.out",
    }, "<0.1")
    .to(can2Ref.current.rotation, {
      x: 0,
      y: 0,
      z: -0.3,
      duration: 1,
      ease: "power2.out",
    }, "<")
    
    // Can 3 - materializes from particle
    .to(can3Ref.current.scale, {
      x: 3.5,
      y: 3.5,
      z: 3.5,
      duration: 0.8,
      ease: "back.out(1.5)",
    }, "-=0.5")
    .to(can3Ref.current.position, {
      x: 0,
      y: 1.2,
      z: 0,
      duration: 1,
      ease: "power3.out",
    }, "<0.1")
    .to(can3Ref.current.rotation, {
      x: 0.2,
      y: 0,
      z: 0,
      duration: 1,
      ease: "power2.out",
    }, "<")
    
    // Can 4 - materializes from particle
    .to(can4Ref.current.scale, {
      x: 3.5,
      y: 3.5,
      z: 3.5,
      duration: 0.8,
      ease: "back.out(1.5)",
    }, "-=0.5")
    .to(can4Ref.current.position, {
      x: -1.2,
      y: -1,
      z: 0,
      duration: 1,
      ease: "power3.out",
    }, "<0.1")
    .to(can4Ref.current.rotation, {
      x: -0.2,
      y: 0,
      z: 0.2,
      duration: 1,
      ease: "power2.out",
    }, "<")
    
    // Can 5 - materializes from particle
    .to(can5Ref.current.scale, {
      x: 3.5,
      y: 3.5,
      z: 3.5,
      duration: 0.8,
      ease: "back.out(1.5)",
    }, "-=0.5")
    .to(can5Ref.current.position, {
      x: 1.2,
      y: -1,
      z: 0,
      duration: 1,
      ease: "power3.out",
    }, "<0.1")
    .to(can5Ref.current.rotation, {
      x: -0.2,
      y: 0,
      z: -0.2,
      duration: 1,
      ease: "power2.out",
    }, "<")
    
    // Group rotation starts after materialization
    .from(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.5,
      ease: "power2.out"
    }, "-=0.3");

    // Continuous floating and rotation animations - MORE DYNAMIC
    const floatAnimation = () => {
      // Individual can floating patterns - bigger movements, starting from higher base
      gsap.to(can1Ref.current.position, {
        y: "+=1.2",
        x: "-=0.5",
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(can2Ref.current.position, {
        y: "+=1",
        x: "+=0.5",
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.3,
      });
      gsap.to(can3Ref.current.position, {
        y: "+=1.5",
        z: "-=0.3",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.6,
      });
      gsap.to(can4Ref.current.position, {
        y: "+=1.1",
        x: "-=0.4",
        z: "+=0.3",
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.2,
      });
      gsap.to(can5Ref.current.position, {
        y: "+=1.3",
        x: "+=0.4",
        z: "+=0.3",
        duration: 2.7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.4,
      });

      // Individual can rotations - more dramatic
      gsap.to(can1Ref.current.rotation, {
        z: "+=0.8",
        y: "+=0.3",
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(can2Ref.current.rotation, {
        z: "-=0.8",
        y: "-=0.3",
        duration: 4.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(can3Ref.current.rotation, {
        x: "+=0.5",
        y: "+=0.4",
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(can4Ref.current.rotation, {
        x: "-=0.4",
        z: "+=0.6",
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(can5Ref.current.rotation, {
        x: "-=0.4",
        z: "-=0.6",
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    };

    floatAnimation();

    // Main group slow rotation
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: 30,
      repeat: -1,
      ease: "none",
    });

    // Scroll-triggered animation
    ScrollTrigger.create({
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (groupRef.current) {
          gsap.to(groupRef.current.rotation, {
            y: Math.PI * 2 * progress * 0.6,
            duration: 0.1,
            ease: "none",
          });
        }
        // Parallax effect on individual cans
        if (can1Ref.current) {
          gsap.to(can1Ref.current.position, {
            z: -progress * 3,
            duration: 0.1,
          });
        }
        if (can2Ref.current) {
          gsap.to(can2Ref.current.position, {
            z: -progress * 2.5,
            duration: 0.1,
          });
        }
      },
    });
  }, []);

  return (
    <group ref={groupRef}>
      <group ref={can1Ref}>
        <Float
          floatingRange={[-0.15, 0.25]}
          rotationIntensity={4}
          floatIntensity={4}
          speed={1.8}
        >
          <SodaCan flavor="blackCherry" scale={3.5} />
        </Float>
      </group>
      <group ref={can2Ref}>
        <Float
          floatingRange={[-0.15, 0.25]}
          rotationIntensity={4}
          floatIntensity={4}
          speed={1.8}
        >
          <SodaCan flavor="lemonLime" scale={3.5} />
        </Float>
      </group>
      <group ref={can3Ref}>
        <Float
          floatingRange={[-0.15, 0.25]}
          rotationIntensity={4}
          floatIntensity={4}
          speed={1.8}
        >
          <SodaCan flavor="grape" scale={3.5} />
        </Float>
      </group>
      <group ref={can4Ref}>
        <Float
          floatingRange={[-0.15, 0.25]}
          rotationIntensity={4}
          floatIntensity={4}
          speed={1.8}
        >
          <SodaCan flavor="strawberryLemonade" scale={3.5} />
        </Float>
      </group>
      <group ref={can5Ref}>
        <Float
          floatingRange={[-0.15, 0.25]}
          rotationIntensity={4}
          floatIntensity={4}
          speed={1.8}
        >
          <SodaCan flavor="watermelon" scale={3.5} />
        </Float>
      </group>
      <Environment files="/hdrs/lobby.hdr" environmentIntensity={2.2} />
      <ambientLight intensity={0.8} />
      <pointLight position={[15, 15, 15]} intensity={2} color="#fff" />
      <pointLight position={[-15, -15, -15]} intensity={1.5} color="#ffd700" />
      <pointLight position={[0, 20, 0]} intensity={1.2} color="#87ceeb" />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
    </group>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted) return;

    const elements = [titleRef.current, subtitleRef.current, ctaRef.current].filter(Boolean);
    
    if (elements.length === 0) return;

    // Set initial state
    gsap.set(elements, { opacity: 0, y: 60 });

    // Animate in - FAST
    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power4.out",
    })
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.4")
    .to(ctaRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.3")
    .to(scrollIndicatorRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.2");
  }, [mounted]);

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden bg-gradient-to-br from-amber-400 via-orange-300 to-rose-400">
      {mounted && (
        <div className="absolute inset-0 z-0">
          <Canvas3D
            camera={{ position: [0, 0, 12], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
          >
            <HeroScene />
          </Canvas3D>
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div ref={titleRef} className="mb-8 opacity-0">
          <h1 className="text-8xl font-black tracking-tighter text-white drop-shadow-2xl md:text-[12rem] leading-none transform hover:scale-105 transition-transform duration-300">
            DRIZZY
          </h1>
        </div>
        <div ref={subtitleRef} className="mb-16 max-w-3xl opacity-0">
          <p className="text-3xl font-bold text-white drop-shadow-xl md:text-5xl mb-4">
            More Than Drinks
          </p>
          <p className="text-xl text-white/95 md:text-2xl font-medium drop-shadow-lg">
            Experience the ultimate refreshment with our premium selection of flavors
          </p>
        </div>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 opacity-0">
          <a 
            href="#flavors"
            className="group relative px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full overflow-hidden transition-all hover:scale-110 shadow-2xl hover:shadow-gray-900/50 text-center"
          >
            <span className="relative z-10">Explore Flavors</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a 
            href="/about"
            className="px-12 py-6 text-xl font-bold text-white border-4 border-white rounded-full transition-all hover:scale-110 hover:bg-white hover:text-gray-900 shadow-2xl backdrop-blur-sm bg-white/10 text-center"
          >
            Learn More
          </a>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-0">
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-bold text-white tracking-wider drop-shadow-lg">SCROLL</span>
          <div className="h-14 w-1 bg-white/30 rounded-full relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-white rounded-full" style={{ animation: 'scroll-indicator 2s ease-in-out infinite' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

