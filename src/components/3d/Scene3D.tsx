'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';
import FloatingElements from './FloatingElements';

export default function Scene3D() {
	return (
		<div className='w-full h-screen absolute top-0 left-0 -z-10'>
			<Canvas
				camera={{ position: [0, 0, 5], fov: 75 }}
				gl={{ antialias: true, alpha: true }}
			>
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} />
				<Suspense fallback={null}>
					<Environment preset='city' />
					<Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
						<FloatingElements />
					</Float>
				</Suspense>
				<OrbitControls enableZoom={false} enablePan={false} />
			</Canvas>
		</div>
	);
}
