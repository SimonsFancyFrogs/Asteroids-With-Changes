class Octopus {
  constructor(posit, veloc, meteorer) {
   this.meteorer = meteorer;
   this.radius = 60;
   this.position = posit;
   this.velocity = veloc;
   if (demon == 1){
    this.lifes = 10;
   }
   else if(demon == 0){
    this.lifes = 0;
   }
   this.kugler = []; 
   this.angle = 0; 
  }
  
  tegnOctopus() {
    image(img2, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
    for (const kugle of this.kugler) {
    kugle.drawKugle();
    }
  }
  
  update() {
   this.angle += 0.05;
   this.position.x += Math.sin(this.angle) * 5; // Flytter i et sinusmønster
   this.position.add(this.velocity);
   this.kollisionKant();
   for (const kugle of this.kugler) {
   kugle.update();
   }
   this.kugler = this.kugler.filter(kugle => kugle.life > 0);
  }
  
  shoot() {
    const directions = [
      0, 
      PI * 0.1, 
      PI * 0.2,
      PI * 0.3,
      PI * 0.4,
      PI * 0.5,
      PI * 0.6,
      PI * 0.7,
      PI * 0.8,
      PI * 0.9,
      PI,
      PI * 1.1,
      PI * 1.2,
      PI * 1.3,
      PI * 1.4,
      PI * 1.5,
      PI * 1.6,
      PI * 1.7,
      PI * 1.8,
      PI * 1.9,
      ];
    for (const vinkel of directions) {
    this.kugler.push(new Kugle(this.position, vinkel));
    }
  }
  
  kollisionKant() {
    if (this.position.x < 0) {
     this.velocity.x *= -1;
     this.position.x = 10;
    } else if (this.position.x > width) {
       this.velocity.x *= -1;
       this.position.x = width - 10;
      } else if (this.position.y < 0) {
         this.velocity.y *= -1;
         this.position.y = 10;
      }  else if (this.position.y > height) {
          this.velocity.y *= -1;
          this.position.y = height - 10;
      }
    }
  
  kollision() {
    for (let i = 0; i < this.meteorer.length; i++) {
      const m = this.meteorer[i];
      const dx = m.position.x - this.position.x;
      const dy = m.position.y - this.position.y;
      const distance = sqrt(dx * dx + dy * dy);
      if (distance < m.radius + this.radius) {
       this.velocity.x *= -1;
       this.velocity.y *= -1;
       m.velocity.x *= -1;
       m.velocity.y *= -1;
       this.lifes--;
      }
    }
  }
  
  kollisionSkudKugle(kugler) {
    for (let i = 0; i< kugler.length; i++) {
      const k = kugler[i];
      const dx = k.position.x - this.position.x;
      const dy = k.position.y - this.position.y;
      const distance = sqrt(dx * dx + dy * dy);
      if (distance < this.radius + k.radius) {
        this.velocity.x *= -1;
        this.velocity.y *= -1;
        this.lifes --;
        kugler.splice(i, 1); 
        i--;
        }
      }
    }
  }