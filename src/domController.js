// Minimal DOM controller — returns data structures rather than coupling logic heavily to DOM
export function renderBoard(containerEl, boardData) {
  // boardData: { size, ships, hits, misses } or a Gameboard instance
  // This is intentionally minimal to separate logic and DOM
  containerEl.innerHTML = ''; // clear
  const size = boardData.size || 10;
  const table = document.createElement('table');
  table.classList.add('battleship-board');
  for (let y = 0; y < size; y += 1) {
    const row = document.createElement('tr');
    for (let x = 0; x < size; x += 1) {
      const cell = document.createElement('td');
      cell.dataset.x = x;
      cell.dataset.y = y;
      // If boardData provides getHits/getMisses we can mark them
      if (typeof boardData.getHits === 'function') {
        const hits = boardData.getHits().some(c => c.x === x && c.y === y);
        if (hits) cell.classList.add('hit');
      }
      if (typeof boardData.getMisses === 'function') {
        const misses = boardData.getMisses().some(c => c.x === x && c.y === y);
        if (misses) cell.classList.add('miss');
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  containerEl.appendChild(table);
}
