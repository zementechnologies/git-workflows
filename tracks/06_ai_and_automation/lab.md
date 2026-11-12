# Track 06 Lab: Automated Pre-commit & CI Quality Gate

## Objective
Configure a reproducible pre-commit verification pipeline using standard Git hooks that intercepts malformed commits and unformatted files.

---

### Step 1: Create a Native Git Hook

Even without third-party tools, Git includes a powerful native client-side hook framework in `.git/hooks/`.

1. Initialize a practice repository:
```bash
mkdir -p /tmp/zemen-hooks-lab && cd /tmp/zemen-hooks-lab
git init
```

2. Create a pre-commit hook that prevents commits containing `TODO: REMOVE_BEFORE_PROD` or hardcoded secret patterns:
```bash
cat << 'EOF' > .git/hooks/pre-commit
#!/usr/bin/env bash

# Check for forbidden debug artifacts
if git diff --cached | grep -E "(TODO: REMOVE_BEFORE_PROD|AKIA[0-9A-Z]{16}|live_sec_)"; then
  echo "[Error]: Forbidden token or secret detected in staged changes!"
  echo "Please clean up debug flags and ensure secrets are in .env before committing."
  exit 1
fi

echo "[Passed]: Pre-commit checks passed successfully."
exit 0
EOF

chmod +x .git/hooks/pre-commit
```

---

### Step 2: Test the Hook

1. Attempt to commit a file containing a forbidden token:
```bash
echo "const token = 'live_sec_bad_secret_value';" > auth.ts
git add auth.ts
git commit -m "feat: add token"
```
Notice the output:
```
[Error]: Forbidden token or secret detected in staged changes!
```
The commit is automatically blocked!

2. Fix the file to reference an environment variable properly:
```bash
echo "const token = process.env.AUTH_TOKEN;" > auth.ts
git add auth.ts
git commit -m "feat(auth): load token from environment variables"
```
The commit succeeds!
```
[Passed]: Pre-commit checks passed successfully.
[main (root-commit) 8f3c1b2] feat(auth): load token from environment variables
```

