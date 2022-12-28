import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import React, { useEffect, useRef } from 'react'
import { Physics, useBox, usePlane } from "@react-three/cannon"
import * as THREE from 'three'

const Box = ({ canvas }) => {
    const { camera,mouse } = useThree();
    const [ref,api] = useBox(() => ({ mass: 1, position: [0, 5, 0] }))
    useEffect(() => {

        let controls = new OrbitControls(camera, canvas.current)

    }, [])
    return <mesh onClick={(e)=>{
        api.velocity.set(mouse.x*30,-mouse.y*30,-(mouse.x+mouse.y)*30)
    }} ref={ref} position={[0, 5, 0]} >
        <boxBufferGeometry attach={"geometry"}></boxBufferGeometry>
        <meshLambertMaterial color={[0, 1, 0]} attach={"material"}></meshLambertMaterial>
    </mesh>
}

const Plane = ({ canvas }) => {
    const objectRef = useRef(null);
    const { camera } = useThree();
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }))
    return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} ref={ref}>
        <planeBufferGeometry attach={"geometry"} args={[100, 100]}></planeBufferGeometry>
        <meshLambertMaterial color={[0, 1, 1]} attach={"material"}></meshLambertMaterial>
    </mesh>
}

const AppLesson2 = () => {
    const objectRef = useRef(null);

    return (
        <Canvas ref={objectRef} style={{ width: 1024, height: 768 }}>

            <ambientLight intensity={0.2}></ambientLight>
            <spotLight power={2} position={[-10, 10, 5]} intensity={1.2} angle={0.3}></spotLight>
            <Physics>
                <Box canvas={objectRef}></Box>
                <Plane canvas={objectRef}></Plane>
            </Physics>
        </Canvas>
    )
}

export default AppLesson2