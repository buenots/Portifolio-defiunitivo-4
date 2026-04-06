import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { C } from "../constants";
import * as THREE from "three";

export function EnergyRing() {
  const ringRef = useRef();
  const particlesRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random() * 0.3;
      pos[i * 3]     = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.3;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight color={C.neon} intensity={3} position={[0, 2, 2]} />
      <pointLight color={C.purple} intensity={2} position={[0, -2, -2]} />      <mesh ref={ringRef}>
        <torusGeometry args={[3, 0.04, 16, 100]} />
        <meshStandardMaterial color={C.neon} emissive={C.neon} emissiveIntensity={1.5} transparent opacity={0.9} />
      </mesh>      <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[2.5, 0.02, 16, 80]} />
        <meshStandardMaterial color={C.purple} emissive={C.purple} emissiveIntensity={1} transparent opacity={0.6} />
      </mesh>      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color={C.neon} transparent opacity={0.6} sizeAttenuation />
      </points>
    </group>
  );
}
