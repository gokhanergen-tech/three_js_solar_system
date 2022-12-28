import { useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { TextureLoader } from 'three'
import {  DoubleSide, Matrix4 } from 'three'
import Moon from '../moon/moon'

const World = ({ canvas }) => {
    const [daymap, clouds, normalMap, specularMap] = useLoader(TextureLoader, ["/assets/textures/world/8k_earth_daymap.jpg"
        , "/assets/textures/world/8k_earth_clouds.jpg", "/assets/textures/world/8k_earth_normal_map.jpg", "/assets/textures/world/8k_earth_specular_map.jpg"])
    const { camera } = useThree();
    const cloudsRef = useRef(null);
    const worldRef = useRef(null);

    useEffect(() => {
        camera.position.set(0, 0, 10)

    }, [])

    useFrame(({ clock }) => {
    
        const matrix4 = new Matrix4()
        matrix4.makeTranslation(-150, 0, 0)


        worldRef.current.applyMatrix4(matrix4)
      
        matrix4.makeRotationY(Math.PI / 1800)

        worldRef.current.applyMatrix4(matrix4)
      
        matrix4.makeTranslation(150, 0, 0)

        worldRef.current.applyMatrix4(matrix4)
        
      
    })

    return (
        <>
            <ambientLight intensity={0.2}></ambientLight>
            <group ref={worldRef}>
                <mesh ref={cloudsRef}>
                    <sphereGeometry args={[2.001, 32, 32]}></sphereGeometry>
                    <meshPhongMaterial opacity={0.4} map={clouds} depthWrite={true} side={DoubleSide} transparent={true} ></meshPhongMaterial>
                </mesh>
                <mesh >
                    <sphereGeometry args={[2, 32, 32]}></sphereGeometry>
                    <meshPhongMaterial specularMap={specularMap} />
                    <meshStandardMaterial map={daymap} normalMap={normalMap}></meshStandardMaterial>
                </mesh>
                <Moon></Moon>
            </group>
        </>
    )
}

export default React.memo(World)