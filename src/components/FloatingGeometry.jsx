import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, Edges, MeshTransmissionMaterial } from "@react-three/drei";
import { C } from "../constants";

export function FloatingGeometry() {
  const groupRef = useRef();
  
  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.3;
      
      groupRef.current.rotation.z += (pointer.x * 0.5 - groupRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight color={C.neon} intensity={3} position={[3, 3, 3]} />
      <pointLight color={C.purple} intensity={3} position={[-3, -3, -3]} />
      
      <Icosahedron args={[2, 0]}>
        <MeshTransmissionMaterial 
          distortionScale={0.3}
          temporalDistortion={0.5}
          thickness={0.5}
          roughness={0.2}
          transmission={1}
          ior={1.5}
          color={C.purple}
        />
        <Edges scale={1.05} threshold={15} color={C.neon} />
      </Icosahedron>
    </group>
  );
}
