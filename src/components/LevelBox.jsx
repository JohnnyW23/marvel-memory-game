import '../styles/LevelBox.css'

export default function LevelBox({chooseLevel}){
  return (
    <div className='levels'>
      <div className='levels-title eee border-text'>
        <h2>Choose your level:</h2>
      </div>
      <div className='levels-box'>
        <div
          className='level-single level-easy eee border-text'
          value='easy'
          onClick={chooseLevel}
        >
          <h2>Easy</h2>
        </div>
        <div
          className='level-single level-medium yellow border-text'
          value='medium'
          onClick={chooseLevel}
        >
          <h2>Medium</h2>
        </div>
        <div
          className='level-single level-hard red border-text'
          value='hard'
          onClick={chooseLevel}
        >
          <h2>Hard</h2>
        </div>
      </div>
    </div>
  )
}