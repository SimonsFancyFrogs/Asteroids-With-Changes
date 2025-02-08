let spillet;
let c, img, img2, img3, img4;
let isPaused = false;
let mySound;
let score = 0;
let nuts = 0;
let mRamt = 0;
let deez = 1;
let highpoints = 0;
let demon = 0;
let levels = 1;
let reset = 0;
let seconds = 0;
let slut = 0;
let gameStarted = false; 
let intervalId;

function preload() {
  img = loadImage('Zebras are monsters but hat.png');
  img2 = loadImage('jeff.png');
  img3 = loadImage('Mr Bean.png');
  img4 = loadImage('Mr_Bean_Car.png');
  soundFormats('mp3', 'ogg');
  mySound = loadSound("568699_-Hexagon-Force-.mp3");
}

function setup() {
  c = createCanvas(windowWidth - 100, windowHeight - 100);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  c.position(x, y);  
  select('body').style('background-color', '#FFFF5C');
  showStartScreen();
}

function draw() {
  if (!gameStarted) {
    showStartScreen();
  } else {
    if (!isPaused) {
      fill(0, 0, 0, 100);
      strokeWeight(16);
      stroke(240, 240, 240);
      rect(0, 0, width, height);
      spillet.update();
      spillet.drawSpil();
    } else {
      push();
      fill(255, 0, 0, 150);
      textSize(50);
      textAlign(CENTER, CENTER);
      text("PAUSE", width / 2, height / 2);
      pop();
    }
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
    if (!gameStarted) {
      showStartScreen();
    }
    if (!isPaused) {
      draw();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 100, windowHeight - 100);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  c.position(x, y);
}

function keyPressed() {
  if (keyIsDown(80) && slut == 0) { 
    Pause();
    push();
    mySound.stop();
    deez = 1;
    pop();
  }
  if (keyIsDown(13) && !gameStarted) { 
    startGame();
  }
  if (keyIsDown(82)) {
    restartGame();
    push();
    deez = 1;
    mySound.stop();
    pop();
  }
  if (keyIsDown(70)) {
    mousePressed();
  }
  if (keyIsDown(188)) {
    showStartScreen();
    gameStarted = false;
    mySound.stop();
    deez = 1;
  }
  if (keyIsDown(49)) {
    levels = 1;
    startGame();
  }
}

function startGame() {
  if (demon == 0) {
    spillet = new Spil(levels*2); 
  }
  if (demon == 1) {
    spillet = new Spil(12);
  }
  gameStarted = true;
  isPaused = false;
  startTimer();
}

function restartGame() {
  console.log("Spillet genstartes...");
  nuts = 0;
  score = 0;
  mRamt = 0;
  seconds = 0;
  reset = 0;
  startGame(); 
}

function Pause() {
  isPaused = !isPaused; 
  console.log(isPaused ? "Spillet er pauset" : "Spillet er genoptaget");
}

function showStartScreen() {
  background(150, 200, 225); 
  push();
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Velkommen til asteroids med ændringer", width / 2, height / 3);
  textSize(20);
  text("Tryk på ENTER for at starte", width / 2, height / 2);
  text("F for fuld skærkm", width/2, height/2 + 30);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("W", width / 2, height / 1.5 + 20);
  text("A", width / 2 - 25, height / 1.5 + 40);
  text("S", width / 2, height / 1.5 + 40);
  text("D", width / 2 + 25, height / 1.5 + 40);
  text("SPACE = Skyd", width / 2, height / 1.5 + 60);
  text("P for at pause spillet", width/2 + 75, height/1.5);
  text("R for at starte forfra", width/2 - 75, height/1.5);
  pop();
}

function startTimer() {
  if (!intervalId) {
    intervalId = setInterval(() => {
      seconds++;
    }, 1000);
  }
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}