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
let startScreen = 1; 
let InLogged = 0;
let gameStarted = false; 
let intervalId;
let username = '';

function preload() {
  img = loadImage('Zebras are monsters but hat.png');
  img2 = loadImage('jeff.png');
  img3 = loadImage('Mr Bean.png');
  img4 = loadImage('Mr_Bean_Car.png');
  soundFormats('mp3', 'ogg');
  mySound = loadSound("568699_-Hexagon-Force-.mp3");
}

function setup() {
  const gameContainer = document.getElementById('game-container');
  c = createCanvas(windowWidth - 100, windowHeight - 100);
  c.parent(gameContainer); 
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  c.position(x, y);
  select('body').style('background-color', '#FFFA1D');

  if (username) {
    levels = parseInt(localStorage.getItem(`${username}_levels`)) || 1;
    highpoints = parseInt(localStorage.getItem(`${username}_highpoints`)) || 0;
  } else {
    levels = 1;
    highpoints = 0;
  }
  startScreen = 1;
  gameStarted = false;
  console.log("Setup completed. Start screen:", startScreen, "Game started:", gameStarted);
}

window.startGameAfterLogin = function(user) {
  console.log("Starting game after login...");
  username = user;
  levels = parseInt(localStorage.getItem(`${username}_levels`)) || 1;
  highpoints = parseInt(localStorage.getItem(`${username}_highpoints`)) || 0;
  InLogged = 1; 
  startGame();
}

window.addEventListener('beforeunload', function() {
  if (username) {
    localStorage.setItem(`${username}_levels`, levels);
    localStorage.setItem(`${username}_highpoints`, highpoints);
  }
});

function draw() {
  background(0); 
  if (!gameStarted) {
    if (startScreen === 1) {
      showStartScreen();
    }
  } else {
    if (!isPaused) {
      fill(0, 0, 0, 100);
      strokeWeight(16);
      stroke(240, 240, 240);
      rect(0, 0, width, height);
      spillet.update();
      spillet.drawSpil();
      fill(255);
      textSize(16);
      textAlign(LEFT, TOP);
      text(username, 10, 10); 
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

function showStartScreen() {
  background(255);
  push();
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Velkommen til asteroids med ændringer", width / 2, height / 3);
  textSize(20);
  if (InLogged === 0) {
    text("Tryk på ENTER for at starte spillet", width / 2, height / 2 - 30);
    text("F for fuld skærm", width / 2, height / 2);
    text("L for at logge ind eller lave en account", width / 2, height / 2 + 30);
  } else if (InLogged === 1) {
    text("Tryk på ENTER for at starte", width / 2, height / 2 - 30);
    text("F for fuld skærm", width / 2, height / 2);
    text("L for at logge ud", width / 2, height / 2 + 30);
    textSize(16);
    textAlign(LEFT, TOP);
    text(username, 10, 10); 
  }
  textSize(12);
  textAlign(CENTER, CENTER);
  text("W", width / 2, height / 1.5 + 20);
  text("A", width / 2 - 25, height / 1.5 + 40);
  text("S", width / 2, height / 1.5 + 40);
  text("D", width / 2 + 25, height / 1.5 + 40);
  text("SPACE = Skyd", width / 2, height / 1.5 + 60);
  text("P for at pause spillet", width / 2 + 75, height / 1.5);
  text("R for at starte forfra", width / 2 - 75, height / 1.5);
  text("M = Demon Mode & N = Normal Mode", width / 2, height / 1.5 - 20);
  text("Reload siden hvis spillet crasher", width - 100, 15);
  pop();
}

function showLoginScreen() {
  window.showLoginScreen();
}

function keyPressed() {
  console.log(`Key pressed: ${keyCode}`);
  if (!gameStarted) {
    if (keyCode === ENTER) {
      console.log("ENTER key pressed on start screen");
      startGame();
    }
  } else {
    if (keyCode === 80 && slut === 0) {  
      Pause();
      push();
      mySound.stop();
      deez = 1;
      pop();
    }
    if (keyCode === 82) { 
      restartGame();
      push();
      deez = 1;
      mySound.stop();
      pop();
    }
    if (keyCode === 188) {  
      startScreen = 1;
      gameStarted = false;
      showStartScreen();
      mySound.stop();
      deez = 1;
      demon = 0;
      if (InLogged == 0) {
        InLogged = 0;
      }
      select('body').style('background-color', '#FFFF5C');
    }
  }
  if (keyCode === 76 && !gameStarted) {  
    if (InLogged === 0) {
      startScreen = 0;
      gameStarted = false;
      showLoginScreen();
    }
    else if (InLogged === 1) {
      InLogged = 0;
      showStartScreen();
      alert('Du er nu logget ud');
    }
  }
  if (keyCode === 70 && (startScreen == 1 || gameStarted)) { 
    toggleFullScreen();
  }
  if (keyCode === 49) {
    levels = 1;
    restartGame();
    mySound.stop();
  }
}

function startGame() {
  console.log("Starting game...");
  if (demon === 0) {
    spillet = new Spil(levels * 2); 
  } else if (demon === 1) {
    spillet = new Spil(12);
  }
  gameStarted = true;
  isPaused = false;
  startScreen = 0; 
  console.log("Game started. Start screen:", startScreen, "Game started:", gameStarted);
  startTimer();
}

function restartGame() {
  console.log("Restarting game...");
  nuts = 0;
  score = 0;
  mRamt = 0;
  seconds = 0;
  reset = 0;
  startGame(); 
}

function Pause() {
  isPaused = !isPaused; 
  console.log(isPaused ? "Game paused" : "Game resumed");
}

function startTimer() {
  if (!intervalId) {
    intervalId = setInterval(() => {
      seconds++;
    }, 1000);
    console.log("Timer started");
  }
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Timer stopped");
  }
}

window.startGameAfterLogin = function(user) {
  console.log("Starting game after login...");
  levels = parseInt(localStorage.getItem('levels')) || 1;
  highpoints = parseInt(localStorage.getItem('highpoints')) || 0;
  username = user;
  InLogged = 1; 
  startGame();
}

window.addEventListener('beforeunload', function() {
  localStorage.setItem('levels', levels);
  localStorage.setItem('highpoints', highpoints);
});

function toggleFullScreen() {
  let fs = fullscreen();
  fullscreen(!fs);
  console.log("Fullscreen status:", fullscreen());
}

function mousePressed() {
  if ((gameStarted || startScreen == 1) && mouseX > 0 && mouseX < windowWidth && mouseY > 0 && windowY < windowHeight) {  
    toggleFullScreen();
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 100, windowHeight - 100);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  c.position(x, y);
}

document.addEventListener('DOMContentLoaded', () => {
  if (startScreen === 1) {
    showStartScreen();
  } else {
    showLoginScreen();
  }
});
