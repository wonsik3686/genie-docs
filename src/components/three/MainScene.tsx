'use client';

import { OrbitControls, Sparkles, Stars, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import HelvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

/**
 * Renders the main 3D scene.
 *
 * Sets up a 3D environment within a Canvas element using @react-three/fiber. This component configures the camera
 * with a fixed position and field of view, establishes multiple light sources with defined intensities and positions,
 * and composes the scene with several 3D elements including text, a lamp model, star effects, and orbit controls for
 * interactive navigation.
 */
export default function MainScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      {/* 기본 조명 설정 */}
      <ambientLight intensity={0} />
      <pointLight position={[10, 10, 10]} intensity={1000} />
      <pointLight position={[-10, -10, -10]} intensity={2000} />
      <pointLight position={[0, 10, 0]} intensity={1700} />

      {/* 3D 텍스트 오브젝트 */}
      <GenieDocsTextModel />
      <GenieLampModel />
      <Stars />
      <OrbitControls />
    </Canvas>
  );
}

/**
 * Renders a 3D text mesh displaying "Genie Docs".
 *
 * This component parses a predefined Helvetiker font and creates a Three.js TextGeometry using specific parameters for size, depth, and beveling.
 * The resulting mesh is positioned at [-3.5, 1, 0] and colored with a standard material (#3B6A8D).
 */
function GenieDocsTextModel() {
  const fontLoader = new FontLoader();
  const font = fontLoader.parse(HelvetikerFont);

  return (
    <mesh position={[-3.5, 1, 0]}>
      <primitive
        object={
          new TextGeometry('Genie Docs', {
            font,
            size: 1,
            depth: 0.5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelSegments: 5,
          })
        }
      />
      <meshStandardMaterial color="#3B6A8D" />
    </mesh>
  );
}

/**
 * Renders a 3D lamp model with applied textures and a sparkle effect.
 *
 * Loads a GLTF lamp model from "three/gltf/lamp.gltf" and applies three textures—base color, normal, and metallic roughness—
 * using Three.js's TextureLoader. The textures are configured to repeat at a scale of 0.5 on both the S and T axes.
 * The model is rendered with a standard material that incorporates these textures to define its metalness and roughness,
 * and a sparkle effect is overlaid with preset parameters for count, scale, size, and speed.
 *
 * @returns A mesh element containing the textured 3D lamp model with sparkles.
 */
function GenieLampModel() {
  const { scene } = useGLTF('three/gltf/lamp.gltf');
  const textureLoader = new THREE.TextureLoader();
  const aiLampBaseBaseColor = textureLoader.load(
    'three/textures/aiLampBase_baseColor.png'
  );
  const aiLampBaseNormal = textureLoader.load(
    'three/textures/aiLampBase_normal.png'
  );
  const aiLampBaseMetallicRoughness = textureLoader.load(
    'three/textures/aiLampBase_metallicRoughness.png'
  );
  aiLampBaseBaseColor.wrapS = THREE.RepeatWrapping;
  aiLampBaseBaseColor.wrapT = THREE.RepeatWrapping;
  aiLampBaseBaseColor.repeat.set(0.5, 0.5);
  aiLampBaseNormal.wrapS = THREE.RepeatWrapping;
  aiLampBaseNormal.wrapT = THREE.RepeatWrapping;
  aiLampBaseNormal.repeat.set(0.5, 0.5);
  aiLampBaseMetallicRoughness.wrapS = THREE.RepeatWrapping;
  aiLampBaseMetallicRoughness.wrapT = THREE.RepeatWrapping;
  aiLampBaseMetallicRoughness.repeat.set(0.5, 0.5);

  return (
    <mesh>
      <primitive object={scene} />
      <meshStandardMaterial
        map={aiLampBaseBaseColor}
        normalMap={aiLampBaseNormal}
        metalnessMap={aiLampBaseMetallicRoughness}
        roughnessMap={aiLampBaseMetallicRoughness}
        metalness={1}
        roughness={0.1}
      />
      <Sparkles count={45} scale={3} size={3} speed={1} />
    </mesh>
  );
}
