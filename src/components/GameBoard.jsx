import Tile from './Tile'
import './GameBoard.css'

function GameBoard({ tiles, onTileClick }) {
  return (
    <div className="game-board">
      {tiles.map((tile, index) => (
        <Tile
          key={tile.id}
          tile={tile}
          onClick={() => onTileClick(tile)}
          index={index}
        />
      ))}
    </div>
  )
}

export default GameBoard
