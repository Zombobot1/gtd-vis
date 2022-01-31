import './App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ResponsiveChoroplethCanvas } from '@nivo/geo'
import { WorldMap } from './pages/Globe/WorldMap/WorldMap'
import {
  AttackTypesPie,
  CountryAttacksInfo,
  VictimsOrAttacks,
} from './pages/Globe/CountryAttacksInfo/CountryAttacksInfo'
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

function App() {
  return (
    <BrowserRouter basename="/gtd-vis/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="globe" element={<Globe />} />
        <Route path="details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

/*

Global Terrorism Dashboard
The Dashboard is based on the data from Global Terrorism Database GTD. The GTD is an event-level database containing more than 200,000 records of terrorist attacks that took place around the world since 1970. It is maintained by the National Consortium for the Study of Terrorism and Responses to Terrorism (START) at the University of Maryland.

The GTD defines a terrorist attack as the threatened or actual use of illegal force and violence by a nonstate actor to attain a political, economic, religious, or social goal through fear, coercion, or intimidation. The Dashboard does not include attacks that were attempted but ultimately unsuccessful. Success of a terrorist strike is defined according to the tangible effects of the attack. Success is not judged in terms of the larger goals of the perpetrators.

Number of Fatalities - the number of total confirmed fatalities for the incident. The number includes all victims and attackers who died as a direct result of the incident.

Number of Injured - the number of confirmed non-fatal injuries to both perpetrators and victims.

affiliated/NonOrganized - the total number of attacks is divided into 2 categories: affiliated and nonorganized, on the basis of the information from GTD about the group name (field 'gname' in GTD) that carried out the attack. If no information about the perpetrator group is available and field 'gname' is equal to 'Unknown', the attack is considered as nonorganized.


Safety map
Safety map shows the level of safety based on the number of terrorist attacks since 1970. Map reflects the current level of safety based on safety index that gives more weight to the more recent years.

Countries with the highest number of affiliated and unknown attacks


Source: Global Terrorism Database(GTD)
*/
