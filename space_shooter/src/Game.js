class Game {
  constructor(ctx, ship, Enemy) {
    this.score = 0;
    this.ctx = ctx;
    this.ctx.save();
    this.ship = ship;
    this.action = null;

    this.gameOver = false;
    this.gameStarted = null;

    this.activeBullets = [];
    this.activeEnemies = [];
    this.lastEnemyWave = null;
    this.enemy = Enemy;

    this.initEventListeners();
  }
  initEventListeners() {
    const left = document.querySelector('[data-el="left"]');
    const right = document.querySelector('[data-el="right"]');
    const shoot = document.querySelector('[data-el="shoot"]');

    document.addEventListener('click', () => {
      if (this.gameStarted) return
      this.gameStarted = Date.now();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.gameStarted) this.gameStarted = Date.now();

      if (e.key === 'ArrowLeft') this.action = 'left';
      if (e.key === 'ArrowRight') this.action = 'right';
      if (e.key === 'ArrowUp') this.activeBullets.push(this.ship.shoot());
    });

    left.addEventListener('click', () => this.action = 'left');
    right.addEventListener('click', () => this.action = 'right');
    shoot.addEventListener('click', () => {
      this.activeBullets.push(this.ship.shoot());
    });
  }
  deployEnemy() {
    const diff = Date.now() - this.gameStarted;
    const millis = Math.floor(diff / 1000);

    if (millis > 3 && !this.lastEnemyWave) {
      this.lastEnemyWave = Date.now();
      this.activeEnemies.push(new this.enemy(this.ctx));
    }

    if (this.lastEnemyWave) {
      const diff = Date.now() - this.lastEnemyWave;
      const millis = Math.floor(diff / 1000);

      if (millis > 3) {
        this.lastEnemyWave = Date.now();
        this.activeEnemies.push(new this.enemy(this.ctx));
      }
    }
  }
  cleanUpEnemies() {
    this.activeEnemies.forEach((enemy) => {
      if (enemy.y >= this.ctx.canvas.height) {
        enemy.inPlay = false;
      }
    });
  }
  handleCollision() {
    this.activeBullets.forEach((bullet) => {
      this.activeEnemies.forEach((enemy) => {
        const xDiff = bullet.x - enemy.x;
        const yDiff = bullet.y - enemy.y;

        // What is 11?
        if ((xDiff < 11 && xDiff > -11) && yDiff <= 0) {
          this.score++;
          this.renderScore();
          enemy.inPlay = false;
        }
      });
    });
    // how do I detect collision between enemy and player?
    this.activeEnemies.forEach((enemy) => {
      const bottomLeft = { x: enemy.x, y: enemy.y + enemy.h };
      const bottomRight = { x: enemy.x + enemy.w, y: enemy.y + enemy.h };
      const withinXRange = bottomLeft.x > this.ship.body[0].x && bottomLeft.x < this.ship.body[2].x;

      if (withinXRange) {
        console.log('x range');
      }
    });
  }
  renderScore() {
    const scoreEl = document.querySelector('[data-el="score"]');
    scoreEl.innerHTML = this.score;
  }
  init() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    let _id = requestAnimationFrame(this.init.bind(this));

    if (!this.gameStarted) { return }

    if (this.gameOver) {
      cancelAnimationFrame(_id);
    }

    this.deployEnemy();
    this.cleanUpEnemies();

    this.activeBullets = this.activeBullets.filter(b => b.inPlay);
    this.activeBullets.forEach(b => b.draw());

    this.activeEnemies = this.activeEnemies.filter(e => e.inPlay);
    this.activeEnemies.forEach(e => e.draw());

    this.handleCollision();
    this.ship.perform(this.action);
  }
}

export default Game;
