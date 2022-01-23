import './MostAttackedCountries.css'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useRef, useState } from 'react'
import { mostAttackedData } from './mostAttackedData'
import { Slider } from '../../../utils/Slider/Slider'
import { colorMap, theme } from '../../../theme'

export function MostAttackedCountries() {
  const years = mostAttackedData.map((d) => d.year)
  const [currentYearI, setCurrentYearI] = useState(years.length - 1)

  const data = mostAttackedData.find((d) => d.year === years[currentYearI])!.data

  return (
    <div className="most-attacked">
      <div>
        <Slider points={years} currentIndexS={[currentYearI, setCurrentYearI]} />
      </div>
      <ResponsiveBar
        data={data}
        theme={bigTheme}
        colors={[colorMap.lightYellow, colorMap.orange]}
        keys={['affiliated', 'unknown']}
        indexBy="id"
        margin={{ top: 20, right: 130, bottom: 60, left: 55 }}
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
        axisLeft={{
          tickPadding: 12,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: 'Attack number',
          legendPosition: 'middle',
          legendOffset: 50,
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
            anchor: 'top-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 10,
            itemsSpacing: 16,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            symbolSize: 20,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  )
}

const bigTheme = JSON.parse(JSON.stringify(theme))
bigTheme.axis.ticks.text.fontSize = 16
bigTheme.axis.legend.text.fontSize = 16
