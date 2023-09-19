import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';
import TShirt from './TShirt';
import Camera from './Camera';
import { BackSide } from 'three';

const CanvasIndex = () => {
  return (
  <Canvas
  shadows
  camera={{
    position:[0,0,0],
    fov:25

  }}
  gl={{preserveDrawingBuffer:true}}
  className='w-full max-w-full h-full transition-all ease-in'
  >
    <ambientLight intensity={0.5}/>
    <Environment preset='city' />
    <Camera>
      <BackSide/>
    <Center>
      <TShirt/>
    </Center>
    </Camera>
  
  </Canvas>
  )
}

export default CanvasIndex