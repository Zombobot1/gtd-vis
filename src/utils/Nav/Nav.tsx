import './Nav.css'
import { ReactComponent as HomeI } from './home.svg'
import { ReactComponent as WorldI } from './world.svg'
import { ReactComponent as StatisticI } from './statistic.svg'
import { ReactComponent as HelpI } from './question.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

export interface Nav {
  absolute?: boolean
}

export function Nav({ absolute = true }: Nav) {
  const navigate = useNavigate()
  const location = useLocation()
  const mobile = useIsMobile()
  let active = ''
  if (location.pathname.includes('globe')) active = 'map'
  else if (location.pathname.includes('details')) active = 'stat'
  return (
    <div className={'nav ' + (absolute && !mobile ? 'absolute' : '')}>
      <motion.button
        className={'nav-btn ' + (active === '' ? 'active' : '')}
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
      <motion.button
        className={'nav-btn '}
        onClick={() => navigate('/details')}
        variants={btnV}
        whileHover="hover"
        whileTap="tap"
      >
        <HelpI />
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
