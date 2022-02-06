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

function AttacksChart({ data: initialData, legends, globeShown }: AttacksChart_) {
  let data = [...initialData]
  if (globeShown) data = data.map((d) => ({ id: d.id, data: d.data.map((p) => ({ x: p.x, y: p.y / 1000 })) }))

  return (
    <div className="line">
      <div className="y-label">Count {globeShown ? '(in T)' : ''}</div>
      <ResponsiveLine
        data={data}
        colors={[colorMap.lightRed, colorMap.lightYellow]}
        theme={theme}
        curve="catmullRom"
        enableSlices="x"
        margin={{ top: 55, right: 30, bottom: 45, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        yFormat=""
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: [2011, 2013, 2015, 2017, 2019],
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 5,
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
            translateX: 60,
            translateY: -35,
            itemsSpacing: 16,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: 'circle',
            data: [
              { id: '2', label: legends[0], color: colorMap.lightRed },
              { id: '1', label: legends[1], color: colorMap.lightYellow },
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
  inPanel?: boolean
}

function AttackTypes({ data: initialData, inPanel }: AttackTypes_) {
  const data = sort(initialData, (d) => d.value).map((d, i) => ({ id: i, value: d.value, label: d.id }))
  return (
    <div className="pie-container" style={inPanel ? { paddingTop: '1rem', height: '19rem' } : {}}>
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
          tooltip={(d) => {
            return (
              <div className="pie-tooltip">
                {d.datum.label}: <b>{d.datum.value}</b>
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}

export interface VictimsOrAttacks {
  data: AttackLineData
  globeShown: boolean
}

export function Victims({ data, globeShown }: VictimsOrAttacks) {
  return <AttacksChart data={data} legends={['Fatalities', 'Injuries']} globeShown={globeShown} />
}

export interface CountryAttacksInfo {
  data: AttackPieData
  inPanel?: boolean
}

export function AttackTypesPie({ data, inPanel }: CountryAttacksInfo) {
  return <AttackTypes data={data} inPanel={inPanel} />
}
