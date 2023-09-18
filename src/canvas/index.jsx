import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';
import TShirt from './TShirt';
import Camera from './Camera';

const CanvasIndex = () => {
  return (
  <Canvas>
    <ambientLight intensity={0.5}/>
    <Environment preset='city' />
    <Camera>
    <Center>
      <TShirt/>
    </Center>
    </Camera>
  
  </Canvas>
  )
}

export default CanvasIndex