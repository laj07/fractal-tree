# Fractal Tree

An interactive generative art piece built with [p5.js](https://p5js.org/).

A recursive tree that responds to your mouse and breathes with a slow wind animation. No two moments look quite the same.

## Controls

| Input | Effect |
|-------|--------|
| **Move mouse left/right** | Change branching angle (narrow ↔ wide canopy) |
| **Move mouse up/down** | Control branch length decay (tall ↔ bushy) |
| **Click** | Toggle between night and day palettes |

## 🚀 Running it

Open `index.html` in a browser.

```bash
# Option 1: just open the file
open index.html

# Option 2: serve locally (recommended for live-reload)
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## 🧠 How it works

The tree is drawn recursively. Each call to `branch()` draws two (sometimes three) child branches at a given angle, then calls itself with a shorter length and incremented depth. Recursion stops when either the branch is too short or the max depth is reached.

Key ideas:
- **Mouse-driven angle** — `map(mouseX, 0, width, 10, 45)` translates cursor position into a branching angle
- **Mouse-driven decay** — `map(mouseY, 0, height, 0.85, 0.6)` controls how fast branches shrink per level
- **Wind sway** — `sin(frameCount)` drives a slow oscillating offset applied per recursion level
- **Colour progression** — HSB colour shifts from warm brown at the trunk to green at the tips

## 📁 Structure

```
fractal-tree/
├── index.html        # Entry point
├── src/
│   └── sketch.js     # p5.js sketch
└── README.md
```

## 📜 Credits & Licence

Inspired by [Dan Shiffman's Recursive Tree](https://processing.org/examples/tree.html) and the [p5.js Recursive Tree example](https://p5js.org/examples/repetition-recursive-tree/). This version adds wind animation, dual palettes, mouse-Y length control, and a fuller canopy via mid-branches.

