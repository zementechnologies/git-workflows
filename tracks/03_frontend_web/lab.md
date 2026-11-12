# Track 03 Lab: Zero-Stress Lockfile Conflict Resolution

## Objective
Intentionally generate and resolve a realistic package dependency collision between two branches without manual line editing.

---

### Step 1: Initialize a Simulated Web App

```bash
mkdir -p /tmp/zemen-web-lab && cd /tmp/zemen-web-lab
git init

cat << 'EOF' > package.json
{
  "name": "zemen-web-portal",
  "version": "1.0.0",
  "dependencies": {}
}
EOF

npm install --package-lock-only
git add package.json package-lock.json
git commit -m "chore: initial package.json setup"
```

---

### Step 2: Branch A Adds Package 1

```bash
git switch -c feat/add-date-fns
npm install --package-lock-only date-fns
git commit -am "feat(deps): add date-fns for Ethiopian calendar parsing"
```

---

### Step 3: Branch B Adds Package 2 from Main

```bash
git switch main
git switch -c feat/add-axios
npm install --package-lock-only axios
git commit -am "feat(deps): add axios for API client"
```

---

### Step 4: Induce Conflict and Resolve

1. Switch back to `main` and merge branch `feat/add-date-fns`:
```bash
git switch main
git merge feat/add-date-fns
```

2. Attempt to merge branch `feat/add-axios`:
```bash
git merge feat/add-axios
# Git reports: CONFLICT (content): Merge conflict in package-lock.json
```

3. Resolve with the 3-step protocol:
```bash
# Resolve package.json conflict by accepting both dependencies:
cat << 'EOF' > package.json
{
  "name": "zemen-web-portal",
  "version": "1.0.0",
  "dependencies": {
    "axios": "^1.7.0",
    "date-fns": "^4.1.0"
  }
}
EOF

# Regenerate package-lock cleanly
npm install --package-lock-only

# Stage and finish merge
git add package.json package-lock.json
git commit -m "chore(deps): merge axios and date-fns dependencies"
```

4. Verify repository health:
```bash
git status
# nothing to commit, working tree clean
```
