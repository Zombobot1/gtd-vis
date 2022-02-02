import { Btn } from '../../utils/Btn/Btn'
import './Home.css'
import { ReactComponent as ShieldI } from './shield.svg'
import scaryBoi from './scaryBoi.webp'
import { useNavigate } from 'react-router-dom'
import { animate, motion } from 'framer-motion'
import { ResponsiveChoroplethCanvas } from '@nivo/geo'
import { useState } from 'react'
import useWindowSize from '../../utils/hooks/useWindowSize'
import useInterval from '../../utils/hooks/useInterval'
import { geoFeatures } from '../Globe/WorldMap/geoFeatures'
import { useTimeout } from '../../utils/hooks/useTimeout'

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
  const scale = 0.55 / 2
  const scaleDelta = 0
  const [lambda, setLambda] = useState(7)
  const [phi, setPhi] = useState(8)
  const { width } = useWindowSize()
  const [rotating, setRotating] = useState(false)
  const speed = width > 600 ? 1 : 3
  useInterval(
    () => {
      setLambda((o) => o - 0.05 * speed)
      setPhi((o) => o - (0.05 / 2) * speed)
    },
    rotating ? 41 : null,
  )

  useTimeout(() => {
    setRotating(true)
  }, 500)

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
          <h1>Explore Terrorist Activity</h1>
          <p className="text">Get insights from the data to help policy makers with choosing optimal countermeasures</p>
          <Btn className="cta" text="Explore data" onClick={() => navigate('globe')} width={270} />
        </motion.div>
      </main>

      <motion.div initial="from" animate="to" exit="from" variants={boiV}>
        <div className="ball-o">
          <div className="ball">
            <ResponsiveChoroplethCanvas
              data={[]}
              features={geoFeatures.features}
              domain={[0, 400]}
              unknownColor="#180000"
              projectionType="orthographic"
              projectionTranslation={[0.5, 0.5]}
              projectionRotation={[lambda, phi, 0]}
              projectionScale={width * (scale + scaleDelta)}
              borderWidth={width > 600 ? 2 : 1}
              borderColor="#cc3535"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
