"use client"
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import Vehicle from '../components/Vehicle';
import FallingShapes from '../components/FallingShapes';
import { OrbitControls } from '@react-three/drei';

const HomePage = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        <Physics>
          <Vehicle />
          <FallingShapes />
          <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        </Physics>

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default HomePage;
