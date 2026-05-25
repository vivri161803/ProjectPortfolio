import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { graphConfig, colors } from "../../config";

/**
 * FloatingParticles — Ambient dust/nebula particles that drift
 * slowly through the scene, adding depth and atmosphere.
 * Uses Points for maximum performance (single draw call).
 */

export default function FloatingParticles({ reducedMotion }) {
  const pointsRef = useRef(null);
  const count = graphConfig.particleCount;
  const timeRef = useRef(0);

  const { positions, sizes, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread particles across a wide volume
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      sz[i] = Math.random() * 0.08 + 0.02;
      ph[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, sizes: sz, phases: ph };
  }, [count]);

  // Base positions for drift animation
  const basePositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    timeRef.current += delta;
    const time = timeRef.current;

    const posArray = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const phase = phases[i];
      const idx = i * 3;

      // Very slow, dreamy drift
      const drift = graphConfig.particleDrift;
      posArray[idx] = basePositions[idx] +
        Math.sin(time * drift * 80 + phase) * 0.35;
      posArray[idx + 1] = basePositions[idx + 1] +
        Math.cos(time * drift * 60 + phase * 1.3) * 0.25;
      posArray[idx + 2] = basePositions[idx + 2] +
        Math.sin(time * drift * 40 + phase * 0.7) * 0.2;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#B24BF3"
        transparent
        opacity={0.3}
        sizeAttenuation
        toneMapped={false}
        depthWrite={false}
      />
    </points>
  );
}
