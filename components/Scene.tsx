'use client'
import React, { useRef } from "react";
import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "./FloatingCan";
import { useNetworkStore } from "@/stores/networkStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = () => {

  const setReady = useNetworkStore((state) => state.isready)

  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);

  const canGroup1Ref = useRef<Group>(null);
  const canGroup2Ref = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !canGroup1Ref.current ||
      !canGroup2Ref.current ||
      !groupRef.current
    )
      return;


    setReady();
    gsap.set(can1Ref.current.position, {
      x: -1.5,
    });
    gsap.set(can1Ref.current.rotation, {
      z: -0.5,
    });
    gsap.set(can2Ref.current.position, {
      x: 1.5,
    });
    gsap.set(can2Ref.current.position, {
      z: 0.5,
    });
    gsap.set(can3Ref.current.position, {
      y: 5,
      z: 2,
    });

    gsap.set(can4Ref.current.position, {
      x: 2,
      y: 4,
      z: 2,
    });

    gsap.set(can5Ref.current.position, {
      y: -5,
    });

    // animations

    const introTimeLine = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)",
      },
    });

    introTimeLine
      .from(can1Ref.current.position, { y: -5, x: 1 }, 0)
      .from(can1Ref.current.rotation, { z: 3 }, 0)
      .from(can2Ref.current.position, { y: 5, x: 1 }, 0)
      .from(can2Ref.current.rotation, { z: 3 }, 0);

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom ",
        scrub: 1.5,
      },
    });

    scrollTimeline
      .to(groupRef.current.rotation, { y: Math.PI * 2 })
      .to(can1Ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1Ref.current.rotation, { z: 0.3 }, 0)

      .to(can2Ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(can2Ref.current.rotation, { z: 0 }, 0)

      .to(can3Ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
      .to(can3Ref.current.rotation, { z: -0.1 }, 0)

      .to(can4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(can4Ref.current.rotation, { z: 0.3 }, 0)

      .to(can5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(can5Ref.current.rotation, { z: -0.25 }, 0)
      .to(groupRef.current.position, {x:1 , duration:3, ease:'sine.inOut'}, 1.3 )
  });

  return (
    <group ref={groupRef}>
      <group ref={canGroup1Ref}>
        <FloatingCan ref={can1Ref} flavor="blackCherry" />{" "}
      </group>
      <group ref={canGroup2Ref}>
        <FloatingCan ref={can2Ref} flavor="lemonLime" />{" "}
      </group>
      <FloatingCan ref={can3Ref} flavor="watermelon" />{" "}
      <FloatingCan ref={can4Ref} flavor="grape" />{" "}
      <FloatingCan ref={can5Ref} flavor="strawberryLemonade" />
      <Environment files={"/hdrs/lobby.hdr"} backgroundIntensity={1.5} />
    </group>
  );
};

export default Scene;
