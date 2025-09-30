"use client";

import { Canvas } from "@react-three/fiber";
import { SodaCan } from "./SodaCan";
import { Environment, Float } from "@react-three/drei";

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
      <Float
      floatingRange={[-0.1, 0.4]}
      rotationIntensity={4}
      floatIntensity={.9}
      >
        <SodaCan />
      </Float>

      <Environment files={"/hdrs/lobby.hdr"} backgroundIntensity={1.5} />
    </Canvas>
  );
};

export default ViewCanvas;
