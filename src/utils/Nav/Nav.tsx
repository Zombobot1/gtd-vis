import './Nav.css'
import { ReactComponent as HomeI } from './home.svg'
import { ReactComponent as WorldI } from './world.svg'
import { ReactComponent as StatisticI } from './statistic.svg'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export interface Nav {
  active?: 'map' | 'stat'
  absolute?: boolean
}

export function Nav({ active, absolute = true }: Nav) {
  const navigate = useNavigate()
  return (
    <div className={'nav ' + (absolute ? 'absolute' : '')}>
      <motion.div className="nav-btn" onClick={() => navigate('/')} variants={btnV} whileHover="hover" whileTap="tap">
        <HomeI />
      </motion.div>
      <motion.div
        className={'nav-btn ' + (active === 'map' ? 'active' : '')}
        onClick={() => navigate('/globe')}
        variants={btnV}
        whileHover="hover"
        whileTap="tap"
      >
        <WorldI />
      </motion.div>
      <motion.div
        className={'nav-btn ' + (active === 'stat' ? 'active' : '')}
        onClick={() => navigate('/details')}
        variants={btnV}
        whileHover="hover"
        whileTap="tap"
      >
        <StatisticI />
      </motion.div>
    </div>
  )
}

const btnV: any = {
  hover: {
    rotate: [0, 15, -15, 0],
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 0.5,
      type: 'tween',
    },
  },
  tap: {
    scale: 0.9,
  },
}
