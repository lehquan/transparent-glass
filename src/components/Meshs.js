import React, { useRef } from 'react';
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// Assets
import texture from '../assets/texture.jpeg'
import normal from '../assets/normal.jpg'
import hdr from '../assets/empty_warehouse_01_4k.hdr'

// Sepcial thanks to Tutorial: https://tympanus.net/codrops/2021/10/27/creating-the-effect-of-transparent-glass-and-plastic-in-three-js

const Meshs = () => {
  const icoRef = useRef()
  const tetraRef = useRef()
  const sphereRef = useRef()
  const boxRef = useRef()
  const loader = new THREE.TextureLoader()
  const bg = loader.load(texture)
  const rgbeLoader = new RGBELoader()
  rgbeLoader.setDataType(THREE.UnsignedByteType)
  const hdrEquirect = rgbeLoader.load(hdr,() => hdrEquirect.mapping = THREE.EquirectangularReflectionMapping)
  const normalTexture = loader.load(normal)
  normalTexture.wrapS = THREE.RepeatWrapping;
  normalTexture.wrapT = THREE.RepeatWrapping;

  //
  useFrame(({clock}) => {
    icoRef.current.rotation.x += 0.001;
    icoRef.current.rotation.y += 0.01;

    boxRef.current.rotation.x += 0.001;
    boxRef.current.rotation.y += 0.01;
  })

  return(
      <group>
        <mesh ref={icoRef} rotation={[0, Math.PI/180 * 30, 0]} position={[-2.5, 0, 0]}>
          <icosahedronBufferGeometry args={[1, 0]}/>
          <meshPhysicalMaterial
              envMap={hdrEquirect}
              metalness={0}
              roughness={.5}
              transmission={1}
              thickness={1.5}
              envMapIntensity={1.5}/>
        </mesh>
        <mesh ref={sphereRef} rotation={[0, Math.PI/180 * 30, 0]} position={[0, 1.5, 0]}>
          <icosahedronBufferGeometry args={[1, 15]}/>
          <meshPhysicalMaterial
              envMap={hdrEquirect}
              metalness={0}
              roughness={.67}
              transmission={1}
              thickness={1.5}
              envMapIntensity={1.5}
              clearcoat={1}
              clearcoatRoughness={0.12}/>
        </mesh>
        <RoundedBox ref={boxRef} args={[1.5, 1.5, 1.5, 16, 0.2]} radius={0.2} position={[2.5, 0, 0]}>
          <meshPhysicalMaterial
              envMap={hdrEquirect}
              metalness={0}
              roughness={.01}
              transmission={1}
              thickness={1.5}
              envMapIntensity={1.5}/>
        </RoundedBox>
        <mesh ref={tetraRef} rotation={[0, Math.PI/180 * 30, 0]} position={[0, -1.5, 0]}>
          <tetrahedronBufferGeometry args={[1.3, 0]}/>
          <meshPhysicalMaterial
              envMap={hdrEquirect}
              envMapIntensity={1.5}
              normalMap={normalTexture}
              clearcoatNormalMap={normalTexture}
              metalness={0}
              roughness={.5}
              transmission={1}
              thickness={1.5}/>
        </mesh>

        {/*backdrop*/}
        <mesh position={[0,0,-1]}>
          <planeBufferGeometry args={[8, 8]}/>
          <meshBasicMaterial map={bg} side={THREE.DoubleSide}/>
        </mesh>

      </group>

  )
}

export default Meshs
