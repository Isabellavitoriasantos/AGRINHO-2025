let sunAngle = 0;
let cars = [];
let flowers = [];
let buildings = [];

function setup() {
  createCanvas(800, 400);
  frameRate(30);

  // Inicializa flores fixas
  for (let i = 0; i < 25; i++) {
    flowers.push({
      x: random(20, 380),
      y: random(270, 390),
      petalColor: color(random(255), random(100, 255), random(255))
    });
  }

  // Inicializa prédios fixos
  for (let i = 0; i < 5; i++) {
    let px = 420 + i * 70;
    let ph = random(80, 180);
    buildings.push({ x: px, h: ph });
  }

  // Inicializa carros
  for (let i = 0; i < 3; i++) {
    cars.push({
      x: random(400, 800),
      y: 315 + i * 10,
      color: color(random(255), random(100, 255), random(255)),
      speed: random(1, 2)
    });
  }
}

function draw() {
  drawSky();
  drawSun();
  drawField();
  drawCity();
  drawRoad();
  drawCars();
}

// 🌅 Gradiente de céu
function drawSky() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(135, 206, 250), color(255, 255, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// ☀️ Sol animado
function drawSun() {
  let x = 100, y = 80;
  fill(255, 204, 0);
  noStroke();
  ellipse(x, y, 60, 60);

  stroke(255, 204, 0, 150);
  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    let angle = sunAngle + i * PI / 4;
    let x1 = x + cos(angle) * 40;
    let y1 = y + sin(angle) * 40;
    line(x, y, x1, y1);
  }

  sunAngle += 0.01;
}

// 🌳 Campo com árvores e flores fixas
function drawField() {
  fill(60, 179, 113);
  noStroke();
  rect(0, 250, 400, 150);

  // Árvores
  for (let x = 50; x <= 350; x += 100) {
    drawTree(x, 220);
  }

  // Flores fixas
  for (let f of flowers) {
    drawFlower(f.x, f.y, f.petalColor);
  }
}

// 🌸 Flor com cor definida
function drawFlower(x, y, petalColor) {
  fill(petalColor);
  for (let i = 0; i < 6; i++) {
    ellipse(x + cos(TWO_PI * i / 6) * 5, y + sin(TWO_PI * i / 6) * 5, 6, 6);
  }
  fill(255, 215, 0);
  ellipse(x, y, 6, 6);
}

// 🌲 Árvore com copa cheia
function drawTree(x, y) {
  fill(139, 69, 19);
  rect(x - 5, y, 10, 30);
  fill(34, 139, 34);
  ellipse(x, y - 10, 30, 30);
  ellipse(x - 10, y, 30, 30);
  ellipse(x + 10, y, 30, 30);
}

// 🏙️ Cidade com prédios fixos e torre Eiffel
function drawCity() {
  for (let b of buildings) {
    fill(180);
    rect(b.x, 250 - b.h, 50, b.h);

    // Janelas
    fill(255, 255, 102);
    for (let y = 250 - b.h + 10; y < 250; y += 20) {
      rect(b.x + 10, y, 10, 10);
      rect(b.x + 30, y, 10, 10);
    }
  }

  drawEiffel(750, 180);
}

// 🗼 Torre Eiffel
function drawEiffel(x, y) {
  stroke(60);
  strokeWeight(2);
  line(x, y + 100, x, y);
  line(x - 20, y + 100, x + 20, y + 100);
  line(x - 20, y + 100, x, y);
  line(x + 20, y + 100, x, y);
  line(x - 15, y + 75, x + 15, y + 75);
  line(x - 10, y + 50, x + 10, y + 50);
  line(x - 5, y + 25, x + 5, y + 25);
  noStroke();
}

// 🛣️ Rua
function drawRoad() {
  fill(50);
  rect(400, 300, 400, 50);

  // Faixas
  stroke(255);
  strokeWeight(2);
  for (let x = 410; x < 800; x += 40) {
    line(x, 325, x + 20, 325);
  }
  noStroke();
}

// 🚗 Carros animados
function drawCars() {
  for (let car of cars) {
    fill(car.color);
    rect(car.x, car.y, 40, 20, 5);
    fill(0);
    ellipse(car.x + 10, car.y + 20, 10, 10);
    ellipse(car.x + 30, car.y + 20, 10, 10);

    car.x -= car.speed;
    if (car.x < 400) {
      car.x = width + random(50);
    }
  }
}
