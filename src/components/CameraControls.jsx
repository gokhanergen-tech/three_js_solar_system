import { useFrame, useThree } from '@react-three/fiber'
import React,{useRef,useEffect} from 'react'
import { PointerLockControls } from '../../node_modules/three/examples/jsm/controls/PointerLockControls'

const CameraControls = () => {
    const stateRef = useRef({ a: 0, s: 0, d: 0, w: 0, x: 0, z: 0 })
    useFrame((state) => {

        if (stateRef.current.z)
            state.camera.position.y += 0.2;
        if (stateRef.current.x)
            state.camera.position.y -= 0.2;

        state.camera.updateMatrix()

    })
    const { camera,gl} = useThree()

    useEffect(() => {
        let keyControls = new PointerLockControls(camera, gl.domElement)

        document.addEventListener("keydown", (e) => {
            const key = e.key;
            if (key === "w" || key === "W")
                stateRef.current.w = 1;
            if (key === "a" || key === "A")
                stateRef.current.a = 1;
            if (key === "D" || key === "d")
                stateRef.current.d = 1;
            if (key === "s" || key === "S")
                stateRef.current.s = 1;
            if (key === "z" || key === "Z")
                stateRef.current.z = 1;
            if (key === "x" || key === "X")
                stateRef.current.x = 1;
                
            keyControls.moveForward((stateRef.current.w - stateRef.current.s) * 2)
            keyControls.moveRight((stateRef.current.d - stateRef.current.a) * 2)
           
        })

        document.addEventListener("keyup", (e) => {
            const key = e.key;

            if (key === "w" || key === "W")
                stateRef.current.w = 0;
            if (key === "a" || key === "A")
                stateRef.current.a = 0;
            if (key === "D" || key === "d")
                stateRef.current.d = 0;
            if (key === "s" || key === "S")
                stateRef.current.s = 0;
            if (key === "z" || key === "Z")
                stateRef.current.z = 0;
            if (key === "x" || key === "X")
                stateRef.current.x = 0;

        })


    }, [])
    return null;
}

export default CameraControls