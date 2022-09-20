import { useEffect, useState } from "react"
import Die from "./components/DIe"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  // check out the lazy state so when update the state it doesnt render shit again
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollAllDices() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(prevDices => prevDices.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    })
    )
  }


  const diceElements = dice.map(die => <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)



  return (
    <div className="App">
      <div className="container">
        <main>
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="game-field">
            {diceElements}
          </div>
          <button onClick={rollAllDices}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
      </div>
    </div>
  );
}

export default App;
