import rules from './rules'
import draw from './draw'
import { pas, board } from './variables'


draw.app()

rules.checkAllMoves()
draw.update()

document.addEventListener('click', (e) => {
  if (board.find(cell => rules.isCursorInCell(e, cell) && cell.hasMove)) {
    if (pas.mustBeAttack) {
      if (rules.attackChecker(e)) {
        rules.checkChangingToQueen()
        if (!rules.attacksForActive()) {
          rules.nextPas()
          if (!rules.checkAllAttacks()) {
            if (!rules.checkAllMoves()) {
              rules.nextPas()
              if (rules.checkAllMoves()) {
                draw.finish(`Winner is ${pas.color}!!!`)
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
            draw.finish(`Winner is ${pas.color}!!!`)
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