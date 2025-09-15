import Gameboard from './Gameboard.js';

export default function Player({ name = 'Player', isComputer = false } = {}) {
  const gameboard = Gameboard();
  const attempted = new Set(); // record of attacked coords (for computer)

  function attack(opponentGameboard, x, y) {
    return opponentGameboard.receiveAttack(x, y);
  }

  function randomAttack(opponentGameboard) {
    if (!isComputer) throw new Error('randomAttack only for computer players');
    const size = opponentGameboard.size;
    // pick random legal coordinate
    let tries = 0;
    while (tries < size * size) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      const key = `${x},${y}`;
      if (!attempted.has(key)) {
        attempted.add(key);
        return opponentGameboard.receiveAttack(x, y);
      }
      tries += 1;
    }
    return null; // board exhausted
  }

  return { name, isComputer, gameboard, attack, randomAttack, attempted };
}
