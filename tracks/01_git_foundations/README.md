# Track 01: Git Foundations & The Mental Model

> **Zemen Technologies Engineering Workflows Curriculum**  
> *Target Audience:* All Engineers, New Hires, Interns  
> *Duration:* 35 Minutes  
> *Interactive Slides:* [View Slide Deck](../../slides/01-foundations.html)

---

## 1. Overview & Philosophy

Many software engineers struggle with Git because they treat it as an opaque set of incantations: `git add`, `git commit`, `git push`, and pray. When a merge conflict or detached HEAD occurs, panic sets in and repositories are deleted and re-cloned.

At **Zemen Technologies**, we believe true velocity comes from understanding the underlying data structures. Once you internalize how Git works under the hood, commands cease being magic spells and become predictable state transitions.

```
+-----------------------------------------------------------------------+
|                       Git Architecture at a Glance                    |
|                                                                       |
|  [ Working Directory ]  ==== git add ====>  [ Staging Area (Index) ]  |
|      (Your Files)                               (Binary Snapshot)     |
|                                                         ||            |
|                                                    git commit         |
|                                                         \/            |
|  [ Remote Server ]   <==== git push ====   [ Git Repository (DAG) ]   |
|   (GitHub Org)                                 (.git/objects)         |
+-----------------------------------------------------------------------+
```

---

## 2. Core Concepts

### A. Git is a Directed Acyclic Graph (DAG)
Git is fundamentally a content-addressable storage database. Everything in Git is stored as an object referenced by its SHA-1 (or SHA-256) hash:
1. **Blob:** Represents raw file contents. Does not store filenames, permissions, or timestamps.
2. **Tree:** Represents a directory. Maps names and mode flags to Blobs and nested Trees.
3. **Commit:** A snapshot containing a top-level Tree hash, parent commit hash(es), author info, committer info, and commit message.
4. **Tag:** A permanent reference pointing to a specific commit, often signed with GPG.

### B. The Three Trees
Git manages your code across three distinct environments:
- **Working Tree:** Real files on your disk that you edit with your IDE.
- **Index (Staging Area):** A preparation zone holding the exact state of what will go into your next commit.
- **HEAD (Repository):** The commit pointer representing the current active state of your checked-out branch.

### C. Branches are 41-Byte Text Files
Unlike older systems (SVN/CVS) where branching copied entire file trees, a Git branch is literally a single file containing a 40-character commit hash followed by a newline (41 bytes).
```bash
# Verify it yourself:
$ cat .git/refs/heads/main
3f2a89c9e51b6814b69992ad32098045fbc31908
```

---

## 3. Essential Command Reference

| Command | Purpose | Zemen Best Practice |
|---|---|---|
| `git status -s` | Compact status view | Run frequently to keep track of untracked and modified files. |
| `git add -p <file>` | Interactive hunk staging | Stage individual chunks of code instead of dumping everything with `git add .`. |
| `git diff` | Diff working tree vs index | Review uncommitted code before staging. |
| `git diff --staged` | Diff index vs last commit | Review the exact payload about to be committed. |
| `git switch -c <branch>` | Create and switch branch | Modern replacement for `git checkout -b`. |
| `git log --oneline --graph -n 10` | Visualize DAG history | View commit lineage and branch divergence visually. |

---

## 4. Next Step: Hands-on Lab
Proceed to [lab.md](./lab.md) to complete the terminal exercises.
