# 🌐 Zemen Technologies — Git & Engineering Workflows Hub

<div align="center">

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Site-brightgreen?logo=github&style=for-the-badge)](https://zementechnologies.github.io/git-workflows/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Curriculum: 6 Tracks](https://img.shields.io/badge/Curriculum-6%20Specialized%20Tracks-crimson?style=for-the-badge)](#curriculum-tracks)
[![Inspiration: Sciware](https://img.shields.io/badge/Inspiration-Flatiron%20Sciware-0C2340?style=for-the-badge)](https://github.com/flatironinstitute/sciware)

**A battle-tested version control and collaboration curriculum tailored for software engineers, product teams, and DevOps practitioners at Zemen Technologies.**

[🚀 Open Live Web Hub & Slides](https://zementechnologies.github.io/git-workflows/) • [📖 Read the Guide](#curriculum-tracks) • [💡 Try Git Simulator](https://zementechnologies.github.io/git-workflows/#simulator)

</div>

---

## 📌 About The Project

This repository serves as the official learning portal and engineering playbook for **Zemen Technologies PLC**. 

Inspired by the open-source [**Sciware**](https://github.com/flatironinstitute/sciware) community at the **Flatiron Institute** in New York, we created an enterprise-ready curriculum designed for modern African tech teams building fintech, web apps, cloud services, and AI systems.

### Key Highlights
- **Multi-Track Pathways:** Dedicated tracks for core foundations, team PR collaboration, web/frontend, backend/cloud, advanced recovery, and AI agent workflows.
- **Interactive Presentation Decks:** Fully responsive slide decks powered by Reveal.js accessible directly in the browser via GitHub Pages.
- **In-Browser Visual DAG Simulator:** Practice commands (`git commit`, `git switch`, `git merge`) with real-time SVG graph animation without leaving the site.
- **Emergency Runbook & Cheatsheet:** One-click copy recipes for common Git dilemmas (wrong branch commits, reflog recovery, lockfile conflicts).
- **Hands-on Terminal Labs:** Real-world sandbox scenarios with step-by-step verification commands.

---

## 📚 Curriculum Tracks

| # | Track Name | Target Audience | Slides (Reveal.js) | Guide & Lab |
|:---:|:---|:---|:---:|:---:|
| **01** | **Git Foundations & Mental Model** | All Engineers, New Hires | [🖥️ Launch Slides](https://zementechnologies.github.io/git-workflows/slides/01-foundations.html) | [📖 Guide](tracks/01_git_foundations/README.md) • [🧪 Lab](tracks/01_git_foundations/lab.md) |
| **02** | **Team Workflows & Collaboration** | Product & Engineering Teams | [🖥️ Launch Slides](https://zementechnologies.github.io/git-workflows/slides/02-collaboration.html) | [📖 Guide](tracks/02_collaboration_workflows/README.md) • [🧪 Lab](tracks/02_collaboration_workflows/lab.md) |
| **03** | **Frontend & Web Development** | Frontend, Fullstack, UI/UX | [🖥️ Launch Slides](https://zementechnologies.github.io/git-workflows/slides/03-frontend.html) | [📖 Guide](tracks/03_frontend_web/README.md) • [🧪 Lab](tracks/03_frontend_web/lab.md) |
| **04** | **Backend, Cloud & DevOps Track** | Backend & DevOps Engineers | [🖥️ Launch Slides](https://zementechnologies.github.io/git-workflows/slides/04-devops.html) | [📖 Guide](tracks/04_backend_devops/README.md) • [🧪 Lab](tracks/04_backend_devops/lab.md) |
| **05** | **Advanced Git & Disaster Recovery** | Senior Engineers, Tech Leads | [🖥️ Launch Slides](https://zementechnologies.github.io/git-workflows/slides/05-advanced.html) | [📖 Guide](tracks/05_advanced_recovery/README.md) • [🧪 Lab](tracks/05_advanced_recovery/lab.md) |
| **06** | **AI-Assisted Git & Automation** | Modern AI-Assisted Engineers | [🖥️ Launch Slides](https://zementechnologies.github.io/git-workflows/slides/06-ai-automation.html) | [📖 Guide](tracks/06_ai_and_automation/README.md) • [🧪 Lab](tracks/06_ai_and_automation/lab.md) |

---

## 🛠️ Local Development & Preview

This repository uses standard static web assets with zero external compile dependencies.

To preview locally:
```bash
# Clone the repository
git clone https://github.com/zementechnologies/git-workflows.git
cd git-workflows

# Option 1: Using Python 3 built-in HTTP server
python3 -m http.server 8000

# Option 2: Using Node.js
npx serve .

# Open http://localhost:8000 in your browser
```

---

## 🚀 GitHub Pages Deployment

GitHub Pages is automatically deployed via `.github/workflows/deploy.yml` on every push to the `main` branch.

Live URL: **[https://zementechnologies.github.io/git-workflows/](https://zementechnologies.github.io/git-workflows/)**

---

## 🤝 Contributing

We welcome additions, fixes, and new lab exercises from the community and Zemen team members! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on submitting pull requests.

---

## 🏢 About Zemen Technologies PLC

Zemen Technologies PLC is a technology enterprise based in Addis Ababa, Ethiopia, specializing in high-impact software development, financial technology systems, cloud infrastructure, and AI engineering.

- **Website:** [zemen.com.et](https://zemen.com.et)
- **Email:** [hello@zemen.com.et](mailto:hello@zemen.com.et)
- **GitHub:** [@zementechnologies](https://github.com/zementechnologies)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
