"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { CanvasProps } from "@react-three/fiber";
import { ReactNode } from "react";

interface Canvas3DProps extends Omit<CanvasProps, 'children'> {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function Canvas3D({ children, fallback = null, ...props }: Canvas3DProps) {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    mountedRef.current = true;
    
    const checkReady = () => {
      if (!mountedRef.current) return;
      
      const container = containerRef.current;
      if (container && container.isConnected && container.parentElement) {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) {
          setIsReady(true);
          return;
        }
      }
      requestAnimationFrame(checkReady);
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(checkReady);
    }, 100);

    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
    };
  }, []);

  if (!isReady) {
    return (
      <div ref={containerRef} className="w-full h-full">
        {fallback}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas {...props}>{children}</Canvas>
    </div>
  );
}

