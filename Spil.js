let lastKeyPressed = null;

class Spil {
  constructor(antalMeteorer){
    this.meteorer = [];
    for(let i = 0; i < antalMeteorer; i++){
      this.meteorer.push(new Meteor(random(-500,500), 12, random(10,30), 
      createVector(random(100,width/2), random(100,height-100)), createVector(random(-1,1), random(-1,1)))); 
    }
    this.skibet = new Skib(this.meteorer);
    this.zebra = new Zebro(createVector(width,height), createVector(1.5,1.5), this.meteorer);
    this.octopus = new Octopus(createVector(width/2,height/2), createVector(-1,-1), this.meteorer);
    this.MrBean = new MrBean(createVector(0,0), createVector(-1,-1), this.meteorer);
  }

 update() {
  if (this.meteorer.length == 0 || (demon == 1 && this.meteorer.length == 0 && this.octopus.lifes == 0 && this.MrBean.lifes == 0) || (this.zebra.lives == 0 || this.skibet.life == 0)) {
    reset = 1;
  }
  if (reset == 1) {
    startTimer();
  }
  else {
    stopTimer();
  }
  if (this.meteorer.length == 0 || (demon == 1 && this.meteorer.length == 0 && this.octopus.lifes == 0 && this.MrBean.lifes == 0) || (this.zebra.lives == 0 || this.skibet.life == 0)) {
    slut = 1;
  }
  else {
    slut = 0;
  }
  if (seconds > 2) {
    if (demon == 0 && this.meteorer.length == 0) {
      levels += 1;
      spillet = new Spil(levels * 2); 
    }
    restartGame(); 
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
  if (nuts == 0) {
    score = 0;
  } else {
    score = ((Math.pow(this.skibet.life,2) * Math.pow(this.zebra.lives,2) * Math.pow(mRamt,2)) / nuts + mRamt);
  }
  if (score > highpoints && this.meteorer.length == 0 || demon == 1 && this.octopus.lifes == 0 && this.MrBean.lifes && this.meteorer.length == 0 && score>highpoints) {
    highpoints = highpoints - highpoints + score;
  }
  if(keyIsDown(87) || keyIsDown(65) || keyIsDown(68) || keyIsDown(32) || keyIsDown(83)){
      this.skibet.styrSkib();
      if(deez === 1){
        deez -= 1;
    }
      if(deez > -1){
        mySound.play();
        deez -= 1;
      }
    }
  if (demon == 0 && this.meteorer.length == 0) {
    levels ++;
  }
  this.zebra.update();
  this.skibet.update();
  this.zebra.kollisionSkudKugle(this.skibet.kugler);
  this.skibet.kollisionZebra(this.zebra);
  if (demon == 1 && this.octopus.lifes > 0 || this.MrBean.lifes > 0) {
    if (this.octopus.lifes > 0){
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
 
  drawSpil(){
    if (keyIsDown(78) && demon == 0){
      demon = 1;
      select('body').style('background-color', '#FF0000');
      restartGame();
    }
    if (keyIsDown(77) && demon == 1){
      demon = 0;
      select('body').style('background-color', '#FFFF5C');
      restartGame();
    } 
    if (demon == 1 && this.octopus.lifes > 0)
      this.octopus.tegnOctopus();
    else if (demon == 1 && this.octopus.lifes == 0) 
      this.octopus.lifes == 0;
    if (demon == 1 && this.MrBean.lifes > 0)
      this.MrBean.tegnMrBean();
    else if (demon == 1 && this.MrBean.lifes == 0) 
      this.MrBean.lifes == 0;
    if (this.zebra.lives > 0 && this.skibet.life > 0 && this.meteorer.length > 0)
      this.zebra.tegnZebro();
    else if (this.skibet.life < 1 || this.zebra.lives < 1) {
      push();
      strokeWeight(4);
      textSize(120);
      fill(240,0,0);
      text("GAME OVER", width/2-325, height/2);
      pop();
    }
    if (this.zebra.lives > 0 && this.skibet.life > 0 && this.meteorer.length > 0) 
      this.skibet.drawSkib(); 
      else if (this.skibet.life < 1 || this.zebra.lives < 1) { 
        push();
        strokeWeight(3);
        textSize(120);
        fill(240,0,0);
        text("GAME OVER", width/2-325, height/2);
        textSize(15);
        text("vent 3 sekunder eller tryk på r for nyt spil", width-300, 40);
        pop();
      }
    for(let m of this.meteorer){
       m.drawMeteor();
    }
    if (this.zebra.lives > 0 && this.skibet.life > 0) {
        push();
        textSize(20);
        fill(250,0,0);
        text("Meteorer: " + this.meteorer.length, 20, height-40);
        fill(100,250,100);
        text("Skibets Liv: " + this.skibet.life, 140 , height-40);
        fill(255,100,100);
        text("Zebraens Liv: " + this.zebra.lives, 280, height-40);
        if (demon == 1){
          if (this.octopus.lifes > 0){
            text("Blæksprutens liv: " + this.octopus.lifes, 440, height-40);
          }
          else {
            text("Blæksprutens liv: 0", 440, height-40);
          }
          if (this.MrBean.lifes > 0){
            text("MrBeans liv: " + this.MrBean.lifes, 640, height-40);
          }
          else {
            text("MrBeans liv: 0", 640, height-40);
          }
        }
        fill(100,100,250);
        if ((this.meteorer.length > 0 && this.zebra.lives > 0 && this.skibet.life > 0) || (demon == 1 && (this.meteorer.length > 0 || this.octopus.lifes > 0 || this.MrBean.lifes > 0) && this.skibet.life > 0 && this.zebra.lives > 0)) {
          if (demon == 1){
            text("Beskyt den behattede zebra fra meteorerne, blækspruten og MrBean" , 20, 40);
            text("Demon Mode", 20, 190);
            }
            else if (demon == 0){
              text("Beskyt den behattede zebra fra meteorerne", 20, 40);
            }
          text("Score: " + Number(score.toPrecision(5)), 20, 70);
          text("Highscore: " + Number(highpoints.toPrecision(5)), 20, 100);
          text("Skud brugt: " + nuts, 20, 130);
          text("Meteorer ramt: " + mRamt, 20, 160);
          if (demon == 0){
            text("Level: " + levels, 20, 190);
          }
          textSize(11);
          fill(200,100,100);
          text("w = frem ad" , width-80 , 40);
          text("a = venstre" , width-140, 40);
          text("d = højre" , width-190, 40);
          text("s = baglens", width-255, 40);
          text("space = skyd" , width-325, 40);
          text("p = pause" , width-385, 40);
          text("r = nyt spil", width-445, 40);
          if(demon == 0){
            text("1 = Start fra level 1", width-550, 40);
            text("n = Demon Mode", width-645, 40);
          }
          if(demon == 1){
            text("m = Normal Mode", width-540, 40);
          }
        pop();
      }
    }
    else {
      mySound.stop();
   }
    if (this.meteorer.length === 0 || demon == 1 && this.octopus.lifes === 0 && this.meteorer.length === 0) {
      push();
      textSize(120);
      fill(255, 100, 100);
      text("Victory royal", width/2 - 350, height/2);
      if (demon == 0){
        textSize(24);
        text("Completed Level " + levels, width/2 - 350, height/1.5);
      }
      else {
        textSize(24);
        text("Completed Demon Mode", width/2-350, height/1.5);
      }
      text("Score: " + Number(score.toPrecision(5)), width/2, height/1.5);
      pop();
      return;
    } 
  }
}