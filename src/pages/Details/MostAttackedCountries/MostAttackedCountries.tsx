import './MostAttackedCountries.css'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useRef, useState } from 'react'
import { mostAttackedData } from './mostAttackedData'
import { Slider } from '../../../utils/Slider/Slider'
import { colorMap, theme } from '../../../theme'
import { useIsMobile } from '../../../utils/hooks/useIsMobile'
import { countryMapping } from '../../Globe/data/countryMapping'

export function MostAttackedCountries() {
  const years = mostAttackedData.map((d) => d.year)
  const [currentYearI, setCurrentYearI] = useState(years.length - 1)

  const data = mostAttackedData.find((d) => d.year === years[currentYearI])!.data

  const mobile = useIsMobile()

  return (
    <div className="most-attacked">
      <ResponsiveBar
        data={data}
        theme={mobile ? theme : bigTheme}
        colors={[colorMap.lightYellow, colorMap.orange]}
        keys={['Affiliated', 'Unknown']}
        indexBy="id"
        margin={{ top: 35, right: mobile ? 10 : 30, bottom: 80, left: mobile ? 35 : 81 }}
        borderRadius={4}
        innerPadding={4}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisLeft={
          mobile
            ? {}
            : {
                tickPadding: 12,
                legend: 'Country',
                legendOffset: -75,
                legendPosition: 'middle',
              }
        }
        axisBottom={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: 'Attack number',
          legendPosition: 'middle',
          legendOffset: 50,
          ...(mobile ? { tickValues: 5 } : {}),
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 10]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'top-left',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: -35,
            itemsSpacing: 16,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            symbolSize: 15,
            symbolShape: 'circle',
          },
        ]}
        tooltip={(d) => {
          return (
            <div className="bar-tooltip">
              <span className="circle" style={{ backgroundColor: d.color }} />
              {`${(countryMapping as any)[d.indexValue]}`}
              <i>- {d.id}: </i>
              <b>{d.value}</b>
            </div>
          )
        }}
      />
      <div>
        <Slider points={years} currentIndexS={[currentYearI, setCurrentYearI]} />
      </div>
    </div>
  )
}

const bigTheme = JSON.parse(JSON.stringify(theme))
bigTheme.axis.ticks.text.fontSize = 16
bigTheme.axis.legend.text.fontSize = 16
