import './App.css'
import {useState, useEffect} from 'react'
import SingleCard from './component/SingleCard'
import Confetti from 'react-confetti'
import ConfettiExplosion from 'react-confetti-explosion'

const cardBackImages = [
  '../images/card_covers/green_with_balloons.png',
  '../images/card_covers/multicolor_rects.png',
  '../images/card_covers/purple_with_colored_drops.png',
  '../images/card_covers/purple_with_tents.png',
]

const cardImages = [
  {'src': '../images/card_images/bag.png', matched: false},
  {'src': '../images/card_images/box.png', matched: false},
  {'src': '../images/card_images/can.png', matched: false},
  {'src': '../images/card_images/cat.png', matched: false},
  {'src': '../images/card_images/cap.png', matched: false},
  {'src': '../images/card_images/dog.png', matched: false},
  {'src': '../images/card_images/hog.png', matched: false},
  {'src': '../images/card_images/man.png', matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [explodeConfetti, setExplodeConfetti] = useState(false)
  const [countDown, setCountDown] = useState(0)
  const [cardBackNumber, setCardBackNumber] = useState(0)


  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setExplodeConfetti(false);
    setCountDown(cardImages.length * 2)
  }

  const handleChoice = (card) => {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              setExplodeConfetti(true)
              setCountDown(cardsRemaining => cardsRemaining - .5)
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
      }
      setTimeout(() => {resetTurns()}, 1000)

    }
  }, [choiceOne, choiceTwo])

  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    countDown === 0 ? setShowConfetti(true) : setShowConfetti(false)
  }, [countDown])

  const resetConfettiExplosion = () => {
    setExplodeConfetti(false)
  }

  const randomizeCardBack = () => {
    setCardBackNumber(Math.ceil(Math.random() * 3))
  }



  return (

    <div className="App">
      {
        showConfetti &&
        <Confetti />
      }
      <h1>Match the Cards</h1>
      <button onClick={shuffleCards}>New Game</button> <button onClick={randomizeCardBack}>Pick Random Card Design</button>
      <div>
        <h4>Number of turns {turns}</h4>
        {
          explodeConfetti &&
          <ConfettiExplosion
            force={.6}
            duration={1500}
            particleCount={160}
            width={1000}
            onComplete={resetConfettiExplosion}
            className='confettiExplosion' />
        }
      </div>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            cardBack={cardBackImages[cardBackNumber]}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>


    </div>

  );
}

export default App;
