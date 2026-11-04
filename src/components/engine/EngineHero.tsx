import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EngineFallback from './EngineFallback'
import { addScrollImpulse } from './engineDynamics'
import type { EngineMotion } from './engineDynamics'
import './engine.css'
const TurbofanScene=lazy(()=>import('./TurbofanScene'))
gsap.registerPlugin(ScrollTrigger)
class SceneBoundary extends Component<{children:ReactNode;onUnavailable:()=>void},{failed:boolean}> {
  state={failed:false}
  static getDerivedStateFromError(){return {failed:true}}
  componentDidCatch(){this.props.onUnavailable()}
  render(){return this.state.failed ? <EngineFallback/> : this.props.children}
}
export default function EngineHero() {
  const hero=useRef<HTMLElement>(null)
  const engineCanvas=useRef<HTMLDivElement>(null)
  const motion=useRef<EngineMotion>({progress:0,throttle:0,speed:0,lastInputAt:0})
  const [visible,setVisible]=useState(true)
  const [pageVisible,setPageVisible]=useState(!document.hidden)
  const [unavailable,setUnavailable]=useState(false)
  const [playback,setPlayback]=useState<'playing'|'paused'>('playing')
  const playing=playback==='playing'
  const [pin,setPin]=useState(()=>window.matchMedia('(min-height: 651px)').matches)
  useEffect(()=>{
    const pinQuery=window.matchMedia('(min-height: 651px)')
    const onPinChange=()=>setPin(pinQuery.matches);pinQuery.addEventListener('change',onPinChange)
    const observer=new IntersectionObserver(([entry])=>{setVisible(entry.isIntersecting)},{rootMargin:'100px'})
    if(hero.current)observer.observe(hero.current)
    const onVisibility=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',onVisibility)
    return()=>{pinQuery.removeEventListener('change',onPinChange);observer.disconnect();document.removeEventListener('visibilitychange',onVisibility)}
  },[])
  useLayoutEffect(()=>{
    if(unavailable || !playing || !hero.current){motion.current.progress=0;return}
    const canvas=engineCanvas.current
    const section=hero.current
    const focused=section.contains(document.activeElement)?document.activeElement as HTMLElement:null
    let refreshFocus:HTMLElement|null=null
    let active=true
    let previousProgress=motion.current.progress
    const context=gsap.context(()=>{
      gsap.to(motion.current,{progress:1,ease:'none',onUpdate:()=>{
        if(!active)return
        const p=motion.current.progress
        const travel=Math.abs(p-previousProgress)
        if(travel>0)addScrollImpulse(motion.current,travel*900,performance.now())
        previousProgress=p
        if(canvas)canvas.style.transform='translateX('+(-Math.pow(Math.max(0,(p-.68)/.32),1.4)*window.innerWidth*1.25)+'px)'
        section.style.setProperty('--copy-opacity',String(1-Math.min(1,Math.max(0,(p-.65)/.12))))
        if(hero.current)hero.current.dataset.progress=p.toFixed(3)
        motion.current.onChange?.()
      },scrollTrigger:{trigger:hero.current,start:'top top',end:()=>'+='+Math.min(window.innerHeight*.95,850),pin,scrub:.35,anticipatePin:1,invalidateOnRefresh:true,
        onRefreshInit:()=>{refreshFocus=section.contains(document.activeElement)?document.activeElement as HTMLElement:null},
        onRefresh:()=>{refreshFocus?.focus({preventScroll:true});refreshFocus=null}
      }})
    },hero)
    // Pinning reparents the hero; preserve keyboard focus on the playback control.
    focused?.focus({preventScroll:true})
    return()=>{
      const focused=section.contains(document.activeElement)?document.activeElement as HTMLElement:null
      active=false;context.revert();if(canvas)canvas.style.transform='';section.style.removeProperty('--copy-opacity')
      focused?.focus({preventScroll:true})
    }
  },[unavailable,playing,pin])
  return <section ref={hero} className="hero hero-minimal" aria-labelledby="hero-heading" data-motion={unavailable?'unavailable':playing?'playing':'paused'}>
    <div className="cassette-reels" aria-hidden="true"><span/><span/></div>
    <div className="hero-copy">
      <p className="hero-eyebrow">MECHANICAL ENGINEERING / PORTFOLIO</p>
      <h1 id="hero-heading">Justin Ames</h1>
      <p className="hero-description">Senior mechanical engineering student at GWU.</p>
    </div>
    <div className="engine-stage">
      <div ref={engineCanvas} className="engine-canvas">
        {unavailable ? <EngineFallback/> : <SceneBoundary onUnavailable={()=>setUnavailable(true)}><Suspense fallback={null}><TurbofanScene motion={motion} visible={visible && pageVisible && playing} onUnavailable={()=>setUnavailable(true)}/></Suspense></SceneBoundary>}
      </div>
    </div>
    {!unavailable && playing && <p className="engine-interaction-hint"><span aria-hidden="true">↔</span> Hover and scroll over the engine to accelerate</p>}
    {!unavailable && <button className="hero-motion-control" onClick={()=>setPlayback(value=>value==='playing'?'paused':'playing')}><span aria-hidden="true">{playing?'Ⅱ':'▶'}</span>{playing?'Pause animation':'Resume animation'}</button>}
    <a className="hero-scroll-cue" href="#projects"><span className="hero-scroll-arrow" aria-hidden="true">↓</span><span>Scroll to see projects</span></a>
  </section>
}
