import { useBox, useSphere } from '@react-three/cannon';
import { useEffect } from 'react';
import { Box, Sphere } from '@react-three/drei';

const randomShape = () => {
  const type = Math.random() > 0.5 ? 'box' : 'sphere';
  const mass = Math.random() * 2 + 1; // mass between 1 and 3
  const position = [Math.random() * 10 - 5, 10, Math.random() * 10 - 5];
  const size = Math.random() * 2 + 0.5; // size between 0.5 and 2.5

  return {
    type,
    mass,
    position,
    args: type === 'box' ? [size, size, size] : [size],
  };
};

const FallingShapes = () => {
  const shape = randomShape();

  const [ref, api] = shape.type === 'box' ? useBox(() => ({
    mass: shape.mass,
    position: shape.position,
    args: shape.args,
  })) : useSphere(() => ({
    mass: shape.mass,
    position: shape.position,
    args: shape.args,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      api.position.set(Math.random() * 10 - 5, 10, Math.random() * 10 - 5);
    }, 1000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <mesh ref={ref}>
      {shape.type === 'box' ? (
        <Box args={shape.args} />
      ) : (
        <Sphere args={shape.args} />
      )}
      <meshStandardMaterial color={shape.type === 'box' ? 'red' : 'blue'} />
    </mesh>
  );
};

export default FallingShapes;
