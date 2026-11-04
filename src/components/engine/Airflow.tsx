import { useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { EngineMotion } from './engineDynamics'

// Hand-shaped illustrative paths, not a fluid simulation or temperature data.
// Separate bypass and core routes keep cool air outside the combustion region.
const vertex = `
varying vec2 vUv;
varying float vAxial;
void main() {
  vUv = uv;
  vAxial = position.x;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`
const fragment = `
uniform float phase;
uniform float strength;
uniform float bypass;
uniform float offset;
varying vec2 vUv;
varying float vAxial;
void main() {
  vec3 blue = vec3(0.04, 0.37, 0.86);
  vec3 cyan = vec3(0.03, 0.68, 0.72);
  vec3 green = vec3(0.30, 0.75, 0.38);
  vec3 yellow = vec3(0.98, 0.76, 0.16);
  vec3 hot = vec3(0.96, 0.22, 0.06);
  vec3 core = mix(blue, cyan, smoothstep(-3.4, -1.8, vAxial));
  core = mix(core, green, smoothstep(-1.8, -0.2, vAxial));
  core = mix(core, hot, smoothstep(0.0, 0.65, vAxial));
  core = mix(core, yellow, smoothstep(1.1, 3.7, vAxial));
  vec3 cool = mix(blue, cyan, smoothstep(-3.0, 2.8, vAxial));
  vec3 color = mix(core, cool, bypass);
  float pulse = pow(0.5 + 0.5 * cos((vUv.x - phase + offset) * 37.699), 8.0);
  float ends = smoothstep(0.0, 0.07, vUv.x) * (1.0 - smoothstep(0.87, 1.0, vUv.x));
  float alpha = ends * (0.38 + pulse * 0.57) * strength;
  gl_FragColor = vec4(color, alpha);
}`

export default function Airflow({motion,running}:{motion:React.RefObject<EngineMotion>;running:boolean}) {
  const streams = useMemo(() => {
    const core = [[-4.1,1.23],[-3.2,1.2],[-2.65,1.15],[-1.8,.94],[-.7,.76],[.1,.68],[.65,.78],[1.1,.73],[1.65,.66],[2.6,.53],[3.3,.38],[4.8,.58]]
    const bypass = [[-4.1,1.62],[-3.2,1.52],[-2.6,1.48],[-1.8,1.37],[-.6,1.18],[.8,1.09],[1.8,1.02],[2.7,.87],[3.4,.73],[4.8,.9]]
    return [false,true].flatMap(isBypass => Array.from({length:isBypass?8:14},(_,i) => {
      const count = isBypass?8:14
      const angle = -1.18 + i/(count-1)*2.36
      const curve = new THREE.CatmullRomCurve3((isBypass?bypass:core).map(([x,r]) =>
        new THREE.Vector3(x,Math.sin(angle)*r,Math.cos(angle)*r)))
      const geometry = new THREE.TubeGeometry(curve,100,isBypass?.011:.016,5,false)
      const material = new THREE.ShaderMaterial({
        vertexShader:vertex, fragmentShader:fragment, transparent:true,
        // Draw as a translucent diagram overlay so dense blade rows don't hide the flow.
        depthWrite:false, depthTest:false, toneMapped:false,
        uniforms:{phase:{value:0},strength:{value:.8},bypass:{value:isBypass?1:0},offset:{value:i*.071}}
      })
      return {geometry,material}
    }))
  },[])
  useEffect(() => () => streams.forEach(({geometry,material}) => {geometry.dispose();material.dispose()}),[streams])
  useFrame(({gl},dt) => {
    if(!running)return
    const speed = motion.current.speed
    streams.forEach(({material}) => {
      material.uniforms.phase.value = (material.uniforms.phase.value + Math.min(dt,.04)*(.075+speed*.095))%1
      material.uniforms.strength.value = .85 + (1-Math.exp(-speed*.5))*.25
    })
    if(import.meta.env.DEV)gl.domElement.dataset.airflowPhase=streams[0].material.uniforms.phase.value.toFixed(4)
  })
  return <group>{streams.map(({geometry,material},i)=><mesh key={i} geometry={geometry} material={material} renderOrder={3} dispose={null}/>)}</group>
}
