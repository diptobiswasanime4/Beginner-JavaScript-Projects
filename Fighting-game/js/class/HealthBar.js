class HealthBar {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.totalHealth = 200;
    this.playerHealth = this.player.health;
    this.enemyHealth = this.enemy.health;
    this.totalHealthColor = "black";
    this.healthColor = "red";
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.totalHealthColor;
    ctx.fillRect(canvas.width / 2 - 20, 20, -200, 20);
    ctx.fillRect(canvas.width / 2 + 20, 20, 200, 20);
    ctx.fillStyle = this.healthColor;
    ctx.fillRect(canvas.width / 2 - 20, 20, -this.playerHealth, 20);
    ctx.fillRect(canvas.width / 2 + 20, 20, this.enemyHealth, 20);
  }
  update() {
    this.draw();
  }
}
