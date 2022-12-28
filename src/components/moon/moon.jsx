import React, { useRef } from 'react'
import { useLoader,useFrame } from '@react-three/fiber'
import { TextureLoader} from 'three'
import { Matrix4 } from 'three'
const Moon = () => {
    const [moon] = useLoader(TextureLoader, ["/assets/textures/moon/8k_moon.jpg"])
    const moonRef = useRef(null);

    useFrame(({ clock }) => {
     
        const matrix4 = new Matrix4()
        
        matrix4.makeRotationY(Math.PI / 180)

       moonRef.current.applyMatrix4(matrix4)
      
 
        
      
    })
  return (
    <>
    <mesh position={[16,0,0]} ref={moonRef}>
        <sphereGeometry args={[1,16,16]}></sphereGeometry>
        <meshStandardMaterial map={moon}></meshStandardMaterial>
    </mesh>
</>
  )
}

export default React.memo(Moon)