# Exercise: Contributor Roster Sandbox Challenge

> **Prerequisite:** Completed Track 00 (Git from Scratch) or Track 01 (Foundations)  
> **Target Repository:** [github.com/zementechnologies/git-sandbox](https://github.com/zementechnologies/git-sandbox)  
> **Estimated Time:** 20 Minutes

---

## Objective

To gain practical, zero-risk muscle memory with the complete Git feature branch lifecycle by contributing your developer profile to the official Zemen Technologies Sandbox.

You will:
1. Clone the template repository to your local machine.
2. Cut an isolated feature branch following corporate naming conventions.
3. Create your personal JSON profile from a starter template.
4. Run automated test validation locally.
5. Create an atomic Conventional Commit.
6. Push your branch to GitHub.
7. Open a Pull Request and watch automated CI run.

---

## Step-by-Step Instructions

### Step 1: Clone the Sandbox Repository

Open your terminal and clone the practice repository:
```bash
git clone https://github.com/zementechnologies/git-sandbox.git
cd git-sandbox
```

Verify your branch is tracking `main`:
```bash
git status -s
# On branch main, working tree clean
```

---

### Step 2: Create Your Feature Branch

Never commit directly to `main`. Create and switch to your feature branch:
```bash
git switch -c feat/add-<your-name>
# Example: git switch -c feat/add-samuel-kebede
```

---

### Step 3: Create Your Contributor Profile

1. Copy the starter template:
```bash
cp contributors/_template.json contributors/<your-github-username>.json
# Example: cp contributors/_template.json contributors/samuelkebede.json
```

2. Open the file in your code editor and populate your details:
```json
{
  "name": "Samuel Kebede",
  "github_username": "samuelkebede",
  "role": "Frontend Developer",
  "location": "Addis Ababa, Ethiopia",
  "favorite_git_command": "git add -p",
  "bio": "Passionate about building responsive, accessible web interfaces."
}
```

---

### Step 4: Run Local Verification

Before committing, run the local validation script:
```bash
npm test
```
Expected output:
```text
--- Zemen Sandbox Profile Validator ---
[Pass] samuelkebede.json: Profile valid (Samuel Kebede - Frontend Developer)
[Result] All contributor profile(s) validated successfully! Ready for merge.
```

---

### Step 5: Stage and Commit Atomically

Review your diff and create a conventional commit:
```bash
# Check status
git status -s

# Stage only your profile file
git add contributors/<your-github-username>.json

# Commit with a structured Conventional Commit message
git commit -m "feat(contributors): add <your-name> to team roster"
```

---

### Step 6: Push to GitHub & Open Pull Request

Push your branch upstream:
```bash
git push -u origin feat/add-<your-name>
```

Then visit [github.com/zementechnologies/git-sandbox](https://github.com/zementechnologies/git-sandbox) and click **"Compare & pull request"**. Fill out the checklist and submit!
