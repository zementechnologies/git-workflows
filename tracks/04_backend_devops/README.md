# Track 04: Backend, Cloud & DevOps Track

> **Zemen Technologies Engineering Workflows Curriculum**  
> *Target Audience:* Backend, Cloud & DevOps Engineers  
> *Duration:* 45 Minutes  
> *Interactive Slides:* [View Slide Deck](../../slides/04-devops.html)

---

## 1. Overview & Cloud Delivery Standards

In modern cloud-native architectures, Git is not simply a source code repository—it is the operational control plane for your entire infrastructure (GitOps). Every production deployment, Kubernetes manifest change, and release tag must originate from a traceable Git commit.

---

## 2. Semantic Versioning & Annotated Tags

Zemen uses Semantic Versioning (`vMAJOR.MINOR.PATCH`):
- `v1.0.0` -> `v1.0.1` (Patch: backward-compatible fix)
- `v1.0.1` -> `v1.1.0` (Minor: backward-compatible feature)
- `v1.1.0` -> `v2.0.0` (Major: breaking changes or backwards-incompatible API changes)

### Lightweight vs Annotated Tags:
```bash
# BAD: Lightweight tag (stores only commit hash, no author or message)
git tag v1.0.0

# GOOD: Annotated tag (stores full metadata, date, author, GPG signature)
git tag -a v1.0.0 -m "Release v1.0.0: Core authentication and payment APIs"
```

---

## 3. The GitOps Architecture

```
+---------------+      PR Merge      +--------------------+      Trigger CI      +--------------------+
|  Backend Dev  |  ===============>  |  github.com/zemen  |  =================>  |  GH Actions Build  |
+---------------+                    |   /api-service     |                      |  & Docker Push     |
                                     +--------------------+                      +--------------------+
                                               ||                                          ||
                                        Annotated Tag v1.2.0                               ||
                                               \/                                          \/
                                     +--------------------+      Reconcile       +--------------------+
                                     | GitOps Manifests   |  <=================  | Kubernetes Cluster |
                                     | (ArgoCD / K8s)     |                      | (Production Pods)  |
                                     +--------------------+                      +--------------------+
```

---

## 4. Secret Leak Prevention

Accidental credential exposure in public or private Git repositories is one of the highest risks in software engineering.

### Protection Rules:
1. **Never commit `.env` files:** Always use `.env.example` with dummy values.
2. **Install pre-commit secret scanners:** Use tools like `gitleaks` or `trufflehog`.
3. **If a secret is pushed:** Treat it as immediately compromised. Rotate the key in the external provider first, then purge Git history using `git-filter-repo`.

Proceed to [lab.md](./lab.md) to practice release tagging and secret prevention.
