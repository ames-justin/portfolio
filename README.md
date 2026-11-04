# Justin Ames portfolio

A local Vite + React + TypeScript portfolio built from the supplied `content/` folder. No publication, hosting registration, or access changes were made. The folder was not an existing Git repository and had no application, package manifest, or lockfile. Original content files were preserved.

## Run locally

Requires Node.js 22.12+ (or a compatible newer LTS) and pnpm 11.

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173/.

```sh
pnpm typecheck
pnpm build
pnpm preview
```

The Codex-provided Node and pnpm executables were used in this environment. If they are not on your shell's PATH:

```sh
export PATH="/Users/jjames/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/jjames/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH"
pnpm dev
```

## What's included

- Responsive home page with highlighted capstone, fan, and grabber projects in split image-and-text cards, followed by the hollandaise feature, personal projects, additional coursework, about, skills, experience, and contact.
- Ten case studies with deep links such as `/#project/mars-rover`. Native modal dialogs support keyboard focus containment, Escape, and focus restoration.
- Original supplied CAD, shop photos, sketches, analysis figures, and experiment photography, optimized as WebP.
- Downloadable one-page résumé at `public/Justin-Ames-Resume.pdf`, adapted from the supplied résumé and capstone documentation.
- A procedural illustrative turbofan with fan, two rotating spool groups, compressor, combustor, turbine, shaft, casing cutaway, and nozzle. It is not a commercial engine model or a dimensionally accurate assembly.
- Lazy 3D loading; capped pixel ratio; instanced blade meshes; rendering on demand when offscreen; context-loss recovery.
- Native scroll with a short scroll pin, spool speed increase, exhaust, and exit to the left. Short screens use the same scroll progression without pinning. Mouse inspection is limited, with zoom/pan disabled and touch scrolling preserved. Wheel input over the engine adds momentum without scrolling the page or advancing the flight animation. Repeated input builds RPM and a longer, brighter exhaust plume; after scrolling stops, both ease back to idle. Page-scroll input also adds temporary momentum, while flight position remains tied to page progress. Empty canvas space remains normally scrollable. A “Scroll to see projects” link provides a direct jump.
- The 3D engine loads and starts automatically on every page load, including when reduced motion is enabled, per the latest requested behavior. The former illustrated SVG has been removed entirely; loading leaves the engine area empty briefly, and unavailable WebGL shows a short text notice. Pause animation freezes the blades, airflow, and exhaust, disables engine interaction, and removes the pinned scroll sequence; Resume animation restores playback. Rendering stops when the hero is paused, offscreen, or the browser tab is hidden.

## Main files

- `src/App.tsx`: page composition, project cards, accessible case-study dialogs.
- `src/data/projects.ts`: verified project content and explicit missing-detail placeholders.
- `src/styles.css`: typography, layout, responsive styles, focus and reduced-motion treatment.
- `src/components/engine/engine.css`: minimal hero composition and responsive spacing.
- `src/components/engine/EngineHero.tsx`: lazy-loading boundary and GSAP scroll lifecycle.
- `src/components/engine/TurbofanScene.tsx`: canvas, lighting, controls, responsive camera, context-loss handling.
- `src/components/engine/EngineAssembly.tsx`: procedural geometry, instanced blades, spools, exhaust.
- `src/components/engine/engineDynamics.ts`: scroll impulses, responsive acceleration, and time-based return to idle.
- `src/components/engine/EngineFallback.tsx`: text-only notice for unavailable WebGL.
- `public/assets/sources.json`: asset provenance, including original document/archive members.
- `scripts/build_resume.py`: résumé generator (uses ReportLab and pypdfium2; not required to run the website).

Dependencies are pinned in `package.json` and `pnpm-lock.yaml`. Runtime: React, React DOM, Three.js, React Three Fiber, Drei, GSAP. Build: Vite, its React plugin, TypeScript, and corresponding types. No UI framework, router, physics engine, post-processing package, or browser was added. Google Fonts is used for DM Sans and IBM Plex Mono, with local system fallbacks.

## Sharing preview

The homepage includes Open Graph and large-image Twitter/X card metadata in its initial HTML. The sharing artwork is `public/social-preview.jpg` (1200 × 630), using the same procedural turbofan as the hero and the title “Justin Ames | Mechanical Engineering.”

Before publishing, set `VITE_SITE_URL` to the final public homepage URL in the hosting build environment (or in `.env.local`, using `.env.example` as a guide), then run `pnpm build`. Vite emits absolute sharing-image URLs, `og:url`, and a canonical link. Until a domain is chosen, local builds use `/social-preview.jpg` and omit the canonical URL; do not treat the local preview as a verified LinkedIn preview. Once hosted, check the public URL with LinkedIn’s Post Inspector.

To regenerate the artwork, run the development server, open `/social-preview.html`, and capture the top-left 1200 × 630 area after the engine and fonts load. Its sources are `src/social-preview.tsx` and `src/social-preview.css`; the artwork page is not included in the production build.

## Content needing confirmation

Most missing details are marked `[ADD VERIFIED DETAIL]` in the relevant case studies. The early-stage capstone uses a shorter prospective overview, without result or lesson placeholders.

- **Capstone:** currently presented as an early-stage project with the team’s CONOPS as its cover, a planned role, and expected learning. Add verified design and test updates as the work progresses. Resolve the conflicting requirement baseline before publishing specific dimensions or flight targets.
- **Fan:** Justin’s cover-letter excerpt confirms leadership of the CAD assembly, gear-train CAD, motion studies and analysis, and FEA. The page describes design and simulation work without claiming fabrication or hardware validation. Detailed shaft calculations remain in the source report rather than the public overview.
- **Prosthetic leg:** team structure, individual responsibilities, current CAD/analysis, and results. The supplied knee image is labeled a reference, not an original design.
- **Tap mount:** SolidWorks design, 3D printing, and successful installation are confirmed. The page includes five converted HEIC photographs, including an old/new comparison and the final installation. Exact dimensions, print material, and long-term durability are not specified.
- **Sailboat belt:** exact individual diagnostic/repair steps and lessons.
- **Heat sink:** personal reflection and validation plan. The selected brass design and its predicted performance are attributed to the team; Justin's contribution was the diamond concept and comparative analysis.

Source provenance stays in the project data and asset manifest; source notes are not displayed on project pages. The content was manually curated, not automatically synchronized. Update the source content and `src/data/projects.ts` together. No unverified awards, employment availability, achieved competition results, or personal credit for others' work were added.

## Verification

TypeScript and production build were run. Browser QA used the available Codex browser, without adding Playwright or downloading a browser. Desktop and mobile checks covered the hero, project navigation, all ten case studies, dialog focus/close behavior, filters, asset loading, résumé HTTP response, automatic playback, engine-only wheel acceleration, normal outside scrolling, and forced WebGL failure recovery.

Production intentionally lazy-loads the substantial 3D bundle; Vite may report its standard large-chunk advisory. The core content is usable before it loads. No lint configuration existed, so a type-check script was provided instead.

For manual checks:

1. Reload with either motion preference: verify that the 3D engine loads and animates automatically, with a Pause animation button and no illustrated placeholder. Pause and resume with the keyboard; verify that blades, airflow, and exhaust stop while paused and ordinary page scrolling remains available. Reload after pausing to confirm autoplay resets. The scroll cue should link to projects.
2. Use a mouse wheel or trackpad over the engine: speed should increase while page position and engine translation remain unchanged. Repeat in both scroll directions. Sustained input should increase speed and exhaust; stop for several seconds to confirm a smooth return to idle even if the page is partway through the hero.
3. Scroll outside the visible engine (including empty canvas space): the page should scroll, spool-up/exhaust and leftward flight should progress, then the pin should release.
4. Drag the engine with a mouse; touch scrolling must remain native. Browser pinch zoom is not intercepted.
5. In the development server only, `/?engine=fail` deliberately loses the WebGL context. Verify a short text notice appears and the rest of the site remains usable, without the former SVG illustration.
6. Navigate with the scroll cue, check 390 px and 1440 px layouts, and verify animation rendering stops in hidden tabs and when offscreen.

Browser emulation is not a substitute for testing on physical low-powered mobile hardware.
