const rules = {
  isCursorInCell(e, cell) {
    const x = e.offsetX
    const y = e.offsetY

    return x > cell.x && x < cell.x + canvasSize / 8 
        && y > cell.y && y < cell.y + canvasSize / 8
  },


  nextPas() {
    countOfPas += 1
    colorOfPas = countOfPas % 2 ? 'red' : 'green'
    colorOfEnemy = countOfPas % 2 ? 'green' : 'red'
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
        empty.queen = active.queen
        active.color = false
        active.queen = false

        moveIsDone = true
      }
    })
    return moveIsDone
  },


  checkAllAttacks() {
    mustBeAttack = false

    board.forEach(checker => {
      checker.lines.forEach(line => {
        if (checker.color === colorOfPas && (line[line.indexOf(checker) + 2] && line[line.indexOf(checker) + 1].color === colorOfEnemy && !line[line.indexOf(checker) + 2].color
        || line[line.indexOf(checker) - 2] && line[line.indexOf(checker) - 1].color === colorOfEnemy && !line[line.indexOf(checker) - 2].color)) {

          if (!mustBeAttack) {
            board.forEach(cell => cell.hasMove = false)
          }

          checker.hasMove = true
          mustBeAttack = true
        }
      })
    })
    return mustBeAttack
  },


  attacksForActive() {
    const active = board.find(checker => checker.isActive)
    let areAttacks = false

    board.forEach(cell => {
      if (!cell.color) {
        cell.hasMove = false
      }
    })

    active.lines.forEach(line => {
      if (line[line.indexOf(active) + 2] && line[line.indexOf(active) + 1].color === colorOfEnemy && !line[line.indexOf(active) + 2].color) {
        line[line.indexOf(active) + 2].hasMove = true
        areAttacks = true
      } 
      if (line[line.indexOf(active) - 2] && line[line.indexOf(active) - 1].color === colorOfEnemy && !line[line.indexOf(active) - 2].color) {
        line[line.indexOf(active) - 2].hasMove = true
        areAttacks = true
      } 
    })
    return areAttacks
  },


  attackChecker(e) {
    let attackIsDone = false

    board.forEach(empty => {
      if (this.isCursorInCell(e, empty) && empty.hasMove && !empty.color) {

        const active = board.find(active => active.isActive)
        const line = active.lines.find(line => ~line.indexOf(empty))
        const enemy = line[ (line.indexOf(active) + line.indexOf(empty)) / 2 ]

        empty.color = active.color
        empty.queen = active.queen
        empty.isActive = true
        enemy.color = false
        enemy.queen = false
        active.color = false
        active.queen = false
        active.isActive = false

        attackIsDone = true
      }
    })
    return attackIsDone
  },

  checkChangingToQueen() {
    board.forEach((cell, index) => {
      if (index < 4 && cell.color === 'green') {
        cell.isQueen = true
      }
      else if (index > 27 && cell.color === 'red') {
        cell.isQueen = true
      }
    })
  }
}