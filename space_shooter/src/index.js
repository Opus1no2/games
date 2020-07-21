import './styles/index.scss';
import Game from './Game';
import Bullet from './Bullet';
import Ship from './Ship';
import Enemy from './Enemy';

document.addEventListener('DOMContentLoaded', () => {
  const controls = document.querySelector('[data-el="controls"]');
  const board = document.getElementById('board');
  const ctx = board.getContext('2d');
  const boardWidth = window.innerWidth - 20;
  ctx.canvas.width = boardWidth;
  ctx.canvas.height = boardWidth;
  controls.style = `width: ${boardWidth}px`;
  window._ctx = ctx;
  const ship = new Ship(ctx, Bullet);
  const game = new Game(ctx, ship, Enemy);
  game.init();
});
