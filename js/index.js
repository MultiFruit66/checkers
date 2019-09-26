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
        rules.checkChangingToQueen()
        if (!rules.attacksForActive()) {
          rules.nextPas()
          if (!rules.checkAllAttacks()) {
            if (!rules.checkAllMoves()) {
              rules.nextPas()
              if (rules.checkAllMoves()) {
                draw.finish(`Winner is ${colorOfPas}!!!`)
              } else {
                draw.finish('It\'s draw!')
              }
            }
          }
        }
      }
      else {
        rules.makeActive(e)
        rules.attacksForActive()
      }
    }
    else if (rules.moveChecker(e)) {
      rules.checkChangingToQueen()
      rules.nextPas()

      if (!rules.checkAllAttacks()) {
        if (!rules.checkAllMoves()) {
          rules.nextPas()
          if (rules.checkAllMoves()) {
            draw.finish(`Winner is ${colorOfPas}!!!`)
          } else {
            draw.finish('It\'s draw!')
          }
        }
      }
    } 
    else {
      rules.checkAllMoves()
      rules.makeActive(e)
      rules.movesForActive()
    }
    draw.update()
  }
})