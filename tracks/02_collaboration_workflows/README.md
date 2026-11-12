# Track 02: Team Workflows & Collaboration

> **Zemen Technologies Engineering Workflows Curriculum**  
> *Target Audience:* All Product & Engineering Teams  
> *Duration:* 40 Minutes  
> *Interactive Slides:* [View Slide Deck](../../slides/02-collaboration.html)

---

## 1. Zemen's GitHub Flow Standard

At Zemen Technologies, we operate on a streamlined **GitHub Flow** model for fast, continuous product delivery:

```
  main ----------------------------------------*----------------> [Production]
         \                                    / (Squash & Merge)
          \                                  /
           +-- feat/ZM-101-auth --*---*---*--+ [Pull Request & CI Checks]
```

1. **`main` is always releasable.** Code in `main` must pass all tests, builds, and security scans.
2. **Branch from `main`** for every bug fix or feature.
3. **Commit atomically** using Conventional Commits.
4. **Open a Pull Request early** for visibility and automated CI feedback.
5. **Require 1 peer review** and passing CI checks prior to merging.
6. **Squash and Merge** into `main` to maintain a clean linear commit graph.
7. **Delete feature branch** immediately after merging.

---

## 2. Branch Naming Specification

All branch names at Zemen follow this format:
```
<type>/<issue-key>-<short-description>
```

| Type | Purpose | Example |
|---|---|---|
| `feat/` | New user-facing feature or API | `feat/ZM-104-telebirr-webhook` |
| `fix/` | Bug fix in existing functionality | `fix/ZM-88-login-redirect-loop` |
| `perf/` | Performance enhancement | `perf/ZM-210-query-caching` |
| `refactor/` | Code structure change without behavioral change | `refactor/ZM-150-auth-middleware` |
| `chore/` | Tooling, build scripts, linting, dependency updates | `chore/upgrade-next-15` |
| `docs/` | Documentation additions or updates | `docs/api-readme-update` |

---

## 3. Conventional Commits Specification

Commit messages must be structured as follows:
```text
<type>(<scope>): <subject in imperative, present tense>

[optional body: explain WHAT changed and WHY]

[optional footer: Closes #123, BREAKING CHANGE: ...]
```

### Examples:
- `feat(billing): add automated PDF receipt generation`
- `fix(auth): handle expired JWT tokens gracefully without crash`
- `docs(readme): add docker-compose setup instructions`

---

## 4. Pull Request Anatomy

Every Pull Request opened at Zemen should include:
- **Title:** Following Conventional Commits format (`feat(scope): title`).
- **Context:** Why is this change necessary? Link the issue/ticket.
- **Testing Proof:** Screenshots, Loom video, or automated test output.
- **Risk Assessment:** Any breaking changes or database migration considerations?

Proceed to [lab.md](./lab.md) to practice the collaboration lifecycle.
