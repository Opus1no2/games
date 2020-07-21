class Bullet {
  constructor(start, ctx) {
    this.ctx = ctx;
    this.x = start.x;
    this.y = start.y;
    this.w = 5;
    this.h = 5;
    this.velocity = 5;
    this.inPlay = true;
  }
  draw() {
    this.y -= this.velocity;
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(this.x, this.y, this.h, this.w);
    this.ctx.restore();
    if (this.y < 0) { this.inPlay = false }
  }
}

export default Bullet;
