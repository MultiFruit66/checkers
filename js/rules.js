const rules = {
  isCursorInCell(e, cell) {
    const x = e.offsetX
    const y = e.offsetY

    return x > cell.x && x < cell.x + canvasSize / 8 && y > cell.y && y < cell.y + canvasSize / 8
  },

  nextPas() {
    countOfPas += 1
    colorOfPas = countOfPas % 2 ? 'red' : 'green'
    console.log(countOfPas, colorOfPas)
  },

  checkAllMoves() {
    const moveTo = countOfPas % 2 ? 1 : -1
    
    board.forEach(checker => {
      checker.hasMove = false

      checker.lines.forEach(line => {
        if (checker.color === colorOfPas && line[line.indexOf(checker) + moveTo] && !line[ line.indexOf(checker) + moveTo ].color) {
          checker.hasMove = true
        } 
        else if (checker.color === colorOfPas && checker.isQueen && line[line.indexOf(checker) - moveTo] && !line[ line.indexOf(checker) - moveTo ].color) {
          checker.hasMove = true
        }
      })
    })
  },

  makeActive(e) {
    board.forEach(checker => {
      if (this.isCursorInCell(e, checker) && checker.hasMove) {
        board.forEach(cell => cell.isActive = false)
        checker.isActive = true
      }
    })
  },

  movesForActive() {
    const moveTo = countOfPas % 2 ? 1 : -1
    const active = board.find(checker => checker.isActive)

    board.forEach(cell => {
      if (!cell.color) {
        cell.hasMove = false
      }
    })

    active.lines.forEach(line => {
      if (line[line.indexOf(active) + moveTo] && !line[ line.indexOf(active) + moveTo ].color) {
        line[line.indexOf(active) + moveTo].hasMove = true
      } 
    })
  },

  moveChecker(e) {
    let moveIsDone = false

    board.forEach(empty => {
      if (this.isCursorInCell(e, empty) && empty.hasMove && !empty.color) {
        const active = board.find(active => active.isActive)

        empty.color = active.color
        empty.queen = active.color
        active.color = false
        active.color = false

        moveIsDone = true
      }
    })
    return moveIsDone
  },

  checkAllAttacks() {
    const queens = board.filter(cell => cell.color === colorOfPas && cell.isQueen)
    const simples = board.filter(cell => cell.color === colorOfPas && !cell.isQueen)

    queens.forEach(queen => {
      queen.lines.forEach(line => line)
    })
  }
}