import { useMemo } from 'react'
import { LineType } from '../types'
import { Song } from '../utils/song'

const NOTE_HEIGHT = 10
const BEAT_WIDTH = 10
const PITCH_HEIGHT = -10

interface LyricsGraphProps {
  song: Song
}

export const LyricsGraph: React.FC<LyricsGraphProps> = ({ song }) => {
  const renderLines = useMemo(
    () => song.lyrics.filter((l) => [LineType.FREESTYLE, LineType.GOLDEN, LineType.REGULAR].includes(l.type)),
    [song]
  )

  return (
    <svg
      width={song.maxBeat}
      viewBox={`0 ${(song.maxPitch + 2) * PITCH_HEIGHT} ${song.maxBeat * BEAT_WIDTH} ${
        (song.minPitch - song.maxPitch - 4) * PITCH_HEIGHT
      }`}
    >
      {/* position indicator */}
      <path d={`M 0 ${song.minPitch * PITCH_HEIGHT} V ${song.maxPitch * PITCH_HEIGHT}`} id="position_indicator" />

      {renderLines.map((l, i) => (
        <g key={`song-line-${i}`}>
          {l.type !== LineType.FREESTYLE && (
            <rect
              className="fill-white/20"
              x={l.beat * BEAT_WIDTH}
              y={PITCH_HEIGHT * (l.pitch - song.pitchOffset)}
              width={l.duration * BEAT_WIDTH}
              height={NOTE_HEIGHT}
            />
          )}
          <text x={l.beat * BEAT_WIDTH} y={(l.pitch - song.pitchOffset) * PITCH_HEIGHT - 2}>
            {l.text}
          </text>
        </g>
      ))}
    </svg>
  )
}
