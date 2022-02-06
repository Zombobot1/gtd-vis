import { Btn } from '../../utils/Btn/Btn'
import './Home.css'
import { ReactComponent as ShieldI } from './shield.svg'
import scaryBoi from './scaryBoi.webp'
import { useNavigate } from 'react-router-dom'
import { animate, motion } from 'framer-motion'
import { ResponsiveChoropleth, ResponsiveChoroplethCanvas } from '@nivo/geo'
import { useEffect, useRef, useState } from 'react'
import useWindowSize from '../../utils/hooks/useWindowSize'
import useInterval from '../../utils/hooks/useInterval'
import { geoFeatures } from '../Globe/WorldMap/geoFeatures'
import { useTimeout } from '../../utils/hooks/useTimeout'
import { useIsMobile } from '../../utils/hooks/useIsMobile'
import { State } from '../../utils'
import { Nav } from '../../utils/Nav/Nav'

export interface Home {
  showAboutS: State<boolean>
  isEarthVisibleS: State<boolean | undefined>
}

declare class Earth {
  constructor(...a: any[])
  addEventListener: (...a: any[]) => void
}

export function Home({ showAboutS, isEarthVisibleS }: Home) {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)

  const mobile = useIsMobile()

  useEffect(() => {
    if (ready) isEarthVisibleS[1](true)
  }, [ready])

  useEffect(() => {
    const earth = document.querySelector('#earth')
    if (!earth?.getAttribute('data-exists')) {
      setTimeout(() => createEarth('earth', () => setReady(true)), 500)
      earth?.setAttribute('data-exists', 'true')
    } else {
      isEarthVisibleS[1](true)
    }
    return () => {
      isEarthVisibleS[1](false)
    }
  }, [])

  return (
    <div className="home">
      <div className="title-o">
        <motion.div initial="from" animate="to" exit="from" variants={titleV}>
          <div className="title">
            <div className="gtd">
              <ShieldI />
              GTD
            </div>
            {!mobile && (
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
                <div className="link underline" onClick={() => showAboutS[1](true)}>
                  About
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <main>
        <motion.div initial="from" animate="to" exit="from" variants={mainV} className="hero">
          <h1>Explore Terrorist Activity</h1>
          <p className="text">Get insights from the data to help policy makers with choosing optimal countermeasures</p>
          {!mobile && (
            <div className="ctas">
              <Btn className="cta" text="Explore data" onClick={() => navigate('globe')} />
              <div
                className="link underline"
                onClick={() => window.open(location.pathname + 'presentation', '_blank')?.focus()}
              >
                Presentation
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {mobile && (
        <motion.div initial="from" animate="to" exit="from" variants={mainV} className="hero">
          <div className="ctas">
            <Btn className="cta" text="Explore data" onClick={() => navigate('globe')} />
            <div
              className="link underline presentation-link"
              onClick={() => window.open(location.pathname + 'presentation', '_blank')?.focus()}
            >
              Presentation
            </div>
          </div>
        </motion.div>
      )}
      {mobile && <Nav showAboutS={showAboutS} />}
    </div>
  )
}

export function createEarth(id: string, onReady: () => void) {
  const sprites = [] as any[]
  const earth = new Earth(id, {
    location: { lat: 30, lng: 80 },
    light: 'none',
    autoRotate: true,
    autoRotateDelay: 0,
    autoRotateStart: 1500,
    mapLandColor: 'rgba(24, 0, 0, 0.8)',
    mapSeaColor: 'rgba(87, 6, 6, 0.05)',
    mapBorderColor: '#4a0505',
    mapBorderWidth: 0.25,
    transparent: true,
    quality: 4,
    draggable: true,
  })

  earth.addEventListener('ready', function (this: any) {
    onReady()
    this.startAutoRotate()
    const line = {
      color: '#5a0606',
      opacity: 0.35,
      hairline: true,
      offset: -0.5,
    } as any

    for (const i in connections) {
      line.locations = [
        { lat: connections[i][0], lng: connections[i][1] },
        { lat: connections[i][2], lng: connections[i][3] },
      ]
      this.addLine(line)
    }

    for (let i = 0; i < 8; i++) {
      sprites[i] = this.addSprite({
        image: 'hologram-shine.svg',
        scale: 0.01,
        offset: -0.5,
        opacity: 0.5,
      })
      pulse(i)
    }
  })

  function getRandomInt(min: any, max: any) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  function pulse(index: any) {
    const random_location = connections[getRandomInt(0, connections.length - 1)]
    sprites[index].location = {
      lat: random_location[0],
      lng: random_location[1],
    }

    sprites[index].animate('scale', 0.5, {
      duration: 320,
      complete: function () {
        this.animate('scale', 0.01, {
          duration: 320,
          complete: function () {
            setTimeout(function () {
              pulse(index)
            }, getRandomInt(100, 400))
          },
        })
      },
    })
  }

  const connections = [
    [59.651901245117, 17.918600082397, 41.8002778, 12.2388889],
    [59.651901245117, 17.918600082397, 51.4706, -0.461941],

    [13.681099891662598, 100.74700164794922, -6.1255698204, 106.65599823],
    [13.681099891662598, 100.74700164794922, 28.566499710083008, 77.10310363769531],

    [30.12190055847168, 31.40559959411621, -1.31923997402, 36.9277992249],
    [30.12190055847168, 31.40559959411621, 25.2527999878, 55.3643989563],
    [30.12190055847168, 31.40559959411621, 41.8002778, 12.2388889],

    [28.566499710083008, 77.10310363769531, 7.180759906768799, 79.88410186767578],
    [28.566499710083008, 77.10310363769531, 40.080101013183594, 116.58499908447266],
    [28.566499710083008, 77.10310363769531, 25.2527999878, 55.3643989563],

    [-33.9648017883, 18.6016998291, -1.31923997402, 36.9277992249],

    [-1.31923997402, 36.9277992249, 25.2527999878, 55.3643989563],

    [41.8002778, 12.2388889, 51.4706, -0.461941],
    [41.8002778, 12.2388889, 40.471926, -3.56264],

    [19.4363, -99.072098, 25.79319953918457, -80.29060363769531],
    [19.4363, -99.072098, 33.94250107, -118.4079971],
    [19.4363, -99.072098, -12.0219, -77.114304],

    [-12.0219, -77.114304, -33.393001556396484, -70.78579711914062],
    [-12.0219, -77.114304, -34.8222, -58.5358],
    [-12.0219, -77.114304, -22.910499572799996, -43.1631011963],

    [-34.8222, -58.5358, -33.393001556396484, -70.78579711914062],
    [-34.8222, -58.5358, -22.910499572799996, -43.1631011963],

    [22.3089008331, 113.915000916, 13.681099891662598, 100.74700164794922],
    [22.3089008331, 113.915000916, 40.080101013183594, 116.58499908447266],
    [22.3089008331, 113.915000916, 31.143400192260742, 121.80500030517578],

    [35.552299, 139.779999, 40.080101013183594, 116.58499908447266],
    [35.552299, 139.779999, 31.143400192260742, 121.80500030517578],

    [33.94250107, -118.4079971, 40.63980103, -73.77890015],
    [33.94250107, -118.4079971, 25.79319953918457, -80.29060363769531],
    [33.94250107, -118.4079971, 49.193901062, -123.183998108],

    [40.63980103, -73.77890015, 25.79319953918457, -80.29060363769531],
    [40.63980103, -73.77890015, 51.4706, -0.461941],

    [51.4706, -0.461941, 40.471926, -3.56264],

    [40.080101013183594, 116.58499908447266, 31.143400192260742, 121.80500030517578],

    [-33.94609832763672, 151.177001953125, -41.3272018433, 174.804992676],
    [-33.94609832763672, 151.177001953125, -6.1255698204, 106.65599823],

    [55.5914993286, 37.2615013123, 59.651901245117, 17.918600082397],
    [55.5914993286, 37.2615013123, 41.8002778, 12.2388889],
    [55.5914993286, 37.2615013123, 40.080101013183594, 116.58499908447266],
    [55.5914993286, 37.2615013123, 25.2527999878, 55.3643989563],
  ]
}

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
