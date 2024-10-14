class Sudoku6x6 {
  constructor() {
    this.grid = Array(6)
      .fill()
      .map(() => Array(6).fill(0));
  }

  isValid(num, pos) {
    const [row, col] = pos;

    // Check row
    if (this.grid[row].includes(num)) return false;

    // Check column
    if (this.grid.map((r) => r[col]).includes(num)) return false;

    // Check box
    const boxX = Math.floor(col / 3) * 3;
    const boxY = Math.floor(row / 2) * 2;
    for (let i = boxY; i < boxY + 2; i++) {
      for (let j = boxX; j < boxX + 3; j++) {
        if (this.grid[i][j] === num) return false;
      }
    }

    return true;
  }

  solve() {
    const empty = this.findEmpty();
    if (!empty) return true;

    const [row, col] = empty;
    for (let num = 1; num <= 6; num++) {
      if (this.isValid(num, [row, col])) {
        this.grid[row][col] = num;
        if (this.solve()) return true;
        this.grid[row][col] = 0;
      }
    }

    return false;
  }

  findEmpty() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.grid[i][j] === 0) return [i, j];
      }
    }
    return null;
  }

  generate() {
    this.fillBox(0, 0);
    this.fillBox(4, 3);
    this.solve();
    this.removeNumbers();
  }

  template() {
    this.grid = [
      [1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2],
      [3, 3, 3, 3, 3, 3],
      [4, 4, 4, 4, 4, 4],
      [5, 5, 5, 5, 5, 5],
      [6, 6, 6, 6, 6, 6],
    ];
  }

  fillBox(row, col) {
    const nums = [1, 2, 3, 4, 5, 6];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        const index = Math.floor(Math.random() * nums.length);
        this.grid[row + i][col + j] = nums[index];
        nums.splice(index, 1);
      }
    }
  }

  removeNumbers() {
    const cells = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        cells.push([i, j]);
      }
    }
    for (let i = 0; i < 20; i++) {
      const index = Math.floor(Math.random() * cells.length);
      const [row, col] = cells[index];
      this.grid[row][col] = 0;
      cells.splice(index, 1);
    }
  }
}

function generateSudoku({ images }) {
  const sudoku = new Sudoku6x6();
  sudoku.generate();
  displaySudoku({ grid: sudoku.grid, images });
}

function generateTemplate({ images }) {
  const sudoku = new Sudoku6x6();
  sudoku.template();
  displaySudoku({ grid: sudoku.grid, images });
}

function displaySudoku({ grid, images }) {
  const table = document.getElementById("sudoku-grid");
  table.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    row.className = "row";
    for (let j = 0; j < 6; j++) {
      const cell = row.insertCell();
      cell.className = "cell";
      const digit = grid[i][j];
      if (digit > 0 && images && images.length >= digit) {
        const img = new Image();
        img.src = images[digit - 1];
        img.className = "clue";
        cell.appendChild(img);
      } else {
        console.log(digit);
        const img = new Image();
        img.className = "clue";
        img.src = "./empty.png";
        cell.appendChild(img);
      }
    }
  }
}
