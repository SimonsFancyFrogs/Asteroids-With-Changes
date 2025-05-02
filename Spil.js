class Spil {
  constructor(antalMeteorer) {
    this.meteorer = [];
    for (let i = 0; i < antalMeteorer; i++) {
      this.meteorer.push(new Meteor(
        random(-500, 500),
        12,
        random(10, 30),
        createVector(random(100, width - 100), random(100, height - 100)),
        createVector(random(-1, 1), random(-1, 1))
      ));
    }

    this.skibet = new Skib(this.meteorer);
    this.zebra = new Zebro(createVector(width, height), createVector(1.5, 1.5), this.meteorer);
    this.octopus = new Octopus(createVector(width / 2, height / 2), createVector(-1, -1), this.meteorer);
    this.MrBean = new MrBean(createVector(0, 0), createVector(-1, -1), this.meteorer);

    this.powerUps = [];
    this.spawnPowerUp();

    this.victory = false;
    this.finalScore = 0;

    this.textPositions = {
      metoerer: { x: 10, y: height - 40 },
      skibetsLiv: { x: 130, y: height - 40 },
      zebraensLiv: { x: 265, y: height - 40 },
      blaeksprutensLiv: { x: 410, y: height - 40 },
      mrBeansLiv: { x: 595, y: height - 40 },
      beskytZebra: { x: 10, y: 30 },
      score: { x: 10, y: 60 },
      highscore: { x: 10, y: 90 },
      skudBrugt: { x: 10, y: 120 },
      metoererRamt: { x: 10, y: 150 },
      level: { x: 10, y: 180 },
      demonMode: { x: 10, y: 180 },
      startside: { x: width - 255, y: 15 },
      level1: { x: width - 210, y: 35 },
      logud: { x: width - 205, y: 55 }
    };

    window.addEventListener('resize', this.updateTextPositions.bind(this));
  }

  updateTextPositions() {
    this.textPositions = {
      metoerer: { x: 10, y: height - 40 },
      skibetsLiv: { x: 130, y: height - 40 },
      zebraensLiv: { x: 265, y: height - 40 },
      blaeksprutensLiv: { x: 410, y: height - 40 },
      mrBeansLiv: { x: 595, y: height - 40 },
      beskytZebra: { x: 10, y: 30 },
      score: { x: 10, y: 60 },
      highscore: { x: 10, y: 90 },
      skudBrugt: { x: 10, y: 120 },
      metoererRamt: { x: 10, y: 150 },
      level: { x: 10, y: 180 },
      demonMode: { x: 10, y: 180 },
      startside: { x: width - 255, y: 15 },
      level1: { x: width - 210, y: 35 },
      logud: { x: width - 205, y: 55 },
    };
  }

  update() {
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];
      const dx = powerUp.position.x - this.skibet.position.x;
      const dy = powerUp.position.y - this.skibet.position.y;
      const distance = sqrt(dx * dx + dy * dy);

      if (distance < powerUp.radius + this.skibet.radius) {
        powerUp.applyEffect(this.skibet); // Anvend effekt
        this.powerUps.splice(i, 1); // Fjern power-up efter brug
      }
    }
    
    if (
      this.meteorer.length == 0 ||
      (demon == 1 && this.meteorer.length == 0 && this.octopus.lifes == 0 && this.MrBean.lifes == 0) ||
      (this.zebra.lives == 0 || this.skibet.life == 0)
    ) {
      reset = 1;
    }

    if (reset == 1) {
      startTimer();
    } else {
      stopTimer();
    }

    if (seconds > 2) {
      if (demon == 0 && this.meteorer.length == 0) {
        levels += 1;
        spillet = new Spil(levels * 2);
      }
      restartGame();
    }

    if (
      this.meteorer.length == 0 ||
      (demon == 1 && this.meteorer.length == 0 && this.octopus.lifes == 0 && this.MrBean.lifes == 0) ||
      (this.zebra.lives == 0 || this.skibet.life == 0)
    ) {
      slut = 1;
    } else {
      slut = 0;
    }

    if (demon == 1 && this.octopus.lifes > 0) {
      this.octopus.update();
    }

    if (demon == 1 && this.MrBean.lifes > 0) {
      this.MrBean.update();
    }

    if (frameCount % 100 === 0 && demon == 1) {
      this.octopus.shoot();
      this.MrBean.shoot();
    }

    if (!this.victory) {
      if (nuts == 0) {
        score = 0;
      } else {
        score = ((Math.pow(this.skibet.life, 2) * Math.pow(this.zebra.lives, 2) * Math.pow(mRamt, 2)) / nuts + mRamt);
      }
    }

    if (keyIsDown(87) || keyIsDown(65) || keyIsDown(68) || keyIsDown(32) || keyIsDown(83)) {
      this.skibet.styrSkib();
      if (deez === 1) {
        deez -= 1;
      }
      if (deez > -1) {
        mySound.play();
        deez -= 1;
      }
    }

    this.zebra.update();
    this.skibet.update();
    this.zebra.kollisionSkudKugle(this.skibet.kugler);
    this.skibet.kollisionZebra(this.zebra);

    if (demon == 1 && this.octopus.lifes > 0 || this.MrBean.lifes > 0) {
      if (this.octopus.lifes > 0) {
        this.zebra.kollisionOctopusKugle(this.octopus.kugler);
        this.octopus.kollisionSkudKugle(this.skibet.kugler);
        this.skibet.kollisionOctopusKugle(this.octopus.kugler);
      }
      if (this.MrBean.lifes > 0) {
        this.skibet.kollisionMrBeansCar(this.MrBean.MrBeanCar);
        this.MrBean.kollisionSkudKugle(this.skibet.kugler);
        this.zebra.kollisionMrBeansCar(this.MrBean.MrBeanCar);
      }
    }

    for (let m of this.meteorer) {
      m.update();
    }
  }

  drawSpil() {
    for (let powerUp of this.powerUps) {
      powerUp.drawPowerUp();
    }
    
    // Change background color based on key presses
    if (keyIsDown(78) && demon == 1) { // N key
      demon = 0;
      deez = 1;
      mySound.stop();
      select('body').style('background-color', 'FFFF5C');
      restartGame();
    }

    if (keyIsDown(77) && demon == 0) { // M key
      demon = 1;
      deez = 1;
      mySound.stop();
      select('body').style('background-color', '#FF0000');
      restartGame();
    }

    // Add additional key checks for other background colors if needed
    if (keyIsDown(65)) { // A key
      select('body').style('background-color', '#00FF00'); // Green
    } else if (keyIsDown(68)) { // D key
      select('body').style('background-color', '#0000FF'); // Blue
    } else if (keyIsDown(87)) { // W key
      select('body').style('background-color', '#FFFF00'); // Yellow
    } else if (keyIsDown(83)) { // S key
      select('body').style('background-color', '#FF00FF'); // Magenta
    }

    if (demon == 1 && this.octopus.lifes > 0) {
      this.octopus.tegnOctopus();
    } else if (demon == 1 && this.octopus.lifes == 0) {
      this.octopus.lifes = 0;
    }

    if (demon == 1 && this.MrBean.lifes > 0) {
      this.MrBean.tegnMrBean();
    } else if (demon == 1 && this.MrBean.lifes == 0) {
      this.MrBean.lifes = 0;
    }

    if (this.zebra.lives > 0 && this.skibet.life > 0 && this.meteorer.length > 0) {
      this.zebra.tegnZebro();
    } else if (this.skibet.life < 1 || this.zebra.lives < 1) {
      push();
      strokeWeight(4);
      textSize(120);
      fill(240, 0, 0);
      textAlign(CENTER, CENTER);
      text("GAME OVER", width / 2, height / 2);
      textSize(15);
      textAlign(CENTER, CENTER);
      text("Vent 3 sekunder eller tryk på R for nyt spil", width / 2, height / 2 + 100);
      pop();
    }

    if (this.zebra.lives > 0 && this.skibet.life > 0 && this.meteorer.length > 0) {
      this.skibet.drawSkib();
    } else if (this.skibet.life < 1 || this.zebra.lives < 1) {
      push();
      strokeWeight(3);
      textSize(120);
      fill(240, 0, 0);
      textAlign(CENTER, CENTER);
      text("GAME OVER", width / 2, height / 2);
      textSize(15);
      text("Vent 3 sekunder eller tryk på R for nyt spil", width / 2, height / 2 + 100);
      pop();
    }

    for (let m of this.meteorer) {
      m.drawMeteor();
    }

    if (!this.victory && this.zebra.lives > 0 && this.skibet.life > 0) {
      push();
      textSize(20);
      fill(250, 0, 0);
      textAlign(LEFT, TOP);
      text("Meteorer: " + this.meteorer.length, this.textPositions.metoerer.x, this.textPositions.metoerer.y);
      fill(100, 250, 100);
      text("Skibets Liv: " + this.skibet.life, this.textPositions.skibetsLiv.x, this.textPositions.skibetsLiv.y);
      fill(255, 100, 100);
      text("Zebraens Liv: " + this.zebra.lives, this.textPositions.zebraensLiv.x, this.textPositions.zebraensLiv.y);
      if (demon == 1) {
        if (this.octopus.lifes > 0) {
          text("Blæksprutens liv: " + this.octopus.lifes, this.textPositions.blaeksprutensLiv.x, this.textPositions.blaeksprutensLiv.y);
        } else {
          text("Blæksprutens liv: 0", this.textPositions.blaeksprutensLiv.x, this.textPositions.blaeksprutensLiv.y);
        }
        if (this.MrBean.lifes > 0) {
          text("MrBeans liv: " + this.MrBean.lifes, this.textPositions.mrBeansLiv.x, this.textPositions.mrBeansLiv.y);
        } else {
          text("MrBeans liv: 0", this.textPositions.mrBeansLiv.x, this.textPositions.mrBeansLiv.y);
        }
      }
      pop();
      push();
      textSize(20);
      fill(100, 100, 250);
      textAlign(LEFT, TOP);
      if (
        (this.meteorer.length > 0 && this.zebra.lives > 0 && this.skibet.life > 0) ||
        (demon == 1 && (this.meteorer.length > 0 || this.octopus.lifes > 0 || this.MrBean.lifes > 0) &&
          this.skibet.life > 0 && this.zebra.lives > 0)
      ) {
        if (demon == 1) {
          text("Beskyt den behattede zebra fra meteorerne, blækspruten og MrBean", this.textPositions.beskytZebra.x, this.textPositions.beskytZebra.y);
          text("Demon Mode", this.textPositions.demonMode.x, this.textPositions.demonMode.y);
        } else if (demon == 0) {
          text("Beskyt den behattede zebra fra meteorerne", this.textPositions.beskytZebra.x, this.textPositions.beskytZebra.y);
        }
        text("Score: " + Number(score.toPrecision(5)), this.textPositions.score.x, this.textPositions.score.y);
        text("Highscore: " + Number(highpoints.toPrecision(5)), this.textPositions.highscore.x, this.textPositions.highscore.y);
        text("Skud brugt: " + nuts, this.textPositions.skudBrugt.x, this.textPositions.skudBrugt.y);
        text("Meteorer ramt: " + mRamt, this.textPositions.metoererRamt.x, this.textPositions.metoererRamt.y);
        if (demon == 0) {
          text("Level: " + levels, this.textPositions.level.x, this.textPositions.level.y);
          textSize(11);
          text("For at starte fra level 1 tryk på '1' tasten", this.textPositions.level1.x, this.textPositions.level1.y);
        }
        pop();
        push();
        textSize(11);
        fill(100, 100, 250);
        textAlign(LEFT, TOP);
        text("For at komme til startside tryk på 'komma' tasten", this.textPositions.startside.x, this.textPositions.startside.y);
        if (InLogged == 1) {
          text("Gå tilbage til startsiden for at logge ud", this.textPositions.logud.x, this.textPositions.logud.y);
        }
        pop();
      }
    } else {
      mySound.stop();
      deez = 1;
    }

    if (this.meteorer.length === 0 ||
      demon == 1 && this.octopus.lifes === 0 && this.meteorer.length === 0) {
      this.victory = true;
      this.finalScore = score;
      if (this.finalScore > highpoints) {
        highpoints = this.finalScore;
      }
      push();
      textSize(120);
      fill(255, 100, 100);
      textAlign(CENTER, CENTER);
      text("Victory royal", width / 2, height / 2);
      if (demon == 0) {
        textSize(24);
        text("Vent 3 sekunder eller tryk på r for næste level", width / 2, height / 2 + 50);
        textAlign(RIGHT, CENTER);
        text("Completed Level " + levels, width / 2 + 200, height / 2 + 100);
        textAlign(LEFT, CENTER);
        text("Score: " + Number(this.finalScore.toPrecision(5)), width / 2 - 200, height / 2 + 100);
      } else {
        textSize(24);
        textAlign(RIGHT, CENTER);
        text("Completed Demon Mode", width / 2 + 100, height / 2 + 100);
        textAlign(LEFT, CENTER);
        text("Score: " + Number(this.finalScore.toPrecision(5)), width / 2 - 100, height / 2 + 100);
      }
      pop();
      return;
    }
  }
  
  spawnPowerUp() {
    setInterval(() => {
      if (this.powerUps.length < 5) { // Begræns til max 5 power-ups
        const types = ["shield", "extraLife", "speedBoost"];
        const randomType = random(types);
        const randomPos = createVector(random(50, width - 50), random(50, height - 50));
        this.powerUps.push(new PowerUp(randomPos, randomType));
      }
    }, 10000);
  }
}
