'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Floating cubes component based on the Three.js example
function FloatingCubes() {
	const groupRef = useRef<THREE.Group>(null!);
	const clock = useRef(new THREE.Clock());

	// Create the cubes similar to the original example
	const cubes = useMemo(() => {
		const cubeArray = [];
		const geometry = new THREE.BoxGeometry(50, 50, 50);

		// GPVC brand colors
		const material = new THREE.MeshPhongMaterial({
			color: 0xbdb9dc,
			specular: 0xa8a4d0,
			shininess: 50,
			transparent: true,
			opacity: 0.8,
		});

		for (let i = 0; i < 500; i++) {
			const mesh = new THREE.Mesh(geometry, material);

			mesh.position.x = 2000 * (2.0 * Math.random() - 1.0);
			mesh.position.y = 2000 * (2.0 * Math.random() - 1.0);
			mesh.position.z = 2000 * (2.0 * Math.random() - 1.0);

			mesh.rotation.x = Math.random() * Math.PI;
			mesh.rotation.y = Math.random() * Math.PI;
			mesh.rotation.z = Math.random() * Math.PI;

			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();

			cubeArray.push(mesh);
		}

		return cubeArray;
	}, []);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		if (groupRef.current) {
			// Slow rotation of the entire group
			groupRef.current.rotation.y = time * 0.05;
			groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
		}
	});

	return (
		<group ref={groupRef}>
			{cubes.map((cube, index) => (
				<primitive key={index} object={cube} />
			))}
		</group>
	);
}

// Scene setup component
function SceneSetup() {
	const { scene } = useThree();

	// Set up scene background and fog
	useMemo(() => {
		// Dark background with GPVC brand color tint
		scene.background = new THREE.Color().setHSL(0.7, 0.3, 0.02);
		scene.fog = new THREE.Fog(scene.background, 1000, 4000);
	}, [scene]);

	return null;
}

// Lighting setup
function Lighting() {
	// GPVC brand colors for lights
	const brandColor = new THREE.Color(0xbdb9dc);
	const accentColor = new THREE.Color(0xa8a4d0);
	const darkColor = new THREE.Color(0x827bb8);

	return (
		<>
			{/* Ambient light */}
			<ambientLight intensity={0.2} />

			{/* Directional light */}
			<directionalLight
				position={[0, -1, 0]}
				intensity={0.3}
				color={brandColor}
			/>

			{/* Point lights with GPVC brand colors */}
			<pointLight
				position={[1000, 0, -500]}
				intensity={1.2}
				distance={1500}
				color={brandColor}
			/>

			<pointLight
				position={[0, 0, -500]}
				intensity={0.8}
				distance={1200}
				color={accentColor}
			/>

			<pointLight
				position={[1000, 1000, -500]}
				intensity={1.0}
				distance={1500}
				color={darkColor}
			/>

			{/* Additional ambient lighting */}
			<pointLight
				position={[-1000, -500, -300]}
				intensity={0.6}
				distance={1000}
				color={new THREE.Color(0x9590c4)}
			/>
		</>
	);
}

// Camera controls component
function CameraControls() {
	const { camera } = useThree();
	const controlsRef = useRef({
		moveForward: false,
		moveBackward: false,
		moveLeft: false,
		moveRight: false,
		moveUp: false,
		moveDown: false,
		rotateLeft: false,
		rotateRight: false,
	});

	useFrame((state, delta) => {
		const camera = state.camera;
		const speed = 500 * delta;
		const rotationSpeed = 1.0 * delta;

		// Auto-rotation for a cinematic effect
		camera.position.x = Math.cos(state.clock.elapsedTime * 0.1) * 800;
		camera.position.z = Math.sin(state.clock.elapsedTime * 0.1) * 800 + 500;
		camera.position.y = Math.sin(state.clock.elapsedTime * 0.05) * 200;

		// Look towards the center
		camera.lookAt(0, 0, 0);
	});

	return null;
}

// Loading fallback
function SceneLoader() {
	return (
		<div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800'>
			<div className='w-8 h-8 border-2 border-[#bdb9dc] border-t-transparent rounded-full animate-spin'></div>
		</div>
	);
}

export default function Scene3D() {
	return (
		<div className='fixed inset-0 w-full h-full -z-50 pointer-events-none'>
			<Canvas
				camera={{
					position: [0, 0, 500],
					fov: 40,
					near: 1,
					far: 4000,
				}}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: 'high-performance',
				}}
				dpr={[1, 2]}
				style={{ background: 'transparent' }}
			>
				<Suspense fallback={null}>
					<SceneSetup />
					<Lighting />
					<FloatingCubes />
					<CameraControls />
				</Suspense>
			</Canvas>
		</div>
	);
}
