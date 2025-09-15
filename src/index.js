import Player from './Player.js';
import { renderBoard } from './domController.js';

// simple app bootstrap for manual testing (not used in unit tests)
const human = Player({ name: 'Human', isComputer: false });
const computer = Player({ name: 'Computer', isComputer: true });

// place some preset ships for quick manual run
human.gameboard.placeShip(0, 0, 5, 'horizontal');
computer.gameboard.placeShip(0, 0, 5, 'horizontal');

// DOM wiring (if present)
document.addEventListener('DOMContentLoaded', () => {
  const humanEl = document.getElementById('human-board');
  const computerEl = document.getElementById('computer-board');
  if (humanEl) renderBoard(humanEl, human.gameboard);
  if (computerEl) renderBoard(computerEl, computer.gameboard);
});

export { human, computer };
