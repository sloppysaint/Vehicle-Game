import { useBox, useSphere, useCylinder } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Vector3 } from 'three';

const Vehicle = () => {
  const [keyWPressed, setKeyWPressed] = useState(false);
  const [keySPressed, setKeySPressed] = useState(false);

  const bodyRef = useRef();
  const frontWheelRef = useRef();
  const backWheelRef = useRef();

  const [body, apiBody] = useBox(() => ({ mass: 1, ref: bodyRef }));
  const [frontWheel, apiFrontWheel] = useSphere(() => ({ mass: 1, ref: frontWheelRef }));
  const [backWheel, apiBackWheel] = useCylinder(() => ({ mass: 1, ref: backWheelRef }));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') setKeyWPressed(true);
      if (event.key === 's') setKeySPressed(true);
    };

    const handleKeyUp = (event) => {
      if (event.key === 'w') setKeyWPressed(false);
      if (event.key === 's') setKeySPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(({ mouse }) => {
    const direction = new Vector3();

    if (keyWPressed) {
      direction.set(mouse.x, 0, mouse.y).normalize().multiplyScalar(5); // Adjust speed as needed
    } else if (keySPressed) {
      direction.set(-mouse.x, 0, -mouse.y).normalize().multiplyScalar(5);
    }

    apiBody.velocity.set(direction.x, 0, direction.z);
  });

  return (
    <group ref={body}>
      {/* Front Wheel */}
      <mesh ref={frontWheel} position={[0, -0.5, 1.5]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Back Wheels */}
      <mesh ref={backWheel} position={[-0.6, -0.5, -1.5]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0.6, -0.5, -1.5]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Vehicle Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
};

export default Vehicle;
