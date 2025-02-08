class Skib {
  constructor(meteorer) {
    this.radius = 12;
    this.vinkelSkib = 9.5;
    this.friktion = 0.98;
    this.position = createVector(width-100, height/2);
    console.log('Position:', this.position.x, this.position.y);
    this.velocity = createVector(0, 0);
    this.meteorer = meteorer;
    this.accel = 3;
    this.life = 3;
    this.skudCounter = 10;
    this.kugler = [];
  }

  update() {
    if (this.skudCounter < 10) {
      this.skudCounter++;
    }
    this.kollisionKant();
    this.kollision();
    for (const k of this.kugler) {
      k.update();
    }
    if (this.accel>-7) {
      this.accel = this.accel * this.friktion;
      this.velocity.x = cos(this.vinkelSkib);
      this.velocity.y = sin(this.vinkelSkib);
      this.velocity.x *= this.accel;
      this.velocity.y *= this.accel;
      this.position.add(this.velocity);
    }        
  }
  drawSkib() {
    for (let i = 0; i< this.kugler.length; i++) {
      const k = this.kugler[i];
      if (k.life>0)
        k.drawKugle();
      else{
        this.kugler.splice(i, 1);
        i--;  
      }
    }
    push();
    translate(this.position.x, this.position.y);
    rotate(this.vinkelSkib);
    fill(50);
    stroke(200, 200, 50);
    strokeWeight(4);
    beginShape();
    vertex(-this.radius, -this.radius);
    vertex(-this.radius+10, 0);
    vertex(-this.radius, this.radius);
    vertex(this.radius, 0);
    endShape(CLOSE);
    pop();
  }

  styrSkib(){
    if(keyIsDown(65)){
      this.vinkelSkib -= 0.05;
    }
    if(keyIsDown(68)){
      this.vinkelSkib += 0.05;
    }
    if(keyIsDown(87) && this.accel < 6){
      this.accel += 1;
    }
    if(keyIsDown(83) && this.accel > -6){
      this.accel -= 1;
    }
    if(keyIsDown(32) && this.skudCounter > 0) {
      this.kugler.push(new Kugle(this.position, this.vinkelSkib));
      this.skudCounter -= 8;
      nuts ++;
    }
  }

  kollisionKant() {
    if (this.position.x < 0) {
      this.vinkelSkib = PI - this.vinkelSkib;
      this.position.x = 20;
      this.accel +=2;
    } else if (this.position.x > width) {
      this.vinkelSkib = PI - this.vinkelSkib;
      this.position.x = width-20;
      this.accel +=2;
    } else if (this.position.y < 0) {
      this.vinkelSkib = PI*2 - this.vinkelSkib;
      this.position.y = 20;
      this.accel +=2;
    } else if (this.position.y > height) {
      this.vinkelSkib = PI*2 - this.vinkelSkib;
      this.position.y = height-20;
      this.accel +=2;
    }
  }

  kollision() {
    for (let i = 0; i< this.meteorer.length; i++) {
      const m = this.meteorer[i];
      const dx = m.position.x - this.position.x;
      const dy = m.position.y - this.position.y;
      const distance = sqrt(dx * dx + dy * dy);
      if (distance < m.radius + this.radius) {
        m.velocity.x *= -1.25;
        m.velocity.y *= -1.25;
        this.accel +=2;
        this.vinkelSkib += 180;
        this.life--;
      } 
      else if (this.kugler.length>0) {
        for (let j = 0; j< this.kugler.length; j++) {
          const k = this.kugler[j];
          const dx = m.position.x - k.position.x;
          const dy = m.position.y - k.position.y;
          const distance = sqrt(dx * dx + dy * dy);
          if (distance < m.radius + k.radius) {
            mRamt ++;
            this.kugler.splice(j, 1); 
            j--;
            if (m.radius > 10) {
              m.radius *= 0.7;
              m.velocity.x *= -1.2;
              m.velocity.y *= -1.2;
              this.meteorer.push(new Meteor(m.roto, m.segmenter, m.radius,
                createVector(m.position.x, m.position.y), createVector(random(-1, 1), random(-1, 1))));
            } else {
              this.meteorer.splice(i, 1);
              i--;
            } 
          }
        }
      }
    }
  }
  kollisionOctopusKugle(kugler) {
    for (let i = 0; i < kugler.length; i++) {
      const k = kugler[i];
      const dx = k.position.x - this.position.x;
      const dy = k.position.y - this.position.y;
      const distance = sqrt(dx * dx + dy * dy);
      if (distance < this.radius + k.radius) {
        this.life--; 
        kugler.splice(i, 1); 
        i--;
      }
    }
  }
  kollisionMrBeansCar(MrBeanCar) {
    for (let i = 0; i < MrBeanCar.length; i++) {
      const k = MrBeanCar[i];
      const dx = k.position.x - this.position.x;
      const dy = k.position.y - this.position.y;
      const distance = sqrt(dx * dx + dy * dy);
      if (distance < this.radius + k.radius) {
        this.life--; 
        MrBeanCar.splice(i, 1); 
        i--;
      }
    }
  }
  kollisionZebra(zebra) {
    const dx = zebra.position.x - this.position.x;
    const dy = zebra.position.y - this.position.y;
    const distance = sqrt(dx * dx + dy * dy);
    if (distance < this.radius + zebra.radius) {
        this.velocity.x *= -2;
        this.velocity.y *= -2;
        zebra.velocity.x *= -2;
        zebra.velocity.y *= -2;
        this.accel -= 2;
    }
  }
}