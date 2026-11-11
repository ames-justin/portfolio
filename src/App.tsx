import { useEffect, useRef, useState } from 'react'
import EngineHero from './components/engine/EngineHero'
import { projects } from './data/projects'
import type { Project } from './data/projects'
import { useProjectReveals } from './components/useProjectReveals'

const publicPath=(path:string)=>import.meta.env.BASE_URL+path.replace(/^\/+/, '')
const imagePath=(name:string)=>publicPath('assets/'+name+'.webp')
const projectImagePath=(path:string)=>publicPath(path)
const emailHref=(tag:string,subject:string)=>`mailto:amesjj1234+p-${tag}@gmail.com?subject=${encodeURIComponent(subject)}`
function ProjectLink({project, index}:{project:Project;index:number}){
  return <a className="project-card interactive-card" data-reveal={index%2?'left':'right'} href={'#project/'+project.id} aria-label={'View project: '+project.title}>
    <span className={'project-image image-'+project.id}>
      <img src={project.cardImage?projectImagePath(project.cardImage.src):imagePath(project.image)} alt={project.cardImage?.alt??project.caption} loading="lazy" width="1000" height="700"/>
      <span className="image-number mono">{String(index).padStart(2,'0')} / PROJECT</span>
      <span className="image-arrow" aria-hidden="true">↗</span>
    </span>
    <div className="project-info">
      <div className="project-meta mono"><span>{project.category}</span>{project.status!==project.category && <span>{project.status}</span>}</div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  </a>
}
function HighlightedProject({project,index,role}:{project:Project;index:number;role:string}){
  return <a className={'highlight-card interactive-card highlight-'+project.id} data-reveal={index%2?'left':'right'} href={'#project/'+project.id} aria-label={'View project: '+project.title}>
    <span className={'highlight-image image-'+project.id}>
      <img src={project.cardImage?projectImagePath(project.cardImage.src):imagePath(project.image)} alt={project.cardImage?.alt??project.caption} loading="lazy" width="1000" height="700"/>
      <span className="mono highlight-number">{String(index).padStart(2,'0')} / {project.category}</span>
    </span>
    <div className="highlight-copy">
      <p className="eyebrow highlight-status">{project.status}</p>
      <h3>{project.title}</h3>
      <p className="highlight-description">{project.description}</p>
      <div className="highlight-role"><span className="mono">{project.stage==='early'?'MY PLANNED ROLE':'MY ROLE'}</span><p>{role}</p></div>
      <span className="text-link">{project.stage==='early'?'Project overview':'View project'} <span aria-hidden="true">↗</span></span>
    </div>
  </a>
}
function CaseStudy({project,onClose}:{project:Project;onClose:()=>void}){
  const early=project.stage==='early'
  const sections=early
    ? [['The task',project.problem],['What I expect to learn',project.lessons],['Current status & next updates',project.results]]
    : [['The problem',project.problem],['The constraints',project.constraints],['The approach',project.approach],['Results & current status',project.results],['What I learned',project.lessons]]
  const dialog=useRef<HTMLDialogElement>(null)
  const close=useRef<HTMLButtonElement>(null)
  useEffect(()=>{
    const focused=document.activeElement as HTMLElement | null
    const el=dialog.current
    el?.showModal();close.current?.focus()
    const previous=document.body.style.overflow;document.body.style.overflow='hidden'
    return()=>{el?.close();document.body.style.overflow=previous;focused?.focus()}
  },[])
  return <dialog ref={dialog} className={'case-study case-'+project.id+(project.story?' personal-story':'')} aria-labelledby="case-title" onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div className="case-inner">
      <div className="case-nav"><a className="brand-mark" href="#projects" onClick={onClose} aria-label="Justin Ames — back to projects"><img className="brand-icon" src={publicPath('favicon.svg')} alt="" width="44" height="44"/></a><span className="mono">{project.story?'OFF THE CLOCK / A STORY FROM THE WATER':'PROJECT NOTES / '+project.category}</span><button ref={close} onClick={onClose} aria-label="Close case study">Close <span>×</span></button></div>
      <p className="eyebrow">{project.story?'A FATHER’S DAY DETOUR':project.status}</p><h2 id="case-title">{project.title}</h2><p className="case-intro">{project.description}</p>
      <figure className={'case-cover image-'+project.id}><img src={imagePath(project.image)} alt={project.caption}/><figcaption>{project.caption}</figcaption></figure>
      {project.story ? <article className="story-body">{project.story.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</article> : <>
      <div className="case-role"><p className="mono">{early?'MY PLANNED ROLE':'MY CONTRIBUTION'}</p><p>{project.role}</p></div>
      <div className="case-body">
        <aside><p className="mono">{early?'PROJECT FOCUS':'TOOLS & METHODS'}</p><ul>{project.tools.map(t=><li key={t}>{t}</li>)}</ul><a className="text-link" href={emailHref(project.inquiryTag,project.inquirySubject)}>Let’s talk about it ↗</a></aside>
        <div className="case-sections">{sections.map(([title,text],index)=><section key={title}><span className="mono">{String(index+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div></section>)}</div>
      </div>
      </>}
      {project.gallery.length>0 && <div className="case-gallery">{project.gallery.map(item=><figure key={item.image} className={[item.portrait?'portrait-photo':'',item.fullWidth?'gallery-wide':''].filter(Boolean).join(' ')||undefined}><img src={imagePath(item.image)} alt={item.caption} loading="lazy"/><figcaption>{item.caption}</figcaption></figure>)}</div>}
      <button className="button dark" onClick={onClose}>Back to projects <span>↗</span></button>
    </div>
  </dialog>
}
export default function App(){
  const [selectedId,setSelectedId]=useState<string|null>(null)
  const selected=projects.find(project=>project.id===selectedId)??null
  const [filter,setFilter]=useState('All studies')
  useProjectReveals(filter)
  useEffect(()=>{
    const sync=()=>{const hash=window.location.hash;setSelectedId(hash.startsWith('#project/')?hash.slice('#project/'.length):null)}
    sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)
  },[])
  const closeStudy=()=>{history.replaceState(null,'',window.location.pathname+window.location.search+'#projects');setSelectedId(null)}
  const archive=projects.slice(6).filter(p=>filter==='All studies'||(filter==='In progress'?p.status==='In progress':p.status!=='In progress'))
  return <>
    <a className="skip-link" href="#projects">Skip to projects</a>
    <header className="site-header"><a href="#top" className="brand" aria-label="Justin Ames home"><img className="brand-icon" src={publicPath('favicon.svg')} alt="" width="44" height="44"/><span className="brand-name">JUSTIN AMES<span>Mechanical engineering</span></span></a><nav aria-label="Main navigation"><a href="#projects">Projects</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Contact <span>↗</span></a></nav><a className="nav-resume" href={publicPath('Justin-Ames-Resume.pdf')} download>Résumé <span>↓</span></a></header>
    <main id="top">
      <EngineHero/>
      <div className="discipline-strip mono"><span>MECHANICS <i>+</i> MANUFACTURING <i>+</i> DESIGN WITH INTENT</span></div>
      <section id="projects" className="projects section-shell">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-index">01 /</span> SELECTED WORK</p><h2>Highlighted projects</h2></div><p>Mechanical design, analysis,<br/>and hands-on fabrication.</p></div>
        <div className="highlighted-projects">
          <HighlightedProject project={projects[0]} index={1} role="Rover Design Lead"/>
          <HighlightedProject project={projects[1]} index={2} role="CAD assembly, gear-train design & motion analysis"/>
          <HighlightedProject project={projects[2]} index={3} role="Team leadership, component CAD & machining"/>
        </div>
        <a className="food-feature interactive-card" data-reveal="right" href="#project/food-flow" aria-label="View project: Hollandaise experiment">
          <span className="food-image"><img src={imagePath('food')} loading="lazy" width="1200" height="700" alt={projects[3].caption}/><span className="mono">27°C <i>/</i> 50°C <i>/</i> 85°C</span></span>
          <div><p className="eyebrow">04 / FLUID MECHANICS, SERVED FRESH</p><h3>Engineering is <br/>everywhere.<br/><em>Even brunch.</em></h3><p>{projects[3].description}</p><span className="text-link">See the experiment <span aria-hidden="true">↗</span></span></div>
        </a>
      </section>
      <section id="personal-projects" className="personal section-shell" aria-labelledby="personal-heading">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-index">02 /</span> OFF THE CLOCK</p><h2 id="personal-heading">Personal projects</h2></div><p>Independent builds and repairs,<br/>outside the classroom.</p></div>
        <div className="project-grid">{projects.slice(4,6).map((p,i)=><ProjectLink key={p.id} project={p} index={i+5}/>)}</div>
      </section>
      <section id="workbench" className="workbench section-shell" aria-labelledby="workbench-heading">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-index">03 /</span> ADDITIONAL WORK</p><h2 id="workbench-heading">More from the workbench</h2></div><p>Coursework and design studies.</p></div>
        <div className="archive-heading"><div className="filters" role="group" aria-label="Filter additional projects">{['All studies','In progress','Completed'].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div></div>
        <div className="archive-list">{archive.map((p,i)=><a key={p.id} data-reveal={i%2?'right':'left'} href={'#project/'+p.id}><span className="mono">{String(projects.slice(6).indexOf(p)+7).padStart(2,'0')}</span><div><h3>{p.title}</h3><p>{p.category}</p></div><span className="archive-status mono">{p.status}</span><span className="archive-arrow">↗</span></a>)}</div>
      </section>
      <section id="about" className="about section-shell">
        <div className="about-heading"><p className="eyebrow"><span className="section-index">04 /</span> THE ENGINEER BEHIND THE WORK</p><h2>About me</h2></div>
        <div className="about-body">
          <figure><img src={imagePath('food-exhibition')} alt="Justin Ames standing beside his fluid mechanics photography project at the exhibition" loading="lazy" width="800" height="650"/></figure>
          <div className="about-copy">
            <p>I am Justin, a senior mechanical engineering student at George Washington University.</p>
            <p>I am eager to grow my engineering knowledge and contribute to real-world projects that make an impact. My interests span manufacturing, mechanics, product design, and energy systems.</p>
            <p>Aside from my knowledge in mechanical engineering, I am hardworking and a quick learner. Throughout high school and during the summers since graduating from high school, I have worked and volunteered in landscaping, hospitals, kitchens, restaurants, and handcrafted woodworking. No matter what I find myself doing, I excel, proving to be a valuable teammate and employee.</p>
            <p>In the machine shop, on a team, or solving an everyday problem in my life, I enjoy bringing technical thinking and creativity to the table.</p>
            <a className="text-link" href={emailHref('about','Portfolio inquiry')}>Let’s connect <span>↗</span></a>
          </div>
        </div>
        <div className="skills"><div><span className="mono">DESIGN & ANALYSIS</span><p>SolidWorks · AutoCAD · MATLAB<br/>Python · Excel</p></div><div><span className="mono">BUILD & ITERATE</span><p>Machining · 3D printing<br/>Process planning · Tolerancing</p></div><div><span className="mono">WORK TOGETHER</span><p>Team leadership · CAD assemblies<br/>Engineering experimentation</p></div></div>
      </section>
      <section id="experience" className="experience section-shell"><div><p className="eyebrow"><span className="section-index">05 /</span> EXPERIENCE</p><h2>Learning <br/>by <em>doing.</em></h2><a className="text-link" href={publicPath('Justin-Ames-Resume.pdf')} download>Download full résumé <span>↓</span></a></div><div className="experience-list">
        <article><span className="mono">JUL 2022 — JUN 2023</span><h3>Ocean State Spearguns</h3><p className="position">Apprenticeship</p><p>Crafted a custom speargun alongside the owner, working with precision woodworking, stress analysis, and buoyancy.</p></article>
        <article><span className="mono">AUG 2021 — JUN 2023</span><h3>iCreate Lab</h3><p className="position">Co-President</p><p>Operated and maintained 3D printers and other lab technology, and oversaw a 15-person intern team.</p></article>
        <article><span className="mono">2021 — 2025</span><h3>Bluewater Bar and Grill</h3><p className="position">Dishwasher → Cook → Expo / Server</p><p>Promoted three times. Coordinated orders and timing with line cooks in a busy restaurant.</p></article>
        <article><span className="mono">SEP 2024 — PRESENT</span><h3>Kappa Sigma at GW</h3><p className="position">Philanthropy Chair & Scribe</p><p>Organize philanthropy events and maintain membership, event, and chapter records.</p></article>
      </div></section>
      <section id="contact" className="contact section-shell"><p className="eyebrow"><span className="status-dot"/> LET’S BUILD SOMETHING THAT MATTERS</p><div className="contact-main"><h2>Have a challenge<br/><em>in mind?</em></h2><a href={emailHref('contact','Portfolio inquiry')} className="contact-arrow" aria-label="Email Justin Ames">↗</a></div><div className="contact-links"><a href={emailHref('contact','Portfolio inquiry')}>amesjj1234@gmail.com ↗</a><a href="https://www.linkedin.com/in/ames-justin" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="tel:+14017146155">401 714 6155 ↗</a><a href={publicPath('Justin-Ames-Resume.pdf')} download>Download résumé ↓</a></div></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Justin Ames</span><span className="mono">MECHANICS + MANUFACTURING + DESIGN WITH INTENT</span><a href="#top">Back to top ↑</a></footer>
    {selected && <CaseStudy key={selected.id} project={selected} onClose={closeStudy}/>}
  </>
}
