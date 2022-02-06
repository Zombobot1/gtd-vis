import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Btn } from '../../utils/Btn/Btn'
import useInterval from '../../utils/hooks/useInterval'
import { usePrevious } from '../../utils/hooks/usePrevious'
import useWindowSize from '../../utils/hooks/useWindowSize'
import { PlayBtn } from '../../utils/PlayBtn/PlayBtn'
import { Slider } from '../../utils/Slider/Slider'
import { MostAttackedCountries } from '../Details/MostAttackedCountries/MostAttackedCountries'
import { TerroristGroups } from '../Details/TerroristGroups/TerroristGroups'
import { AttackTypesPie, Victims } from '../Globe/CountryAttacksInfo/CountryAttacksInfo'
import { attackTypes } from '../Globe/data/attackTypes'
import { countryMapping } from '../Globe/data/countryMapping'
import { geoData } from '../Globe/data/geoData'
import { victimsData } from '../Globe/data/victimsData'
import { getAttacksInfo, getInjuriesInfo } from '../Globe/Globe'
import { GlobeCounters } from '../Globe/GlobeCounters/GlobeCounters'
import { WorldMap } from '../Globe/WorldMap/WorldMap'
import { createEarth } from '../Home/Home'
import { ReactComponent as BrainI } from './brain.svg'
import './Presentation.css'

export function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrentIndex((o) => o + 1)
      else if (e.key === 'ArrowLeft') setCurrentIndex((o) => o - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="presentation">
      <div className="slide">
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%' }}
          >
            {slides[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const slides = [
  <First />,
  <Domain />,
  <Data />,
  <Visualizations />,
  <GlobeSlide />,
  <OverallStats />,
  <LineAndPie />,
  <AttackedCountries />,
  <TopTerroristGroups />,
  <Summary />,
]

function First() {
  return (
    <div className="first-slide">
      <div className="big-text">Exploring terrorist activity</div>
      <div className="team-section">
        <div>PRESENTED BY</div>
        <div>Ali OMAROV</div>
        <div>Esra GÜCÜKBEL</div>
        <div>Evgenia SLIVKO</div>
      </div>
    </div>
  )
}

function Domain() {
  return (
    <div className="domain-slide">
      <hr />
      <div className="left-part">
        <h1>Try It Yourself</h1>
        <div>
          <p>Open our visualization on your device</p>
          <p>to get full experience</p>
        </div>
        <p>We support desktops and phones</p>
        <p className="medium t-secondary">Use link in the chat or this QR code</p>
        <img src="qr.png" alt="qr" />
      </div>
      <div className="right-part">
        <h1>Domain</h1>
        <div>
          <p>History of terrorist activity</p>
          <p>contains many valuable insights</p>
        </div>
        <div>
          <p>This information can help,</p>
          <p>for example, policy makers to make</p>
          <p>decisions to prevent future attacks</p>
        </div>
        <div>
          <p>
            Our users work at <span className="think-tank">think tanks</span>
          </p>
          <p>and can discover these insights</p>
        </div>
        <div className="brain">
          <BrainI />
        </div>
      </div>
    </div>
  )
}

function Data() {
  return (
    <div className="data-slide">
      <div className="content">
        <h1>GTD</h1>
        <p>Our data source is global terrorist database</p>
        <p>It includes more than 200,000 terrorist attacks dating back to 1970</p>
        <div className="hr-o">
          <div className="hr" />
        </div>
        <p>All definitions are taken from there and available on demand on every page</p>
        <p className="medium definition">
          <i>
            "Terrorist attack is the threatened or actual use of force by a nonstate actor to attain a political or
            religious goal through fear or intimidation"
          </i>
        </p>
      </div>
      <div className="mary">
        <div className="mary-backdrop" />
        <div className="mary-description small">University of Maryland - GTD creator</div>
      </div>
    </div>
  )
}

function Visualizations() {
  return (
    <div className="visualizations-slide">
      <h1 className="large-h">visualizations</h1>
    </div>
  )
}

function GlobeSlide() {
  const [country, setCountry] = useState('')
  const [years] = useState(geoData.map((d) => d.year))
  const currentYearS = useState(years.length - 1)
  const [currentYearI, setCurrentYearI] = currentYearS
  const worldMapData = geoData.find((d) => d.year === years[currentYearI])!.data

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
    isPlaying ? 1e3 / 2 : null,
  )

  const countryName = (countryMapping as any)[country]

  return (
    <div className="globe-slide">
      <div className="globe-country-name">
        <p>{countryName || 'Globe'}</p>
      </div>
      <div className="globe-cards left">
        <div className="globe-card small">
          <div className="globe-card-header">Why 3d?</div>
          It represents real country sizes without distortions that characterize the Mercator projection.
        </div>
        <div className="globe-card small">
          <div className="globe-card-header">Colorization</div>
          Lower values are lighter and transition to darker colors for higher number of incidents.
        </div>
      </div>
      <div className="world-map">
        <WorldMap
          onCountryClick={(c) => {
            setIsPlaying(false)
            setCurrentYearI(years.length - 1)
            setCountry(c)
          }}
          data={worldMapData}
          ignoreDeltas={true}
        />
      </div>
      <div className="world-map-timeline">
        <PlayBtn isPlayingS={isPlayingS} />
        <Slider points={years} currentIndexS={currentYearS} />
      </div>
      <div className="globe-cards right">
        <div className="globe-card small">
          <div className="globe-card-header">Interactions</div>
          This chart provides an ability to rotate and and scale itself as the primary mean of navigation.
        </div>
        <div className="globe-card small">
          <div className="globe-card-header">Timeline</div>
          Users can see how terrorist activity developed over time
        </div>
      </div>
    </div>
  )
}

function OverallStats() {
  const [country, setCountry] = useState('')
  const [years] = useState(geoData.map((d) => d.year))
  const currentYearS = useState(years.length - 1)
  const [currentYearI, setCurrentYearI] = currentYearS
  const worldMapData = geoData.find((d) => d.year === years[currentYearI])!.data

  const countryName = (countryMapping as any)[country]

  const [showAttacks, setShowVictims] = useState(true)

  const { affiliated, total, unknown } = getAttacksInfo(country)
  const { casualties, fatalities, injuries } = getInjuriesInfo(country)

  return (
    <div className="globe-slide">
      <div className="globe-attacks-info">
        <div className="globe-attacks-info-i">
          <p>{countryName}</p>
          <GlobeCounters
            affiliated={affiliated}
            fatalitiesCount={fatalities}
            injuriesCount={injuries}
            showAttacks={showAttacks}
            casualties={casualties}
            totalCount={total}
            unknown={unknown}
          />
          <Btn text={showAttacks ? 'Show Victims' : 'Show Attacks'} onClick={() => setShowVictims((old) => !old)} />
        </div>
      </div>
      <div className="world-map right">
        <WorldMap
          onCountryClick={(c) => {
            setCurrentYearI(years.length - 1)
            setCountry(c)
          }}
          data={worldMapData}
          ignoreDeltas={true}
          scaleBy={0.045}
        />
      </div>
    </div>
  )
}

function LineAndPie() {
  const [country, setCountry] = useState('')
  const [years] = useState(geoData.map((d) => d.year))
  const currentYearS = useState(years.length - 1)
  const [currentYearI, setCurrentYearI] = currentYearS
  const worldMapData = geoData.find((d) => d.year === years[currentYearI])!.data

  const countryName = (countryMapping as any)[country]

  const lineData = victimsData.find((d) => d.id === country)!.data
  const pieData = attackTypes.find((d) => d.id === country)!.data
  const globeShown = country === ''

  return (
    <div className="globe-slide historical">
      <div className="world-map left">
        <WorldMap
          onCountryClick={(c) => {
            setCurrentYearI(years.length - 1)
            setCountry(c)
          }}
          data={worldMapData}
          ignoreDeltas={true}
          scaleBy={0.045}
        />
      </div>
      <div className="globe-pie-and-line">
        <p>{countryName}</p>
        <div className="line-card line-card-top">
          <Victims data={lineData} globeShown={globeShown} />
        </div>
        <div className="line-card line-card-bottom">
          <AttackTypesPie data={pieData} />
        </div>
      </div>
    </div>
  )
}

function AttackedCountries() {
  return (
    <div className="attacked-countries">
      <p>Most attacked countries</p>
      <div className="attacked-countries-chart">
        <MostAttackedCountries />
      </div>
    </div>
  )
}

function TopTerroristGroups() {
  return (
    <div className="top-terrorist-groups">
      <p>Top 5 active terrorist groups</p>
      <TerroristGroups />
    </div>
  )
}

function Summary() {
  const [isEarthVisible, setIsEarthVisible] = useState(false)
  const earthStyle = { opacity: isEarthVisible ? 1 : 0 }

  useEffect(() => {
    setTimeout(() => createEarth('earth', () => setIsEarthVisible(true)), 500)
  }, [])

  return (
    <div className="summary-slide">
      <h1>Summary</h1>
      <div className="c-y">
        <p className="we-learnt">Key learnings</p>
        <ul>
          <li>
            Application of design fundamentals
            <ul>
              <li>Visual hierarchy</li>
              <li>Whitespace</li>
              <li>Contrast</li>
              <li>Typography</li>
              <li>Alignment</li>
            </ul>
          </li>
          <li>Responsive chart rendering</li>
          <li>Physics based animations</li>
          <li>3D design</li>
        </ul>
      </div>
      <div className={'earth-o'} style={{ ...earthStyle, right: '-5%' }}>
        <div id="earth" style={{ width: '70vw', maxWidth: '110vh' }}>
          <div className="earth-glow"></div>
        </div>
      </div>
    </div>
  )
}
