import './PlayBtn.css'
import { ReactComponent as PlayI } from './play.svg'
import { ReactComponent as PauseI } from './pause.svg'
import { ReactComponent as CloseI } from './close.svg'
import { State } from '../../utils'
import { motion } from 'framer-motion'

export interface PlayBtn {
  isPlayingS: State<boolean>
}

export function PlayBtn({ isPlayingS }: PlayBtn) {
  const [isPlaying, setIsPlaying] = isPlayingS

  return (
    <motion.button
      className="icon-btn"
      onClick={() => setIsPlaying((old) => !old)}
      variants={btnV}
      whileHover="hover"
      whileTap="tap"
    >
      {!isPlaying && <PlayI />}
      {isPlaying && <PauseI />}
    </motion.button>
  )
}

export function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <motion.button className="icon-btn close-btn" onClick={onClick} variants={btnV} whileHover="hover" whileTap="tap">
      <CloseI />
    </motion.button>
  )
}

const btnV: any = {
  hover: {
    scale: 1.3,
  },
  tap: {
    scale: 0.9,
  },
}
