import { useMemo } from 'react'
import { LineType } from '../types'
import { Song } from '../utils/song'

const NOTE_HEIGHT = 10
const BEAT_WIDTH = 20
const PITCH_HEIGHT = 10

interface LyricsGraphProps {
  song: Song
}

export const LyricsGraph: React.FC<LyricsGraphProps> = ({ song }) => {
  const chartWidth = useMemo(() => song.maxBeat * BEAT_WIDTH, [song])
  const chartHeight = useMemo(() => Math.abs(song.maxPitch - song.minPitch) * PITCH_HEIGHT, [song])

  return (
    <svg width={chartWidth} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
      {/* position indicator */}
      <path d={`M 0 ${song.minPitch * PITCH_HEIGHT} V ${song.maxPitch * PITCH_HEIGHT}`} id="position_indicator" />

      {song.renderLyrics.map((l, i) => (
        <g key={`song-line-${i}`}>
          {l.type !== LineType.FREESTYLE && (
            <rect
              className="fill-white/20"
              x={l.beat * BEAT_WIDTH}
              y={chartHeight - PITCH_HEIGHT * (l.pitch - song.pitchOffset)}
              width={l.duration * BEAT_WIDTH}
              height={NOTE_HEIGHT}
            />
          )}
          <text
            className="text-sm fill-white"
            x={l.beat * BEAT_WIDTH}
            y={chartHeight - ((l.pitch - song.pitchOffset) * PITCH_HEIGHT - 2)}
          >
            {l.text}
          </text>
        </g>
      ))}
    </svg>
  )
}
