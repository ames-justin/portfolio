# Portfolio update and publishing instructions

These instructions apply to the entire repository. This is a public portfolio, so accuracy, privacy, attribution, and a verified deployment are release requirements—not optional cleanup.

## Repository and deployment facts

- The site is a Vite + React + TypeScript application.
- Use Node.js 22 and the pinned pnpm version from `package.json`. Use `pnpm`; do not substitute npm or Yarn and do not replace `pnpm-lock.yaml`.
- Project content is maintained in `src/data/projects.ts`. Keep descriptions, roles, captions, galleries, alt text, status, and source notes together there.
- Public images belong in `public/assets/`. The résumé is `public/Justin-Ames-Resume.pdf`.
- Production is deployed by `.github/workflows/deploy-pages.yml` from pushes to `main`.
- The published base URL is `https://ames-justin.github.io/portfolio/`, so production assets must work beneath `/portfolio/`, not just at `/`.
- Use the existing `publicPath`, `imagePath`, or equivalent `import.meta.env.BASE_URL` logic for public URLs. Do not introduce root-relative runtime URLs that bypass the configured base path.

## Privacy and source-material boundary

- Raw CAD, native design files, reports, archives, source documents, working notes, and the ignored `content/` directory are private inputs. Never add, force-add, publish, or copy them into `public/` or another tracked path.
- Publish only the minimum derived text and optimized visual assets needed for the portfolio.
- Before staging changes, inspect `git status --short` and the staged diff. Reject unexpected files, editor artifacts, source documents, CAD formats, archives, temporary exports, credentials, and private notes.
- Do not expose local file paths, internal comments, unverified contact details, confidential dimensions, or third-party personal information in source code, metadata, captions, or generated output.
- Keep `public/assets/sources.json` synchronized when an asset is added, replaced, or removed. Provenance belongs in that manifest and the relevant project's `source` field; private source files do not belong in Git.

## Content accuracy and attribution gate

Before publishing any project update, verify all of the following against the supplied source material:

- The copy does not overstate Justin's individual contribution, ownership, leadership, fabrication, testing, or results.
- Team work is described as team work. Distinguish Justin's contribution from another member's work and from the team's outcome.
- Planned work, analytical predictions, simulation results, and physical test results are labeled accurately and are not presented as completed or validated work.
- Image ownership and attribution are correct. Identify references, commercial products, team-created graphics, and another team member's work explicitly where relevant.
- Captions and alt text say what the image actually shows and do not imply authorship that is not supported.
- Dates, quantities, awards, outcomes, status, and technical claims are sourced. Preserve uncertainty instead of guessing. Do not remove `[ADD VERIFIED DETAIL]` placeholders unless the replacement is verified.

If the evidence is missing or contradictory, keep the claim conservative and ask for confirmation before publication.

## Image handling

- Do not publish raw photos or source-resolution exports. Crop only when it does not alter the engineering meaning, resize to an appropriate displayed resolution, and optimize for web delivery.
- Prefer WebP for photographic and rendered project images. Use PNG only when transparency, line-art fidelity, or an existing deliberate exception requires it. Avoid adding duplicate original formats.
- Strip EXIF, GPS, camera serial, embedded thumbnails, comments, author fields, and other unwanted metadata before an image enters `public/assets/`. Inspect the sanitized output, not only the original.
- Visually inspect every output for readable private information, faces or names that should not be public, badges, addresses, reflections, computer screens, paperwork, license plates, and identifiable location details. Remove or redact sensitive material before publication.
- Use descriptive lowercase filenames and supply meaningful alt text/captions in `src/data/projects.ts`.
- Confirm each new image exists in the production build and loads at a URL beginning with `/portfolio/assets/`. Check for 404s and case-sensitivity errors.

## Implementation workflow

### Default interpretation of update requests

- Treat a simple request such as “update the portfolio,” “add this to the website,” “change this project,” or “update this image/copy” as an end-to-end request to edit, validate, commit, push to `origin/main`, wait for GitHub Pages deployment, and verify the visible result on the live website.
- Do not ask routine follow-up questions about whether to build, commit, push, deploy, or verify; those steps are included by default for a website update.
- Make reasonable, conservative implementation decisions from the repository and supplied source material. Ask a question only when a missing answer would materially change the result, a factual claim or attribution cannot be verified, private/sensitive material may be exposed, or the requested action is destructive or outside this repository.
- If the user explicitly asks for a draft, review, local-only change, or preview, do not publish. An explicit instruction not to commit, push, or deploy overrides the default above.

1. Start with `git status --short --branch` and read the relevant code and project entry. Preserve unrelated user changes; do not reset or overwrite them.
2. Make the smallest coherent update. Put project facts and gallery data in `src/data/projects.ts`; avoid duplicating project content in components.
3. If assets change, optimize and sanitize them, update `public/assets/sources.json`, and confirm only derived public assets are tracked.
4. Review the complete diff for privacy, attribution, factual accuracy, accessibility, responsive behavior, and `/portfolio/` path safety.
5. Run the release checks below. Fix failures before committing or publishing.

## Required release checks

Run both required commands exactly:

```sh
pnpm typecheck
pnpm build
```

Also build with the same public path and site URL used by GitHub Pages:

```sh
VITE_BASE_PATH=/portfolio/ VITE_SITE_URL=https://ames-justin.github.io/portfolio/ pnpm build
```

Test the resulting production build, not only the development server. At desktop and mobile widths, check:

- the updated copy and every changed image;
- all updated asset requests under `/portfolio/` with no 404s or mixed-up images;
- the Mars rover card, case study, and gallery;
- header, section, project, filter, hash/deep-link, dialog-close, keyboard, and back/forward navigation;
- the résumé download at `/portfolio/Justin-Ames-Resume.pdf`;
- the 3D hero loading, animation, pause/resume control, wheel/scroll behavior, and graceful WebGL failure behavior;
- browser console and network panel for new errors or failed requests.

Do not claim a check passed unless it was actually performed. If browser automation or a physical-device check is unavailable, state that limitation explicitly.

## Commit, push, and publication

- A request to **update the portfolio/website**, **add or change website content**, **publish**, or **deploy** includes permission to commit the scoped update and push it to `origin/main` after all release checks pass. Do not seek a second confirmation for the commit, push, deployment, or live verification. A request explicitly limited to drafting, reviewing, local editing, or previewing does not; stop before commit/push in that case.
- Before committing, run `git diff --check`, review `git diff` and `git diff --cached`, and ensure the commit contains only the intended public update. Never use `git add -f` to bypass privacy ignores.
- Use a focused commit message, then push normally with `git push origin main`. Never force-push, rewrite published history, bypass branch protection, or disable checks.
- If `main` changed remotely, fetch and reconcile safely; do not discard either the remote work or unrelated local work. Re-run the release checks after resolving any integration change.
- Watch the `Deploy portfolio to GitHub Pages` GitHub Actions run for the pushed commit until it completes. A successful local build or push is not proof of publication. If available, use `gh run list`, identify the run for the exact commit SHA, and `gh run watch <run-id> --exit-status`; otherwise verify in the GitHub Actions UI.
- If Actions fails, inspect the failing job, fix the cause, repeat all relevant checks, push the fix, and watch the replacement run. Do not report the site as updated while the workflow is failing or pending.
- After Actions succeeds, open `https://ames-justin.github.io/portfolio/` with a cache-busting query string. Verify a unique piece of the new copy or the new asset on the actual deployed page, confirm its asset request succeeds under `/portfolio/`, and repeat the relevant smoke checks there. Do not rely only on the Actions green check or local preview.
- Report the commit SHA, Actions result, deployed URL, the specific live evidence checked, and any verification limitation.

## Completion standard

An update is complete only when the scoped change is accurate and privacy-safe, images are optimized and sanitized, all required local checks pass, the intended commit is on `origin/main`, GitHub Actions succeeds for that commit, and the actual deployed page visibly contains the update. If any one of these conditions is unmet, report the work as incomplete and explain the blocker plainly.
