"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf");

const flavorTextures = {
  lemonLime: "/labels/lemon-lime.png",
  grape: "/labels/grape.png",
  blackCherry: "/labels/cherry.png",
  strawberryLemonade: "/labels/strawberry.png",
  watermelon: "/labels/watermelon.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "blackCherry",
  scale = 2,
  ...props
}: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf");
  const labels = useTexture(flavorTextures);

  // Null checks
  if (!nodes || !labels) {
    return null;
  }

  // Fixes upside down labels
  if (labels.strawberryLemonade) labels.strawberryLemonade.flipY = false;
  if (labels.blackCherry) labels.blackCherry.flipY = false;
  if (labels.watermelon) labels.watermelon.flipY = false;
  if (labels.grape) labels.grape.flipY = false;
  if (labels.lemonLime) labels.lemonLime.flipY = false;

  const label = labels[flavor];
  const cylinder = nodes.cylinder as THREE.Mesh | undefined;
  const cylinder1 = nodes.cylinder_1 as THREE.Mesh | undefined;
  const tab = nodes.Tab as THREE.Mesh | undefined;

  if (!cylinder || !cylinder1 || !tab || !label) {
    return null;
  }

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={cylinder.geometry}
        material={metalMaterial}
      />
      <mesh castShadow receiveShadow geometry={cylinder1.geometry}>
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh castShadow receiveShadow geometry={tab.geometry} material={metalMaterial} />
    </group>
  );
}
