import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Karaoke</title>
        <meta name="description" content="UltraStar-inspired karaoke on the web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎤</text></svg>"
        />
      </Head>
      <main className="min-h-screen flex flex-col justify-center">
        <div className="mx-auto flex flex-col gap-4">
          <h1 className="text-6xl mb-4" style={{ textShadow: 'rgba(255,255,255,0.75) 0 0 .5rem' }}>
            Karaoke
          </h1>
          <div className="input-group">
            <label htmlFor="name">Player Name</label>
            <input type="text" className="input" placeholder="Your Name" />
          </div>
          <div className="input-group">
            <label htmlFor="game">Game ID</label>
            <input type="text" className="input" placeholder="123abc" />
          </div>
          <div className="buttons">
            <button>Singleplayer</button>
            <button>Join Game</button>
          </div>
        </div>
      </main>
    </>
  )
}
