import { useState, useEffect } from 'react';
import { GameScreen } from './GameScreen';
import Header from './Header';
import marvelHeroes from '../game-lists/marvel';
import '../styles/App.css'

function App() {
  const [level, setLevel] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([])
  const [gameList, setGameList] = useState([])
  const [goal, setGoal] = useState(null);

  const shuffleGameList = (event, array) => {
    const order = event.target.getAttribute('order');
    setClicked([...clicked, order]);

    const newData = [...array];
    for (let i = newData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newData[i], newData[j]] = [newData[j], newData[i]];
    }
    setGameList(newData);
  }

  const handleLevel = (level) => {
    if(level){
      setLevel(false)

    }else{
      setLevel(true)
    }
  }

  const chooseLevel = (event) => {
    const levelValue = event.target.parentNode.getAttribute('value');
    let listLength;

    if(levelValue == 'easy'){
      listLength = 12;

    }else if(levelValue == 'medium'){
      listLength = 18;

    }else{
      listLength = 24;
    }
    setGoal(listLength);

    const newMarvelHeroes = [...marvelHeroes];
    for (let i = newMarvelHeroes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newMarvelHeroes[i], newMarvelHeroes[j]] = [newMarvelHeroes[j], newMarvelHeroes[i]];
    }

    const newCardsOrder = [...newMarvelHeroes].slice(0, listLength);
    for (let i = newCardsOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCardsOrder[i], newCardsOrder[j]] = [newCardsOrder[j], newCardsOrder[i]];
    }
    setGameList(newCardsOrder);
    handleLevel(level);
    setScore(0);
    setHighScore(0);
    setClicked([]);
  }

  useEffect(() => {
    if(clicked.length > 0){

      let scoreTemp = 0;
      if(level){
        const clickedArray = [...clicked];
        const alreadyClicked = (array) => {
          return new Set(array).size !== array.length;
        }

        if(alreadyClicked(clickedArray)){
          scoreTemp = 0
          const newClicked = []
          setClicked(newClicked)

        }else{
          scoreTemp = score + 1
        }
      }

      const newScore = scoreTemp
      setScore(newScore)
      if(newScore > highScore){
        setHighScore(newScore)
      }
    }

  }, [clicked])

  
  return (
    <>
      <Header
        score={score}
        highScore={highScore}
      />
      <GameScreen
        shuffleGameList={(event) => {shuffleGameList(event, gameList)}}
        handleLevel={() => {handleLevel(level)}}
        level={level}
        gameList={gameList}
        chooseLevel={(event) => chooseLevel(event)}
        goal={goal}
        score={score}
      />
    </>
  )

}

export default App
