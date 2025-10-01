"use client";

import {  View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const ViewCanvas = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        overflow: "hidden",
        pointerEvents: "none",
        transform: "translateX(-50%)",
        zIndex: 30,
      }}
      shadows
      camera={{
        fov: 30,
      }}
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
    >
      <View.Port />

    </Canvas>
  );
};

export default ViewCanvas;
