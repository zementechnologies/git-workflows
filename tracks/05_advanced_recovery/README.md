# Track 05: Advanced Git & Disaster Recovery

> **Zemen Technologies Engineering Workflows Curriculum**  
> *Target Audience:* Senior Engineers, Tech Leads & DevOps  
> *Duration:* 45 Minutes  
> *Interactive Slides:* [View Slide Deck](../../slides/05-advanced.html)

---

## 1. Overview: The Git Paramedic Toolkit

Mistakes happen. Commits are made to the wrong branch, merge conflicts get bungled, and commits are accidentally destroyed with `git reset --hard`.

Because Git is an append-only object database, **almost nothing is truly lost** until garbage collection (`git gc`) purges unreferenced objects (usually after 30 to 90 days).

---

## 2. Interactive Rebasing (`git rebase -i`)

Before pushing your work for review, polish your commits:
```bash
git rebase -i HEAD~4
```

| Subcommand | Action |
|---|---|
| `pick` | Keep commit unchanged |
| `reword` | Edit commit message |
| `edit` | Stop to amend files in commit |
| `squash` | Merge into previous commit, combine messages |
| `fixup` | Merge into previous commit, discard message |
| `drop` | Delete commit entirely |

> **Rule of Thumb:** Never rebase a branch that has already been pushed to a shared remote (like `main` or `staging`)!

---

## 3. Rescuing Lost Commits with `git reflog`

The Reference Log (`reflog`) records every time HEAD updates locally (commits, checkouts, rebases, merges).

```bash
# 1. View reflog
git reflog

# 2. Identify the commit hash right before your mistake
# Output might look like:
# 4a2b10c HEAD@{0}: reset: moving to HEAD~3
# 89f1a23 HEAD@{1}: commit: crucial payment logic

# 3. Restore the state to a new branch:
git checkout -b recovered-work 89f1a23
```

---

## 4. Pinpoint Regressions with `git bisect`

Binary search your Git history to find the exact commit that introduced a bug:
```bash
git bisect start
git bisect bad                 # Current commit is broken
git bisect good v1.4.0         # v1.4.0 was working

# Test the checked-out commit, then inform Git:
git bisect good                # or: git bisect bad

# Git isolates the culpable commit in O(log N) steps!
git bisect reset
```

Proceed to [lab.md](./lab.md) to practice disaster recovery.
