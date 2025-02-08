class MrBean {
  constructor(posit, veloc, meteorer) {
   this.meteorer = meteorer;
   this.radius = 55;
   this.position = posit;
   this.velocity = veloc;
   if (demon == 1){
    this.lifes = 10;
   }
   else if (demon == 0){
    this.lifes = 0;
   }
   this.MrBeanCar = []; 
   this.angle = 0; 
  }
  
  tegnMrBean() {
    image(img3, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
    for (const MrBeanCar of this.MrBeanCar) {
    MrBeanCar.drawMrBeansCar();
    }
  }
  
  update() {
    this.angle += 0.05;
    this.position.x += Math.sin(this.angle) * 2;
    this.position.add(this.velocity);
    this.kollisionKant();
    if (frameCount % 100 === 0) {
      this.shoot();
    }
    for (const MrBeanCar of this.MrBeanCar) {
      MrBeanCar.update();
   }
   this.MrBeanCar = this.MrBeanCar.filter(MrBeanCar => MrBeanCar.life > 0);
  }
  
  shoot() {
    const directions = [
      PI * 0.25,
      PI * 0.5,
      PI * 0.75,
      PI,
      PI * 1.25,
      PI * 1.5,
      PI * 1.75,
      PI * 2,
      ];
    for (const vinkel of directions) {
    this.MrBeanCar.push(new MrBeanCar(this.position, vinkel));
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