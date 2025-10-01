"use client";
import React, { useRef } from "react";
import { Group } from "three";
import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "./FloatingCan";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ThreeText = () => {
  const isDesktop = useMediaQuery("(min-width: 680px)", true);

  const wordsArray = ["DIZZY", "IS", "AWESOME", "DIVE", "IN"];
  const material = new THREE.MeshLambertMaterial();

  return wordsArray.map((word, idx) => (
    <Text
      key={idx}
      color={"orange"}
      material={material}
      scale={isDesktop ? 1 : 0.5}
      font="/font/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    >
      {word}
    </Text>
  ));
};

const SkyScene = () => {
  const canRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);
  const cloud1Ref = useRef<Group>(null);
  const cloud2Ref = useRef<Group>(null);
  const cloudsRef = useRef<Group>(null);
  const wordsRef = useRef<Group>(null);

  const ANGLE = 75 * (Math.PI / 180);
  const getXpostion = (distance: number) => distance * Math.cos(ANGLE);

  const getYpostion = (distance: number) => distance * Math.sin(ANGLE);

  const getXYpostion = (distance: number) => ({
    y: getYpostion(-1 * distance),
    x: getXpostion(distance),
  });

  useGSAP(() => {
    if (
      !canRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current ||
      !cloudsRef.current ||
      !wordsRef.current
    )
      return;

    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, {
      ...getXYpostion(-4),
    });
    gsap.set(
      wordsRef.current.children.map((child, i) => child.position),
      {
        ...getXYpostion(7),
        z: 2,
      },
    );

    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.5,
      ease: "none",
      repeat: -1,
    });

    const DISTANCE = 15;
    const Delay = 6;

    gsap.set([cloud1Ref.current.position, cloud2Ref.current.position], {
      ...getXYpostion(DISTANCE),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+= ${getYpostion(DISTANCE * 2)}`,
      x: `+= ${getXpostion(DISTANCE * -2)}`,
      ease: "none",
      duration: Delay,
      repeat: -1,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+= ${getYpostion(DISTANCE * 2)}`,
      x: `+= ${getXpostion(DISTANCE * -2)}`,
      ease: "none",
      duration: Delay,
      repeat: -1,
      delay: Delay / 2,
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".drinkdive",
        start: "top top",
        end: "+=2000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    scrollTimeline
      .to("body", {
        backgroundColor: "#c0f0f5",
        duration: 0.1,
        overwrite: "auto",
      })

      .to(cloudsRef.current.position, {
        z: 0,
        duration: 0.3,
      })
      .to(canRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
      })
      .to(
        wordsRef.current.children.map((child, i) => child.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYpostion(-7), z: -7 },
          ],
          stagger:0.3,
          ease: "back.in(1.7)",
        },
        0
      )
      .to(
        canRef.current.position,
        {
          ...getXYpostion(4),
          duration: 0.5,
          ease: "back.in(1.7)",
        },
        0,
      );
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          rotationIntensity={0}
          floatIntensity={0}
          flavor="grape"
          ref={canRef}
        />
      </group>
      <group ref={wordsRef}>
        <ThreeText />
      </group>
      <Clouds ref={cloudsRef}>
        <Cloud bounds={[10, 10, 2]} ref={cloud1Ref} />
        <Cloud bounds={[10, 10, 2]} ref={cloud2Ref} />
      </Clouds>
      <ambientLight intensity={2} color={"#9ddefa"} />#
      <Environment files={"/hdrs/field.hdr"} environmentIntensity={1.5} />
    </group>
  );
};

export default SkyScene;

// £9ddefa
