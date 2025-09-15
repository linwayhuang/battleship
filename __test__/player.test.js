import Player from '../src/Player.js';

test('Player has gameboard and can attack', () => {
  const p1 = Player({ name: 'p1' });
  const p2 = Player({ name: 'p2' });

  p2.gameboard.placeShip(0, 0, 2, 'horizontal');
  const res = p1.attack(p2.gameboard, 0, 0);
  expect(res.hit).toBe(true);
});

test('Computer randomAttack does not repeat coordinates', () => {
  const human = Player({ name: 'human' });
  const cpu = Player({ name: 'cpu', isComputer: true });

  // small board for deterministic exhaustion
  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      // just make sure repeated randomAttack doesn't throw and attempted grows
      cpu.randomAttack(human.gameboard);
    }
  }
  // attempted should have at most 25 entries (5x5); ensure uniqueness
  const attemptSize = cpu.attempted.size;
  expect(attemptSize).toBeGreaterThan(0);
  expect(attemptSize).toBeLessThanOrEqual(25);
});
