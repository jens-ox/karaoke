import { NextPage } from 'next'
import { useMemo } from 'react'
import YouTube from 'react-youtube'
import { LyricsGraph } from '../components/LyricsGraph'
import karaokeFile from '../data/karaokeFile'
import { Song } from '../utils/song'

const data = {
  id: 22033,
  artist: 'David Guetta & Sia',
  title: 'Flames',
  youtube: 'cJHJtV_6VQI'
}

const Play: NextPage = () => {
  const song = useMemo(() => new Song(karaokeFile), [])
  return (
    <div>
      <h1 className="mb-8">Play</h1>
      <div className="flex gap-6">
        <div className="overflow-x-scroll border border-white/10 rounded p-4">
          <LyricsGraph song={song} />
        </div>
        <div>
          <YouTube videoId={data.youtube} />
        </div>
      </div>
    </div>
  )
}

export default Play
