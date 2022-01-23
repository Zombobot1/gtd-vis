import { motion } from 'framer-motion'
import './Btn.css'

export interface Btn {
  text: string
  onClick: () => void
  className?: string
}

export function Btn({ text, onClick, className = '' }: Btn) {
  return (
    <motion.button className={'btn ' + className} onClick={onClick} whileHover="hover" whileTap="tap" variants={btnV}>
      {text}
    </motion.button>
  )
}

const btnV = {
  hover: {
    x: 18,
    scale: 1.1,
  },
  tap: {
    x: 0,
    scale: 1,
  },
}
