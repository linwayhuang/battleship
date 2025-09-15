import Ship from "./Ship";

export default function Gameboard(size = 10) {
  // board represented as object mapping "x,y" to either ship reference or null
  const ships = []; // list of { ship, coords: [ {x,y}, ... ] }
  const misses = new Set();
  const hits = new Set();

  function placeShip(startX, startY, length, orientation = 'horizontal') {
    const coords = [];
    for (let i = 0; i < length; i += 1) {
      const x = startX + (orientation === 'horizontal' ? i : 0);
      const y = startY + (orientation === 'vertical' ? i : 0);
      if (x < 0 || x >= size || y < 0 || y >= size) {
        throw new Error('Ship placement out of bounds');
      }
      // check overlap
      if (ships.some(s => s.coords.some(c => c.x === x && c.y === y))) {
        throw new Error('Ship overlap');
      }
      coords.push({ x, y });
    }
    const ship = Ship(length);
    ships.push({ ship, coords });
    return { ship, coords };
  }

  function receiveAttack(x, y) {
    // check if already attacked
    const key = `${x},${y}`;
    if (misses.has(key) || hits.has(key)) return null; // already attacked

    // find ship occupying the coord
    const target = ships.find(s => s.coords.some(c => c.x === x && c.y === y));
    if (target) {
      target.ship.hit();
      hits.add(key);
      return { hit: true, ship: target.ship, coords: { x, y } };
    }
    misses.add(key);
    return { hit: false, coords: { x, y } };
  }

  function allShipsSunk() {
    return ships.every(s => s.ship.isSunk());
  }

  function getMisses() {
    return Array.from(misses).map(str => {
      const [x, y] = str.split(',').map(Number);
      return { x, y };
    });
  }

  function getHits() {
    return Array.from(hits).map(str => {
      const [x, y] = str.split(',').map(Number);
      return { x, y };
    });
  }

  function getShips() {
    // expose minimal info for rendering or testing
    return ships.map(s => ({
      length: s.ship.getLength(),
      hits: s.ship.getHits(),
      coords: s.coords
    }));
  }

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    getMisses,
    getHits,
    getShips,
    size
  };
}
