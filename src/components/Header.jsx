import ScoreBoard from './ScoreBoard'
import '../styles/Header.css'

export default function Header({title, styling, score, highScore}){

  return (
    <header style={styling}>
      <div className='container eee'>
        <div className='game-title float-l'>
          <h1>{title} MEMORY GAME</h1>
          <p><a
            href='https://github.com/JohnnyW23'
            target='_blank'
          >Made by Davi Nascimento</a></p>
        </div>
        <ScoreBoard
          score={score}
          highScore={highScore}
        />
      </div>
    </header>
  )
}