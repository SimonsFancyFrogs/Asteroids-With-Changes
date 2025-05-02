class Skib {
  constructor(meteorer) {
    this.radius = 12;
    this.vinkelSkib = 9.5;
    this.friktion = 0.98;
    this.position = createVector(width - 100, height / 2);
    console.log('Position:', this.position.x, this.position.y);
    this.velocity = createVector(0, 0);
    this.meteorer = meteorer;
    this.accel = 3;
    this.life = 3; // Antal liv
    this.shieldActive = false; // Skjold indikator
    this.speedBoostActive = false; // Hastighedsboost indikator
    this.invulnerable = false; // Invulnerabilitet indikator
    this.skudCounter = 10;
    this.kugler = [];
  }

  update() {
    if (this.skudCounter < 10) {
      this.skudCounter++;
    }

    if (this.speedBoostActive) {
      this.accel = Math.min(this.accel * 1.1, 8); // Max boost
    } else {
      this.accel = Math.max(this.accel * this.friktion, -7); // Normal friktion
    }

    this.kollisionKant();
    this.kollision();

    for (const k of this.kugler) {
      k.update();
    }

    this.velocity.x = cos(this.vinkelSkib) * this.accel;
    this.velocity.y = sin(this.vinkelSkib) * this.accel;
    this.position.add(this.velocity);
  }

  drawSkib() {
    // Tegn kugler
    for (let i = 0; i < this.kugler.length; i++) {
      const k = this.kugler[i];
      if (k.life > 0) {
        k.drawKugle();
      } else {
        this.kugler.splice(i, 1);
        i--;
      }
    }

    // Tegn skib
    push();
    translate(this.position.x, this.position.y);
    rotate(this.vinkelSkib);
    if (this.shieldActive) {
      stroke(0, 0, 255); // Blå farve for skjold
      strokeWeight(6);
      noFill();
      circle(0, 0, this.radius * 2 + 8); // Ekstra cirkel for skjold
    }
    fill(50);
    stroke(200, 200, 50);
    strokeWeight(4);
    beginShape();
    vertex(-this.radius, -this.radius);
    vertex(-this.radius + 10, 0);
    vertex(-this.radius, this.radius);
    vertex(this.radius, 0);
    endShape(CLOSE);
    pop();
  }

  styrSkib() {
    if (keyIsDown(65)) {
      this.vinkelSkib -= 0.05;
    }
    if (keyIsDown(68)) {
      this.vinkelSkib += 0.05;
    }
    if (keyIsDown(87)) { 
      this.accel = Math.min(this.accel + 0.5, 6);
    }
    if (keyIsDown(83)) { 
      this.accel = Math.max(this.accel - 0.5, -6);
    }
    if (keyIsDown(32) && this.skudCounter > 0) { // Space-tasten
      this.kugler.push(new Kugle(this.position, this.vinkelSkib));
      this.skudCounter -= 8;
      nuts++; // Globale skudtæller
    }
  }

  styrMedMusen() {
    const musPos = createVector(mouseX, mouseY);
    const retning = p5.Vector.sub(musPos, this.position);
    this.vinkelSkib = retning.heading();
    this.position = musPos;
  }

  kollisionKant() {
    // Reflekter skibet ved kanterne
    if (this.position.x < 0) {
      this.vinkelSkib = PI - this.vinkelSkib;
      this.position.x = 20;
    } else if (this.position.x > width) {
      this.vinkelSkib = PI - this.vinkelSkib;
      this.position.x = width - 20;
    } else if (this.position.y < 0) {
      this.vinkelSkib = TWO_PI - this.vinkelSkib;
      this.position.y = 20;
    } else if (this.position.y > height) {
      this.vinkelSkib = TWO_PI - this.vinkelSkib;
      this.position.y = height - 20;
    }
  }

  kollision() {
    for (let i = 0; i < this.meteorer.length; i++) {
      const m = this.meteorer[i];
      const dx = m.position.x - this.position.x;
      const dy = m.position.y - this.position.y;
      const distance = sqrt(dx * dx + dy * dy);
      const minDistance = m.radius + this.radius;

      // Skibets kollision med meteorer
      if (distance < minDistance) {
        if (!this.shieldActive && !this.invulnerable) { // Kun hvis skjoldet ikke er aktivt og invulnerabilitet ikke er aktiv
          this.life--;
          this.invulnerable = true; // Aktiver midlertidig invulnerabilitet
          setTimeout(() => {
            this.invulnerable = false;
          }, 1000); // Invulnerabilitet varer 1 sekund
        }

        // Reflekter skibet og meteoren
        const collisionNormal = p5.Vector.sub(this.position, m.position).normalize();
        this.velocity = p5.Vector.reflect(this.velocity, collisionNormal).mult(0.5);
        m.velocity = p5.Vector.reflect(m.velocity, collisionNormal).mult(1.25);

        // Flyt skib og meteor væk for at undgå overlap
        const overlap = minDistance - distance;
        const correction = collisionNormal.copy().mult(overlap / 2);
        this.position.add(correction);
        m.position.sub(correction);
      }

      // Kuglernes kollision med meteorer
      for (let j = 0; j < this.kugler.length; j++) {
        const k = this.kugler[j];
        const dxk = m.position.x - k.position.x;
        const dyk = m.position.y - k.position.y;
        const distanceK = sqrt(dxk * dxk + dyk * dyk);
        const minDistanceK = m.radius + k.radius;

        if (distanceK < minDistanceK) {
          mRamt++; // Globale tæller for meteorer ramt
          this.kugler.splice(j, 1); // Fjern kuglen
          j--;

          if (m.radius > 10) {
            m.radius = m.radius * 0.7
            this.meteorer.push(new Meteor(m.roto, m.segmenter, m.radius, m.position.copy(), m.velocity));
          } else {
            // Fjern meteoren, hvis den er for lille til at splittes yderligere
            this.meteorer.splice(i, 1);
            i--;
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
        if (!this.shieldActive) {
          this.life--;
        }
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
        if (!this.shieldActive) {
          this.life--;
        }
        MrBeanCar.splice(i, 1);
        i--;
      }
    }
  }

  kollisionZebra(zebra) {
    const diff = p5.Vector.sub(zebra.position, this.position);
    const distance = diff.mag();
    const minDist = this.radius + zebra.radius;

    if (distance < minDist) {
      let normal = diff.copy().normalize();
      const overlap = minDist - distance;
      const correction = normal.copy().mult(overlap / 2);
      this.position.sub(correction);
      zebra.position.add(correction);
      const dot1 = this.velocity.dot(normal);
      const dot2 = zebra.velocity.dot(normal);
      const restitution = 0.8;
      const impulse = (dot1 - dot2) * (1 + restitution);
      this.velocity.sub(normal.copy().mult(impulse));
      zebra.velocity.add(normal.copy().mult(impulse));
      this.accel = this.velocity.mag();
    }
  }

  aktiverSkjold() {
    this.shieldActive = true;
    setTimeout(() => {
      this.shieldActive = false;
    }, 5000); // Skjold varer i 5 sekunder
  }

  aktiverHastighedsboost() {
    this.speedBoostActive = true;
    setTimeout(() => {
      this.speedBoostActive = false;
    }, 5000); // Boost varer i 5 sekunder
  }
}
