import { motion } from 'framer-motion'
import './Btn.css'

export interface Btn {
  text: string
  onClick: () => void
  width: number
  className?: string
}

export function Btn({ text, width, onClick, className = '' }: Btn) {
  const btnV = {
    hover: {
      width,
    },
  }
  return (
    <motion.button
      className={'btn ' + className}
      onClick={onClick}
      initial="from"
      whileHover="hover"
      whileTap="tap"
      variants={btnV}
    >
      {text}
    </motion.button>
  )
}
