import { useLoader } from '@react-three/fiber'
import { TextureLoader,DoubleSide } from 'three'
import React, { useRef } from 'react'

const Sun = () => {
    const [sun] = useLoader(TextureLoader, ["/assets/textures/space/8k_sun.jpg"])
    const sunRef = useRef(null)
    
    return (
        <>
            <pointLight distance={250} position={[150, 0, 0]} intensity={50} color={0xffffff} ></pointLight>
            
            <mesh receiveShadow position={[200, 0, 0]} ref={sunRef}>
                <hemisphereLight  intensity={0.5}  groundColor={"#ffffff"}></hemisphereLight>
                <sphereGeometry  args={[50, 256, 256]}></sphereGeometry>
                <meshStandardMaterial side={DoubleSide}  map={sun}></meshStandardMaterial>
            </mesh>

        </>
    )
}

export default Sun