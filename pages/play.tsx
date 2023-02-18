import { NextPage } from 'next'
import React, { useMemo, useRef, useState } from 'react'
import { findDOMNode } from 'react-dom'
import YouTube from 'react-youtube'
import { PitchDetector } from 'pitchy'
import { LyricsGraph } from '../components/LyricsGraph'
import karaokeFile from '../data/karaokeFile'
import { Song } from '../utils/song'

const BUFFER_SIZE = 2048
const SAMPLE_RATE = 44100

const data = {
  id: 22033,
  artist: 'David Guetta & Sia',
  title: 'Flames',
  youtube: 'cJHJtV_6VQI'
}

const startAudio = async (context: AudioContext) => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const micNode = context.createMediaStreamSource(mediaStream)
  const analyzerNode = new AnalyserNode(context, { fftSize: BUFFER_SIZE })
  micNode.connect(analyzerNode)
  return {
    analyzer: analyzerNode,
    detector: PitchDetector.forFloat32Array(BUFFER_SIZE),
    inputBuffer: new Float32Array(BUFFER_SIZE)
  }
}

const Play: NextPage = () => {
  const [analyzer, setAnalyzer] = useState<AnalyserNode>()
  const [detector, setDetector] = useState<PitchDetector<Float32Array>>()
  const [buffer, setBuffer] = useState<Float32Array>()
  const [pitch, setPitch] = useState<number>()
  const [confidence, setConfidence] = useState<number>()

  const boot = () => {
    if (typeof window !== 'undefined') {
      const context = new AudioContext()
      startAudio(context).then((audio) => {
        setDetector(audio.detector)
        setBuffer(audio.inputBuffer)
        setAnalyzer(audio.analyzer)
        context.resume()
      })
    }
  }

  const ref = useRef<any>(null)
  const cursorRef = useRef<any>(null)

  const detectPitch = () => {
    if (!detector || !buffer || !analyzer) return

    analyzer.getFloatTimeDomainData(buffer)
    const [newPitch, newConfidence] = detector.findPitch(buffer, SAMPLE_RATE)
    setPitch(newPitch)
    setConfidence(newConfidence)
  }

  const song = useMemo(() => new Song(karaokeFile), [])

  const render = async () => {
    if (!ref.current || !cursorRef.current) return

    const node = findDOMNode(cursorRef.current) as Element

    const state = await ref.current.internalPlayer.getPlayerState()
    if (state !== 1) return

    const time = await ref.current.internalPlayer.getCurrentTime()

    const beat = song.getBeat(time)
    node.setAttribute('x1', `${beat * 20}`)
    node.setAttribute('x2', `${beat * 20}`)

    requestAnimationFrame(render)
  }

  const start = () => {
    requestAnimationFrame(render)
  }

  return (
    <div>
      <h1 className="mb-8">Play</h1>
      <button className="button" onClick={boot}>
        Start Recorder
      </button>
      <button className="button" onClick={detectPitch}>
        Detect Pitch
      </button>
      {pitch && (
        <table className="my-4">
          <tbody>
            <tr>
              <td>Pitch</td>
              <td>{pitch.toFixed(2)} Hz</td>
            </tr>
            <tr>
              <td>Confidence</td>
              <td>{((confidence ?? 0) * 100).toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="flex gap-6">
        <div className="overflow-x-scroll border border-white/10 rounded p-4 flex flex-col justify-center">
          <LyricsGraph song={song} cursorRef={cursorRef} />
        </div>
        <div>
          <YouTube onPlay={start} videoId={data.youtube} ref={ref} />
        </div>
      </div>
    </div>
  )
}

export default Play
