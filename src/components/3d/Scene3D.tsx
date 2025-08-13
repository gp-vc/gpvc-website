'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple floating elements component
function FloatingElements() {
	const groupRef = useRef<THREE.Group>(null!);
	const sphere1Ref = useRef<THREE.Mesh>(null!);
	const sphere2Ref = useRef<THREE.Mesh>(null!);
	const boxRef = useRef<THREE.Mesh>(null!);

	// GPVC brand colors
	const brandColor = '#bdb9dc';
	const brandColorDark = '#827bb8';
	const brandColorLight = '#a8a4d0';

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		// Rotate the main group slowly
		if (groupRef.current) {
			groupRef.current.rotation.y = time * 0.1;
		}

		// Animate individual elements
		if (sphere1Ref.current) {
			sphere1Ref.current.position.y = Math.sin(time * 0.5) * 0.5;
			sphere1Ref.current.rotation.x = time * 0.2;
		}

		if (sphere2Ref.current) {
			sphere2Ref.current.position.y = Math.cos(time * 0.7) * 0.3;
			sphere2Ref.current.rotation.y = time * 0.3;
		}

		if (boxRef.current) {
			boxRef.current.rotation.x = time * 0.15;
			boxRef.current.rotation.z = time * 0.1;
		}
	});

	return (
		<group ref={groupRef}>
			{/* Large sphere */}
			<mesh ref={sphere1Ref} position={[-3, 0, -2]}>
				<sphereGeometry args={[1.2, 32, 32]} />
				<meshStandardMaterial
					color={brandColor}
					transparent
					opacity={0.3}
					wireframe
				/>
			</mesh>

			{/* Medium sphere */}
			<mesh ref={sphere2Ref} position={[3, 1, -1]}>
				<sphereGeometry args={[0.8, 16, 16]} />
				<meshStandardMaterial
					color={brandColorDark}
					transparent
					opacity={0.4}
				/>
			</mesh>

			{/* Rotating box */}
			<mesh ref={boxRef} position={[2, -1, 1]}>
				<boxGeometry args={[0.6, 0.6, 0.6]} />
				<meshStandardMaterial
					color={brandColorLight}
					transparent
					opacity={0.3}
					wireframe
				/>
			</mesh>

			{/* Background torus */}
			<mesh position={[-4, 2, -3]} rotation={[0, 0, Math.PI / 4]}>
				<torusGeometry args={[1.5, 0.2, 8, 24]} />
				<meshBasicMaterial color={brandColor} transparent opacity={0.2} />
			</mesh>

			{/* Particles */}
			{[...Array(20)].map((_, index) => (
				<mesh
					key={`particle-${index}`}
					position={[
						(Math.random() - 0.5) * 15,
						(Math.random() - 0.5) * 10,
						(Math.random() - 0.5) * 15,
					]}
				>
					<sphereGeometry args={[0.05, 8, 8]} />
					<meshBasicMaterial
						color={index % 2 === 0 ? brandColor : brandColorLight}
						transparent
						opacity={0.6}
					/>
				</mesh>
			))}
		</group>
	);
}

export default function Scene3D() {
	return (
		<div className='fixed inset-0 -z-10 w-full h-full'>
			<Canvas
				camera={{ position: [0, 0, 8], fov: 60 }}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: 'high-performance',
				}}
				dpr={[1, 2]}
			>
				{/* Lighting */}
				<ambientLight intensity={0.4} />
				<pointLight position={[10, 10, 10]} intensity={0.6} color='#bdb9dc' />
				<pointLight
					position={[-10, -10, -10]}
					intensity={0.3}
					color='#a8a4d0'
				/>

				{/* Scene content */}
				<Suspense fallback={null}>
					<Environment preset='city' background={false} />
					<FloatingElements />
				</Suspense>

				{/* Controls */}
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					autoRotate={true}
					autoRotateSpeed={0.3}
					enableDamping={true}
					dampingFactor={0.05}
				/>
			</Canvas>
		</div>
	);
}
