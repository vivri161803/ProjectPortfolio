import { useState, useEffect, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import GraphNodes from "./GraphNodes";
import GraphEdges from "./GraphEdges";
import FloatingParticles from "./FloatingParticles";
import CameraController from "./CameraController";
import { graphConfig, cameraStates } from "../../config";

/**
 * KnowledgeGraph — Main 3D scene container.
 * Enhanced with post-processing bloom for neon glow,
 * floating particles, and improved visual depth.
 */

export default function KnowledgeGraph() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Listen for section-change CustomEvents from GSAP
  useEffect(() => {
    const handler = (e) => {
      const sectionId = e.detail?.sectionId;
      if (sectionId && cameraStates[sectionId]) {
        setActiveSection(sectionId);
      }
    };
    window.addEventListener("section-change", handler);
    return () => window.removeEventListener("section-change", handler);
  }, []);

  // Mouse tracking (normalized -1 to 1)
  const handleMouseMove = useCallback(
    (e) => {
      if (reducedMotion || isMobile) return;
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    },
    [reducedMotion, isMobile]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Don't render canvas on mobile for performance
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Canvas
        dpr={Math.min(window.devicePixelRatio, graphConfig.pixelRatio)}
        camera={{
          position: cameraStates.hero.position,
          fov: cameraStates.hero.fov,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        {/* Scene lighting */}
        <ambientLight intensity={0.3} />

        {/* Floating atmospheric particles */}
        <FloatingParticles reducedMotion={reducedMotion} />

        {/* Knowledge Graph */}
        <GraphEdges
          activeSection={activeSection}
          reducedMotion={reducedMotion}
        />
        <GraphNodes
          activeSection={activeSection}
          mousePos={mousePos}
          reducedMotion={reducedMotion}
        />

        {/* Camera fly-through */}
        <CameraController
          activeSection={activeSection}
          reducedMotion={reducedMotion}
        />

        {/* Post-processing: Bloom for neon glow */}
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
