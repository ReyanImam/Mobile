"use client";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";

export function Phone3D({ setAnimationState, animationState }) {
  const phoneRef = useRef();
  const { scene, animations } = useGLTF("/iphone_12_teardown.glb");
  const { actions } = useAnimations(animations, scene);

  const [scrollY, setScrollY] = useState(0); // Track the scroll position

  // Update scroll position on window scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scroll position
    };
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle the teardown animation state
  useEffect(() => {
    if (actions["Teardown"]) {
      if (animationState === "play") {
        actions["Teardown"].reset().fadeIn(0.5).play();
      } else if (animationState === "pause") {
        actions["Teardown"].paused = true;
      } else if (animationState === "restart") {
        actions["Teardown"].reset().fadeIn(0.5).play();
        setAnimationState("play");
      }
    }
  }, [actions, animationState, setAnimationState]);

  // Smooth floating, scroll tracking, and rotation speed adjustment
  useFrame((state) => {
    if (phoneRef.current) {
      const elapsed = state.clock.getElapsedTime();
      const scrollFactor = scrollY / 500; // Adjust the scroll factor (control how fast it moves)

      // Vertical position: Move phone down as you scroll
      phoneRef.current.position.y = Math.sin(elapsed / 3) / 10 - 1.1 - scrollFactor;

      // Rotation: Increase speed based on scroll
      phoneRef.current.rotation.y += 0.002 + scrollFactor * 0.0025; // Adjust rotation speed based on scroll
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom enableRotate enablePan />

      <primitive ref={phoneRef} object={scene} position={[0, 0, 0]} scale={35} />
    </>
  );
}
