import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AttackTypesLine, VictimsOrAttacks } from './CountryAttacksInfo/CountryAttacksInfo'
import { CountyIdAndName } from '../../types'
import { sum } from '../../utils'
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

export function Globe() {
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

  const [showVictims, setShowVictims] = useState(true)

  const worldMapData = geoData.find((d) => d.year === years[currentYearI])!.data
  const lineData = showVictims
    ? attacksData.find((d) => d.id === country)!.data
    : victimsData.find((d) => d.id === country)!.data
  const pieData = attackTypes.find((d) => d.id === country)!.data

  const { affiliated, total, unknown } = getAttacksInfo(country)
  const { casualties, fatalities, injuries } = getInjuriesInfo(country)

  return (
    <div className="globe">
      <h2 className="globe-header">Globe</h2>
      <div className="zoom-info" style={{ opacity: hovered ? 1 : 0 }}>
        <div>Use shift + wheel to</div>
        zoom in / out
      </div>
      <motion.div
        className="c-o"
        initial={{ width: 0, height: 0 }}
        animate={{ width: '88vw', height: '88vw' }}
        transition={{ duration: 0.75 }}
      >
        <motion.div className="c-m">
          <div className="c-i" ref={ref}>
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
                  setCountry((old) => (!old ? 'RUS' : ''))
                }}
                data={worldMapData}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      <div className="globe-attacks-info">
        <motion.div className="globe-attacks-info-i" variants={panelV} initial="from" animate="to">
          <div className="selected-country-label">
            Selected country
            <div className="selected-country">
              {(countryMapping as CountyIdAndName)[country]}
              {country && <CloseBtn onClick={() => setCountry('')} />}
            </div>
          </div>
          <GlobeCounters
            affiliated={affiliated}
            fatalitiesCount={fatalities}
            injuriesCount={injuries}
            showVictims={showVictims}
            casualties={casualties}
            totalCount={total}
            unknown={unknown}
          />
          <Btn text="Show on chart" onClick={() => setShowVictims((old) => !old)} />
        </motion.div>
      </div>
      <div className="timeline-o">
        <motion.div className="timeline" variants={timelineV} initial="from" animate="to">
          <PlayBtn isPlayingS={isPlayingS} />
          <Slider points={years} currentIndexS={currentYearS} />
        </motion.div>
      </div>
      <motion.div className="line-card line-card-top" variants={cardsV} initial="from" animate="to">
        <VictimsOrAttacks showVictims={showVictims} data={lineData} />
      </motion.div>
      <motion.div className="line-card line-card-bottom" variants={cardsV} initial="from" animate="to">
        <AttackTypesLine data={pieData} />
      </motion.div>
      <Nav active="map" />
    </div>
  )
}

function getAttacksInfo(country: string) {
  const data = attacksData.find((d) => d.id === country)!.data
  const unknown = data.find((d) => d.id === 'fatalities')!.data // unknown
  const affiliated = data.find((d) => d.id === 'injuries')!.data // affiliated

  const unknownCount = sum(unknown.map((p) => p.y))
  const affiliatedCount = sum(affiliated.map((p) => p.y))
  const total = unknownCount + affiliatedCount
  return { total, unknown: unknownCount, affiliated: affiliatedCount }
}

function getInjuriesInfo(country: string) {
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
