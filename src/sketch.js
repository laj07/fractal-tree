/**
 * Fractal Tree — interactive generative art
 *
 * Mouse X  → controls branching angle
 * Mouse Y  → controls branch length decay
 * Click    → toggle day / night palette
 *
 * Built with p5.js
 */

let palette = "night"; // "night" | "day"
let windAngle = 0;
let windTarget = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  // Soft sky gradient background
  drawBackground();

  // Gentle wind sway (independent of mouse)
  windTarget = sin(frameCount * 0.5) * 4;
  windAngle = lerp(windAngle, windTarget, 0.05);

  // Map mouse to controls
  const branchAngle = map(mouseX, 0, width, 10, 45);
  const lengthDecay = map(mouseY, 0, height, 0.85, 0.6);

  translate(width / 2, height);

  // Draw ground shadow
  drawTrunk(branchAngle, lengthDecay);
}

function drawBackground() {
  if (palette === "night") {
    // Deep blue-black gradient
    for (let y = 0; y < height; y++) {
      const t = y / height;
      const h = lerp(240, 260, t);
      const b = lerp(10, 4, t);
      stroke(h, 60, b);
      line(0, y, width, y);
    }
  } else {
    // Warm sky gradient
    for (let y = 0; y < height; y++) {
      const t = y / height;
      const h = lerp(200, 180, t);
      const s = lerp(40, 20, t);
      const b = lerp(95, 85, t);
      stroke(h, s, b);
      line(0, y, width, y);
    }
  }
}

function drawTrunk(angle, decay) {
  const trunkLen = height * 0.22;
  strokeWeight(12);
  const trunkHue = palette === "night" ? 30 : 25;
  stroke(trunkHue, 55, 45);
  line(0, 0, 0, -trunkLen);
  translate(0, -trunkLen);
  branch(trunkLen, angle, decay, 0, 12);
}

/**
 * Recursive branch function
 * @param {number} len      current branch length
 * @param {number} angle    branching angle (from mouse)
 * @param {number} decay    length decay per level (from mouse)
 * @param {number} level    current recursion depth
 * @param {number} maxDepth stop recursing below this
 */
function branch(len, angle, decay, level, maxDepth) {
  if (len < 4 || level >= maxDepth) return;

  const nextLen = len * decay;
  const w = map(len, 4, height * 0.22, 1, 10);
  strokeWeight(w);

  // Hue shifts from warm brown → cool green → vivid tips
  const hue = map(level, 0, maxDepth, palette === "night" ? 30 : 25, palette === "night" ? 150 : 120);
  const sat = map(level, 0, maxDepth, 50, 80);
  const bri = map(level, 0, maxDepth, 40, 90);
  const alpha = map(level, 0, maxDepth, 100, 75);
  stroke(hue, sat, bri, alpha);

  // Right branch
  push();
  rotate(angle + windAngle * (level * 0.3));
  line(0, 0, 0, -nextLen);
  translate(0, -nextLen);
  branch(nextLen, angle, decay, level + 1, maxDepth);
  pop();

  // Left branch
  push();
  rotate(-angle + windAngle * (level * 0.3));
  line(0, 0, 0, -nextLen);
  translate(0, -nextLen);
  branch(nextLen, angle, decay, level + 1, maxDepth);
  pop();

  // Optional middle branch on early levels for fuller canopy
  if (level < 4) {
    push();
    rotate(windAngle * (level * 0.15));
    line(0, 0, 0, -nextLen * 0.9);
    translate(0, -nextLen * 0.9);
    branch(nextLen * 0.9, angle, decay, level + 2, maxDepth);
    pop();
  }
}

function mousePressed() {
  palette = palette === "night" ? "day" : "night";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
