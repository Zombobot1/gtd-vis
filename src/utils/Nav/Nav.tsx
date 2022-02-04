import './Nav.css'
import { ReactComponent as HomeI } from './home.svg'
import { ReactComponent as WorldI } from './world.svg'
import { ReactComponent as StatisticI } from './statistic.svg'
import { ReactComponent as HelpI } from './question.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import { State } from '../../utils'

export interface Nav {
  absolute?: boolean
  showAboutS: State<boolean>
}

export function Nav({ showAboutS, absolute = true }: Nav) {
  const navigate = useNavigate()
  const location = useLocation()
  const mobile = useIsMobile()
  let active = ''
  if (location.pathname.includes('globe') && !showAboutS[0]) active = 'map'
  else if (location.pathname.includes('details') && !showAboutS[0]) active = 'stat'

  const variant = mobile ? mobileBtnV : btnV

  return (
    <div className={'nav ' + (absolute && !mobile ? 'absolute' : '')}>
      <motion.button
        className={'nav-btn ' + (active === '' && !showAboutS[0] ? 'active' : '')}
        onClick={() => navigate('/')}
        variants={variant}
        whileHover="hover"
        whileTap="tap"
      >
        <HomeI />
      </motion.button>
      <motion.button
        className={'nav-btn ' + (active === 'map' ? 'active' : '')}
        onClick={() => navigate('/globe')}
        variants={variant}
        whileHover="hover"
        whileTap="tap"
      >
        <WorldI />
      </motion.button>
      <motion.button
        className={'nav-btn ' + (active === 'stat' ? 'active' : '')}
        onClick={() => navigate('/details')}
        variants={variant}
        whileHover="hover"
        whileTap="tap"
      >
        <StatisticI />
      </motion.button>
      <motion.button
        className={'nav-btn ' + (showAboutS[0] ? 'active' : '')}
        onClick={() => showAboutS[1]((o) => !o)}
        variants={variant}
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

const mobileBtnV: any = {
  tap: {
    scale: 0.7,
  },
}
