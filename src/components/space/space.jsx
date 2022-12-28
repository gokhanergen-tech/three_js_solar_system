
import { useLoader, useThree } from '@react-three/fiber'
import { TextureLoader,DoubleSide,AudioListener,AudioLoader,Audio } from 'three'
import React, { useEffect, useRef } from 'react'

const Space = () => {
    const [space]=useLoader(TextureLoader,["/assets/textures/space/8k_stars.jpg"])
    const spaceRef=useRef(null)
    const {camera,gl}=useThree();

    useEffect(()=>{
      const listener=new AudioListener();
      camera.add(listener);
      const audioLoader=new AudioLoader();
      const sound=new Audio(listener);

      audioLoader.load("/assets/sounds/cosmic-glow-6703.mp3",(buffer)=>{
         sound.setBuffer(buffer);
         sound.setLoop(true)
         sound.setVolume(0.5);
         sound.play();
      })

      

      return ()=>{
        sound.stop();
      }

    },[])
    
    return (
        <>
            <mesh position={[0,0,0]} ref={spaceRef}>
                <sphereGeometry args={[750,1024,1024]}></sphereGeometry>
                <meshStandardMaterial side={DoubleSide} map={space}></meshStandardMaterial>
            </mesh>
        </>
    )
}

export default Space