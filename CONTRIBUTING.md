<div align="center">

<h1>Contributing to YDO</h1>

*Thank you for helping us build a secure, on-device encrypted platform.*

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)

</div>
 Welcome! Thank you for your interest in contributing to YDO. Please read the following guidelines before submitting a pull request to ensure a smooth review process.

---
## The Golden Rule: Keep Secrets Secret!

Because this app handles sensitive student data, **privacy is our #1 priority**. When writing code, always double-check that you:
* **NEVER** use `console.log()` to print secret words (mnemonics), private keys, or who a user liked. 
* **NEVER** save raw, unprotected keys into the browser's local storage.
* **NEVER** send raw keys or choices to any external server. Only encrypted data (if needed) may be persisted, and plaintext secrets should be cleared from memory as soon as possible.

---

## Setting up locally
Please refer to the **[SETUP.md](docs/SETUP.md)** for instructions on setting up the project locally.

---

## Your First Code Contribution

Follow this general workflow for code contributions:

```bash
# Fork the repository and clone your fork
git clone [your-fork-url]
cd YDO_26

# Create a new branch
git checkout -b feat/your-feature-name
# or
git checkout -b fix/issue-description

# Make your changes

# Commit your changes following our commit message guidelines

# Push your branch
git push origin HEAD
```

Then, open a Pull Request (PR) to the `main` branch. Provide a clear description and reference related issues.

---

## Commit Message Guidelines

We use **Conventional Commits**. Our Commitlint configuration enforces the following format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

<details>
<summary><b>Click here to view detailed Commit Rules and Examples</b></summary>

<br>

**Commit Rules Explained:**

* **`<type>` (Mandatory):** Must be one of the following:

| Type | Description | Type | Description |
|---|---|---|---|
| `feat` | New feature | `fix` | Bug fix |
| `docs` | Documentation-only changes | `style` | Code formatting, white-space |
| `refactor` | Code restructuring (no behavior change) | `perf` | Performance improvements |
| `test` | Adding/correcting tests | `chore` | Routine tasks (e.g., dependencies) |
| `build` | Build system/external dependencies| `ci` | CI configuration changes |
| `revert` | Reverting a previous commit | | |

* **`<scope>` (Optional):** Short description of the affected area (e.g., `frontend`, `backend-auth`).
* **`<subject>` (Mandatory):** Concise description of the change. Use imperative, present tense (e.g., *add*, not *added*). Max 100 characters. No period at the end.
* **`<body>` (Optional):** Describe *what* and *why*. Must start with a blank line after the subject. Max line length of 100 characters.
* **`<footer>` (Optional):** Reference related issues (e.g., `Closes #123`, `Fixes #456`). Must start with a blank line after the body.

**Example Commit Message:**

```text
feat(frontend): add responsive navigation bar

This commit introduces a new responsive navigation bar for better user experience on mobile devices.

Closes #789
```

>  **Tip:** To perform a multiline commit message, use `git commit` (without the `-m` flag) to write the message in your preferred code editor.

</details>

## Project Workflow & Implementation Guide
### Developer Tracks & Implementation Steps

Before starting on any of these tracks, please review the core logic requirements in the official [Specification Document](https://docs.google.com/document/d/1qz8RN1yN3RA55GolcHFKubSI9uPE6JB1gudcgsxRXEQ/edit?usp=sharing).

| Track | Key Responsibilities | Technical Reference |
| :--- | :--- | :--- |
| **Cryptography** | Implement SHA-256 and ECDH logic for student anonymity. |[Section 5: Cryptographic Engine](https://docs.google.com/document/d/1qz8RN1yN3RA55GolcHFKubSI9uPE6JB1gudcgsxRXEQ/edit?tab=t.0#heading=h.g4os39we0o22)|
| **Database/Backend** | Set up Supabase schemas and secure tables. |[Section 4: Database Schema](https://docs.google.com/document/d/1qz8RN1yN3RA55GolcHFKubSI9uPE6JB1gudcgsxRXEQ/edit?tab=t.0#heading=h.75etvpneewes)|
| **Frontend/UI** | Build the Onboarding, Selection, and Reveal workflows. |[Section 6: Page User Flow](https://docs.google.com/document/d/1qz8RN1yN3RA55GolcHFKubSI9uPE6JB1gudcgsxRXEQ/edit?tab=t.0#heading=h.9xvjyer28tif)|

To help you understand how the application functions and where your code fits in, use this sequential workflow table to guide your development tasks:

|Workflow Step|Tech Domain|What to Implement (Your Tasks)|Core Focus|
|:---|:---|:---|:---|
|**1.Authentication**<br>Student signs up / logs in.|**Frontend & Backend**| • Build the Landing & Login/Registration pages.<br>• Configure Supabase Auth to reject non-`@iiitdmj.ac.in` domains.<br>• Pre-populate the database with student roll numbers to serve as a public directory. | Restrict access strictly to verified institutional credentials. |
|**2.Key Generation**<br>User sets up local cryptographic keys. |**Frontend & Crypto**| • Create a page showing the 12-word seed phrase with a `.txt` auto-downloader utility.<br>• Build a verification page requiring the user to type the first 3 letters of their phrase.<br>• Implement client-side mnemonic and keypair generation via `ethers.js`. | Ensure public keys are sent to the users table while private keys remain *only* on-device. |
|**3.The Vault**<br>Securing sensitive choices on device. |**Frontend & Crypto**| • Create a setup page for a user-defined 4-digit PIN.<br>• Implement `AES-GCM` encryption to lock the seed phrase in local storage via the PIN.<br>• Write logic to securely decrypt local storage using that PIN.<br>• Implement logic to encrypt plaintext choices and upload them safely to the `encrypted_vault`. | Prevent anyone from pulling raw, unencrypted private keys from browser storage. |
| **4.Anonymous Hashed Submission**<br>User securely submits their choices. | **Frontend & Crypto** | • Build the Dashboard, Search, and Countdown layouts.<br>• Implement the Elliptic Curve Diffie-Hellman (ECDH) shared secret logic.<br>• Build the `submitLikes` function to generate SHA-256 hashes of shared secrets and push them to the database.<br>• Ensure local browser RAM is completely wiped clean of raw selections post-submission. | Only transmit one-way SHA-256 hashes to the database. Never send plaintext names or choices. |
|**5.Collision & Reveal**<br>The system processes and opens mutual matches.|**Backend & Crypto**| • Write a database rule that automatically rejects any new entries after the deadline passes.<br>• Write the Match Aggregation backend script to scan the database and group mutual matches (where hashes appear exactly twice).<br>• Automate exporting matched hashes into a lightweight, public `.json` asset.<br>• Build the Match Reveal Screen and implement the logic to match user choices locally against the downloaded JSON. | Run match calculations via secure database scripts only after the submissions close. |

---
## Design Resources

Will be updated soon.

---

## Getting Help

If you have questions or need assistance:

* Open an issue on the GitHub repository.
* Reach out to the maintainers in the Discord channel.
[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=flat-square&logo=discord&logoColor=white)](https://discord.gg/hYdPse79XF)


*NOTE:* To keep discussions transparent, please ask questions in the public Discord channels or GitHub issues rather than DMs. Let's keep commit messages clean, professional, and emoji-free!
