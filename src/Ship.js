// simple factory for Ship
export default function Ship(length) {
  let hits = 0;

  function hit() {
    if (hits < length) hits += 1;
    return hits;
  }

  function isSunk() {
    return hits >= length;
  }

  function getLength() {
    return length;
  }

  function getHits() {
    return hits;
  }

  return { hit, isSunk, getLength, getHits };
}