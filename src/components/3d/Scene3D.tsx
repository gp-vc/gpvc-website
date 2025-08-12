'use client';
import { Canvas } from '@react-three/fiber';
import {
	OrbitControls,
	Environment,
	Float,
	MeshDistortMaterial,
} from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Enhanced Floating Elements with more sophisticated animations
function EnhancedFloatingElements() {
	const group = useRef<THREE.Group>(null!);
	const meshRefs = useRef<THREE.Mesh[]>([]);

	// GPVC brand colors
	const brandColor = new THREE.Color(0.74, 0.73, 0.86);
	const brandColorDark = new THREE.Color(0.51, 0.47, 0.67);
	const brandColorLight = new THREE.Color(0.85, 0.83, 0.92);

	// Generate random positions for multiple floating elements
	const elements = useMemo(() => {
		return Array.from({ length: 12 }, (_, i) => ({
			id: i,
			position: [
				(Math.random() - 0.5) * 15,
				(Math.random() - 0.5) * 10,
				(Math.random() - 0.5) * 15,
			] as [number, number, number],
			scale: Math.random() * 0.5 + 0.3,
			speed: Math.random() * 0.5 + 0.2,
			rotationAxis: [Math.random(), Math.random(), Math.random()] as [
				number,
				number,
				number
			],
			type: ['sphere', 'box', 'torus', 'octahedron'][
				Math.floor(Math.random() * 4)
			],
		}));
	}, []);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		if (group.current) {
			group.current.rotation.y = Math.sin(time * 0.05) * 0.1;
			group.current.rotation.x = Math.cos(time * 0.03) * 0.05;
		}

		meshRefs.current.forEach((mesh, i) => {
			if (mesh) {
				const element = elements[i];
				mesh.rotation.x = time * element.speed * element.rotationAxis[0];
				mesh.rotation.y = time * element.speed * element.rotationAxis[1];
				mesh.rotation.z = time * element.speed * element.rotationAxis[2];

				// Floating animation
				mesh.position.y =
					elements[i].position[1] + Math.sin(time * element.speed) * 1.5;
				mesh.position.x =
					elements[i].position[0] + Math.cos(time * element.speed * 0.5) * 0.5;
			}
		});
	});

	const renderElement = (element: (typeof elements)[0], index: number) => {
		const props = {
			ref: (ref: THREE.Mesh) => {
				if (ref) meshRefs.current[index] = ref;
			},
			position: element.position,
			scale: element.scale,
		};

		switch (element.type) {
			case 'sphere':
				return (
					<mesh {...props} key={`sphere-${element.id}`}>
						<sphereGeometry args={[1, 16, 16]} />
						<MeshDistortMaterial
							color={
								index % 3 === 0
									? brandColor
									: index % 3 === 1
									? brandColorDark
									: brandColorLight
							}
							transparent
							opacity={0.6}
							distort={0.3}
							speed={2}
						/>
					</mesh>
				);
			case 'box':
				return (
					<mesh {...props} key={`box-${element.id}`}>
						<boxGeometry args={[1.5, 1.5, 1.5]} />
						<meshStandardMaterial
							color={
								index % 3 === 0
									? brandColorLight
									: index % 3 === 1
									? brandColor
									: brandColorDark
							}
							transparent
							opacity={0.4}
							wireframe={index % 2 === 0}
						/>
					</mesh>
				);
			case 'torus':
				return (
					<mesh {...props} key={`torus-${element.id}`}>
						<torusGeometry args={[1.2, 0.4, 8, 16]} />
						<meshStandardMaterial
							color={brandColor}
							transparent
							opacity={0.5}
							emissive={brandColorDark}
							emissiveIntensity={0.1}
						/>
					</mesh>
				);
			case 'octahedron':
				return (
					<mesh {...props} key={`octahedron-${element.id}`}>
						<octahedronGeometry args={[1]} />
						<meshStandardMaterial
							color={brandColorDark}
							transparent
							opacity={0.7}
							wireframe={true}
						/>
					</mesh>
				);
			default:
				return null;
		}
	};

	return (
		<group ref={group}>
			{elements.map((element, index) => renderElement(element, index))}

			{/* Background geometric shapes */}
			<Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
				<mesh position={[-8, 2, -5]} scale={2}>
					<torusGeometry args={[2, 0.1, 8, 32]} />
					<meshBasicMaterial color={brandColor} transparent opacity={0.1} />
				</mesh>
			</Float>

			<Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.3}>
				<mesh position={[8, -2, -3]} scale={1.5}>
					<ringGeometry args={[1, 1.5, 8]} />
					<meshBasicMaterial
						color={brandColorLight}
						transparent
						opacity={0.15}
					/>
				</mesh>
			</Float>

			{/* Particle system */}
			{Array.from({ length: 50 }).map((_, i) => (
				<mesh
					key={`particle-${i}`}
					position={[
						(Math.random() - 0.5) * 25,
						(Math.random() - 0.5) * 15,
						(Math.random() - 0.5) * 25,
					]}
					scale={Math.random() * 0.1 + 0.05}
				>
					<sphereGeometry args={[1, 6, 6]} />
					<meshBasicMaterial
						color={i % 2 === 0 ? brandColor : brandColorLight}
						transparent
						opacity={Math.random() * 0.4 + 0.2}
					/>
				</mesh>
			))}
		</group>
	);
}

export default function FixedScene3D() {
	return (
		<div className='w-full h-screen absolute top-0 left-0 -z-10 overflow-hidden'>
			<Canvas
				camera={{ position: [0, 0, 8], fov: 60 }}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: 'high-performance',
				}}
				dpr={[1, 2]}
				performance={{ min: 0.5 }}
			>
				{/* Improved lighting setup */}
				<ambientLight intensity={0.3} />
				<pointLight position={[10, 10, 10]} intensity={0.8} color='#bdb9dc' />
				<pointLight
					position={[-10, -10, -10]}
					intensity={0.3}
					color='#a8a4d0'
				/>
				<directionalLight position={[0, 5, 5]} intensity={0.4} />

				<Suspense fallback={null}>
					<Environment preset='city' background={false} />
					<EnhancedFloatingElements />
				</Suspense>

				{/* Enhanced OrbitControls with smooth interaction */}
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					autoRotate={true}
					autoRotateSpeed={0.5}
					enableDamping={true}
					dampingFactor={0.05}
					maxPolarAngle={Math.PI / 1.8}
					minPolarAngle={Math.PI / 4}
				/>
			</Canvas>
		</div>
	);
}
