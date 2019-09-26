const canvasSize = window.innerHeight < window.innerWidth ? window.innerHeight * 0.9 : window.innerWidth * 0.9

let countOfPas = 0
let colorOfPas = countOfPas % 2 ? 'red' : 'green'
let colorOfEnemy = countOfPas % 2 ? 'green' : 'red'
let mustBeAttack = false

//next is only filling the board with the necessary parameters

const board = []
const fillboard = (() => {
  let x, y, color

  for (let i = 0; i < 32; ++i) {

    if (i % 8 >= 4 && i % 8 < 8) {
      x = (i % 4 * canvasSize / 4) + canvasSize / 8
    } 
    else {
      x = i % 4 * canvasSize / 4
    }

    y = canvasSize * (parseInt(i / 4) / 8)

    switch (true) {
      case i < 12 : color = 'red'; break
      case i >= 20 : color = 'green'; break
      default: color = false
    }

    board[i] = {
      x: x, 
      y: y, 
      color: color, 
      lines: [], 
      isQueen: false, 
      hasMove: false, 
      isActive: false
    }
  }

  const lines = []
  const rules = [
    [24, 28], 
    [16, 20, 25, 29], 
    [8, 12, 17, 21, 26, 30], 
    [0, 4, 9, 13, 18, 22, 27, 31],
    [1, 5, 10, 14, 19, 23], 
    [2, 6, 11, 15], 
    [3, 7], 
    [1, 4, 8], 
    [2, 5, 9, 12, 16],
    [3, 6, 10, 13, 17, 20, 24], 
    [7, 11, 14, 18, 21, 25, 28], 
    [15, 19, 22, 26, 29], 
    [23, 27, 30]
  ]
  rules.forEach(line => lines.push(line.map(i => board[i])))

  lines.forEach(line => {
    line.forEach(cell => {
      cell.lines.push(line)
    })
  })

})()