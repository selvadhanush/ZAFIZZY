import React, { useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Procedural Studio HDR Environment Probe
 * Generates neutral studio soft-box reflections and specular glints for glass,
 * liquid, and brushed metals without requiring any external network assets.
 */
export default function StudioEnvironment({ intensity = 1.2 }) {
  const { gl, scene } = useThree();

  // 1. Generate PMREM Environment Texture ONCE on mount
  useLayoutEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    const roomEnvironment = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnvironment).texture;

    scene.environment = envTexture;

    return () => {
      scene.environment = null;
      envTexture.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  // 2. Reactively update intensity without regenerating texture or shaders
  useLayoutEffect(() => {
    if (scene) {
      scene.environmentIntensity = intensity;
    }
  }, [scene, intensity]);

  return null;
}
