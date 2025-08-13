'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Mouse position tracking
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let mouseListenersAdded = false;

// Torus Knot component with mouse-based rotation
function TorusKnot() {
	const meshRef = useRef<THREE.Mesh>(null!);
	const [autoRotate, setAutoRotate] = useState(true);

	// Track mouse movement for rotation - attach to document to capture all mouse events
	useEffect(() => {
		if (mouseListenersAdded) return;

		const handleMouseMove = (event: MouseEvent) => {
			mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

			// Convert mouse position to rotation targets
			targetRotationY = mouseX * Math.PI * 0.5;
			targetRotationX = mouseY * Math.PI * 0.3;
			setAutoRotate(false);
		};

		const handleMouseLeave = () => setAutoRotate(true);

		// Attach to document instead of window to capture all mouse events
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseleave', handleMouseLeave);
		mouseListenersAdded = true;

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseleave', handleMouseLeave);
			mouseListenersAdded = false;
		};
	}, []);

	useFrame((state, delta) => {
		if (meshRef.current) {
			if (autoRotate) {
				// Auto rotation when mouse is not active
				meshRef.current.rotation.y += 0.005;
				meshRef.current.rotation.x += 0.002;
			} else {
				// Smooth interpolation to mouse-based rotation
				meshRef.current.rotation.y +=
					(targetRotationY - meshRef.current.rotation.y) * 0.05;
				meshRef.current.rotation.x +=
					(targetRotationX - meshRef.current.rotation.x) * 0.05;
			}
		}
	});

	return (
		<mesh ref={meshRef}>
			<torusKnotGeometry args={[1, 0.4, 128, 128, 1, 3]} />
			<meshStandardMaterial
				roughness={0.1}
				metalness={0.9}
				color='#bdb9dc'
				emissive='#827bb8'
				emissiveIntensity={0.1}
				envMapIntensity={1.5}
			/>
		</mesh>
	);
}

// Environment setup with video background
function EnvironmentSetup() {
	const { scene, gl } = useThree();
	const videoRef = useRef<HTMLVideoElement>(null!);
	const [videoLoaded, setVideoLoaded] = useState(false);
	const cubeRenderTargetRef = useRef<THREE.WebGLCubeRenderTarget>(null!);
	const cubeMapCameraRef = useRef<THREE.CubeCamera>(null!);

	useEffect(() => {
		// Create video element
		const video = document.createElement('video');
		video.src = '/stock-images/3d-bg.mp4';
		video.crossOrigin = 'anonymous';
		video.loop = true;
		video.muted = true;
		video.autoplay = true;
		video.playsInline = true;
		video.preload = 'auto';

		// Add event listeners for debugging
		video.addEventListener('loadeddata', () => {
			console.log('Video loaded successfully');
			setVideoLoaded(true);
		});

		video.addEventListener('error', (e) => {
			console.error('Video loading error:', e);
		});

		video.addEventListener('canplay', () => {
			console.log('Video can play');
			video.play().catch(console.error);
		});

		videoRef.current = video;

		// Create video texture for background
		const videoTexture = new THREE.VideoTexture(video);
		videoTexture.colorSpace = THREE.SRGBColorSpace;
		videoTexture.generateMipmaps = false;
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;
		videoTexture.format = THREE.RGBAFormat;

		// Create a background sphere for the video
		const sphereGeometry = new THREE.SphereGeometry(100, 64, 64);
		const sphereMaterial = new THREE.MeshBasicMaterial({
			map: videoTexture,
			side: THREE.BackSide,
		});
		const backgroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		scene.add(backgroundSphere);

		// Create cube render target for proper environment mapping
		cubeRenderTargetRef.current = new THREE.WebGLCubeRenderTarget(256);
		cubeMapCameraRef.current = new THREE.CubeCamera(
			1,
			1000,
			cubeRenderTargetRef.current
		);

		// Set the cube map as environment
		scene.environment = cubeRenderTargetRef.current.texture;

		return () => {
			if (videoRef.current) {
				videoRef.current.pause();
				videoRef.current.src = '';
			}
			// Clean up textures
			videoTexture.dispose();
			cubeRenderTargetRef.current?.dispose();
		};
	}, [scene, gl]);

	// Update cube map every frame for reflections
	useFrame(() => {
		if (
			videoLoaded &&
			cubeMapCameraRef.current &&
			cubeRenderTargetRef.current
		) {
			// Update the cube camera to capture the video background
			cubeMapCameraRef.current.update(gl, scene);
		}
	});

	return null;
}

// Lighting setup
function Lighting() {
	return (
		<>
			{/* Ambient light for overall illumination */}
			<ambientLight intensity={0.4} />

			{/* Directional light for highlights */}
			<directionalLight
				position={[5, 5, 5]}
				intensity={1}
				color='#ffffff'
				castShadow
			/>

			{/* Additional point lights for GPVC branding */}
			<pointLight position={[-5, 2, 2]} intensity={0.8} color='#bdb9dc' />

			<pointLight position={[3, -2, 4]} intensity={0.6} color='#a8a4d0' />
		</>
	);
}

// Camera setup
function CameraSetup() {
	const { camera } = useThree();

	useEffect(() => {
		camera.position.set(0, 0, -6);
		camera.lookAt(0, 0, 0);
	}, [camera]);

	return null;
}

// Renderer setup
function RendererSetup() {
	const { gl } = useThree();

	useEffect(() => {
		// Configure tone mapping similar to the original example
		gl.toneMapping = THREE.ACESFilmicToneMapping;
		gl.toneMappingExposure = 1.0;
		gl.shadowMap.enabled = true;
		gl.shadowMap.type = THREE.PCFSoftShadowMap;
	}, [gl]);

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
					fov: 50,
					aspect:
						typeof window !== 'undefined'
							? window.innerWidth / window.innerHeight
							: 1,
					near: 1,
					far: 500,
					position: [0, 0, -6],
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
					<RendererSetup />
					<CameraSetup />
					<EnvironmentSetup />
					<Lighting />
					<TorusKnot />
				</Suspense>
			</Canvas>
		</div>
	);
}
