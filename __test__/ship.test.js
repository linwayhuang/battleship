import Ship from '../src/Ship.js';

test('Ship records hits and reports sunk correctly', () => {
  const ship = Ship(3);
  expect(ship.getLength()).toBe(3);
  expect(ship.getHits()).toBe(0);
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.getHits()).toBe(1);
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  ship.hit();
  expect(ship.getHits()).toBe(3);
  expect(ship.isSunk()).toBe(true);

  // additional hits shouldn't increase beyond length
  ship.hit();
  expect(ship.getHits()).toBe(3);
});
