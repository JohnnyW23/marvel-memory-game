import LevelBox from './LevelBox';
import { v4 as uuidv4 } from 'uuid';
import '../styles/GameScreen.css'

export function GameScreen({
  shuffleGameList, handleLevel, level,
  gameList, chooseLevel, goal, score
}){  

  if(!level){ 
    return (
      <>
        {
          goal == null? (
            <div className='instructions eee'>
              <p>To start the memory game, first select a difficulty level. Once you’ve chosen the level, a set of different cards will appear on the screen. Your objective is to click on each card only once. Every time you click on a card, all the cards will be shuffled again. The goal is to successfully click on all the cards without repeating any clicks. Good luck!</p>
            </div>
          ) : (
            <></>
          )
        }
        <LevelBox 
          chooseLevel={chooseLevel}
        />
      </>
    )
  }else{
    return (
      <div className='game-screen'>
        <div className='container'>
          <div
            className='choose-level border-text'
            onClick={handleLevel}>
            <h2>Choose new level</h2>
          </div>
          {
            score == goal? (
              <div className='game-win eee'>
                <h1>Congratulations! You reached high score and won the game!</h1>
                <h2>Choose a new level to restart your game.</h2>
              </div>
            ) : (
              <div className='cards-display'>
                {gameList.map(card => {
                  return (
                    <div
                      className='card-single-wrapper'
                      key={uuidv4()}>
                      <div className='card-single'>
                        <div
                          className='card-cover'
                          order={card.order}
                          onClick={shuffleGameList}
                        ></div>
                        <div className='image-wrapper'>
                          <img src={'./src/assets/marvel/' + card.image} />
                        </div>
                        <div className='name'>
                          <p>{card.name}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}