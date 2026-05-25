import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import graphData from "../../data/graph_data.json";
import { categoryColors, graphConfig } from "../../config";

/**
 * GraphNodes — InstancedMesh renderer with:
 * - Framerate-independent exponential damping on all transitions
 * - Gentle organic floating with golden-ratio phased offsets
 * - Slow breathing pulse on active nodes
 * - Dual-layer rendering (glow halo + core node)
 */

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export default function GraphNodes({ activeSection, mousePos, reducedMotion }) {
  const meshRef = useRef(null);
  const glowRef = useRef(null);
  const { nodes } = graphData;
  const count = nodes.length;
  const timeRef = useRef(0);

  // Per-node smoothed state (scale + brightness lerped each frame)
  const smoothState = useRef(null);
  if (!smoothState.current) {
    smoothState.current = {
      scales: new Float32Array(count).fill(0.3),
      brightness: new Float32Array(count).fill(0.2),
    };
  }

  // Pre-compute base positions and colors
  const { basePositions, baseColors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    nodes.forEach((node, i) => {
      positions[i * 3] = node.position[0];
      positions[i * 3 + 1] = node.position[1];
      positions[i * 3 + 2] = node.position[2];

      const hex = categoryColors[node.category] || "#B24BF3";
      tempColor.set(hex);
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    });

    return { basePositions: positions, baseColors: colors };
  }, [nodes, count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const time = timeRef.current;

    // Framerate-independent damping factor
    const scaleDamp = 1 - Math.exp(-graphConfig.nodeLerpSpeed * delta);
    const brightDamp = 1 - Math.exp(-graphConfig.nodeLerpSpeed * 0.8 * delta);

    const { scales, brightness } = smoothState.current;

    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      let x = basePositions[i * 3];
      let y = basePositions[i * 3 + 1];
      let z = basePositions[i * 3 + 2];

      // Organic floating — very gentle, slow breathing
      if (!reducedMotion) {
        const phase = i * 1.618; // golden ratio for unique phase per node
        const fs = graphConfig.floatSpeed;
        const fa = graphConfig.floatAmplitude;
        x += Math.sin(time * fs + phase) * fa;
        y += Math.cos(time * fs * 0.7 + phase * 0.5) * fa * 1.2;
        z += Math.sin(time * fs * 0.4 + phase * 1.3) * fa * 0.6;
      }

      // Cursor gravity — gentle pull
      if (!reducedMotion && mousePos) {
        const mx = mousePos.x * 12;
        const my = mousePos.y * 7;
        const dx = mx - x;
        const dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < graphConfig.mouseGravityRadius && dist > 0.1) {
          const t = 1 - dist / graphConfig.mouseGravityRadius;
          const force = graphConfig.mouseGravityStrength * t * t;
          x += dx * force * 0.3;
          y += dy * force * 0.3;
        }
      }

      // Target scale with slow breathing pulse
      const isActive = node.group === activeSection;
      const breathe = isActive && !reducedMotion
        ? 1 + Math.sin(time * graphConfig.pulseSpeed * Math.PI * 2 + i * 0.5) * graphConfig.pulseAmplitude
        : 1;
      const targetScale = isActive
        ? node.size * graphConfig.nodeBaseScale * breathe
        : node.size * 0.25;

      // Target brightness
      const targetBright = isActive ? 1.3 : 0.18;

      // Smooth transitions via exponential damping
      scales[i] += (targetScale - scales[i]) * scaleDamp;
      brightness[i] += (targetBright - brightness[i]) * brightDamp;

      const s = scales[i];

      // Core node
      tempObject.position.set(x, y, z);
      tempObject.scale.setScalar(s * 0.09);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);

      // Glow halo
      if (glowRef.current) {
        tempObject.scale.setScalar(s * (isActive ? 0.25 : 0.12));
        tempObject.updateMatrix();
        glowRef.current.setMatrixAt(i, tempObject.matrix);
      }

      // Color with smoothed brightness
      const b = brightness[i];
      tempColor.setRGB(
        Math.min(baseColors[i * 3] * b, 1),
        Math.min(baseColors[i * 3 + 1] * b, 1),
        Math.min(baseColors[i * 3 + 2] * b, 1)
      );
      meshRef.current.setColorAt(i, tempColor);

      if (glowRef.current) {
        const gb = b * 0.3;
        tempColor.setRGB(
          baseColors[i * 3] * gb,
          baseColors[i * 3 + 1] * gb,
          baseColors[i * 3 + 2] * gb
        );
        glowRef.current.setColorAt(i, tempColor);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    if (glowRef.current) {
      glowRef.current.instanceMatrix.needsUpdate = true;
      if (glowRef.current.instanceColor) glowRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Glow halos — soft, larger spheres */}
      <instancedMesh ref={glowRef} args={[null, null, count]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial transparent opacity={0.15} toneMapped={false} />
      </instancedMesh>

      {/* Core nodes */}
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
