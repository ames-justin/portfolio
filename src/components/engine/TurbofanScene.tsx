import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import EngineAssembly from './EngineAssembly'
import EngineFallback from './EngineFallback'
import { addScrollImpulse } from './engineDynamics'
import type { EngineMotion } from './engineDynamics'

export type SceneProps = { motion: React.RefObject<EngineMotion>; visible: boolean; onUnavailable:()=>void; cameraScale?: number }
function Scene({ motion, visible, cameraScale = 1 }: SceneProps) {
  const { size, camera, invalidate, gl } = useThree()
  const engineBody=useRef<THREE.Group>(null)
  const [finePointer, setFinePointer] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');setFinePointer(mq.matches)
    const onChange=()=>setFinePointer(mq.matches);mq.addEventListener('change',onChange)
    return()=>mq.removeEventListener('change',onChange)
  },[])
  useEffect(() => {
    const factor = Math.max(1, 1.3 / (size.width / size.height)) * cameraScale
    camera.position.set(-3.6*factor,2.3*factor,12*factor);camera.lookAt(0,0,0);camera.updateProjectionMatrix();invalidate()
  },[size.width,size.height,camera,invalidate,cameraScale])
  useEffect(()=>{ invalidate() },[visible,invalidate])
  useEffect(()=>{
    motion.current.onChange=invalidate
    const current=motion.current
    return()=>{current.onChange=undefined}
  },[motion,invalidate])
  useEffect(()=>{
    const canvas=gl.domElement
    const raycaster=new THREE.Raycaster()
    const pointer=new THREE.Vector2()
    // Hit-test the engine itself, leaving the surrounding empty canvas scrollable.
    const onWheel=(event:WheelEvent)=>{
      if(event.ctrlKey || !visible || !engineBody.current)return
      const rect=canvas.getBoundingClientRect()
      pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1)
      raycaster.setFromCamera(pointer,camera)
      if(!raycaster.intersectObject(engineBody.current,true).length)return
      event.preventDefault()
      event.stopPropagation()
      const unit=event.deltaMode===1?16:event.deltaMode===2?rect.height:1
      const delta=Math.abs(event.deltaY || event.deltaX)*unit
      addScrollImpulse(motion.current,delta,performance.now())
      invalidate()
    }
    canvas.addEventListener('wheel',onWheel,{passive:false,capture:true})
    return()=>canvas.removeEventListener('wheel',onWheel,{capture:true})
  },[camera,gl,motion,visible,invalidate])
  useEffect(()=>{gl.domElement.style.touchAction='pan-y'},[gl])
  return <>
    <ambientLight intensity={.55}/><hemisphereLight args={['#e6efff','#55545a',1.1]}/>
    <directionalLight position={[-3,6,4]} intensity={3}/><directionalLight position={[4,1,-3]} intensity={2} color="#d4e6ff"/>
    <Environment resolution={128} frames={1}>
      <Lightformer position={[0,5,0]} rotation={[Math.PI/2,0,0]} scale={[12,4,1]} intensity={4}/>
      <Lightformer position={[-3,1,6]} scale={[4,7,1]} intensity={3}/>
      <Lightformer position={[4,0,-5]} rotation={[0,Math.PI,0]} scale={[7,3,1]} intensity={4} color="#cfddf5"/>
    </Environment>
    <EngineAssembly motion={motion} bodyRef={engineBody} running={visible}/>
    {finePointer && <OrbitControls enabled={visible} enablePan={false} enableZoom={false} enableDamping={false} minAzimuthAngle={-.6} maxAzimuthAngle={.12} minPolarAngle={1.1} maxPolarAngle={1.6} target={[0,0,0]}/>}
  </>
}
export default function TurbofanScene(props: SceneProps) {
  const [lost,setLost]=useState(false)
  const cleanup=useRef<(()=>void)|undefined>(undefined)
  useEffect(()=>()=>cleanup.current?.(),[])
  if(lost)return <EngineFallback/>
  return <Canvas dpr={[1,1.5]} frameloop={props.visible ? 'always' : 'demand'} camera={{position:[-3.6,2.3,12],fov:34,near:.1,far:100}} gl={{antialias:true,alpha:true,powerPreference:'low-power'}} onCreated={({gl})=>{
    const onLost=(e:Event)=>{e.preventDefault();setLost(true);props.onUnavailable()}
    gl.domElement.addEventListener('webglcontextlost',onLost)
    cleanup.current=()=>gl.domElement.removeEventListener('webglcontextlost',onLost)
    if(import.meta.env.DEV && new URLSearchParams(location.search).get('engine')==='fail')gl.forceContextLoss()
  }} fallback={null} aria-label="Interactive illustrative turbofan cutaway with animated airflow. Blue and cyan show cooler air; orange and yellow show warmer core flow. Colors are qualitative, not simulation results. Drag with a mouse to inspect. Scroll over the engine to increase speed. Scroll outside it to explore projects.">
    <Scene {...props}/>
  </Canvas>
}
