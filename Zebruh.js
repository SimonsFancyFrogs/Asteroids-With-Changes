class Zebro{
  constructor(posi,velo, meteorer){
    this.meteorer = meteorer;
    this.radius = 60;
    this.position = posi;
    this.velocity = velo;
    this.lives = 4;
  }

  tegnZebro(){
    image(img, this.position.x-this.radius, this.position.y-this.radius,this.radius*2,this.radius*2);
  }
  
  update() {
    this.position.add(this.velocity);
    this.kollisionKant();
    this.kollision();
    if (this.velocity.x > 2 || this.velocity.x < -2) {
      this.velocity.x = 1.5 * Math.sign(this.velocity.x); 
    }
    if (this.velocity.y > 2 || this.velocity.y < -2) {
      this.velocity.y = 1.5 * Math.sign(this.velocity.y); 
    }
  }  
  
  kollisionKant() {
    if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 10;
    } else if (this.position.x > width) {
      this.velocity.x *= -1;
      this.position.x = width-10;
    } else if (this.position.y < 0) {
      this.velocity.y *= -1;
      this.position.y = 10;
    } else if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height-10;
    }
  }
 
  kollision() {   
    for (let i = 0; i< this.meteorer.length; i++) {
      const m = this.meteorer[i];
      const dx = m.position.x - this.position.x;
      const dy = m.position.y - this.position.y;
      const distance = sqrt(dx * dx + dy * dy);
      if (distance < m.radius + this.radius) {
        this.velocity.x *= -1;
        this.velocity.y *= -1;
        m.velocity.x *= -1;
        m.velocity.y *= -1;
        this.accel *=2;
        this.vinkel +=180;
        this.lives -- ;
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
      this.lives --;
      kugler.splice(i, 1); 
      i--;
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
        this.lives--; // Reducer Zebraens liv
        kugler.splice(i, 1); // Fjern kuglen
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
}