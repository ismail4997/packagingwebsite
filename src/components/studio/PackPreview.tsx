"use client";

import { Component, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { PreviewKind } from "@/lib/data/studio";
import { getMaterial } from "@/lib/data/materials";
import { PackShot } from "@/components/visual/PackShot";
import type { PackShape } from "@/lib/data/catalog";

export type PreviewView = "three" | "front" | "side" | "top";

export type PreviewConfig = {
  kind: PreviewKind;
  materialId: string;
  brandColor: string;
  length: number;
  width: number;
  height: number;
  finishing: string[];
  label: string;
};

export type PreviewHandle = {
  zoom: (direction: 1 | -1) => void;
  setView: (view: PreviewView) => void;
};

const views: Record<PreviewView, [number, number, number]> = {
  three: [2.55, 1.55, 3.15],
  front: [0, 0.15, 4.3],
  side: [4.3, 0.35, 0.15],
  top: [0.15, 4.5, 0.2],
};

const shapeFor: Record<PreviewKind, PackShape> = {
  box: "carton",
  rigid: "rigid",
  bag: "bag",
  flat: "label",
  sticker: "sticker",
};

export function PackPreview({
  config,
  apiRef,
  reducedMotion = false,
}: {
  config: PreviewConfig;
  apiRef?: RefObject<PreviewHandle | null>;
  reducedMotion?: boolean;
}) {
  return (
    <PreviewBoundary
      fallback={
        <PackShot
          shape={shapeFor[config.kind]}
          material={config.materialId}
          brand={config.brandColor}
          windowed={config.finishing.includes("die-cut")}
          label={config.label}
          className="h-full w-full"
        />
      }
    >
      <Canvas
        camera={{ position: views.three, fov: 32, near: 0.1, far: 30 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        aria-label={config.label}
      >
        <color attach="background" args={["#f3eee6"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.35} />
        <directionalLight position={[-3, 2, -2]} intensity={0.35} />
        <PackMesh config={config} />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.28} scale={8} blur={2.2} far={2.4} />
        <OrbitControls
          enablePan={false}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.65}
          minDistance={2.15}
          maxDistance={7}
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI / 1.75}
          makeDefault
        />
        {apiRef ? <PreviewApi apiRef={apiRef} /> : null}
      </Canvas>
    </PreviewBoundary>
  );
}

function fitted(length: number, width: number, height: number) {
  const safe = [length, width, height].map((value) => (Number.isFinite(value) && value > 0 ? value : 10));
  const max = Math.max(...safe, 1);
  const scale = 1.65 / max;
  return [safe[0] * scale, safe[2] * scale, safe[1] * scale] as [number, number, number];
}

function PackMesh({ config }: { config: PreviewConfig }) {
  const material = getMaterial(config.materialId);
  const face = material?.colors.face ?? "#f7f4ee";
  const [x, y, z] = fitted(config.length, config.width, config.height);
  const map = useFluteMap(config.materialId === "corrugated", face);
  const gloss = config.finishing.includes("gloss") || config.finishing.includes("spot-uv");
  const matte = config.finishing.includes("matte");
  const roughness = matte ? 0.9 : gloss ? 0.16 : config.materialId === "kraft" || config.materialId === "corrugated" ? 0.84 : 0.48;
  const shared = { color: face, roughness, metalness: 0.04, map };

  if (config.kind === "sticker") {
    const radius = Math.max(x, z) * 0.45;
    return (
      <mesh rotation={[-0.55, 0.45, 0.1]} castShadow>
        <cylinderGeometry args={[radius, radius, 0.045, 48]} />
        <meshStandardMaterial {...shared} />
      </mesh>
    );
  }

  if (config.kind === "flat") {
    return (
      <group rotation={[-0.45, 0.4, 0.05]}>
        <mesh castShadow>
          <boxGeometry args={[Math.max(x, 0.4), 0.04, Math.max(z, 0.25)]} />
          <meshStandardMaterial {...shared} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <planeGeometry args={[x * 0.55, z * 0.28]} />
          <meshStandardMaterial color={config.brandColor} roughness={0.45} />
        </mesh>
      </group>
    );
  }

  if (config.kind === "bag") {
    const bodyZ = Math.max(z * 0.28, 0.18);
    return (
      <group>
        <mesh castShadow>
          <boxGeometry args={[x, y, bodyZ]} />
          <meshStandardMaterial {...shared} />
        </mesh>
        <mesh position={[0, y * 0.05, bodyZ / 2 + 0.012]}>
          <planeGeometry args={[x * 0.62, y * 0.16]} />
          <meshStandardMaterial color={config.brandColor} roughness={roughness} metalness={config.finishing.includes("foil") ? 0.85 : 0.04} />
        </mesh>
        {[-0.22, 0.22].map((side) => (
          <mesh key={side} position={[x * side, y * 0.58, 0]} rotation={[0.15, 0, 0]}>
            <torusGeometry args={[Math.min(x * 0.16, 0.22), 0.018, 10, 28, Math.PI]} />
            <meshStandardMaterial color="#241c16" roughness={0.6} />
          </mesh>
        ))}
      </group>
    );
  }

  if (config.kind === "rigid") {
    return (
      <group>
        <RoundedBox args={[x, y * 0.78, z]} position={[0, -y * 0.05, 0]} radius={0.04} smoothness={2} castShadow>
          <meshStandardMaterial {...shared} />
        </RoundedBox>
        <RoundedBox args={[x * 1.03, y * 0.2, z * 1.03]} position={[0, y * 0.46, -z * 0.06]} radius={0.03} smoothness={2} castShadow>
          <meshStandardMaterial color={face} roughness={roughness} />
        </RoundedBox>
        <mesh position={[0, y * 0.57, z * 0.42]}>
          <planeGeometry args={[x * 0.42, y * 0.08]} />
          <meshStandardMaterial
            color={config.finishing.includes("foil") ? "#d4b36a" : config.brandColor}
            metalness={config.finishing.includes("foil") ? 0.9 : 0.08}
            roughness={0.28}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      <RoundedBox args={[x, y, z]} radius={Math.min(x, y, z) * 0.08} smoothness={2} castShadow>
        <meshStandardMaterial {...shared} />
      </RoundedBox>
      {config.finishing.includes("die-cut") ? (
        <mesh position={[0, y * 0.05, z / 2 + 0.02]}>
          <planeGeometry args={[x * 0.48, y * 0.32]} />
          <meshStandardMaterial color="#d5e6e6" roughness={0.08} transparent opacity={0.92} />
        </mesh>
      ) : (
        <mesh position={[0, 0, z / 2 + 0.015]}>
          <planeGeometry args={[x * 0.62, y * 0.36]} />
          <meshStandardMaterial
            color={config.finishing.includes("foil") ? "#d4b36a" : config.brandColor}
            metalness={config.finishing.includes("foil") ? 0.92 : 0.05}
            roughness={config.finishing.includes("spot-uv") ? 0.08 : 0.4}
          />
        </mesh>
      )}
      {config.finishing.includes("emboss") ? (
        <mesh position={[0, y * 0.28, z / 2 + 0.03]}>
          <boxGeometry args={[x * 0.34, y * 0.08, 0.03]} />
          <meshStandardMaterial color={face} roughness={0.5} />
        </mesh>
      ) : null}
      {config.finishing.includes("deboss") ? (
        <mesh position={[0, -y * 0.28, z / 2 + 0.012]}>
          <boxGeometry args={[x * 0.4, 0.015, 0.01]} />
          <meshStandardMaterial color="#1a1714" roughness={0.7} />
        </mesh>
      ) : null}
    </group>
  );
}

function useFluteMap(enabled: boolean, color: string) {
  return useMemo(() => {
    if (!enabled || typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.fillStyle = color;
    context.fillRect(0, 0, 128, 128);
    context.strokeStyle = "rgba(40, 28, 12, 0.18)";
    for (let line = 0; line < 128; line += 8) {
      context.beginPath();
      context.moveTo(line, 0);
      context.lineTo(line, 128);
      context.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    return texture;
  }, [enabled, color]);
}

function PreviewApi({ apiRef }: { apiRef: RefObject<PreviewHandle | null> }) {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls) as { target: THREE.Vector3; update: () => void } | null;
  const controlsRef = useRef(controls);

  useEffect(() => {
    controlsRef.current = controls;
    apiRef.current = {
      zoom(direction) {
        const offset = camera.position.clone().sub(controlsRef.current?.target ?? new THREE.Vector3());
        const next = offset.length() * (direction > 0 ? 0.86 : 1.16);
        offset.setLength(THREE.MathUtils.clamp(next, 2.15, 7));
        camera.position.copy(offset);
        controlsRef.current?.update();
      },
      setView(view) {
        const [vx, vy, vz] = views[view];
        camera.position.set(vx, vy, vz);
        controlsRef.current?.target.set(0, 0, 0);
        camera.lookAt(0, 0, 0);
        controlsRef.current?.update();
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, camera, controls]);

  return null;
}

class PreviewBoundary extends Component<{ children: React.ReactNode; fallback: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}
