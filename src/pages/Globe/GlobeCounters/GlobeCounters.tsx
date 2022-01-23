import './GlobeCounters.css'
import { ReactComponent as BombI } from './bomb.svg'
import { ReactComponent as BossI } from './boss.svg'
import { ReactComponent as UnknownI } from './unknown.svg'
import { ReactComponent as CryI } from './cry.svg'
import { ReactComponent as CoffinI } from './coffin.svg'
import { ReactComponent as PatchI } from './patch.svg'
import { AnimatePresence, motion } from 'framer-motion'

export interface GlobeCounters {
  showVictims: boolean
  totalCount: number
  affiliated: number
  unknown: number
  casualties: number
  fatalitiesCount: number
  injuriesCount: number
}

export function GlobeCounters({
  showVictims,
  fatalitiesCount,
  injuriesCount,
  unknown,
  casualties,
  totalCount,
  affiliated,
}: GlobeCounters) {
  return (
    <div>
      <div className="latest-info">Overview</div>
      <div className="globe-counters">
        <AnimatePresence>
          <motion.div key={'' + showVictims} variants={sV} initial="from" animate="to" exit="exit">
            {showVictims && (
              <div className="cards">
                <div className="total-count">
                  <div className="icon-box">
                    <BombI />
                  </div>
                  <div>
                    <div className="count-label">Total count</div>
                    <div className="count-value">{totalCount}</div>
                  </div>
                </div>
                <div className="affiliated-percentage">
                  <div className="icon-box">
                    <BossI />
                  </div>
                  <div>
                    <div className="count-label">Affiliated</div>
                    <div className="count-value">{percent(affiliated, affiliated + unknown)}</div>
                  </div>
                </div>
                <div className="unknown-percentage">
                  <div className="icon-box">
                    <UnknownI />
                  </div>
                  <div>
                    <div className="count-label">Unknown</div>
                    <div className="count-value">{percent(unknown, affiliated + unknown)}</div>
                  </div>
                </div>
              </div>
            )}
            {!showVictims && (
              <div className="cards">
                <div className="casualties">
                  <div className="icon-box">
                    <CryI />
                  </div>
                  <div>
                    <div className="count-label">Casualties</div>
                    <div className="count-value">{casualties}</div>
                  </div>
                </div>
                <div className="fatalities-count">
                  <div className="icon-box">
                    <CoffinI />
                  </div>
                  <div>
                    <div className="count-label">Killed</div>
                    <div className="count-value">{fatalitiesCount}</div>
                  </div>
                </div>
                <div className="injuries-count">
                  <div className="icon-box">
                    <PatchI />
                  </div>
                  <div>
                    <div className="count-label">Injured</div>
                    <div className="count-value">{injuriesCount}</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const sV = {
  from: {
    opacity: 0.5,
    x: 32,
    transition: { duration: 0.5 },
  },
  to: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    x: -32,
    transition: { duration: 0.25 },
  },
}

const percent = (value: number, total: number) => Math.round((value / total) * 100) + '%'
