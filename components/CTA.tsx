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

function CTAScene() {
  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  useGSAP(() => {
    if (!can1Ref.current || !can2Ref.current || !can3Ref.current || !groupRef.current) return;

    gsap.set(can1Ref.current.position, { x: -2, y: 0, z: 0 });
    gsap.set(can2Ref.current.position, { x: 0, y: 0, z: 0 });
    gsap.set(can3Ref.current.position, { x: 2, y: 0, z: 0 });

    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <group ref={groupRef}>
      <group ref={can1Ref}>
        <Float floatingRange={[-0.2, 0.3]} rotationIntensity={3} floatIntensity={3} speed={1.5}>
          <SodaCan flavor="blackCherry" scale={3} />
        </Float>
      </group>
      <group ref={can2Ref}>
        <Float floatingRange={[-0.2, 0.3]} rotationIntensity={3} floatIntensity={3} speed={1.5}>
          <SodaCan flavor="lemonLime" scale={3} />
        </Float>
      </group>
      <group ref={can3Ref}>
        <Float floatingRange={[-0.2, 0.3]} rotationIntensity={3} floatIntensity={3} speed={1.5}>
          <SodaCan flavor="grape" scale={3} />
        </Float>
      </group>
      <Environment files="/hdrs/lobby.hdr" environmentIntensity={1.8} />
      <ambientLight intensity={0.6} />
      <pointLight position={[8, 8, 8]} intensity={1.2} />
      <pointLight position={[-8, -8, -8]} intensity={0.8} />
    </group>
  );
}

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!contentRef.current || !mounted) return;

    gsap.set(contentRef.current, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(contentRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        });
      },
    });
  }, [mounted]);

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-rose-500">
      {mounted && (
        <div className="absolute inset-0 opacity-15">
          <Canvas3D camera={{ position: [0, 0, 7], fov: 50 }}>
            <CTAScene />
          </Canvas3D>
        </div>
      )}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 text-center opacity-0">
        <h2 className="mb-8 text-6xl font-black text-gray-900 md:text-8xl">
          Ready to Experience Drizzy?
        </h2>
        <p className="mb-16 text-3xl text-gray-800 max-w-3xl mx-auto">
          Join thousands of satisfied customers and discover your new favorite drink
        </p>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <button className="group relative px-12 py-6 text-2xl font-bold text-white bg-gray-900 rounded-full overflow-hidden transition-all hover:scale-110 shadow-2xl">
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <button className="px-12 py-6 text-2xl font-bold text-gray-900 border-4 border-gray-900 bg-transparent rounded-full transition-all hover:scale-110 hover:bg-gray-900 hover:text-white shadow-2xl">
            Find a Store
          </button>
        </div>
      </div>
    </section>
  );
}

