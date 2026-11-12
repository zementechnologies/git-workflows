# Track 02 Lab: Simulating The Collaborative PR Lifecycle

## Objective
Simulate a complete feature branch lifecycle: creating a branch following Zemen naming conventions, crafting structured conventional commits, simulating a peer review rebase, and performing a squash merge.

---

### Exercise 1: Branch Creation & Conventional Commits

1. Set up a local practice project:
```bash
mkdir -p /tmp/zemen-collab-lab && cd /tmp/zemen-collab-lab
git init
echo "# Zemen Payment Service" > README.md
git add README.md
git commit -m "chore: initial project commit"
```

2. Cut a feature branch according to Zemen standards:
```bash
git switch -c feat/ZM-301-cbe-birr-integration
```

3. Implement the feature across two atomic commits:
```bash
# First commit: Interface definition
cat << 'EOF' > payment-provider.ts
export interface PaymentProvider {
  processPayment(amount: number, accountId: string): Promise<boolean>;
}
EOF
git add payment-provider.ts
git commit -m "feat(payment): define payment provider interface"

# Second commit: CBE Birr Implementation
cat << 'EOF' > cbe-provider.ts
import { PaymentProvider } from './payment-provider';

export class CbeBirrProvider implements PaymentProvider {
  async processPayment(amount: number, accountId: string): Promise<boolean> {
    console.log(`Processing ${amount} ETB via CBE Birr for ${accountId}`);
    return true;
  }
}
EOF
git add cbe-provider.ts
git commit -m "feat(payment): implement CBE Birr provider"
```

---

### Exercise 2: Simulating Remote Divergence & Rebasing

1. Simulate a colleague merging a hotfix directly into `main` while your feature was under review:
```bash
git switch main
echo "console.log('Telemetry active');" >> telemetry.ts
git add telemetry.ts
git commit -m "fix(monitoring): add service heartbeat telemetry"
```

2. Switch back to your feature branch and update it cleanly using rebase:
```bash
git switch feat/ZM-301-cbe-birr-integration
git rebase main
```

3. Verify your linear Git log:
```bash
git log --oneline --graph
```

4. Complete the simulated merge into `main`:
```bash
git switch main
git merge --squash feat/ZM-301-cbe-birr-integration
git commit -m "feat(payment): integrate CBE Birr payment provider (#301)"
git branch -D feat/ZM-301-cbe-birr-integration
```

---

### Verification Checklist
- [x] Branch named with proper type prefix and ticket key.
- [x] Commits adhere strictly to Conventional Commits standard.
- [x] Kept feature branch updated against `main` via `git rebase main`.
- [x] Merged with squash to keep `main` history pristine.
