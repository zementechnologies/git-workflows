# Track 03: Frontend & Web Engineering Track

> **Zemen Technologies Engineering Workflows Curriculum**  
> *Target Audience:* Frontend, Full-stack & UI/UX Engineers  
> *Duration:* 35 Minutes  
> *Interactive Slides:* [View Slide Deck](../../slides/03-frontend.html)

---

## 1. Web Development Git Challenges

Frontend and full-stack web development with modern meta-frameworks (Next.js, Vite, Tailwind, TypeScript) introduces unique version control friction:
- **Massive Lockfiles:** Thousands of lines in `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`.
- **Accidental Artifact Commits:** Committing `.next/`, `node_modules/`, or production bundle output.
- **Large Assets:** Committing multi-megabyte PNGs, videos, or Figma export files directly to Git.
- **Preview Environments:** Coordinating branch previews and automated lighthouse audits.

---

## 2. Lockfile Conflict Surgery

When two developers add or update packages simultaneously on different branches, Git encounters conflicts in the JSON/YAML lockfiles.

### The Anti-Pattern:
Never try to resolve lockfile merge markers (`<<<<<<< HEAD`, `=======`) manually in VSCode. You will break dependency graph checksums!

### The Official Zemen Protocol:
1. Accept the incoming branch's `package.json`:
   ```bash
   git checkout --theirs package.json
   ```
2. Manually review and combine any missing dependency declarations in `package.json`.
3. Let the package manager reconstruct the binary graph:
   ```bash
   # If using npm:
   npm install

   # If using pnpm:
   pnpm install --fix-lockfile

   # If using yarn:
   yarn install
   ```
4. Stage both files and complete the merge:
   ```bash
   git add package.json package-lock.json
   git commit -m "chore(deps): regenerate lockfile after merge"
   ```

---

## 3. Recommended Frontend `.gitignore`

Ensure your web repositories include this standard ignore configuration:
```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing & Coverage
coverage/
.nyc_output/

# Next.js & Build Outputs
.next/
out/
build/
dist/

# Environment files & Local Secrets
.env*.local
.env.production
.env

# Diagnostic logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# OS Artifacts
.DS_Store
Thumbs.db
```

Proceed to [lab.md](./lab.md) to practice resolving a synthetic lockfile collision.
