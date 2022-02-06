import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AttackTypesPie, Victims } from './CountryAttacksInfo/CountryAttacksInfo'
import { CountyIdAndName, gen } from '../../types'
import { clamp, State, sum } from '../../utils'
import { Btn } from '../../utils/Btn/Btn'
import useInterval from '../../utils/hooks/useInterval'
import { usePrevious } from '../../utils/hooks/usePrevious'
import { CloseBtn, PlayBtn } from '../../utils/PlayBtn/PlayBtn'
import { Slider } from '../../utils/Slider/Slider'
import { attacksData } from './data/attacksData'
import { attackTypes } from './data/attackTypes'
import { countryMapping } from './data/countryMapping'
import { geoData } from './data/geoData'
import { victimsData } from './data/victimsData'
import './Globe.css'
import { GlobeCounters } from './GlobeCounters/GlobeCounters'
import { WorldMap } from './WorldMap/WorldMap'
import { Nav } from '../../utils/Nav/Nav'
import useHover from '../../utils/hooks/useHover'
import { ReactComponent as ArrowLeftI } from './arrowLeft.svg'
import { useIsMobile } from '../../utils/hooks/useIsMobile'
import { useDrag, useGesture } from '@use-gesture/react'
import { Drawer } from './Drawer/Drawer'

export interface Globe {
  showAboutS: State<boolean>
}

export function Globe({ showAboutS }: Globe) {
  const [country, setCountry] = useState('')
  const [years] = useState(geoData.map((d) => d.year))
  const currentYearS = useState(years.length - 1)
  const [currentYearI, setCurrentYearI] = currentYearS

  const ref = useRef(null)
  const hovered = useHover(ref)

  const isPlayingS = useState(false)
  const [isPlaying, setIsPlaying] = isPlayingS
  const prevIsPlaying = usePrevious(isPlaying)

  useEffect(() => {
    if (prevIsPlaying === false && isPlaying) setCurrentYearI(0)
  }, [isPlaying, prevIsPlaying])

  useInterval(
    () => {
      setCurrentYearI((old) => {
        if (old === years.length - 2) setIsPlaying(false)
        return old + 1
      })
    },
    isPlaying ? 1e3 : null,
  )

  const [showAttacks, setShowVictims] = useState(true)

  const worldMapData = geoData.find((d) => d.year === years[currentYearI])!.data
  const lineData = victimsData.find((d) => d.id === country)!.data
  const pieData = attackTypes.find((d) => d.id === country)!.data
  const globeShown = country === ''

  const { affiliated, total, unknown } = getAttacksInfo(country)
  const { casualties, fatalities, injuries } = getInjuriesInfo(country)

  const mobile = useIsMobile()

  const countryName = (countryMapping as any)[country]
  const leftDrawerS = useState(false)
  const rightDrawerS = useState(false)
  const countryData = worldMapData.find((d) => d.id === country)

  const [isFullScale, setIsFullScale] = useState(true)

  return (
    <>
      <div>
        {mobile && (
          <>
            <Drawer side="left" openS={leftDrawerS} showBtn={!rightDrawerS[0]} country={country}>
              <div className="counters-panel">
                <h3>{countryName}</h3>
                <GlobeCounters
                  affiliated={affiliated}
                  fatalitiesCount={fatalities}
                  injuriesCount={injuries}
                  showAttacks={showAttacks}
                  casualties={casualties}
                  totalCount={total}
                  unknown={unknown}
                  incidents={countryData?.value}
                  killed={countryData?.killed}
                  wounded={countryData?.wounded}
                  year={years[currentYearI]}
                />
                <Btn
                  text={showAttacks ? 'Show Victims' : 'Show Attacks'}
                  onClick={() => setShowVictims((old) => !old)}
                />
              </div>
            </Drawer>
            <Drawer side="right" openS={rightDrawerS} showBtn={!leftDrawerS[0]} country={country}>
              <div className="plots-panel">
                <h3>{countryName}</h3>
                <div className="line-card line-card-top">
                  <Victims data={lineData} globeShown={globeShown} />
                </div>
                <div className="line-card line-card-bottom">
                  <AttackTypesPie data={pieData} inPanel={true} />
                </div>
              </div>
            </Drawer>
          </>
        )}
        <div className="globe">
          <h2 className="globe-header">{country === '' ? 'Globe' : countryName}</h2>
          {country && (
            <div className="back-to-globe" onClick={() => setCountry('')}>
              <ArrowLeftI />
              <p className="back-to-globe-text">back to globe</p>
            </div>
          )}

          {!mobile && (
            <div className="zoom-info" style={{ opacity: hovered ? 1 : 0 }}>
              <div>Use shift + wheel to</div>
              zoom in / out
            </div>
          )}

          <EarthWrapper>
            <div className={!mobile ? 'c-m' : ''}>
              <div className="c-i" ref={ref} style={{ overflow: isFullScale ? 'visible' : 'hidden' }}>
                <motion.div
                  className="core"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                >
                  <WorldMap
                    onCountryClick={(c) => {
                      setIsPlaying(false)
                      setCurrentYearI(years.length - 1)
                      setCountry(c)
                    }}
                    data={worldMapData}
                    setIsFullScale={setIsFullScale}
                  />
                </motion.div>
              </div>
            </div>
          </EarthWrapper>

          {!mobile && (
            <div className="globe-attacks-info">
              <motion.div className="globe-attacks-info-i" variants={panelV} initial="from" animate="to">
                <GlobeCounters
                  affiliated={affiliated}
                  fatalitiesCount={fatalities}
                  injuriesCount={injuries}
                  showAttacks={showAttacks}
                  casualties={casualties}
                  totalCount={total}
                  unknown={unknown}
                />
                <Btn
                  text={showAttacks ? 'Show Victims' : 'Show Attacks'}
                  onClick={() => setShowVictims((old) => !old)}
                />
              </motion.div>
            </div>
          )}

          <div className="timeline-o">
            <motion.div className="timeline" variants={timelineV} initial="from" animate="to">
              <PlayBtn isPlayingS={isPlayingS} />
              <Slider points={years} currentIndexS={currentYearS} />
            </motion.div>
          </div>

          {!mobile && (
            <div className="globe-charts">
              <div className="globe-charts-i">
                <motion.div className="line-card line-card-top" variants={cardsV} initial="from" animate="to">
                  <Victims data={lineData} globeShown={globeShown} />
                </motion.div>
                <motion.div className="line-card line-card-bottom" variants={cardsV} initial="from" animate="to">
                  <AttackTypesPie data={pieData} />
                </motion.div>
              </div>
            </div>
          )}
          <Nav showAboutS={showAboutS} />
        </div>
      </div>
    </>
  )
}

type EarthWrapper = {
  children: ReactNode
}

function EarthWrapper({ children }: EarthWrapper) {
  const mobile = useIsMobile()
  if (mobile)
    return (
      <motion.div
        className="c-m"
        initial={{ x: '-50%', y: '-55%', scale: 0 }}
        animate={{ x: '-50%', y: '-55%', scale: 1 }}
        transition={{ duration: 0.75 }}
      >
        {children}
      </motion.div>
    )
  return (
    <motion.div
      className="c-o"
      initial={{ width: 0, height: 0 }}
      animate={{ width: '90vw', height: '90vw' }}
      transition={{ duration: 0.75 }}
    >
      {children}
    </motion.div>
  )
}

export function getAttacksInfo(country: string) {
  const data = attacksData.find((d) => d.id === country)!.data
  const unknown = data.find((d) => d.id === 'unknown')!.data
  const affiliated = data.find((d) => d.id === 'affiliated')!.data

  const unknownCount = sum(unknown.map((p) => p.y))
  const affiliatedCount = sum(affiliated.map((p) => p.y))
  const total = unknownCount + affiliatedCount
  return { total, unknown: unknownCount, affiliated: affiliatedCount }
}

export function getInjuriesInfo(country: string) {
  const data = victimsData.find((d) => d.id === country)!.data
  const injuries = data.find((d) => d.id === 'injuries')!.data
  const fatalities = data.find((d) => d.id === 'fatalities')!.data

  const injuriesCount = sum(injuries.map((p) => p.y))
  const fatalitiesCount = sum(fatalities.map((p) => p.y))
  const total = injuriesCount + fatalitiesCount
  return { casualties: total, injuries: injuriesCount, fatalities: fatalitiesCount }
}

const panelV = {
  from: {
    opacity: 0,
    x: -32,
  },
  to: {
    opacity: 1,
    x: 0,

    transition: { duration: 0.5, delay: 0.75 },
  },
}

const cardsV = {
  from: {
    opacity: 0,
    x: 32,
  },
  to: {
    opacity: 1,
    x: 0,

    transition: { duration: 0.5, delay: 0.75 },
  },
}

const timelineV = {
  from: {
    opacity: 0,
    y: 32,
  },
  to: {
    opacity: 1,
    y: 0,

    transition: { duration: 0.5, delay: 1.25 },
  },
}
