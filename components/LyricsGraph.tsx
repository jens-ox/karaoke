import { MutableRefObject, useMemo } from 'react'
import { LineType } from '../types'
import { Song } from '../utils/song'

const NOTE_HEIGHT = 10
const BEAT_WIDTH = 20
const PITCH_HEIGHT = 10

const margin = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10
}

interface LyricsGraphProps {
  song: Song
  cursorRef: MutableRefObject<any>
}

export const LyricsGraph: React.FC<LyricsGraphProps> = ({ song, cursorRef }) => {
  const innerWidth = useMemo(() => song.maxBeat * BEAT_WIDTH, [song])
  const innerHeight = useMemo(() => Math.abs(song.maxPitch - song.minPitch) * PITCH_HEIGHT, [song])
  const height = useMemo(() => innerHeight + margin.top + margin.bottom, [innerHeight])
  const width = useMemo(() => innerWidth + margin.left + margin.right, [innerWidth])

  return (
    <svg width={width} viewBox={`0 0 ${width} ${height}`}>
      {/* position indicator */}
      <line ref={cursorRef} y1={margin.bottom} y2={height - margin.top} className="stroke-white" />

      <g transform={`translate(${margin.left},${margin.top})`}>
        {song.renderLyrics.map((l, i) => (
          <g key={`song-line-${i}`}>
            {l.type !== LineType.FREESTYLE && (
              <rect
                className="fill-white/20"
                x={l.beat * BEAT_WIDTH}
                y={innerHeight - PITCH_HEIGHT * (l.pitch - song.pitchOffset)}
                width={l.duration * BEAT_WIDTH}
                height={NOTE_HEIGHT}
              />
            )}
            <text
              className="text-sm fill-white"
              x={l.beat * BEAT_WIDTH}
              y={innerHeight - ((l.pitch - song.pitchOffset) * PITCH_HEIGHT - 2)}
            >
              {l.text}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
