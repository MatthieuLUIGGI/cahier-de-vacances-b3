# Week 5 - *Breach the Matrix*
Agent Smith has reinforced the Matrix with a new **firewall layer**, infused with his self-replicating logic and paranoia. It's adaptive. Ruthless. It detects the slightest anomaly. One wrong character… and you’re traced.

Your mission is to simulate a **Matrix breach** by crafting a password validation interface used by the Zion resistance to test possible exploit keys before they’re injected into the Matrix.

You’ll develop this simulation using **React**, **Vite**, and **TypeScript**.
**This is a safe zone. But the real thing won’t forgive mistakes.**

![Week 5 - Breach the Matrix](img/week05.webp)

## The Matrix Firewall Protocol

To outsmart Agent Smith’s logic trap, your breach password must **perfectly match Zion’s forged signature pattern**:

✅ A valid password:

* Has **at least 8 characters**
* Includes **at least 1 uppercase glyph**
* Includes **at least 1 lowercase glyph**
* Includes **at least 1 number**
* Includes **at least 1 cyber-symbol**: `. * # @ $ % &`

🚫 Invalid if:

* Any other symbols are used (emojis, spaces, unknown glyphs…)
* Any required element is missing

⛔ Every invalid attempt simulates a **trace pulse** — a red warning from the Matrix.

## 📋 User Stories: Your Simulation Objectives

You are building an interface to train rebels to crack the Matrix safely, before uploading breach keys into the real system.

### US-01: Attempt to Breach

**As a Zion User**, I want to enter a password to simulate a Matrix breach attempt.
**Priority**: High

**Acceptance Criteria**:

* A password input is visible
* The UI clearly shows it simulates a Matrix access point

**Test Cases**:
* Field renders and accepts input

### US-02: Real-Time Trace Alerts

**As a Zion User**, I want to receive instant feedback to avoid triggering Agent Smith’s trace protocols.
**Priority**: High

**Acceptance Criteria**:

* Live validation while typing
* Error messages for each rule violation
* Visual trace pulse when rules are broken

**Test Cases**:

* Too short → “Too short”
* Missing uppercase → “Needs at least 1 uppercase”
* Missing lowercase → “Needs at least 1 lowercase”
* Missing number → “Needs at least 1 number”
* Missing cyber-symbol → “Include at least one of . \* # @ \$ % &”
* Forbidden character → “Unauthorized glyph detected!”

### US-03: Show Zion’s Forged Schema

**As a Zion User**, I want to understand all required rules to construct a valid Matrix breach key.
**Priority**: Medium

**Acceptance Criteria**:

* Display a complete list of rules with clarity and style inspired by Zion interfaces

**Test Cases**:
* Rules list is accessible and visible to all rebels

### US-04: Breach Confirmation

**As a Zion User**, I want to know when I’ve successfully crafted a breach key.
**Priority**: Medium

**Acceptance Criteria**:

* “Matrix Breached” or “Access Granted” message
* Success animation is triggered
* UI reflects access granted state

**Test Case**:

* Valid password shows success and transitions UI

### US-05: Accessible Resistance

**As Morpheus**, I want every rebel to train with the tool regardless of their abilities.
**Priority**: High

**Acceptance Criteria**:

* Fully keyboard accessible
* Labels and contrast meet standards
* Motion respects `prefers-reduced-motion`
* Screen-reader-friendly status updates

**Test Cases**:

* Tab navigation works for all interactive elements.
* Color contrast meets minimums.
* Screen readers announce labels and status messages.
* Animation is disabled if `prefers-reduced-motion` is active.

## 🧰 Zion Stack

* **React** — Your interface to the construct
* **Vite** — For instant feedback
* **TypeScript** — To protect you from typing bugs in both worlds
* **Creativity** — Your best defense against Agents

> *“The Matrix is everywhere… Even in your DOM.”*

## 🧑‍💻 Your Mission
1. **Build a breach interface** using the `Zion Stack`.
2. **Validate passwords live** based on strict Matrix rules.
3. **Show all validation criteria clearly.**
4. **Trigger a success state** when a valid password is entered.

## ☕ Reflect
After building your breach simulation, step back from the UI and ask yourself:

1. **Validation Clarity**
    *How did you ensure that each validation message helped the rebel learn, not just fail?*

2. **Cybersecurity & Frontend Logic**
    *You implemented the validation rules in the frontend to simulate the Matrix breach... but what are the risks of relying only on client-side validation in a real-world system?*

3. **Architecture**
    *How would you adapt your architecture if this breach key was being submitted to a real secure endpoint?*

4. **Resistance for All**
    *How can you ensure your interface could be used by any rebel — regardless of ability or device?*