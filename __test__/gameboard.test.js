import Gameboard from '../src/Gameboard.js';

test('placeShip places ship and gameboard registers hits and misses', () => {
  const gb = Gameboard(5);
  const s = gb.placeShip(0, 0, 2, 'horizontal');
  // attack a ship coordinate
  const res1 = gb.receiveAttack(0, 0);
  expect(res1.hit).toBe(true);
  // attack same coord again should return null (already attacked)
  const resAgain = gb.receiveAttack(0, 0);
  expect(resAgain).toBeNull();

  // attack miss
  const res2 = gb.receiveAttack(4, 4);
  expect(res2.hit).toBe(false);
  const misses = gb.getMisses();
  expect(misses).toEqual(expect.arrayContaining([{ x: 4, y: 4 }]));
});

test('allShipsSunk returns true when all ships are sunk', () => {
  const gb = Gameboard(5);
  gb.placeShip(0, 0, 2, 'horizontal');
  gb.placeShip(2, 2, 3, 'vertical');

  // sink first ship
  gb.receiveAttack(0, 0);
  gb.receiveAttack(1, 0);

  // not all sunk yet
  expect(gb.allShipsSunk()).toBe(false);

  // sink second ship
  gb.receiveAttack(2, 2);
  gb.receiveAttack(2, 3);
  gb.receiveAttack(2, 4);

  expect(gb.allShipsSunk()).toBe(true);
});
