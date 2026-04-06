import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { C } from "../constants";
import * as THREE from 'three';

export function FloatingCrystals() {
  const groupRef = useRef();
  const count = 150;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        temp.push({
            position: [
                (Math.random() - 0.5) * 20, 
                (Math.random() - 0.5) * 20, 
                (Math.random() - 0.5) * 10
            ],
            speed: (Math.random() + 0.5) * 0.5,
            rotationRate: [
                Math.random() * 0.5, 
                Math.random() * 0.5, 
                Math.random() * 0.5
            ]
        });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
        particle.position[1] += particle.speed * 0.02;
        
        if (particle.position[1] > 10) {
            particle.position[1] = -10;
        }

        dummy.position.set(particle.position[0], particle.position[1], particle.position[2]);
        dummy.rotation.x += particle.rotationRate[0] * 0.05;
        dummy.rotation.y += particle.rotationRate[1] * 0.05;
        dummy.rotation.z += particle.rotationRate[2] * 0.05;
        
        dummy.updateMatrix();
        groupRef.current.setMatrixAt(i, dummy.matrix);
    });
    groupRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={groupRef} args={[null, null, count]}>
      <octahedronGeometry args={[0.08, 0]} />
      <meshBasicMaterial color={C.neon} wireframe transparent opacity={0.4} />
    </instancedMesh>
  );
}
