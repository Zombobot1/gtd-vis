import './CountryAttacksInfo.css'
import { ResponsiveLine } from '@nivo/line'
import { attacksData } from '../data/attacksData'
import { victimsData } from '../data/victimsData'
import { ResponsivePie } from '@nivo/pie'
import { attackTypes } from '../data/attackTypes'
import { colorMap, colors, pieColors, theme } from '../../../theme'
import { AttackLineData, AttackPieData } from '../../../types'
import { sort } from '../../../utils'

interface AttacksChart_ {
  data: AttackLineData
  legends: string[]
  globeShown: boolean
}

function AttacksChart({ data, legends, globeShown }: AttacksChart_) {
  return (
    <div className="line">
      <p className="y-label">Numbers(T)</p>
      <p className="x-label">year</p>
      <ResponsiveLine
        data={data}
        colors={[colorMap.lightYellow, colorMap.lightRed]}
        theme={theme}
        curve="catmullRom"
        enableSlices="x"
        margin={{ top: 50, right: 30, bottom: 45, left: 65 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        crosshairType="bottom"
        useMesh={true}
        legends={[
          {
            anchor: 'top-left',
            direction: 'row',
            justify: false,
            translateX: -33,
            translateY: -32,
            itemsSpacing: 16,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: 'circle',
            data: [
              { id: '2', label: legends[0], color: colorMap.lightYellow },
              { id: '1', label: legends[1], color: colorMap.lightRed },
            ],
          },
        ]}
      />
    </div>
  )
}

type PieData = {
  id: string
  value: number
}[]

interface AttackTypes_ {
  data: PieData
}

function AttackTypes({ data }: AttackTypes_) {
  return (
    <div className="pie-container">
      <div className="pie-header">Attack %</div>
      <div className="pie">
        <ResponsivePie
          data={data}
          theme={theme}
          colors={pieColors}
          margin={{ top: 30, right: -10, bottom: 20, left: 0 }}
          innerRadius={0.85}
          padAngle={2}
          cornerRadius={8}
          activeOuterRadiusOffset={8}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          legends={[
            {
              anchor: 'center',
              direction: 'column',
              justify: false,
              translateX: -44,
              translateY: -1,
              itemsSpacing: 8,
              itemWidth: 42,
              itemHeight: 18,
              itemTextColor: '#fff',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
            },
          ]}
        />
      </div>
    </div>
  )
}

export interface VictimsOrAttacks {
  data: AttackLineData
  globeShown: boolean
}

export function VictimsOrAttacks({ data, globeShown }: VictimsOrAttacks) {
  return <AttacksChart data={data} legends={['Fatalities', 'Injuries']} globeShown={globeShown} />
}

export interface CountryAttacksInfo {
  data: AttackPieData
}

export function AttackTypesPie({ data }: CountryAttacksInfo) {
  return <AttackTypes data={data} />
}
