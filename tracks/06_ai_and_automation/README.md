# Track 06: AI-Assisted Git & Developer Tooling

> **Zemen Technologies Engineering Workflows Curriculum**  
> *Target Audience:* Modern Software Engineers Using AI  
> *Duration:* 35 Minutes  
> *Interactive Slides:* [View Slide Deck](../../slides/06-ai-automation.html)

---

## 1. The Era of AI-Assisted Engineering

As engineers at Zemen Technologies utilize generative AI tools (Antigravity, GitHub Copilot, Cursor, Claude Code), our Git workflow must adapt to maintain high code quality and atomic history.

### The Anti-Pattern:
- Prompting an AI to generate a huge feature across 40 files.
- Blindly executing `git add . && git commit -m "AI added feature"`.
- Opening a 2,000-line unreviewable Pull Request containing commented-out dead code, phantom imports, and hidden bugs.

### The Zemen Protocol:
1. **Prompt in Slices:** Prompt the AI to build small, modular units (e.g. one type signature, one function, one unit test).
2. **Review Diff Before Staging:** Always run `git diff` to inspect every addition.
3. **Interactive Staging (`git add -p`):** Stage atomic units of work accompanied by descriptive Conventional Commit messages.

---

## 2. Pre-commit Automation with Husky & Lint-Staged

Automate quality checks before any commit can be created locally:
- Linting (ESLint, Biome)
- Code formatting (Prettier)
- Type-checking (TypeScript `tsc --noEmit`)
- Secret checking (Gitleaks)

```
[ Developer runs git commit ]
           ||
           \/
   [ Husky Pre-commit Hook ]
           ||
   +-------+-------+
   |  lint-staged  |  --> ESLint & Prettier on staged files only
   +-------+-------+
   |    Gitleaks   |  --> Scan staged diff for API keys & passwords
   +-------+-------+
           ||
    (All Passed?)
     /          \
   YES           NO
    ||           ||
    \/           \/
[ Commit Made ]  [ Commit Aborted with helpful error message ]
```

---

## 3. GitHub Actions PR Gatekeeper

Configure `.github/workflows/ci.yml` to automatically reject failing PRs before human review:
- Multi-node test matrix
- Test coverage threshold (>80%)
- Automated PR size labeling (`size/S`, `size/M`, `size/L`, `size/XL`)

Proceed to [lab.md](./lab.md) to practice setting up automated pre-commit hooks.

