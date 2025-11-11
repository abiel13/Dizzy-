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

const flavors = [
  { name: "Black Cherry", flavor: "blackCherry", color: "from-red-700 to-red-900", desc: "Bold and rich" },
  { name: "Lemon Lime", flavor: "lemonLime", color: "from-green-400 to-green-600", desc: "Zesty and fresh" },
  { name: "Grape", flavor: "grape", color: "from-purple-500 to-purple-700", desc: "Sweet and smooth" },
  { name: "Strawberry Lemonade", flavor: "strawberryLemonade", color: "from-pink-400 to-pink-600", desc: "Tart and fruity" },
  { name: "Watermelon", flavor: "watermelon", color: "from-red-400 to-red-600", desc: "Juicy and refreshing" },
];

function FlavorCard({ name, flavor, color, desc, index }: { 
  name: string; 
  flavor: any; 
  color: string; 
  desc: string;
  index: number;
}) {
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<Group>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!cardRef.current || !mounted) return;

    gsap.set([cardRef.current, textRef.current], { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%",
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(cardRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(textRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4");

        if (canRef.current) {
          // Epic rotation animation
          gsap.fromTo(
            canRef.current.rotation,
            { y: Math.PI * 2, x: Math.PI * 0.5 },
            {
              y: 0,
              x: 0,
              duration: 1.5,
              ease: "back.out(1.7)",
            }
          );
          // Scale animation
          gsap.fromTo(
            canRef.current.scale,
            { x: 0.5, y: 0.5, z: 0.5 },
            {
              x: 1,
              y: 1,
              z: 1,
              duration: 1.2,
              ease: "elastic.out(1, 0.5)",
            }
          );
        }
      },
    });
  }, [mounted]);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${color} p-12 shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:-translate-y-2`}
    >
      <div className="relative z-10 h-96 mb-6">
        {mounted && (
          <Canvas3D camera={{ position: [0, 0, 8], fov: 45 }}>
            <group ref={canRef}>
              <Float
                floatingRange={[-0.2, 0.3]}
                rotationIntensity={4}
                floatIntensity={3}
                speed={3}
              >
                <SodaCan flavor={flavor} scale={4} />
              </Float>
            </group>
            <Environment files="/hdrs/lobby.hdr" environmentIntensity={1.5} />
            <ambientLight intensity={0.8} />
            <pointLight position={[8, 8, 8]} intensity={1.5} />
            <pointLight position={[-8, -8, -8]} intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} />
          </Canvas3D>
        )}
      </div>
      <div ref={textRef} className="text-center opacity-0">
        <h3 className="text-4xl font-black text-white mb-3 drop-shadow-lg">{name}</h3>
        <p className="text-white/95 text-xl font-medium">{desc}</p>
      </div>
    </div>
  );
}

export default function Flavors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!titleRef.current || !mounted) return;

    gsap.set(titleRef.current, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      },
    });
  }, [mounted]);

  return (
    <section id="flavors" ref={sectionRef} className="py-32 bg-gradient-to-br from-white via-amber-50 to-orange-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="mb-20 text-center opacity-0">
          <h2 className="text-6xl font-black text-gray-900 md:text-8xl mb-6">Our Flavors</h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Five incredible flavors crafted to perfection
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {flavors.map((flavor, index) => (
            <FlavorCard key={flavor.name} {...flavor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

