import { Canvas } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
import CameraControls from './components/CameraControls';
import { FPVControls } from './components/FPVControls';
import Space from './components/space/space';
import Sun from './components/sun/Sun';
import World from './components/world/world'

const AppEarth = () => {
    const canvasRef = useRef(null);
    return (
        <div>
            <div style={{ position: "relative" }}>
                <Canvas ref={canvasRef} className="canvas">
                    <Suspense fallback={null}>
                        <World canvas={canvasRef}></World>
                        <Space></Space>
                        <Sun></Sun>
                    </Suspense>
                    <FPVControls></FPVControls>
                    <CameraControls></CameraControls>
                </Canvas>
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor:"#00000000",
                    pointerEvents:"none",
                    display:"flex",
                    alignItems:"center"
                }}>
                   <h1 style={{color:"white"}}>The danger of global warming</h1>
                </div>
            </div>


        </div>

    )
}

export default AppEarth