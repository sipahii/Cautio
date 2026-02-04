import './WelcomeScreen.css'

function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-icon">🧠</div>
        <h1 className="welcome-title">Memory Game</h1>
        <p className="welcome-subtitle">Test your memory skills!</p>
        
        <div className="instructions">
          <h2>How to Play</h2>
          <ul>
            <li>
              <span className="instruction-icon">👆</span>
              <span>Click on a tile to reveal its hidden icon</span>
            </li>
            <li>
              <span className="instruction-icon">🔄</span>
              <span>Find matching pairs by remembering tile positions</span>
            </li>
            <li>
              <span className="instruction-icon">✨</span>
              <span>Match all 8 pairs to win the game</span>
            </li>
            <li>
              <span className="instruction-icon">⚡</span>
              <span>Complete in fewer moves for a better score</span>
            </li>
          </ul>
        </div>

        <button className="start-btn" onClick={onStart}>
          <span>Start Game</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>

      <div className="floating-icons">
        <span className="float-icon" style={{ '--delay': '0s', '--x': '10%', '--y': '20%' }}>🎮</span>
        <span className="float-icon" style={{ '--delay': '1s', '--x': '80%', '--y': '15%' }}>🚀</span>
        <span className="float-icon" style={{ '--delay': '2s', '--x': '15%', '--y': '70%' }}>🌟</span>
        <span className="float-icon" style={{ '--delay': '0.5s', '--x': '85%', '--y': '75%' }}>🎨</span>
        <span className="float-icon" style={{ '--delay': '1.5s', '--x': '50%', '--y': '85%' }}>🦋</span>
      </div>
    </div>
  )
}

export default WelcomeScreen
