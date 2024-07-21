import { useState, useEffect } from 'react';
import { GameScreen } from './GameScreen';
import Header from './Header';
import '../styles/App.css'

function App() {
  const [level, setLevel] = useState(false);
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([])
  const [gameList, setGameList] = useState([])
  const [goal, setGoal] = useState(null);

  const marvelsIds = [
    346, 149, 620, 213, 332, 201, 530, 226, 659, 414, 333, 536,
    579, 30, 196, 687, 489, 490, 527, 107, 237, 273, 630, 106
  ];
  const url = 'https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/c864315ca70a501a45a5d6b85b3faeda/';

  const shuffleMarvelList = (event, array) => {
    const order = event.target.getAttribute('order');
    setClicked([...clicked, order])

    const newData = [...array];
    for (let i = newData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newData[i], newData[j]] = [newData[j], newData[i]];
    }
    setData(newData);
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

    const newMarvelsIds = [...marvelsIds];
    for (let i = newMarvelsIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newMarvelsIds[i], newMarvelsIds[j]] = [newMarvelsIds[j], newMarvelsIds[i]];
    }

    const newIdsOrder = [...newMarvelsIds].slice(0, listLength);
    for (let i = newIdsOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newIdsOrder[i], newIdsOrder[j]] = [newIdsOrder[j], newIdsOrder[i]];
    }
    setGameList(newIdsOrder);
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

  const fetchData = async () => {
    setData([]);
    try {
      const promises = gameList.map(id => fetch(url + id).then(res => res.json()));
      const results = await Promise.all(promises);
      const transformedData = results.map((result, index) => {
        const transformedItem = {
          name: result.name,
          image: result.image.url,
          order: index
        };
        return transformedItem;
      });
      setData(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if(gameList.length > 0){
      fetchData();
    }
  }, [gameList]);
  
  return (
    <>
      <Header
        score={score}
        highScore={highScore}
      />
      <GameScreen
        shuffleMarvelList={(event) => {shuffleMarvelList(event, data)}}
        handleLevel={() => {handleLevel(level)}}
        level={level}
        data={data}
        chooseLevel={(event) => chooseLevel(event)}
        goal={goal}
        score={score}
      />
    </>
  )

}

export default App
