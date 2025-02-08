class Kugle{
  constructor(pos, vinkel){
    this.position = createVector(pos.x, pos.y);
    this.velocity = createVector(0,0);
    this.kugleVinkel = vinkel;
    this.radius = 7;
    this.accel = 8;
    this.life = 150;
  }
  update(){
    this.velocity.x = cos(this.kugleVinkel);
    this.velocity.y = sin(this.kugleVinkel);
    this.velocity.x *= this.accel;
    this.velocity.y *= this.accel;
    this.position.add(this.velocity)
    this.life--;
  }
  
  drawKugle(){
    fill(255,70,30);
    noStroke();
    circle(this.position.x, this.position.y, this.radius);
  }
}