import { AnimatePresence, motion } from 'framer-motion'
import { State } from '../../utils'
import './About.css'

export interface About {
  showAboutS: State<boolean>
}

export function About({ showAboutS }: About) {
  const [show, setShow] = showAboutS

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="backdrop"
          onClick={() => setShow(false)}
          variants={backdropV}
          initial="from"
          animate="to"
          exit="exit"
        >
          <motion.div
            className={navigator.userAgent.includes('Win') ? 'about scrollable' : 'about'}
            onClick={(e) => e.stopPropagation()}
            variants={aboutV}
            initial="from"
            animate="to"
            exit="exit"
          >
            <h4>About Visualization</h4>
            <p>
              The Dashboard is based on the data from Global Terrorism Database GTD. The GTD is an event-level database
              containing more than 200,000 records of terrorist attacks that took place around the world since 1970. It
              is maintained by the National Consortium for the Study of Terrorism and Responses to Terrorism (START) at
              the University of Maryland.
            </p>
            <p>
              The GTD defines a terrorist attack as the threatened or actual use of illegal force and violence by a
              nonstate actor to attain a political, economic, religious, or social goal through fear, coercion, or
              intimidation. The Dashboard does not include attacks that were attempted but ultimately unsuccessful.
            </p>
            <p>
              Success of a terrorist strike is defined according to the tangible effects of the attack. Success is not
              judged in terms of the larger goals of the perpetrators. Number of Fatalities - the number of total
              confirmed fatalities for the incident. The number includes all victims and attackers who died as a direct
              result of the incident.
            </p>
            <p className="definitions">Definitions</p>
            <ul>
              <li>Number of Injured - the number of confirmed non-fatal injuries to both perpetrators and victims.</li>
              <li>
                Affiliated - the total number of attacks is divided into 2 categories: affiliated and nonorganized, on
                the basis of the information from GTD about the group name (field 'gname' in GTD) that carried out the
                attack.
              </li>
              <li>
                NonOrganized - If no information about the perpetrator group is available and field 'gname' is equal to
                'Unknown', the attack is considered as nonorganized.
              </li>
            </ul>
            <p className="source">Source: Global Terrorism Database(GTD)</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const backdropV = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { delay: 0.15 },
  },
}

const aboutV = {
  from: {
    opacity: 0,
    y: -160,
  },
  to: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 },
  },
  exit: {
    opacity: 0,
    y: 160,
  },
}
