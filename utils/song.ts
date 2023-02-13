import { Line, LineType } from '../types'

export class Song {
  title = ''
  artist = ''
  language = ''
  genre = ''
  cover = ''
  video = ''
  mp3 = ''
  youtube = ''

  videogap = 0
  bpm = 0
  gap = 0
  medleystartbeat = 0
  medleyendbeat = 0

  lyrics: Array<Line> = []

  constructor(textFile: string) {
    textFile.split('\n').forEach(
      (line, index) => {
        if (line.startsWith('#')) {
          // Special tags
          const [name, value] = line.split(':')
          this.setTag(name, value)
        } else if (line.length > 1) {
          const [type, beat, duration, rawPitch, ...textArray] = line.split(' ')
          let pitch = parseInt(rawPitch)
          pitch = pitch < 0 ? 12 - pitch * -1 : pitch
          this.lyrics.push({
            id: index,
            type: type as LineType,
            beat: parseInt(beat),
            duration: parseInt(duration),
            pitch,
            text: decodeURIComponent(textArray.join(' '))
          })
        }
      },
      { lyrics: [] as Array<Line> } as Song
    )
  }

  setTag(rawTagName: string, tagValue: string) {
    // normalize tag name
    const tagName = rawTagName.toLowerCase().replace('#', '')

    switch (tagName) {
      case 'videogap':
      case 'bpm':
      case 'gap':
      case 'medleystartbeat':
      case 'medleyendbeat':
        this[tagName] = parseFloat(tagValue)
        return
      case 'title':
      case 'artist':
      case 'language':
      case 'genre':
      case 'cover':
      case 'video':
      case 'mp3':
      case 'youtube':
        this[tagName] = tagValue
        return
      default:
        console.error(`Unknown tag name: "${tagName}"`)
    }
  }

  getBeat(second: number) {
    return (((second - this.gap / 1000) * this.bpm) / 60) * 4
  }

  getLyricBySecond(second: number) {
    const beat = this.getBeat(second)
    return this.lyrics.find((note) => note.beat < beat && note.beat + note.duration > beat)
  }

  get pitches() {
    return this.lyrics.map((l) => l.pitch).filter((p) => !isNaN(p))
  }

  get beats() {
    return this.lyrics.map((l) => l.beat).filter((b) => !isNaN(b))
  }

  get maxPitch() {
    return Math.max(...this.pitches)
  }

  get minPitch() {
    return Math.min(...this.pitches)
  }

  get pitchOffset() {
    return Math.floor(this.minPitch / 12) * 12
  }

  get maxBeat() {
    return this.lyrics.reduce((acc, l) => {
      if (l.beat) {
        acc = Math.max(acc, l.beat)
        if (l.duration) {
          acc += l.duration
        }
      }
      return acc
    }, 0)
  }

  get renderLyrics() {
    return this.lyrics.filter((l) => [LineType.FREESTYLE, LineType.GOLDEN, LineType.REGULAR].includes(l.type))
  }
}
