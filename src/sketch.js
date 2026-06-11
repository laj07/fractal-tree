/**
 * Fractal Tree — interactive generative art
 *
 * Mouse X  → branching angle
 * Mouse Y  → branch length decay
 * Click    → toggle day / night palette
 */

let palette = "night";
let windAngle = 0;
let windTarget = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  drawBackground();

  windTarget = sin(frameCount * 0.5) * 3;
  windAngle = lerp(windAngle, windTarget, 0.05);

  const branchAngle = map(mouseX, 0, width, 12, 40);
  const lengthDecay = map(mouseY, 0, height, 0.78, 0.62);

  translate(width / 2, height);

  // Trunk
  const trunkLen = height * 0.18;
  strokeWeight(10);
  stroke(25, 50, 35);
  line(0, 0, 0, -trunkLen);
  translate(0, -trunkLen);

  branch(trunkLen, branchAngle, lengthDecay, 0, 11);
}

function drawBackground() {
  background(palette === "night" ? color(240, 40, 6) : color(195, 25, 96));
}

// Rainbow hues per level — vivid and spread out
const HUES = [28, 55, 90, 140, 175, 200, 240, 280, 320, 0, 45];

function branch(len, angle, decay, level, maxDepth) {
  if (len < 5 || level >= maxDepth) return;

  const nextLen = len * decay;
  const w = map(level, 0, maxDepth, 8, 0.8);
  strokeWeight(w);

  const hue = HUES[level % HUES.length];
  const sat = 85;
  const bri = map(level, 0, maxDepth, 70, 100);
  stroke(hue, sat, bri, 95);

  const wind = windAngle * (level * 0.25);

  // Right
  push();
  rotate(angle + wind);
  line(0, 0, 0, -nextLen);
  translate(0, -nextLen);
  branch(nextLen, angle, decay, level + 1, maxDepth);
  pop();

  // Left
  push();
  rotate(-angle + wind);
  line(0, 0, 0, -nextLen);
  translate(0, -nextLen);
  branch(nextLen, angle, decay, level + 1, maxDepth);
  pop();
}

function mousePressed() {
  palette = palette === "night" ? "day" : "night";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
