import '../styles/ScoreBoard.css'

export default function ScoreBoard({score, highScore}){

  return (
    <>
      <div className="score-board float-r">
        <h2>Score: {score}</h2>
        <h2 style={{'color': 'yellow'}}>High Score: {highScore}</h2>
      </div>
      <div className="clear"></div>
    </>
  )
}