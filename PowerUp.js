class PowerUp {
    constructor(pos, type) {
      this.position = pos;
      this.type = type; // "shield", "extraLife", "speedBoost"
      this.radius = 20;
      this.active = true;
    }
  
    drawPowerUp() {
      if (this.type === "shield") {
        fill(0, 255, 0); // Grøn farve for skjold
      } else if (this.type === "extraLife") {
        fill(0, 0, 255); // Blå farve for ekstra liv
      } else if (this.type === "speedBoost") {
        fill(255, 255, 0); // Gul farve for hastighedsboost
      }
      circle(this.position.x, this.position.y, this.radius * 2);
    }
  
    applyEffect(target) {
        if (this.type === "shield") {
          target.shieldActive = true;
          setTimeout(() => target.shieldActive = false, 5000);
        } else if (this.type === "extraLife") {
          target.life++;
        } else if (this.type === "speedBoost") {
          target.accel *= 1.5;
          setTimeout(() => target.accel /= 1.5, 5000);
        }
        this.active = false;
      }
  }