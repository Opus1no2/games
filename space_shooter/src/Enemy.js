class Enemy {
  constructor(ctx) {
    this.inPlay = true;
    this.ctx = ctx;
    this.x = Math.floor(Math.random() * this.ctx.canvas.width);
    this.y = 0;
    this.h = 15;
    this.w = 15;
    this.velocity = 2;
    this.draw();
  }
  draw() {
    this.y += this.velocity;
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.h, this.w);
    this.ctx.save();
    if (this.y < 0) { this.inPlay = false }
  }
}

export default Enemy;
