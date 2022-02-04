import './App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ResponsiveChoropleth, ResponsiveChoroplethCanvas } from '@nivo/geo'
import { WorldMap } from './pages/Globe/WorldMap/WorldMap'
import { AttackTypesPie, CountryAttacksInfo, Victims } from './pages/Globe/CountryAttacksInfo/CountryAttacksInfo'
import { mostAttackedData } from './pages/Details/MostAttackedCountries/mostAttackedData'
import { ResponsiveBar } from '@nivo/bar'
import { clamp, copyTextToClipboard, generate, isIn, rnd, State } from './utils'
import { MostAttackedCountries } from './pages/Details/MostAttackedCountries/MostAttackedCountries'
import { ResponsivePie } from '@nivo/pie'
import { TerroristGroups } from './pages/Details/TerroristGroups/TerroristGroups'
import { Slider } from './utils/Slider/Slider'
import useInterval from './utils/hooks/useInterval'
import { usePrevious } from './utils/hooks/usePrevious'
import { geoData } from './pages/Globe/data/geoData'
import { PlayBtn } from './utils/PlayBtn/PlayBtn'

import { Btn } from './utils/Btn/Btn'
import { Globe } from './pages/Globe/Globe'
import { Home } from './pages/Home/Home'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Details } from './pages/Details/Details'
import { AnimatePresence, motion } from 'framer-motion'
import { geoFeatures } from './pages/Globe/WorldMap/geoFeatures'
import useWindowSize from './utils/hooks/useWindowSize'
import { useIsMobile } from './utils/hooks/useIsMobile'
import { Nav } from './utils/Nav/Nav'
import { About } from './pages/About/About'

function App_() {
  const location = useLocation()
  const mobile = useIsMobile()
  const showAboutS = useState(false)
  const isEarthVisibleS = useState<boolean | undefined>(undefined)
  let className = 'app'
  console.log(location.pathname.includes('details'))
  if (!location.pathname.includes('details')) className += ' no-overflow'
  if (navigator.userAgent.includes('Win')) className += ' scrollable'

  let earthStyle = {}
  if (isEarthVisibleS[0] === undefined) earthStyle = { opacity: 0 }
  else if (isEarthVisibleS[0] === false) earthStyle = { opacity: 0, display: 'none' }
  return (
    <>
      <div className={className}>
        <About showAboutS={showAboutS} />
        <div className={'earth-o'} style={earthStyle}>
          <div id="earth" style={{ width: '70vw', maxWidth: '110vh' }}>
            <div className="earth-glow"></div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home showAboutS={showAboutS} isEarthVisibleS={isEarthVisibleS} />} />
          <Route path="globe" element={<Globe showAboutS={showAboutS} />} />
          <Route path="details" element={<Details showAboutS={showAboutS} />} />
        </Routes>
      </div>
      {/* <div>{mobile && <Nav showAboutS={showAboutS} />}</div> */}
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename="/gtd-vis/">
      <App_ />
    </BrowserRouter>
  )
}
export default App
