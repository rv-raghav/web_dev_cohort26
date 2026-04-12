# 📘 Git & GitHub Crash Course

A beginner-friendly course covering the fundamentals of Git and GitHub, including version control, branching, and collaboration workflows.

---

## 📌 1. What is a Version Control System?

Version Control Systems (VCS) help track and manage changes in software code over time.

### 🔹 Popular VCS Tools

- **Git** (Most widely used)
- **Apache Subversion (SVN)**
- **Piper** (used internally by Google)

---

## 🚀 2. Introduction to Git

### 🔹 What is Git?

Git is a distributed version control system designed to handle everything from small to very large projects efficiently.

### 🔹 Install Git

Download Git from the official website and install the CLI:
https://git-scm.com/

### 🔹 Basic Git Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

---

## 🗂️ 3. Version Controlling with Git

### 🔹 Initialize a Git Repository

```bash
git init
```

### 🔹 Add Files to Version Control

```bash
git add <FILE_PATH>
git add .
```

### 🔹 Remove Files

```bash
git rm <FILE_PATH>
```

### 🔹 Commits

Save changes with a message:

```bash
git commit -m "Your message"
```

### 🔹 Staging Area

The staging area is where changes are prepared before committing.

### 🔹 View Commit History

```bash
git log
git log --oneline
```

### 🔹 Reverting Changes

You can revert to previous commits using Git commands like:

```bash
git checkout <commit_id>
```

---

## 🌐 4. Git vs GitHub

### 🔹 What is Git?

A local version control system.

### 🔹 What is GitHub?

A cloud-based Git hosting platform.

### 🔹 Popular Git Hosting Services

- GitHub
- GitLab
- Bitbucket

### 🔹 Git Remotes

Connect your local repo to a remote repository:

```bash
git remote add origin <repo_url>
```

### 🔹 Push & Pull

```bash
git push origin main
git pull origin main
```

### 🔹 Self-Hosted Git Servers

You can host your own Git server for private or enterprise use.

---

## 🌿 5. Branching in Git

### 🔹 What is Branching?

Branching allows you to work on features independently without affecting the main codebase.

### 🔹 Create & Switch Branches

```bash
git branch <branch-name>
git checkout <branch-name>
git checkout -b <branch-name>
```

### 🔹 Naming Convention

- feat/feature-name
- fix/bug-name

### 🔹 Merge Branches

```bash
git merge <branch-name>
```

### 🔹 Rebase

```bash
git rebase <branch-name>
```

### 🔹 Stashing Changes

```bash
git stash
git stash pop
```

---

## 📚 Summary

This course covers:

- Basics of Version Control Systems
- Git fundamentals and commands
- GitHub and remote repositories
- Branching and collaboration workflows

---
