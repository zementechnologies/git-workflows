# Track 01 Lab: Demystifying Objects & The Three Trees

## Objective
In this hands-on lab, you will initialize a bare-bones Git repository, create objects, inspect them directly using low-level plumbing commands (`cat-file`), stage atomic hunks using `git add -p`, and observe branch pointer mechanics.

---

### Exercise 1: Repository Anatomy & Plumbing Inspection

1. Create a clean sandbox folder:
```bash
mkdir -p /tmp/zemen-git-lab-01 && cd /tmp/zemen-git-lab-01
git init
```

2. Inspect the hidden `.git` internal structure:
```bash
ls -la .git
# Notice: HEAD, config, description, hooks/, info/, objects/, refs/
```

3. Create your first file and commit:
```bash
echo "# Zemen Internal Service" > README.md
git add README.md
git commit -m "chore: initial service scaffolding"
```

4. Inspect the commit object using `git cat-file`:
```bash
# Get the commit hash
COMMIT_HASH=$(git rev-parse HEAD)

# Check the object type
git cat-file -t $COMMIT_HASH
# Output: commit

# Inspect the commit payload
git cat-file -p $COMMIT_HASH
```
Notice the `tree` hash listed in the output. Now inspect that tree:
```bash
TREE_HASH=$(git rev-parse HEAD^{tree})
git cat-file -p $TREE_HASH
# Output: 100644 blob <blob-hash>    README.md
```

---

### Exercise 2: Master Interactive Staging (`git add -p`)

1. Add two distinct sections to `README.md`:
```bash
cat << 'EOF' >> README.md

## Features
- Telebirr & CBE Birr gateway integration
- Biometric authentication

## Configuration
- Set PORT=8080
- Set DATABASE_URL in .env
EOF
```

2. Run `git add -p README.md`:
```bash
git add -p README.md
```
Git will prompt you with `Stage this hunk [y,n,q,a,d,s,e,?]?`:
- Press `s` (split) to split the hunk into two independent sections.
- Stage only the `Features` section by typing `y`.
- Skip the `Configuration` section by typing `n`.

3. Verify staging:
```bash
git diff --staged  # Shows only Features section
git status -s      # Shows README.md staged (M) and unstaged (M) simultaneously!
```

4. Commit the atomic feature hunk:
```bash
git commit -m "docs: list service features"
```

---

### Verification Checklist
- [x] Verified commit object and tree structure with `git cat-file`.
- [x] Successfully split a hunk and staged atomic changes with `git add -p`.
- [x] Confirmed that `main` is merely a pointer inside `.git/refs/heads/main`.

