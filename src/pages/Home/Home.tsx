import { Btn } from '../../utils/Btn/Btn'
import './Home.css'
import { ReactComponent as ShieldI } from './shield.svg'
import scaryBoi from './scaryBoi.webp'
import { useNavigate } from 'react-router-dom'
import { animate, motion } from 'framer-motion'

const titleV = {
  from: {
    opacity: 0.2,
    y: -32,
  },
  to: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: 'tween' },
  },
}

const boiV = {
  from: {
    opacity: 0.2,
  },
  to: {
    opacity: 1,
    transition: { duration: 0.5, type: 'tween' },
  },
}

const mainV = {
  from: {
    opacity: 0.2,
    x: -32,
  },
  to: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, type: 'tween' },
  },
}

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="title-o">
        <motion.div initial="from" animate="to" exit="from" variants={titleV}>
          <div className="title">
            <div className="gtd">
              <ShieldI />
              GTD
            </div>
            <div className="navigation">
              <div className="link underline active" onClick={() => navigate('/')}>
                Home
              </div>
              <div className="link underline " onClick={() => navigate('globe')}>
                Globe
              </div>
              <div className="link underline" onClick={() => navigate('details')}>
                Details
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <main>
        <motion.div initial="from" animate="to" exit="from" variants={mainV} className="hero">
          <h1>Fight Terrorist Activity</h1>
          <p className="text">Analyse terrorist attacks over the time to choose optimal strategy for preventing them</p>
          <Btn className="cta" text="Explore data" onClick={() => navigate('globe')} width={270} />
        </motion.div>
      </main>

      <motion.div initial="from" animate="to" exit="from" variants={boiV}>
        <div className="boi-container">
          <img src={scaryBoi} alt={'scaryBoi'} />
        </div>
      </motion.div>
    </div>
  )
}
