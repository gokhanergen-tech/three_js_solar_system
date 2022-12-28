import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { TextGeometry } from '../node_modules/three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from '../node_modules/three/examples/jsm/loaders/FontLoader.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from '../node_modules/three/examples/jsm/controls/PointerLockControls'
import { Sky } from "../node_modules/three/examples/jsm/objects/Sky"

const loader = new FontLoader();

const boxes = []

for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        boxes.push(<Box position={[i, 0, j]}></Box>)
    }
}
const Camera = ({ canvasRef }) => {

    const stateRef = useRef({ a: 0, s: 0, d: 0, w: 0, x: 0, z: 0 })
    useFrame((state) => {

        if (stateRef.current.z)
            state.camera.position.y += 0.2;
        if (stateRef.current.x)
            state.camera.position.y -= 0.2;

        state.camera.updateMatrix()

    })
    const { camera, mouse } = useThree()

    useEffect(() => {
        let keyControls = new PointerLockControls(camera, canvasRef.current)
        let controls = new OrbitControls(camera, canvasRef.current)
        controls.enablePan = true;
        controls.panSpeed = 4000;
        controls.keyPanSpeed = 26000;
        controls.enableRotate=true;
        camera.position.set(0,0,0)
        controls.target=camera.position.clone();




        canvasRef.current.addEventListener("mousemove", mouseRotate)



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
                
            keyControls.moveForward((stateRef.current.w - stateRef.current.s) * 0.5)
            keyControls.moveRight((stateRef.current.d - stateRef.current.a) * 0.5)
           
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

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const [scene, setScene] = useState(null)
    const state = useThree()
    // Subscribe this component to the render-loop, rotate the mesh every frame


    const clickHandler = async () => {
        const font = await loader.loadAsync('/fonts/gentilis_regular.typeface.json');
        const text = new TextGeometry('Boom', {
            font: font,
            size: 0.1,
            height: 0.01,


        });




        const title = new THREE.Mesh(text, new THREE.MeshBasicMaterial({ color: 0x0000ff }))
        title.position.set(ref.current.position.x, ref.current.position.y + 2, ref.current.position.z)
        state.scene.add(title)
        state.scene.autoUpdate = true;
        setTimeout(() => {
            state.scene.remove(title)
        }, 1000)
    }

    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={clickHandler}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />

            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

const App = () => {

    useEffect(() => {
        const start = async () => {
            const canvasObject = document.getElementById("canvas");
            if (canvasObject.getContext("webgl")) {
                const renderer = new THREE.WebGLRenderer({ context: canvasObject.getContext("webgl") });
                const sky = new Sky();
                sky.scale.setScalar(450000);
                renderer.setClearColor([0, 0, 0], 1)
                renderer.clearDepth()
                const camera = new THREE.PerspectiveCamera(90, canvasObject.width / canvasObject.height, 0.1, 100);
                const controls = new OrbitControls(camera, canvas);
                camera.position.set(0, 20, 5);
                camera.lookAt(0, 0, 0)
                const scene = new THREE.Scene()

                const sun = new THREE.Vector3(0, 0, 0);

                /// GUI

                const effectController = {
                    turbidity: 10,
                    rayleigh: 3,
                    mieCoefficient: 0.002,
                    mieDirectionalG: 0.7,
                    elevation: 0.2,
                    azimuth: 180,
                    exposure: renderer.toneMappingExposure
                };
                const uniforms = sky.material.uniforms;


                const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
                const theta = THREE.MathUtils.degToRad(effectController.azimuth);

                sun.setFromSphericalCoords(1, phi, theta);
                uniforms['turbidity'].value = effectController.turbidity;
                uniforms['rayleigh'].value = effectController.rayleigh;
                uniforms['mieCoefficient'].value = effectController.mieCoefficient;
                uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;
                uniforms['sunPosition'].value = sun;


                renderer.toneMappingExposure = effectController.exposure;


                const font = await loader.loadAsync('/fonts/gentilis_regular.typeface.json');
                const text = new TextGeometry('Gökhan ERGEN', {
                    font: font,
                    size: 0.2,
                    height: 0.01,


                });



                const title = new THREE.Mesh(text, new THREE.MeshBasicMaterial())
                title.position.set(0, 0, 0)

                scene.add(title);

                scene.add(sky)


                const renderMachine = () => {
                    controls.update()
                    renderer.render(scene, camera);
                    window.requestAnimationFrame(renderMachine)
                }
                window.requestAnimationFrame(renderMachine)
            } else {
                console.log("You browser does not support webgl!");
            }
        }

    }, [])

    const refCanvas = useRef(null)


    return (
        <Canvas shadows ref={refCanvas} camera={{ position: [0, 10, 5], fov: 90, far: 500, near: 0.1, aspect: 1.777778 }} style={{ height: 480, width: 640, backgroundColor: "black" }}>

            <ambientLight intensity={0.2}></ambientLight>

            <pointLight position={[0, 1, 0]} intensity={1}></pointLight>
            {
                boxes
            }
            <Camera canvasRef={refCanvas}></Camera>
        </Canvas>
    )
}

export default App