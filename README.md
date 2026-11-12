# Zemen Technologies — Git & Engineering Workflows Hub

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Site-181614?style=flat-square)](https://zementechnologies.github.io/git-workflows/)
[![License: MIT](https://img.shields.io/badge/License-MIT-A51C30?style=flat-square)](LICENSE)
[![Curriculum](https://img.shields.io/badge/Tracks-7%20Specialized%20Tracks-181614?style=flat-square)](#curriculum-tracks)

The official version control specifications, collaboration guidelines, and technical curriculum for software engineers at **Zemen Technologies PLC**.

- [Live Web Hub & Slides](https://zementechnologies.github.io/git-workflows/)
- [Curriculum Tracks](#curriculum-tracks)
- [Emergency Runbook](https://zementechnologies.github.io/git-workflows/#runbook)
- [Interactive Branch Simulator](https://zementechnologies.github.io/git-workflows/#simulator)

---

## Overview

This repository provides an enterprise-ready engineering playbook for software teams building fintech applications, web systems, cloud infrastructure, and AI tooling.

### Curriculum Structure
- **Multi-Track Pathways:** Dedicated tracks covering core fundamentals, team collaboration, web/frontend specifics, backend infrastructure, disaster recovery, and AI tool integration.
- **Interactive Slide Decks:** Lightweight browser presentations powered by Reveal.js, accessible directly through GitHub Pages.
- **Visual Branch Simulator:** Real-time commit graph DAG simulator for verifying branch and merge mechanics.
- **Emergency Runbook:** Documented remedies for common version control incidents.
- **Hands-on Labs:** Reproducible terminal exercises with verification steps.

---

## Curriculum Tracks

| Track | Title | Target Audience | Slide Deck | Guide & Lab |
|:---:|:---|:---|:---:|:---:|
| **00** | **Git from Scratch (Zero to First PR)** | Absolute Beginners, Junior Devs, Interns | [Launch Deck](https://zementechnologies.github.io/git-workflows/slides/00-beginner-starter.html) | [Guide](tracks/00_beginner_starter/README.md) / [Lab](tracks/00_beginner_starter/lab.md) |
| **01** | **Git Foundations & Mental Model** | All Onboarding Engineers, Interns | [Launch Deck](https://zementechnologies.github.io/git-workflows/slides/01-foundations.html) | [Guide](tracks/01_git_foundations/README.md) / [Lab](tracks/01_git_foundations/lab.md) |
| **02** | **Team Workflows & Collaboration** | Product & Engineering Teams | [Launch Deck](https://zementechnologies.github.io/git-workflows/slides/02-collaboration.html) | [Guide](tracks/02_collaboration_workflows/README.md) / [Lab](tracks/02_collaboration_workflows/lab.md) |
| **03** | **Frontend & Web Development** | Frontend, Fullstack, UI/UX Engineers | [Launch Deck](https://zementechnologies.github.io/git-workflows/slides/03-frontend.html) | [Guide](tracks/03_frontend_web/README.md) / [Lab](tracks/03_frontend_web/lab.md) |
| **04** | **Backend, Cloud & DevOps Track** | Backend & Cloud Engineers | [Launch Deck](https://zementechnologies.github.io/git-workflows/slides/04-devops.html) | [Guide](tracks/04_backend_devops/README.md) / [Lab](tracks/04_backend_devops/lab.md) |
| **05** | **Advanced Git & Disaster Recovery** | Senior Engineers, Technical Leads | [Launch Deck](https://zementechnologies.github.io/git-workflows/slides/05-advanced.html) | [Guide](tracks/05_advanced_recovery/README.md) / [Lab](tracks/05_advanced_recovery/lab.md) |
| **06** | **AI-Assisted Git & Developer Tooling** | All Engineers Using AI Assistants | [Launch Deck](https://zementechnologies.github.io/git-workflows/slides/06-ai-automation.html) | [Guide](tracks/06_ai_and_automation/README.md) / [Lab](tracks/06_ai_and_automation/lab.md) |

---

## Local Development & Preview

This repository uses static assets with zero external compilation dependencies.

```bash
# Clone the repository
git clone https://github.com/zementechnologies/git-workflows.git
cd git-workflows

# Option A: Built-in Python 3 HTTP server
python3 -m http.server 8000

# Option B: Node.js static server
npx serve .

# Open http://localhost:8000 in your browser
```

---

## GitHub Pages Deployment

GitHub Pages is served from the `main` branch root directory with `.nojekyll` enabled. Continuous deployment is handled via `.github/workflows/deploy.yml`.

Live URL: **[https://zementechnologies.github.io/git-workflows/](https://zementechnologies.github.io/git-workflows/)**

---

## Contributing

Additions, improvements, and new lab exercises are managed via standard pull requests. Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming standards and Conventional Commit formats.

---

## Facilitation & Questions

For questions, curriculum feedback, workshop facilitation, or PR reviews, contact the lead facilitators:
- **Latera Tilahun** — [@Laterat](https://github.com/Laterat)
- **Nahim** — [@nahim13](https://github.com/nahim13)

---

## Zemen Technologies PLC

- **Website:** [zemen.com.et](https://zemen.com.et)
- **Contact:** [hello@zemen.com.et](mailto:hello@zemen.com.et)
- **GitHub:** [@zementechnologies](https://github.com/zementechnologies)

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.
