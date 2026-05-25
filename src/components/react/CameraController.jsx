import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cameraStates, graphConfig } from "../../config";

/**
 * CameraController — Smoothly interpolates the camera between
 * section-defined positions using framerate-independent
 * exponential damping for silky-smooth transitions.
 */

const targetPos = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();
const currentLookAt = new THREE.Vector3();

export default function CameraController({ activeSection, reducedMotion }) {
  const { camera } = useThree();
  const initialized = useRef(false);

  // Initialize camera to hero position
  if (!initialized.current) {
    const heroState = cameraStates.hero;
    camera.position.set(...heroState.position);
    currentLookAt.set(...heroState.lookAt);
    camera.lookAt(currentLookAt);
    initialized.current = true;
  }

  useFrame((state, delta) => {
    const section = cameraStates[activeSection] || cameraStates.hero;
    targetPos.set(...section.position);
    targetLookAt.set(...section.lookAt);

    if (reducedMotion) {
      camera.position.copy(targetPos);
      currentLookAt.copy(targetLookAt);
    } else {
      // Framerate-independent exponential damping
      // factor = 1 - e^(-speed * dt)  → smooth regardless of FPS
      const damping = 1 - Math.exp(-graphConfig.cameraDamping * delta);

      camera.position.lerp(targetPos, damping);
      currentLookAt.lerp(targetLookAt, damping);
    }

    camera.lookAt(currentLookAt);
  });

  return null;
}
