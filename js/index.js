draw.app()

const canvas  = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.setAttribute('width', canvasSize)
canvas.setAttribute('height', canvasSize)


rules.checkAllMoves()
draw.update()

canvas.addEventListener('click', (e) => {
  if (mustBeAttack) {
    if (rules.attackChecker(e)) {
      rules.nextPas()

      if (!rules.checkAllAttacks()) {
        rules.checkAllMoves()
      }
    }
    else {
      rules.makeActive(e)
      rules.attacksForActive()
    }
  }
  else if (rules.moveChecker(e)) {
    rules.nextPas()

    if (!rules.checkAllAttacks()) {
      rules.checkAllMoves()
    }
  } 
  else {
    rules.checkAllMoves()
    rules.makeActive(e)
    rules.movesForActive()
  }
  draw.update()
})