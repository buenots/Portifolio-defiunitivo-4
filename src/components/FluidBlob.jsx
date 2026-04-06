import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { C } from "../constants";

export function FluidBlob() {
  const meshRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      meshRef.current.position.x += (pointer.x * 2 - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (pointer.y * 2 - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={3} color={C.neon} />
      <directionalLight position={[-10, -10, -5]} intensity={2} color={C.purple} />
      
      <Sphere ref={meshRef} visible args={[2.5, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#060d14"
          emissive={C.purple} 
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
          distort={0.4} 
          speed={2} 
        />
      </Sphere>
    </group>
  );
}
