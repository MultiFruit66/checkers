const draw = {
  update() {
    this.clear()
    this.active()
    this.board()
    this.checkers()
  },

  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  },

  board() {
    board.forEach(cell => {
      ctx.fillStyle = '#000'
      ctx.fillRect(cell.x, cell.y, canvasSize / 8, canvasSize / 8)
    })
  },

  checkers() {
    board.forEach(cell => {
      if (cell.color) {
        ctx.fillStyle = cell.color
        this.checker(cell.x + canvasSize / 16, cell.y + canvasSize / 16, cell.isQueen)
      }
    })
  },

  checker(x, y, isQueen) {
    ctx.beginPath()
    ctx.arc(x, y, canvasSize / 16, 0, Math.PI * 2)
    ctx.fill()
    if (isQueen) {
      ctx.fillStyle = '#ccc'
      const drawPartOfCrown = (X, Y) => {
        ctx.beginPath()
        ctx.arc(x, y - canvasSize / 128, canvasSize / 32, 3/4 * Math.PI, 1/4 * Math.PI, true)
        ctx.lineTo(X, y - canvasSize / Y)      
        ctx.fill()
      }
      drawPartOfCrown(x - canvasSize / 32, 40)
      drawPartOfCrown(x + canvasSize / 32, 40)
      drawPartOfCrown(x, 30)
    }
  },

  active() {
    board.forEach(cell => {
      if (cell.hasMove) {
        ctx.fillStyle = cell.isActive ? '#00f' : '#09f'
        ctx.fillRect(cell.x - 5, cell.y - 5, canvasSize / 8 + 10, canvasSize / 8 + 10)
      }
    })
  },

  app() {
    const background = new Image()
    background.src = './img/background.png'
    background.onload = () => document.getElementById('app').style.opacity = 1
  }
}