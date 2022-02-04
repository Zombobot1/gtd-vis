import './TerroristGroups.css'
import { ResponsiveLine } from '@nivo/line'
import { groupsData } from './groupsData'
import { colorMap, theme } from '../../../theme'
import { generate } from '../../../utils'
import { useIsMobile } from '../../../utils/hooks/useIsMobile'

export function TerroristGroups() {
  const mobile = useIsMobile()
  const data = mobile
    ? groupsData.map((d) => ({ id: shortenId(d.id), data: d.data.map((p) => ({ x: p.x, y: p.y / 100 })) }))
    : groupsData

  return (
    <div className="groups-line">
      <ResponsiveLine
        data={data}
        theme={mobile ? theme : bigTheme}
        curve="catmullRom"
        enableSlices="x"
        margin={{ top: mobile ? 70 : 50, right: mobile ? 15 : 30, bottom: 70, left: mobile ? 35 : 80 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 12,
          tickRotation: 0,
          legend: 'Year',
          legendOffset: mobile ? 48 : 56,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: mobile ? 4 : 12,
          tickRotation: 0,
          legend: mobile ? 'Attack number (in T)' : 'Attack number',
          legendOffset: mobile ? -30 : -75,
          legendPosition: 'middle',
          tickValues: generate(8, (i) => (i + 1) * (mobile ? 4 : 400)),
        }}
        enableGridX={false}
        enableGridY={false}
        colors={[colorMap.lightYellow, colorMap.orange, colorMap.lightRed, colorMap.red, colorMap.darkRed]}
        lineWidth={1}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        useMesh={true}
        legends={[
          {
            anchor: 'top-left',
            direction: 'row',
            translateX: mobile ? -30 : 0,
            translateY: mobile ? -70 : -50,
            itemsSpacing: mobile ? 0 : 8,
            itemDirection: 'left-to-right',
            itemWidth: mobile ? 60 : 180,
            itemHeight: mobile ? 10 : 20,
            symbolSize: mobile ? 8 : 12,
            symbolShape: 'circle',
            ...(mobile ? { itemDirection: 'top-to-bottom' } : {}),
          },
        ]}
      />
    </div>
  )
}

function shortenId(id: string): string {
  if (id === 'Boko Haram') return 'Boko'
  if (id === 'Al-Shabaab') return 'Shabaab'
  return id
}

const bigTheme = JSON.parse(JSON.stringify(theme))
bigTheme.axis.ticks.text.fontSize = 16
bigTheme.legends.text.fontSize = 16
bigTheme.axis.legend.text.fontSize = 16
