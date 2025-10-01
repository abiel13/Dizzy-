import { Float } from "@react-three/drei";
import React from "react";
import { SodaCan } from "./SodaCan";
import { Group } from "three";

type FloatingCanProp = {
  floatingRange?: [number, number];
  rotationIntensity?: number;
  floatIntensity?: number;
  speed?: number;
  flavor?:"lemonLime" | "grape" | "blackCherry" | "strawberryLemonade" | "watermelon" ;
  children?: React.ReactNode;
};

const FloatingCan = React.forwardRef<Group, FloatingCanProp>(
  (
    {
      floatingRange = [-0.1, 0.2],
      rotationIntensity = 3,
      floatIntensity = 2,
      speed = 3,
      children,
      flavor,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref}>
        <Float
          floatingRange={floatingRange}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          speed={speed}
          {...props}
        >
          {children}
          <SodaCan flavor={flavor}/>
        </Float>
      </group>
    );
  },
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
