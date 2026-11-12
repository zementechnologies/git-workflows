# Track 05 Lab: Emergency Surgery & Reflog Recovery

## Objective
Intentionally trigger a catastrophic Git mistake (`git reset --hard` destroying your unpushed commits) and successfully resurrect the code using `git reflog`.

---

### Step 1: Simulate Real Work & Premature Disaster

```bash
mkdir -p /tmp/zemen-disaster-lab && cd /tmp/zemen-disaster-lab
git init

echo "Initial codebase" > app.txt
git add app.txt
git commit -m "chore: initial commit"

# Simulate hours of intense feature development:
echo "Crucial payment gateway logic" >> payment.ts
git add payment.ts
git commit -m "feat(billing): add high-priority telebirr webhook"

echo "Security signature validation" >> payment.ts
git commit -am "feat(billing): add cryptographic SHA-256 HMAC validation"

# Verify log
git log --oneline
# 2 feature commits exist!
```

---

### Step 2: Disaster Strikes!

Run a hard reset simulating an accidental destructive command:
```bash
git reset --hard HEAD~2
```

Inspect your files and history:
```bash
ls -la
git log --oneline
```
`payment.ts` has completely disappeared from your disk and Git log!

---

### Step 3: Emergency Reflog Surgery

1. Consult the local safety net:
```bash
git reflog
```

2. Locate the commit hash that had your validation logic (e.g. `HEAD@{1}` or `HEAD@{2}`).

3. Branch off that exact commit hash:
```bash
# Extract the hash from the reflog output:
LOST_HASH=$(git reflog | grep "HMAC validation" | awk '{print $1}' | head -n 1)

git checkout -b rescue-billing $LOST_HASH
```

4. Verify your files are completely restored:
```bash
ls -la
cat payment.ts
git log --oneline
```
Your work is 100% restored! No data was lost.

