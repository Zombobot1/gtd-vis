import './Details.css'
import { MostAttackedCountries } from './MostAttackedCountries/MostAttackedCountries'
import { TerroristGroups } from './TerroristGroups/TerroristGroups'
import { ReactComponent as HeartI } from './heart.svg'
import { Nav } from '../../utils/Nav/Nav'
import { motion } from 'framer-motion'

export function Details() {
  return (
    <div className="details">
      <motion.div
        className="details-header"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 style={{ marginBottom: '1rem', marginRight: 'auto' }}>Details</h2>
        <Nav active="stat" absolute={false} />
      </motion.div>
      <motion.div className="first-detailed-chart" variants={ch1V} initial="from" animate="to">
        <h3>Most attacked countries over the time</h3>
        <MostAttackedCountries />
      </motion.div>
      <motion.div
        className="first-detailed-chart"
        style={{ marginTop: '1rem' }}
        variants={ch2V}
        initial="from"
        animate="to"
      >
        <h3>Most influential terrorist organizations</h3>
        <TerroristGroups />
      </motion.div>
      <a className="with-luv" href="https://www.fu-berlin.de/en/index.html" target="_blank">
        From FU with <HeartI />
      </a>
    </div>
  )
}

const ch1V = {
  from: {
    opacity: 0,
    transition: { duration: 1, type: 'tween' },
  },
  to: {
    opacity: 1,
    transition: { duration: 1, type: 'tween' },
  },
}

const ch2V = JSON.parse(JSON.stringify(ch1V, null, 2))
ch2V.to.transition.delay = 0.25
