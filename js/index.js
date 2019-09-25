draw.app()

const canvas  = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.setAttribute('width', canvasSize)
canvas.setAttribute('height', canvasSize)

rules.checkAllMoves()
draw.update()

canvas.addEventListener('click', (e) => {
  if (rules.moveChecker(e)) {
    rules.nextPas()
    rules.checkAllMoves()
  } else {
    rules.checkAllMoves()
    rules.makeActive(e)
    rules.movesForActive()
  }
  draw.update()
})