class Ship {
  constructor(ctx, Bullet) {
    this.bullets = [];
    this.bullet = Bullet;
    this.ctx = ctx;
    this.velocity = 3;

    this.body = [{
      x: 0,
      y: this.ctx.canvas.height
    }, {
      x: 20,
      y: this.ctx.canvas.height - 20,
    }, {
      x: 40,
      y: this.ctx.canvas.height,
    }];
    this.draw();
  }
  draw() {
    this.ctx.fillStyle = '#0192d7';
    this.ctx.beginPath();
    this.body.forEach((cell, i) => {
      if (i === 0) {
        this.ctx.moveTo(cell.x, cell.y);
      } else {
        this.ctx.lineTo(cell.x, cell.y);
      }
    });
    this.ctx.fill();
    this.ctx.save();
  }
  perform(action) {
    if (action === 'left' && this.body[0].x > 0) {
      this.body.forEach(cell => cell.x -= this.velocity);
    }
    if (action === 'right' && this.body[2].x < this.ctx.canvas.width) {
      this.body.forEach(cell => cell.x += this.velocity);
    }
    this.draw();
  }
  shoot() {
    return new this.bullet(this.body[1], this.ctx);
  }
}

export default Ship;
