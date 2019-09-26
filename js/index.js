draw.app()

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.setAttribute('width', canvasSize)
canvas.setAttribute('height', canvasSize)


rules.checkAllMoves()
draw.update()

canvas.addEventListener('click', (e) => {
  if (board.find(cell => rules.isCursorInCell(e, cell) && cell.hasMove)) {
    if (mustBeAttack) {
      if (rules.attackChecker(e)) {
        if (!rules.attacksForActive()) {
          rules.checkChangingToQueen()
          rules.nextPas()
          console.log('was attack')

          if (!rules.checkAllAttacks()) {
            rules.checkAllMoves()
            console.log("hasn't attacks")
          } else {
            console.log('has attacks')
          }
        }
      }
      else {
        rules.checkChangingToQueen()
        rules.makeActive(e)
        rules.attacksForActive()
        console.log('picked attack checker')
      }
    }
    else if (rules.moveChecker(e)) {
      rules.checkChangingToQueen()
      rules.nextPas()

      if (!rules.checkAllAttacks()) {
        rules.checkAllMoves()
        console.log('all moves')
      } else {
        console.log('has attacks after move')
      }
    } 
    else {
      rules.checkAllMoves()
      rules.makeActive(e)
      rules.movesForActive()
      console.log('changed move')
    }
    draw.update()
  }
})