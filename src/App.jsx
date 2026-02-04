import { useState, useEffect, useCallback } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import GameBoard from './components/GameBoard'
import WinScreen from './components/WinScreen'
import './App.css'

// 8 distinct emoji icons for the memory game
const ICONS = ['🧠', '🎮', '🚀', '🌟', '🎨', '🎵', '🔮', '🦋']

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Create tile pairs and shuffle them
const createTiles = () => {
  const tiles = ICONS.flatMap((icon, index) => [
    { id: index * 2, icon, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, icon, isFlipped: false, isMatched: false }
  ])
  return shuffleArray(tiles)
}

function App() {
  const [gameState, setGameState] = useState('welcome') // 'welcome', 'playing', 'won'
  const [tiles, setTiles] = useState([])
  const [flippedTiles, setFlippedTiles] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [timer, setTimer] = useState(0)
  const [moves, setMoves] = useState(0)

  // Timer effect
  useEffect(() => {
    let interval
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState])

  // Start a new game
  const startGame = useCallback(() => {
    setTiles(createTiles())
    setFlippedTiles([])
    setMatchedPairs(0)
    setIsChecking(false)
    setTimer(0)
    setMoves(0)
    setGameState('playing')
  }, [])

  // Handle tile click
  const handleTileClick = useCallback((clickedTile) => {
    // Ignore clicks during checking or on already flipped/matched tiles
    if (isChecking || clickedTile.isFlipped || clickedTile.isMatched) return
    // Ignore if 2 tiles are already flipped
    if (flippedTiles.length >= 2) return

    // Flip the clicked tile
    const updatedTiles = tiles.map(tile =>
      tile.id === clickedTile.id ? { ...tile, isFlipped: true } : tile
    )
    setTiles(updatedTiles)

    const newFlippedTiles = [...flippedTiles, clickedTile]
    setFlippedTiles(newFlippedTiles)

    // Check for match if 2 tiles are flipped
    if (newFlippedTiles.length === 2) {
      setMoves(prev => prev + 1)
      setIsChecking(true)

      const [first, second] = newFlippedTiles

      if (first.icon === second.icon) {
        // Match found!
        setTimeout(() => {
          setTiles(prev => prev.map(tile =>
            tile.icon === first.icon ? { ...tile, isMatched: true } : tile
          ))
          setMatchedPairs(prev => {
            const newCount = prev + 1
            if (newCount === 8) {
              setGameState('won')
            }
            return newCount
          })
          setFlippedTiles([])
          setIsChecking(false)
        }, 500)
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setTiles(prev => prev.map(tile =>
            tile.id === first.id || tile.id === second.id
              ? { ...tile, isFlipped: false }
              : tile
          ))
          setFlippedTiles([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }, [tiles, flippedTiles, isChecking])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </div>

      {gameState === 'welcome' && (
        <WelcomeScreen onStart={startGame} />
      )}

      {gameState === 'playing' && (
        <div className="game-container">
          <header className="game-header">
            <h1>Memory Game</h1>
            <div className="game-stats">
              <div className="stat">
                <span className="stat-label">Time</span>
                <span className="stat-value">{formatTime(timer)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Moves</span>
                <span className="stat-value">{moves}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Pairs</span>
                <span className="stat-value">{matchedPairs}/8</span>
              </div>
            </div>
          </header>
          <GameBoard tiles={tiles} onTileClick={handleTileClick} />
          <button className="restart-btn" onClick={startGame}>
            Restart Game
          </button>
        </div>
      )}

      {gameState === 'won' && (
        <WinScreen
          time={formatTime(timer)}
          moves={moves}
          onPlayAgain={startGame}
        />
      )}
    </div>
  )
}

export default App
