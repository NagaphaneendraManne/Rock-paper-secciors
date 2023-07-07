import {useState, useEffect} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './App.css'
import {
  GameContainer,
  ResponsiveContainer,
  ScoreBoard,
  Box,
  GameBox,
  ChoiceImg,
  Paragraph,
  Heading,
  ChoiceButton,
  RectButton,
  PopUpImg,
} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const resultConst = {
  win: 'YOU WON',
  lose: 'YOU LOSE',
  draw: 'IT IS DRAW',
}

const App = () => {
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState({
    resultView: false,
    choice1: '',
    choice2: '',
  })

  const updateResult = choice1 => {
    const randomChoiceIndex = Math.floor(Math.random() * 3)
    const choice2 = choicesList[randomChoiceIndex].id

    setShowResult({resultView: true, choice1, choice2})
  }

  const displayResult = ({choice1, choice2}) => {
    if (choice1 === choice2) {
      return resultConst.draw
    }

    if (choice1 === choicesList[0].id) {
      if (choice2 === choicesList[1].id) {
        return resultConst.win
      }
      return resultConst.lose
    }

    if (choice1 === choicesList[1].id) {
      if (choice2 === choicesList[2].id) {
        return resultConst.win
      }
      return resultConst.lose
    }

    if (choice1 === choicesList[2].id) {
      if (choice2 === choicesList[0].id) {
        return resultConst.win
      }
      return resultConst.lose
    }

    return ''
  }

  useEffect(() => {
    if (showResult.resultView) {
      const result = displayResult(showResult)
      if (result === resultConst.win) {
        setScore(prevScore => prevScore + 1)
      } else if (result === resultConst.lose) {
        setScore(prevScore => prevScore - 1)
      }
    }
  }, [showResult])

  const choiceResult = choice => {
    const choiceObj = choicesList.find(eachChoice => eachChoice.id === choice)

    return choiceObj.imageUrl
  }

  const renderGameView = () => (
    <Box>
      <ChoiceButton
        data-testid="rockButton"
        onClick={() => updateResult(choicesList[0].id)}
      >
        <ChoiceImg src={choicesList[0].imageUrl} alt={choicesList[0].id} />
      </ChoiceButton>
      <ChoiceButton
        data-testid="scissorsButton"
        onClick={() => updateResult(choicesList[1].id)}
      >
        <ChoiceImg src={choicesList[1].imageUrl} alt={choicesList[1].id} />
      </ChoiceButton>
      <ChoiceButton
        data-testid="paperButton"
        onClick={() => updateResult(choicesList[2].id)}
      >
        <ChoiceImg src={choicesList[2].imageUrl} alt={choicesList[2].id} />
      </ChoiceButton>
    </Box>
  )

  const renderResultView = () => (
    <>
      <Box>
        <Box>
          <Paragraph>YOU</Paragraph>
          <ChoiceImg src={choiceResult(showResult.choice1)} alt="your choice" />
        </Box>
        <Box>
          <Paragraph>OPPONENT</Paragraph>
          <ChoiceImg
            src={choiceResult(showResult.choice2)}
            alt="opponent choice"
          />
        </Box>
      </Box>
      <Paragraph>{displayResult(showResult)}</Paragraph>
      <RectButton
        onClick={() =>
          setShowResult(prevResult => ({...prevResult, resultView: false}))
        }
      >
        PLAY AGAIN
      </RectButton>
    </>
  )

  return (
    <GameContainer>
      <ResponsiveContainer>
        <ScoreBoard>
          <Box>
            <Heading>Rock Paper Scissors</Heading>
          </Box>
          <Box>
            <Paragraph>Score</Paragraph>
            <Paragraph>{score}</Paragraph>
          </Box>
        </ScoreBoard>
        <GameBox>
          {showResult.resultView ? renderResultView() : renderGameView()}
        </GameBox>
      </ResponsiveContainer>
      <Box>
        <Popup trigger={<RectButton>Rules</RectButton>} modal>
          {close => (
            <Box>
              <RiCloseLine onClick={() => close()} />
              <PopUpImg
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
            </Box>
          )}
        </Popup>
      </Box>
    </GameContainer>
  )
}

export default App
