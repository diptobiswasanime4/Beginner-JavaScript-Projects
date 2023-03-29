class Sprite {
  constructor({ position, velocity, color, health }) {
    this.height = 100;
    this.width = 30;
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.health = health;
    this.lastKey;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y > canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}
