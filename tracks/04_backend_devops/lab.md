# Track 04 Lab: Release Tagging & CI/CD Trigger Simulation

## Objective
Practice creating cryptographic annotated release tags, verifying tag metadata, simulating a GitHub Actions release trigger, and configuring pre-commit secret guards.

---

### Step 1: Initialize Service & Commit Feature

```bash
mkdir -p /tmp/zemen-devops-lab && cd /tmp/zemen-devops-lab
git init

cat << 'EOF' > server.ts
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'healthy', version: '1.2.0' }));
});

server.listen(3000);
EOF

git add server.ts
git commit -m "feat(api): add health check endpoint"
```

---

### Step 2: Create Annotated Release Tag

1. Create annotated tag with release notes:
```bash
git tag -a v1.2.0 -m "Release v1.2.0: Automated service health telemetry"
```

2. Inspect the tag object:
```bash
git show v1.2.0
```
Notice the tag object records the tagger's name, email, timestamp, and message, separate from the commit object itself.

---

### Step 3: Secret Protection Sandbox

1. Create a `.env.example` template:
```bash
cat << 'EOF' > .env.example
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/zemen_db
TELEBIRR_API_KEY=YOUR_KEY_HERE
EOF
```

2. Create a `.gitignore` that guarantees `.env` exclusion:
```bash
echo ".env" >> .gitignore
echo "*.key" >> .gitignore
echo "*.pem" >> .gitignore
```

3. Test creating a dummy local `.env` and verify Git ignores it:
```bash
echo "TELEBIRR_API_KEY=live_sec_99382173819283" > .env
git status -s
# .env does NOT appear in untracked files!
```

4. Commit the security guardrails:
```bash
git add .env.example .gitignore
git commit -m "chore(security): add environment template and ignore secrets"
```

