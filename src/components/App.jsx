import { useState, useEffect } from 'react';
import { GameScreen } from './GameScreen';
import Header from './Header';
import marvelHeroes from '../game-lists/marvel';
import dcHeroes from '../game-lists/dc';
import '../styles/App.css'

function App() {
  const defaulThemeData = {
    active: false,
    theme: null,
    title: 'THEMED',
    styleAll: {
      'fontFamily': 'Verdana',
      'backgroundImage': 'url("https://w0.peakpx.com/wallpaper/809/380/HD-wallpaper-react-js-logo-programming-computer-logo.jpg")'
    },
    mainColor: {
      'backgroundColor': '#001a29'
    }
  }
  const [level, setLevel] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [themeData, setThemeData] = useState(defaulThemeData);
  const [goal, setGoal] = useState(null);

  const handleTheme = (event) => {

    if(themeData.active){
      setThemeData(defaulThemeData);
      setLevel(false)
      return
    }

    const theme = event.target.getAttribute('value');
    let data;

    if(theme == 'marvel'){
      data = {
        active: true,
        theme: marvelHeroes,
        title: 'MARVEL',
        styleAll: {
          'fontFamily': "'Comic Neue'",
          'backgroundImage': 'url("https://www.guiadasemana.com.br/contentFiles/system/pictures/2015/12/148951/original/logo.jpg")'
        },
        mainColor: {
          'backgroundColor': '#3d0000'
        },
        levelBox: {
          'backgroundColor': '#0045ac'
        }
      }

    }else if(theme == 'dc'){
      data = {
        active: true,
        theme: dcHeroes,
        title: 'DC',
        styleAll: {
          'fontFamily': "'Comic Neue'",
          'backgroundImage': 'url("https://www.pixelstalk.net/wp-content/uploads/2016/05/DC-Comics-Wallpaper.jpg")'
        },
        mainColor: {
          'backgroundColor': '#151515'
        },
        levelBox: {
          'backgroundColor': '#102510'
        }
      } 
    }

    setThemeData(data)
  }

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

    const newMarvelHeroes = [...themeData.theme];
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
    <div className='coat' style={themeData.styleAll}>
      <div className='shirt'>
      <Header
        title={themeData.title}
        styling={themeData.mainColor}
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
        themeData={themeData}
        handleTheme={(event) => {handleTheme(event)}}
      />
      </div>
    </div>
  )
}

export default App
