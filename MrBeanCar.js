class MrBeanCar{
  constructor(pos, vinkel){
    this.position = createVector(pos.x, pos.y);
    this.velocity = createVector(0,0);
    this.MrBeanCarVinkel = vinkel;
    this.radius = 50;
    this.accel = 8;
    this.life = 150;
  }
  update(){
    this.velocity.x = cos(this.MrBeanCarVinkel);
    this.velocity.y = sin(this.MrBeanCarVinkel);
    this.velocity.x *= this.accel;
    this.velocity.y *= this.accel;
    this.position.add(this.velocity)
    this.life--;
  }
  
  drawMrBeansCar(){
    image(img4, this.position.x, this.position.y, this.radius);
  }
}