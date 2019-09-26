const rules = {
  isCursorInCell(e, cell) {
    const x = e.offsetX
    const y = e.offsetY

    return x > cell.x && x < cell.x + canvasSize / 8 
        && y > cell.y && y < cell.y + canvasSize / 8
  },


  checkAllMoves() {
    const moveTo = countOfPas % 2 ? 1 : -1
    let hasMoves = false
    
    board.forEach(checker => {
      checker.hasMove = false

      checker.lines.forEach(line => {
        if (checker.color === colorOfPas && line[line.indexOf(checker) + moveTo] && !line[ line.indexOf(checker) + moveTo ].color) {
          checker.hasMove = true
          hasMoves = true
        } 
        else if (checker.color === colorOfPas && checker.isQueen && line[line.indexOf(checker) - moveTo] && !line[ line.indexOf(checker) - moveTo ].color) {
          checker.hasMove = true
          hasMoves = true
        }
      })
    })
    return hasMoves
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

      if (active.isQueen) {
        const index = line.indexOf(active)

        for (let i = index + 1; i < line.length; ++i) {
          !line[i].color ? line[i].hasMove = true : i = line.length
        }
        for (let i = index - 1; i >= 0; --i) {
          !line[i].color ? line[i].hasMove = true : i = -1
        }
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

  nextPas() {
    countOfPas += 1
    colorOfPas = countOfPas % 2 ? 'red' : 'green'
    colorOfEnemy = countOfPas % 2 ? 'green' : 'red'
  },

  checkAllAttacks() {
    mustBeAttack = false

    board.forEach(checker => {
      checker.lines.forEach(line => {
        const index = line.indexOf(checker)

        if (checker.color === colorOfPas && !checker.isQueen) {
          if (line[index + 2] && line[index + 1].color === colorOfEnemy && !line[index + 2].color
          ||  line[index - 2] && line[index - 1].color === colorOfEnemy && !line[index - 2].color) {

            if (!mustBeAttack) {
              board.forEach(cell => cell.hasMove = false)
            }

            checker.hasMove = true
            mustBeAttack = true
          }
        }

        if (checker.color === colorOfPas && checker.isQueen) {

          const findQueenAttack = (regexp) => {
            let attackLine = line.map(cell => cell.color).join(' ').match(regexp)

            if (attackLine) {
              attackLine = attackLine[0].trim().split(' ').map(cell => cell === 'false' ? false : cell)

              if (attackLine.every((cell, i) => line[i + index] && cell === line[i + index].color) 
              || attackLine.reverse().every((cell, i) => line[index - i] && cell === line[index - i].color)) {
                if (!mustBeAttack) {
                  board.forEach(cell => cell.hasMove = false)
                }
  
                checker.hasMove = true
                mustBeAttack = true
              }
            }
          }

          findQueenAttack(new RegExp(`(${colorOfPas})\\s(false\\s)*${colorOfEnemy}\\s(false\\s?)+`, 'g'))
          findQueenAttack(new RegExp(`(false\\s)+${colorOfEnemy}\\s(false\\s)*${colorOfPas}\\s?`, 'g'))
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

    if (!active.isQueen) {
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
    } else {
      active.lines.forEach(line => {
        
        const findQueenAttacks = (regexp, exp) => {
          let attackLine = line.map(cell => cell.color).join(' ').match(regexp)

          if (attackLine) {
            attackLine = attackLine[0].trim().split(' ').map(cell => cell === 'false' ? false : cell)
    
            if (attackLine.every((cell, i) => line[i + line.indexOf(active)] && cell === line[i + line.indexOf(active)].color)
            || attackLine.reverse().every((cell, i) => line[line.indexOf(active) - i] && cell === line[line.indexOf(active) - i].color)) {
              for (let i = attackLine.length - 1; i >= 0; --i) {
                if (!line[eval(exp)].color) {
                  line[eval(exp)].hasMove = true
                  areAttacks = true
                } else {
                  i = -1
                }
              }
            }
          }
        }
        
        findQueenAttacks(new RegExp(`(${colorOfPas})\\s(false\\s)*${colorOfEnemy}\\s(false\\s?)+`, 'g'), 'i + line.indexOf(active)')
        findQueenAttacks(new RegExp(`(false\\s)+${colorOfEnemy}\\s(false\\s)*${colorOfPas}\\s?`, 'g'), 'line.indexOf(active) - i')
      })
    }
    return areAttacks
  },


  attackChecker(e) {
    let attackIsDone = false

    board.forEach(empty => {
      if (this.isCursorInCell(e, empty) && empty.hasMove && !empty.color) {
        const active = board.find(active => active.isActive)
        const line = active.lines.find(line => ~line.indexOf(empty))
        const between = [line.indexOf(active), line.indexOf(empty)].sort()
        between[0] += 1
        const enemy = line.slice(...between).find(enemy => enemy.color)
        
        empty.color = active.color
        empty.isQueen = active.isQueen
        empty.isActive = true
        enemy.color = false
        enemy.isQueen = false
        active.color = false
        active.isQueen = false
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
  },


  checkFinish() {
    console.log(board.reduce((count, red) => red.color === 'red' ? count + 1 : count))
  }
}