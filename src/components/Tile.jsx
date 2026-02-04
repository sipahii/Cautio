import './Tile.css'

// Brain SVG icon for the tile front
const BrainIcon = () => (
  <svg viewBox="0 0 64 64" className="brain-svg">
    <defs>
      <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e891a8" />
        <stop offset="100%" stopColor="#d4708a" />
      </linearGradient>
    </defs>
    {/* Brain shape */}
    <ellipse cx="32" cy="34" rx="24" ry="22" fill="url(#brainGrad)" stroke="#c45c7a" strokeWidth="1.5"/>
    {/* Left hemisphere details */}
    <path d="M18 28 Q22 24, 20 32 Q18 38, 22 42" fill="none" stroke="#c45c7a" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 34 Q18 30, 16 38" fill="none" stroke="#c45c7a" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Right hemisphere details */}
    <path d="M46 28 Q42 24, 44 32 Q46 38, 42 42" fill="none" stroke="#c45c7a" strokeWidth="2" strokeLinecap="round"/>
    <path d="M50 34 Q46 30, 48 38" fill="none" stroke="#c45c7a" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Center line */}
    <path d="M32 16 Q30 26, 32 34 Q34 42, 32 52" fill="none" stroke="#c45c7a" strokeWidth="2" strokeLinecap="round"/>
    {/* Top bumps */}
    <ellipse cx="24" cy="18" rx="8" ry="6" fill="url(#brainGrad)" stroke="#c45c7a" strokeWidth="1.5"/>
    <ellipse cx="40" cy="18" rx="8" ry="6" fill="url(#brainGrad)" stroke="#c45c7a" strokeWidth="1.5"/>
    {/* Brain stem */}
    <path d="M30 52 Q32 58, 34 52" fill="#e8a87c" stroke="#d4956a" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

function Tile({ tile, onClick, index }) {
  const { isFlipped, isMatched, icon } = tile

  return (
    <div
      className={`tile ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
      style={{ '--animation-delay': `${index * 0.05}s` }}
    >
      <div className="tile-inner">
        <div className="tile-front">
          <BrainIcon />
        </div>
        <div className="tile-back">
          <span className="tile-icon">{icon}</span>
        </div>
      </div>
    </div>
  )
}

export default Tile
