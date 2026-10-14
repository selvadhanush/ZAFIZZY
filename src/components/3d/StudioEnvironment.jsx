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

  useLayoutEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    const roomEnvironment = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnvironment).texture;

    scene.environment = envTexture;
    scene.environmentIntensity = intensity;

    return () => {
      envTexture.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene, intensity]);

  return null;
}
