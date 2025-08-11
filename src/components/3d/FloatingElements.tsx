'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingElements() {
	const group = useRef<THREE.Group>(null!);
	const sphere1Ref = useRef<THREE.Mesh>(null!);
	const sphere2Ref = useRef<THREE.Mesh>(null!);
	const boxRef = useRef<THREE.Mesh>(null!);
	const torusRef = useRef<THREE.Mesh>(null!);
	const octaRef = useRef<THREE.Mesh>(null!);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		// Main group rotation
		if (group.current) {
			group.current.rotation.y = Math.sin(time * 0.1) * 0.1;
			group.current.rotation.x = Math.cos(time * 0.1) * 0.05;
		}

		// Individual element animations
		if (sphere1Ref.current) {
			sphere1Ref.current.position.y = Math.sin(time * 0.5) * 0.5;
			sphere1Ref.current.rotation.y = time * 0.3;
		}

		if (sphere2Ref.current) {
			sphere2Ref.current.position.y = Math.cos(time * 0.7) * 0.3;
			sphere2Ref.current.rotation.x = time * 0.4;
		}

		if (boxRef.current) {
			boxRef.current.rotation.x = time * 0.2;
			boxRef.current.rotation.z = time * 0.15;
			boxRef.current.position.y = Math.sin(time * 0.3) * 0.2;
		}

		if (torusRef.current) {
			torusRef.current.rotation.x = time * 0.25;
			torusRef.current.rotation.y = time * 0.1;
			torusRef.current.position.y = Math.cos(time * 0.4) * 0.4;
		}

		if (octaRef.current) {
			octaRef.current.rotation.y = time * 0.35;
			octaRef.current.position.y = Math.sin(time * 0.6) * 0.6;
			octaRef.current.position.x = Math.cos(time * 0.2) * 0.3;
		}
	});

	// GPVC brand color in hex: #bdb9dc converted to RGB values (0.74, 0.73, 0.86)
	const brandColor = new THREE.Color(0.74, 0.73, 0.86);
	const brandColorDark = new THREE.Color(0.6, 0.58, 0.75);
	const brandColorLight = new THREE.Color(0.85, 0.83, 0.92);

	return (
		<group ref={group}>
			{/* Large background sphere */}
			<Sphere ref={sphere1Ref} args={[1.2, 32, 32]} position={[-3, 0, -2]}>
				<meshStandardMaterial
					color={brandColor}
					transparent
					opacity={0.1}
					wireframe
				/>
			</Sphere>

			{/* Medium sphere */}
			<Sphere ref={sphere2Ref} args={[0.8, 16, 16]} position={[3, 1, -1]}>
				<meshStandardMaterial
					color={brandColorDark}
					transparent
					opacity={0.15}
					emissive={brandColor}
					emissiveIntensity={0.05}
				/>
			</Sphere>

			{/* Rotating box */}
			<Box ref={boxRef} args={[0.6, 0.6, 0.6]} position={[2, -1, 1]}>
				<meshStandardMaterial
					color={brandColorLight}
					transparent
					opacity={0.2}
					wireframe
				/>
			</Box>

			{/* Torus */}
			<Torus ref={torusRef} args={[0.8, 0.3, 8, 24]} position={[-2, 2, 0]}>
				<meshStandardMaterial
					color={brandColor}
					transparent
					opacity={0.12}
					emissive={brandColorDark}
					emissiveIntensity={0.03}
				/>
			</Torus>

			{/* Octahedron */}
			<Octahedron ref={octaRef} args={[0.7]} position={[0, -2, 1]}>
				<meshStandardMaterial
					color={brandColorDark}
					transparent
					opacity={0.18}
					wireframe
				/>
			</Octahedron>

			{/* Small floating particles */}
			{Array.from({ length: 20 }).map((_, i) => (
				<Sphere
					key={i}
					args={[0.05, 8, 8]}
					position={[
						(Math.random() - 0.5) * 10,
						(Math.random() - 0.5) * 10,
						(Math.random() - 0.5) * 10,
					]}
				>
					<meshBasicMaterial color={brandColor} transparent opacity={0.6} />
				</Sphere>
			))}
		</group>
	);
}
