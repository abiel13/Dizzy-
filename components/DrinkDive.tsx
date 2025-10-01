"use client";

import React from "react";
import { Bounded } from "./Bounded";
import { OrbitControls, View } from "@react-three/drei";
import SkyScene from "./SkyScene";

const DrinkDive = () => {
  return (
    <Bounded className="drinkdive h-screen mt-[10vh]">
      <h2 className="sr-only"></h2>

      <View className="h-screen w-screen">
        <SkyScene />
     
      </View>
    </Bounded>
  );
};

export default DrinkDive;
