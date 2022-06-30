import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './Die'

function App() {
  const [dice, setDice] = useState(generateNewDice)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setGameOver(true)
    }
  }, [dice])

  function generateSingleDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
    }
  }

  function generateNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateSingleDie())
    }
    return diceArray
  }

  function rollDice() {
    if (gameOver) {
      setDice(generateNewDice())
      setGameOver(false)
    }
    setDice((prevDice) => {
      return prevDice.map((prevDie) => {
        return prevDie.isHeld ? prevDie : generateSingleDie()
      })
    })
  }

  function toggleHeld(id) {
    setDice((prevDice) => {
      return prevDice.map((prevDie) => {
        return prevDie.id === id
          ? { ...prevDie, isHeld: !prevDie.isHeld }
          : prevDie
      })
    })
  }

  const diceElems = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        toggleHeld={toggleHeld}
      />
    )
  })

  return (
    <div className="App flex justify-center">
      {gameOver && <Confetti />}
      <main className="game bg-primary flow">
        <div className="game--text flow">
          <h1 className="game--title fs-600 text-bold">Tenzies</h1>
          <p className="game--instructions fs-200">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="dice--container">{diceElems}</div>
        <button
          className="bg-dark fs-400 text-bold btn"
          onClick={rollDice}
        >
          {gameOver ? 'Restart Game' : 'Roll'}
        </button>
      </main>
    </div>
  )
}

export default App
