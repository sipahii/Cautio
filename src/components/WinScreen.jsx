import { useEffect, useState } from 'react'
import './WinScreen.css'

function WinScreen({ time, moves, onPlayAgain }) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300)
  }, [])

  return (
    <div className="win-screen">
      <div className={`win-content ${showContent ? 'visible' : ''}`}>
        <div className="trophy">🏆</div>
        <h1 className="win-title">Congratulations!</h1>
        <p className="win-subtitle">You matched all pairs!</p>

        <div className="win-stats">
          <div className="win-stat">
            <span className="win-stat-icon">⏱️</span>
            <span className="win-stat-label">Time</span>
            <span className="win-stat-value">{time}</span>
          </div>
          <div className="win-stat">
            <span className="win-stat-icon">🎯</span>
            <span className="win-stat-label">Moves</span>
            <span className="win-stat-value">{moves}</span>
          </div>
        </div>

        <button className="play-again-btn" onClick={onPlayAgain}>
          <span>Play Again</span>
          <span className="btn-icon">🔄</span>
        </button>
      </div>

      <div className="confetti">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            className="confetti-piece"
            style={{
              '--x': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 3}s`,
              '--duration': `${2 + Math.random() * 2}s`,
              '--color': `hsl(${Math.random() * 360}, 70%, 60%)`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default WinScreen
