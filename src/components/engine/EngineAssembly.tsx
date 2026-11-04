import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { advanceEngine } from './engineDynamics'
import type { EngineMotion } from './engineDynamics'
import Airflow from './Airflow'

const TAU=Math.PI*2
const steel='#9ea8b3', dark='#343d49'
// Engine axis is X. The forward-facing quadrant is removed to expose the core.
function Shell({profile,color=steel,start=.52*Math.PI,arc=1.12*Math.PI}:{profile:number[][];color?:string;start?:number;arc?:number}) {
  const points=profile.map(([x,r])=>new THREE.Vector2(r,x))
  return <mesh rotation={[0,0,-Math.PI/2]}><latheGeometry args={[points,96,start,arc]}/><meshStandardMaterial color={color} metalness={.88} roughness={.28} side={THREE.DoubleSide}/></mesh>
}
function Ring({x,r,t=.025,partial=false,color=steel}:{x:number;r:number;t?:number;partial?:boolean;color?:string}) {
  return <Shell profile={[[x-t,r-t],[x-t,r+t],[x+t,r+t],[x+t,r-t],[x-t,r-t]]} color={color} start={partial?.52*Math.PI:0} arc={partial?1.12*Math.PI:TAU}/>
}
function Tube({points,r=.025,color=steel}:{points:number[][];r?:number;color?:string}) {
  const curve=useMemo(()=>new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p as [number,number,number]))),[points])
  return <mesh><tubeGeometry args={[curve,32,r,8,false]}/><meshStandardMaterial color={color} metalness={.8} roughness={.25}/></mesh>
}
function Rotor({x,r,hub=.3,count=48,width=.12,fan=false,color=steel,pitchSign=-1}:{x:number;r:number;hub?:number;count?:number;width?:number;fan?:boolean;color?:string;pitchSign?:1|-1}) {
  const instances=useRef<THREE.InstancedMesh>(null)
  const geo=useMemo(()=>{
    const shape=new THREE.Shape()
    shape.moveTo(hub,-width*.35);shape.quadraticCurveTo(r*.7,-width*.6,r,-width)
    shape.lineTo(r,width*.3);shape.quadraticCurveTo(r*.6,width*.65,hub,width*.35);shape.closePath()
    const g=new THREE.ExtrudeGeometry(shape,{depth:fan?.025:.014,bevelEnabled:true,bevelSegments:1,bevelSize:.006,bevelThickness:.006,curveSegments:7})
    const a=g.attributes.position
    // After the Y rotation below, local Z becomes engine-axis X.
    // Negative pitch pairs with positive rotation.x to push air toward +X (exhaust).
    // Stationary compressor guide vanes use the opposite pitch.
    for(let i=0;i<a.count;i++)a.setZ(i,a.getZ(i)+pitchSign*a.getY(i)*(fan?1.4:.9))
    g.computeVertexNormals();return g
  },[r,hub,width,fan,pitchSign])
  useEffect(()=>()=>geo.dispose(),[geo])
  useLayoutEffect(()=>{
    const orient=new THREE.Matrix4().makeRotationY(Math.PI/2)
    for(let i=0;i<count;i++)instances.current?.setMatrixAt(i,new THREE.Matrix4().makeRotationX(i/count*TAU).multiply(orient))
    if(instances.current)instances.current.instanceMatrix.needsUpdate=true
  },[count,geo])
  return <group position={[x,0,0]}>
    <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[hub,hub,.09,48]}/><meshStandardMaterial color={dark} metalness={.85} roughness={.26}/></mesh>
    <instancedMesh ref={instances} args={[geo,undefined,count]}><meshStandardMaterial color={color} metalness={.9} roughness={.26} side={THREE.DoubleSide}/></instancedMesh>
  </group>
}
function Hardware() {
  return <>
    <Shell profile={[[-3,1.48],[-2.96,1.56],[-2.7,1.58],[-2.2,1.56],[-1.5,1.3],[-.9,1.05],[.2,.93],[1.5,.92],[2.3,.82],[3.05,.6]]}/>
    <Shell profile={[[-2.95,1.45],[-2.7,1.49],[-2.2,1.47],[-1.5,1.22],[-.9,.98],[.2,.87],[1.5,.86],[2.3,.75],[3,.54]]} color={dark}/>
    <Ring x={-2.94} r={1.5} t={.065}/><Ring x={-2.7} r={1.57} t={.035} partial/>
    {[-2.3,-1.92,-1.5,-1.02,-.7,.1,1.25,1.6,2,2.4,2.75].map((x,i)=><Ring key={x} x={x} r={[1.56,1.45,1.3,1.1,1.04,.94,.93,.92,.87,.79,.7][i]} t={i%3===0?.06:.026} partial/>)}
    {[-2.9,-2.3].map(x=>Array.from({length:32},(_,i)=>{const a=i/32*TAU;return <mesh key={x+'-'+i} position={[x,Math.sin(a)*1.52,Math.cos(a)*1.52]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.028,.028,.05,6]}/><meshStandardMaterial color={dark} metalness={.85} roughness={.25}/></mesh>}))}
    {/* Fixed stator rows alternate with the rotating compressor disks. */}
    {Array.from({length:9},(_,i)=><Rotor key={i} x={-1.82+i*.22} r={1.04-i*.045} hub={.36+i*.019} count={54} width={.055} color="#626e7b" pitchSign={1}/>)}
    <Shell profile={[[-2.4,.33],[-1.8,.37],[-.6,.48],[.25,.53]]} start={0} arc={TAU} color="#7b8999"/>
    {/* Open annular combustion chamber, including its perforated liner. */}
    <Shell profile={[[.2,.65],[.38,.76],[.96,.77],[1.25,.65]]} start={0} arc={Math.PI*1.4} color="#5a4b48"/>
    <Shell profile={[[.26,.56],[.45,.65],[1,.65],[1.2,.55]]} start={0} arc={Math.PI*1.4} color="#a29485"/>
    {[.32,.48,.64,.8,.96,1.12].map((x,i)=><Ring key={x} x={x} r={i===0||i===5?.65:.76} partial t={.014} color="#b1a594"/>)}
    {Array.from({length:12},(_,i)=>{const a=i/12*TAU;return <Tube key={i} r={.022} color="#ae7859" points={[[.12,Math.sin(a)*.86,Math.cos(a)*.86],[.25,Math.sin(a)*.88,Math.cos(a)*.88],[.43,Math.sin(a)*.72,Math.cos(a)*.72]]}/>})}
    <Shell profile={[[1.3,.42],[1.6,.4],[2.25,.32],[2.8,.26],[3.4,.025]]} start={0} arc={TAU} color="#a8b4c1"/>
    {[2.45,2.57,2.69,2.81,2.93].map((x,i)=><Ring key={x} x={x} r={.76-i*.04} partial t={.022}/>)}
    {/* Service lines and accessory housings remain on the uncut outer shell. */}
    {[-1,1].map(side=><group key={side}>
      <Tube points={[[-2.5,side*1.47,-.35],[-1.7,side*1.34,-.35],[-.7,side*1.04,-.35],[1.5,side*1,-.35],[2.3,side*.8,-.25]]} r={.035}/>
      <Tube points={[[-2.3,side*1.48,.08],[-1.7,side*1.3,.18],[-.7,side*.96,.28],[.5,side*.96,.3],[.6,side*1.1,.2],[1.2,side*1.08,.18],[1.4,side*.9,.15]]} r={.022} color="#456c91"/>
      <mesh position={[-2.05,side*1.48,-.12]}><boxGeometry args={[.65,.28,.48]}/><meshStandardMaterial color="#65707c" metalness={.8} roughness={.32}/></mesh>
      <mesh position={[-1.75,side*1.72,-.12]}><boxGeometry args={[.34,.2,.29]}/><meshStandardMaterial color={steel} metalness={.85} roughness={.3}/></mesh>
      {[-2.23,-2.07,-1.91].map(x=><Tube key={x} points={[[x,side*1.59,.12],[x,side*1.73,.13],[x+.07,side*1.76,-.08]]} r={.026} color="#b47a57"/>)}
    </group>)}
  </>
}
const plumeVertex=`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`
const plumeFragment=`varying vec2 vUv;uniform float power;uniform float time;void main(){float edge=pow(sin(vUv.y*3.14159),1.8);float fade=pow(1.-vUv.x,1.6);float ripple=.8+.2*sin(vUv.x*40.-time*9.);vec3 col=mix(vec3(.3,.55,1.),vec3(1.,.55,.23),smoothstep(.1,.85,vUv.x));gl_FragColor=vec4(col,edge*fade*ripple*power*.5);}`
export default function EngineAssembly({motion,bodyRef,running}:{motion:React.RefObject<EngineMotion>;bodyRef:React.RefObject<THREE.Group | null>;running:boolean}) {
  const fan=useRef<THREE.Group>(null), low=useRef<THREE.Group>(null), high=useRef<THREE.Group>(null), exhaust=useRef<THREE.Group>(null)
  const uniforms=useMemo(()=>({power:{value:0},time:{value:0}}),[])
  useFrame(({gl},dt)=>{
    if(!running)return
    const delta=Math.min(dt,.04)
    advanceEngine(motion.current,performance.now(),delta)
    const p=motion.current.speed
    if(import.meta.env.DEV){
      gl.domElement.dataset.spoolSpeed=p.toFixed(3)
      gl.domElement.dataset.throttle=motion.current.throttle.toFixed(3)
    }
      if(fan.current)fan.current.rotation.x+=delta*(.18+p*11)
      if(low.current)low.current.rotation.x+=delta*(.24+p*15)
      if(high.current)high.current.rotation.x+=delta*(.35+p*21)
      uniforms.time.value+=delta
    const thrust=1-Math.exp(-p*.55)
    uniforms.power.value=thrust
    if(import.meta.env.DEV)gl.domElement.dataset.exhaustPower=thrust.toFixed(3)
    if(exhaust.current)exhaust.current.scale.set(.4+thrust*2.4,1+thrust*.25,1+thrust*.25)
  })
  return <group rotation={[0,0,.025]}>
    <group ref={bodyRef}>
    <Hardware/>
    <group ref={fan}>
      <Rotor x={-2.75} r={1.42} hub={.32} count={28} width={.17} fan/>
      <Shell profile={[[-3.55,.015],[-3.4,.18],[-3.12,.3],[-2.75,.34]]} start={0} arc={TAU} color="#b0bbc5"/>
    </group>
    <group ref={low}>
      {[-2.23,-2.03].map((x,i)=><Rotor key={x} x={x} r={1.17-i*.08} count={42} hub={.35} width={.09}/>)}
      {[1.8,2.02,2.24].map((x,i)=><Rotor key={x} x={x} r={.76-i*.025} hub={.37} count={58} width={.065} color="#9299a4"/>)}
    </group>
    <group ref={high}>
      {Array.from({length:9},(_,i)=><Rotor key={i} x={-1.72+i*.22} r={1.02-i*.045} hub={.36+i*.019} count={56} width={.07}/>)}
      {[1.38,1.59].map(x=><Rotor key={x} x={x} r={.8} hub={.42} count={62} width={.07} color="#b2a59a"/>)}
    </group>
    </group>
    <Airflow motion={motion} running={running}/>
    <group ref={exhaust} position={[3.04,0,0]}>
      {[0,Math.PI/2,Math.PI/4,-Math.PI/4].map(a=><mesh key={a} position={[1.7,0,0]} rotation={[a,0,0]}><planeGeometry args={[3.4,1.15]}/><shaderMaterial vertexShader={plumeVertex} fragmentShader={plumeFragment} uniforms={uniforms} transparent depthWrite={false} side={THREE.DoubleSide}/></mesh>)}
    </group>
  </group>
}
