# Track 00: Git from Scratch — Zero to First Pull Request

> **Zemen Technologies Engineering Workflows Curriculum**  
> *Target Audience:* Absolute Beginners, Junior Developers, Interns  
> *Duration:* 45 Minutes  
> *Interactive Slides:* [View Slide Deck](../../slides/00-beginner-starter.html)

---

## 1. What is Version Control and Why Do We Use It?

Imagine writing a 50-page document with four other people, sharing a USB drive or emailing copies back and forth. Within three days, you will have:
- `document_v1.docx`
- `document_v2_final.docx`
- `document_v2_final_FINAL_aaron.docx`

In software engineering, having multiple conflicting copies is fatal. Code must run reliably in production.

**Git** is a version control system that records snapshots of every change in your project over time. It gives you:
1. **A Complete Time Machine:** You can jump backward to any commit made hours, months, or years ago.
2. **Attribution & Context:** Every line of code is tagged with who wrote it, when, and the commit message explaining why.
3. **Safe Branching:** You can create an isolated branch to experiment with new ideas without affecting the main working version.
4. **Collaborative Integration:** Multiple developers can work on different parts of the same project simultaneously, and Git helps combine them safely.

---

## 2. Git vs GitHub

Many beginners confuse Git and GitHub. Here is the distinction:

| Aspect | Git | GitHub |
|---|---|---|
| **What it is** | A software command-line tool | A cloud web platform |
| **Where it runs** | Locally on your computer | On remote cloud servers |
| **Internet connection** | Not needed (works 100% offline) | Needed to push, pull, or view web UI |
| **Primary role** | Takes snapshots, tracks branches, records DAG | Hosts repositories, pull requests, CI/CD |

---

## 3. The Four States of Files

Files in a Git project exist in one of four states:

1. **Untracked:** A file you created that Git has never monitored before.
2. **Modified:** An existing tracked file that has unsaved edits in your working directory.
3. **Staged:** A file whose changes you selected with `git add` to be included in the next commit snapshot.
4. **Committed:** The state has been permanently sealed into the local Git database with `git commit`.

```
[ Working Directory ] ----- git add -----> [ Staging Area ] ----- git commit -----> [ Local Repository ]
    (Modified files)                             (Prepared box)                           (Permanent snapshot)
```

---

## 4. Essential Beginner Commands

| Command | What it does | When to run it |
|---|---|---|
| `git status -s` | Shows modified and untracked files | Run this before every single git action! |
| `git diff` | Shows exact line changes not yet staged | Run before `git add` to review your edits |
| `git add <file>` | Stages a file for the next snapshot | When a logical piece of work is ready |
| `git commit -m "..."` | Seals the staged files into a permanent commit | When an atomic task is complete |
| `git switch -c <branch>` | Creates and enters a new feature branch | Before writing any new feature code |
| `git log --oneline -n 5` | Lists the last 5 commits compactly | To verify your recent history |
| `git push -u origin <branch>` | Uploads your branch to GitHub | When you want to share or open a PR |
| `git pull origin main` | Downloads newest changes from main | Before starting new work |

Proceed to [lab.md](./lab.md) for step-by-step terminal practice.
