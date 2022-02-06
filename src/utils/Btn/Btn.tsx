import { motion } from 'framer-motion'
import './Btn.css'

export interface Btn {
  text: string
  onClick: () => void
  className?: string
}

export function Btn({ text, onClick, className = '' }: Btn) {
  return (
    <div className="wrapper">
      <button className={'btn ' + className} onClick={onClick}>
        {text}
      </button>
    </div>
  )
}
