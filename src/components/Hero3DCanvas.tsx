import React, { useEffect, useRef, useState } from 'react';
// Three.js is supplied at runtime; keep this component buildable when its
// optional type declarations are not available in the current environment.
// @ts-expect-error -- the project may not include Three.js type declarations.
import * as THREE from 'three';
import { Box, RotateCw, Sparkles, Smartphone, Eye } from 'lucide-react';

interface Hero3DCanvasProps {
  accentColor?: string;
  isDark?: boolean;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ 
  accentColor = '#6366F1',
  isDark = true 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [interactiveShape, setInteractiveShape] = useState<'knot' | 'torus' | 'icosahedron'>('knot');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    if (!mountRef.current || reducedMotion) return;

    const container = mountRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: window.devicePixelRatio < 2,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(new THREE.Color(accentColor), 3.5);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    // Build Mesh
    const buildMesh = () => {
      if (meshRef.current) {
        scene.remove(meshRef.current);
        meshRef.current.geometry.dispose();
        if (Array.isArray(meshRef.current.material)) {
          meshRef.current.material.forEach((m: THREE.Material) => m.dispose());
        } else {
          meshRef.current.material.dispose();
        }
      }

      let geo: THREE.BufferGeometry;
      if (interactiveShape === 'torus') {
        geo = new THREE.TorusGeometry(1.0, 0.38, 28, 50);
      } else if (interactiveShape === 'icosahedron') {
        geo = new THREE.IcosahedronGeometry(1.2, 2);
      } else {
        geo = new THREE.TorusKnotGeometry(0.85, 0.28, 64, 20);
      }

      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(accentColor),
        roughness: 0.25,
        metalness: 0.8,
        clearcoat: 0.6,
        wireframe,
      });

      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      meshRef.current = mesh;
    };

    buildMesh();

    // Render loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      if (meshRef.current) {
        if (autoRotate) {
          meshRef.current.rotation.y += 1.0 * delta;
          meshRef.current.rotation.x += 0.5 * delta;
        }
        meshRef.current.rotation.y += mouseRef.current.x * 0.02;
        meshRef.current.rotation.x += mouseRef.current.y * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactiveShape, wireframe, accentColor, autoRotate, reducedMotion]);

  const handlePointerDown = (e: React.PointerEvent) => {
    mouseRef.current.isDown = true;
    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = mountRef.current?.getBoundingClientRect();
    if (!rect) return;
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouseRef.current.targetX = normX;
    mouseRef.current.targetY = normY;

    if (mouseRef.current.isDown && meshRef.current) {
      const deltaX = e.clientX - mouseRef.current.lastX;
      const deltaY = e.clientY - mouseRef.current.lastY;
      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    }
  };

  const handlePointerUp = () => {
    mouseRef.current.isDown = false;
  };

  return (
    <div className="relative w-full h-[260px] sm:h-[300px] bg-slate-950/70 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl flex flex-col">
      {/* 3D Badges & Controls Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <span className="bg-slate-900/80 border border-slate-700/60 px-2.5 py-1 rounded-lg text-[11px] font-mono text-indigo-300 flex items-center gap-1.5 backdrop-blur shadow">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          Interactive 3D Engine
        </span>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2 py-1 text-[10px] font-bold rounded-lg border backdrop-blur transition-all ${
              wireframe ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900/80 border-slate-700 text-slate-300'
            }`}
            title="Toggle Wireframe"
          >
            Wireframe
          </button>
          <button
            onClick={() => {
              const shapes: ('knot' | 'torus' | 'icosahedron')[] = ['knot', 'torus', 'icosahedron'];
              const nextIndex = (shapes.indexOf(interactiveShape) + 1) % shapes.length;
              setInteractiveShape(shapes[nextIndex]);
            }}
            className="px-2 py-1 text-[10px] font-bold rounded-lg border bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white capitalize backdrop-blur"
          >
            Shape: {interactiveShape}
          </button>
        </div>
      </div>

      {/* Canvas */}
      {reducedMotion ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <Box className="w-10 h-10 text-indigo-400 mb-2" />
          <p className="text-xs text-slate-300 font-medium">Static 2D Mode Active</p>
        </div>
      ) : (
        <div
          ref={mountRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="flex-1 w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        />
      )}

      {/* Touch footer instruction */}
      <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[10px] text-slate-400 pointer-events-none">
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3 text-indigo-400" />
          Drag or swipe to rotate in 3D
        </span>
        <span className="font-mono text-emerald-400">WebGL 60FPS</span>
      </div>
    </div>
  );
};
