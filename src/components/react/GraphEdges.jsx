import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import graphData from "../../data/graph_data.json";
import { graphConfig, categoryColors } from "../../config";

/**
 * GraphEdges — Line-based edge renderer with neon glow effect.
 * Active edges pulse with violet/cyan colors matching the palette.
 */

export default function GraphEdges({ activeSection, reducedMotion }) {
  const lineRef = useRef(null);
  const { nodes, edges } = graphData;
  const timeRef = useRef(0);

  const nodeMap = useMemo(() => {
    const map = {};
    nodes.forEach((n) => { map[n.id] = n; });
    return map;
  }, [nodes]);

  const { positions, edgeMeta } = useMemo(() => {
    const pos = new Float32Array(edges.length * 6);
    const meta = [];

    edges.forEach((edge, i) => {
      const src = nodeMap[edge.source];
      const tgt = nodeMap[edge.target];
      if (!src || !tgt) return;

      const idx = i * 6;
      pos[idx] = src.position[0];
      pos[idx + 1] = src.position[1];
      pos[idx + 2] = src.position[2];
      pos[idx + 3] = tgt.position[0];
      pos[idx + 4] = tgt.position[1];
      pos[idx + 5] = tgt.position[2];

      meta.push({
        sourceGroup: src.group,
        targetGroup: tgt.group,
        sourceCategory: src.category,
        targetCategory: tgt.category,
        weight: edge.weight,
      });
    });

    return { positions: pos, edgeMeta: meta };
  }, [edges, nodeMap]);

  const colorsRef = useRef(new Float32Array(edges.length * 6));

  useFrame((state, delta) => {
    if (!lineRef.current) return;
    timeRef.current += delta;
    const time = timeRef.current;

    const colors = colorsRef.current;
    const dimColor = new THREE.Color("#2A1A4A");    // deep violet dim
    const activeViolet = new THREE.Color("#B24BF3");
    const activeCyan = new THREE.Color("#00E5FF");

    edges.forEach((edge, i) => {
      const meta = edgeMeta[i];
      if (!meta) return;

      const isActive =
        meta.sourceGroup === activeSection ||
        meta.targetGroup === activeSection;

      let color;
      let brightness;

      if (isActive) {
        // Blend between violet and cyan based on time for shimmer
        const blend = reducedMotion ? 0.5 : (Math.sin(time * 1.5 + i * 0.3) * 0.5 + 0.5);
        color = activeViolet.clone().lerp(activeCyan, blend * 0.3);
        brightness = 0.45 + (reducedMotion ? 0 : Math.sin(time * 2 + i) * 0.1);
      } else {
        color = dimColor;
        brightness = graphConfig.edgeOpacity;
      }

      const idx = i * 6;
      colors[idx] = color.r * brightness;
      colors[idx + 1] = color.g * brightness;
      colors[idx + 2] = color.b * brightness;
      colors[idx + 3] = color.r * brightness;
      colors[idx + 4] = color.g * brightness;
      colors[idx + 5] = color.b * brightness;
    });

    const colorAttr = lineRef.current.geometry.getAttribute("color");
    if (colorAttr) {
      colorAttr.array.set(colors);
      colorAttr.needsUpdate = true;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={edges.length * 2}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colorsRef.current}
          count={edges.length * 2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.7} toneMapped={false} />
    </lineSegments>
  );
}
