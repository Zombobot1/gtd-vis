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
      <motion.button
        className="nav-btn"
        onClick={() => navigate('/')}
        variants={btnV}
        whileHover="hover"
        whileTap="tap"
      >
        <HomeI />
      </motion.button>
      <motion.button
        className={'nav-btn ' + (active === 'map' ? 'active' : '')}
        onClick={() => navigate('/globe')}
        variants={btnV}
        whileHover="hover"
        whileTap="tap"
      >
        <WorldI />
      </motion.button>
      <motion.button
        className={'nav-btn ' + (active === 'stat' ? 'active' : '')}
        onClick={() => navigate('/details')}
        variants={btnV}
        whileHover="hover"
        whileTap="tap"
      >
        <StatisticI />
      </motion.button>
    </div>
  )
}

const btnV: any = {
  hover: {
    scale: 1.2,
  },
  tap: {
    scale: 0.9,
  },
}
