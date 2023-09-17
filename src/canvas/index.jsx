import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';
import TShirt from './TShirt';

const CanvasIndex = () => {
  return (
    <Canvas
    shadows
    camera={{ position: [0, 0, 0], fov: 25 }}
    gl={{ preserveDrawingBuffer: true }}
    className="w-full max-w-full h-full transition-all ease-in"
  >
    <TShirt/>
    </Canvas>
  )
}

export default CanvasIndex