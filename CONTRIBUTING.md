# Contributing to Zemen Git & Workflows

Thank you for your interest in improving the Zemen Technologies Git & Engineering Workflows curriculum!

## How to Contribute

1. **Fork or Branch:**
   Create a new branch from `main`:
   ```bash
   git switch -c feat/ZM-xxx-new-track-module
   ```

2. **Guidelines for New Modules:**
   - Follow the naming pattern `tracks/XX_<topic_name>/`
   - Include both a conceptual `README.md` and a terminal-based `lab.md`
   - If adding a slide deck, place it in `slides/XX-<name>.html` utilizing Reveal.js and our custom theme `assets/css/slides-theme.css`.

3. **Commit Standards:**
   Use Conventional Commits:
   ```text
   feat(tracks): add mobile React Native branching guide
   docs(cheatsheet): add git stash pop conflict recipe
   ```

4. **Pull Request Checklist:**
   - [ ] All HTML files render properly without console errors.
   - [ ] Slide deck transitions and code highlights function smoothly.
   - [ ] Lab steps are tested and reproducible in a clean terminal shell.

