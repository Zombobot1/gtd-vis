import { ReactNode, useState } from 'react'
import './Drawer.css'
import { ReactComponent as ChevronI } from './chevron.svg'
import { ReactComponent as ChevronBI } from './chevronB.svg'
import { ReactComponent as CurveI } from './curve.svg'
import { ReactComponent as HistI } from './histogram.svg'
import { State } from '../../../utils'
import { motion } from 'framer-motion'

export interface Drawer {
  children: ReactNode
  country: string
  side: 'left' | 'right'
  showBtn: boolean
  openS: State<boolean>
}

export function Drawer({ children, side, openS, showBtn, country }: Drawer) {
  const [open, setOpen] = openS
  const right = side === 'right'

  let drawerStyle = { transform: open ? 'translateX(0)' : 'translateX(-100%)' }
  if (right) drawerStyle = { transform: open ? 'translateX(0)' : 'translateX(100%)' }

  return (
    <>
      <div
        className={'drawer-o' + (right ? ' right' : '')}
        onClick={() => setOpen(false)}
        style={{ pointerEvents: open ? 'all' : 'none' }}
      >
        <div className={'drawer' + (!right ? ' left' : '')} style={drawerStyle} onClick={(e) => e.stopPropagation()}>
          {children}
          <div className={'drawer-btn-o' + (right ? ' right' : '')}>
            {open && (
              <div
                className="drawer-btn"
                onClick={() => setOpen((o) => !o)}
                style={!showBtn ? { display: 'none' } : {}}
              >
                <Rotate key={country}>
                  {open && right && <ChevronI style={{ transform: 'translate(2px, 3px)' }} />}
                  {open && !right && <ChevronBI style={{ transform: 'translate(-2px, 3px)' }} />}
                </Rotate>
              </div>
            )}
            {!open && (
              <div
                className="drawer-btn"
                onClick={() => setOpen((o) => !o)}
                style={!showBtn ? { display: 'none' } : {}}
              >
                <Rotate key={country}>
                  {!open && right && <CurveI style={{ width: '24px', transform: 'translate(-2px, 2px)' }} />}
                  {!open && !right && <HistI style={{ width: '24px', transform: 'translate(2px, 2px)' }} />}
                </Rotate>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={'drawer-backdrop' + (right ? ' right' : '')}
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
      ></div>
    </>
  )
}

function Rotate({ children }: { children: ReactNode }) {
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  )
}
