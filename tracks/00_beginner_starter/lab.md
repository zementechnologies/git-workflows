# Track 00 Lab: Your First Repository and Pull Request Simulation

## Objective
Experience the full lifecycle of version control from scratch: initialize a local repository, create tracked files, stage selectively, write good commit messages, cut a feature branch, and simulate an upstream pull request merge.

---

### Step 1: Set Up Your Identity

Verify your machine has your name and email configured:
```bash
git config --global user.name "Your Name"
git config --global user.email "yourname@zemen.com.et"
git config --global init.defaultBranch main
```

---

### Step 2: Create Your First Repository

1. Create a clean practice directory and initialize it:
```bash
mkdir -p /tmp/zemen-beginner-sandbox && cd /tmp/zemen-beginner-sandbox
git init
```

2. Check the initial status:
```bash
git status
# Notice: "On branch main", "No commits yet"
```

3. Create your first file:
```bash
cat << 'EOF' > app.js
// Zemen Technologies Sample App
console.log("Welcome to Zemen Technologies");
EOF
```

4. Check status again:
```bash
git status -s
# Output: ?? app.js (Untracked)
```

5. Stage the file:
```bash
git add app.js
git status -s
# Output: A  app.js (Added to index / Staged)
```

6. Commit the file:
```bash
git commit -m "feat: initial application greeting"
```

---

### Step 3: Feature Branching

Never commit directly to `main`. Create a feature branch:
```bash
# Create and switch to a branch
git switch -c feat/add-payment-calculation

# Verify what branch you are on
git branch
# * feat/add-payment-calculation
#   main
```

Add your feature code:
```bash
cat << 'EOF' >> app.js

function calculateTotal(subtotal, vatRate = 0.15) {
  return subtotal * (1 + vatRate);
}

console.log("Total for 1000 ETB order:", calculateTotal(1000));
EOF
```

Review your exact diff:
```bash
git diff
```

Stage and commit:
```bash
git add app.js
git commit -m "feat(billing): calculate total with standard VAT"
```

---

### Step 4: Merging to Main

Simulate merging your completed feature into `main`:
```bash
# 1. Switch back to main
git switch main

# 2. Merge your feature branch
git merge feat/add-payment-calculation

# 3. View your history log
git log --oneline --graph

# 4. Clean up the merged branch
git branch -d feat/add-payment-calculation
```

---

### Verification Checklist
- [x] Initialized an empty Git repository.
- [x] Observed the transition from Untracked -> Staged -> Committed.
- [x] Created an isolated feature branch with `git switch -c`.
- [x] Wrote a conventional commit message.
- [x] Merged feature branch into `main` and deleted the local feature branch.
