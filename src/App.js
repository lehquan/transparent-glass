import React, { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene';

const App = () => {
  return(
      <Suspense fallback={<span>loading...</span>}>
        <Canvas linear dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} camera={{ fov: 45, position: [0, 0, 10] }}>
          <color attach="background" args={['#faf0e6']} />
          <OrbitControls />
          <Scene/>
        </Canvas>
      </Suspense>
  )
}

export default App;
