import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [gameId, setGameId] = useState('')

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-4 absolute" style={{ top: '50%', transform: 'translateY(-50%)' }}>
        <h1 className="text-6xl mb-4" style={{ textShadow: 'rgba(255,255,255,0.75) 0 0 .5rem' }}>
          Karaoke
        </h1>
        <div className="input-group">
          <label htmlFor="name">Player Name</label>
          <input
            type="text"
            className="input"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="game">Game ID</label>
          <input
            type="text"
            className="input"
            placeholder="123abc"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
        </div>
        <div className="buttons">
          <Link href="/play" className="button">
            Singleplayer
          </Link>
          <button className="button" disabled={gameId === '' || name === ''}>
            Join Game
          </button>
        </div>
      </div>
    </div>
  )
}
