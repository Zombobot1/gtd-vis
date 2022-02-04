export const colorMap = {
  // blue: '#044997',
  // lightBlue: '#2E6FB8',
  // aqua: '#3AB9BB',
  // lightAqua: '#75E3B5',
  lightYellow: '#e8c1a0',
  lightOrange: '#ffa251',
  orange: '#f18e39',
  lightRed: '#f47560',
  lightRed2: '#eb5656',
  red: '#CC3535',
  darkRed: '#B00000',
  darkRed3: '#7c100d',
  darkRed2: '#6a0c0a',
}

export const colors = [
  colorMap.darkRed2,
  colorMap.darkRed3,
  colorMap.darkRed,
  colorMap.red,
  colorMap.lightRed2,
  colorMap.lightRed,
  colorMap.orange,
  colorMap.lightOrange,
  colorMap.lightYellow,
]

export const pieColors = [
  colorMap.lightRed,
  colorMap.red,
  colorMap.orange,
  colorMap.darkRed,
  colorMap.lightOrange,
  colorMap.lightYellow,
]

export const theme = {
  textColor: '#333333',
  fontSize: 11,
  crosshair: {
    line: {
      stroke: '#fff',
      strokeWidth: 1,
      strokeOpacity: 0.55,
    },
  },
  axis: {
    domain: {
      line: {
        stroke: '#da8181',
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fontSize: 12,
        fill: '#ffffff',
      },
    },
    ticks: {
      line: {
        stroke: '#ffffff',
        strokeWidth: 1,
      },
      text: {
        fontSize: 11,
        fill: '#ffffff',
      },
    },
  },
  grid: {
    line: {
      stroke: '#dddddd',
      strokeWidth: 1,
    },
  },
  legends: {
    title: {
      text: {
        fontSize: 11,
        fill: '#ffffff',
      },
    },
    text: {
      fontSize: 14,
      fill: '#ffffff',
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: '#333333',
      },
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: '#333333',
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    link: {
      stroke: '#000000',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    outline: {
      stroke: '#000000',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    symbol: {
      fill: '#000000',
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
  },
  tooltip: {
    container: {
      background: '#ffffff',
      color: '#333333',
      fontSize: 12,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
}
