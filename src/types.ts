import { copyTextToClipboard, rnd } from './utils'

export type CountryId = string // id - 'RUS', '' - for all

// mapping
export type CountyIdAndName = { [key in CountryId]: string }

// injuries & affiliated
export type LineData = { x: number; y: number }[] // x - year
export type AttackDataId = string // 'injuries' | 'fatalities' - 'affiliated' = injuries, 'unknown' = fatalities
export type AttackLineData = { id: AttackDataId; data: LineData }[] // goes into chart
export type InjuriesOrAffiliatedData = { id: CountryId; data: AttackLineData }[]

// attack type
export type PieSectorId = string // 'Other', 'Bombing', ...
export type Percent = number // 0-100
export type AttackPieData = { id: PieSectorId; value: Percent }[] // goes into chart
export type AttackPie = { id: CountryId; data: AttackPieData }
export type AttackTypeData = AttackPie[]

// world map
export type CountryValue = number // used to set color
export type CountryData = { id: CountryId; value: CountryValue; killed: number; wounded: number }[] // goes into chart
export type WorldMap = { year: number; data: CountryData }[]

function genVictims() {
  const r: InjuriesOrAffiliatedData = ids.map((id) => {
    return {
      id,
      data: [
        {
          id: 'injuries',
          data: years.map((y) => ({ x: +y, y: rnd(450) })),
        },
        {
          id: 'fatalities',
          data: years.map((y) => ({ x: +y, y: rnd(225) })),
        },
      ],
    }
  })
  return r
}

function genAttackTypes() {
  const r: AttackTypeData = ids.map((id): AttackPie => {
    const v1 = rnd(50 - 4 - 5) + 5
    const v2 = rnd(35 - 3 - 5) + 5
    const v3 = rnd(15 - 3 - 5) + 5

    const rest = 100 - v1 - v2 - v3
    return {
      id,
      data: [
        {
          id: 'Other',
          value: rest,
        },
        {
          id: 'Assassination',
          value: v1,
        },
        {
          id: 'Bombing',
          value: v2,
        },
        {
          id: 'Armed Assault',
          value: v3,
        },
      ],
    }
  })
  return r
}

function genAttacks() {
  const r: InjuriesOrAffiliatedData = ids.map((id) => {
    return {
      id,
      data: [
        {
          id: 'affiliated',
          data: years.map((y) => ({ x: +y, y: rnd(35) })),
        },
        {
          id: 'unknown',
          data: years.map((y) => ({ x: +y, y: rnd(45) })),
        },
      ],
    }
  })
  return r
}

function genMap(): WorldMap {
  return years.map((y) => ({
    year: y,
    data: ids.slice(1).map((id) => ({ id, value: rnd(70), wounded: rnd(450), killed: rnd(225) })) as CountryData,
  }))
}

export function gen() {
  // copyTextToClipboard(JSON.stringify(genAttackTypes(), null, 2))
}

const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]

const ids = [
  '',
  'SWE',
  'COD',
  'AFG',
  'AGO',
  'ALB',
  'ARE',
  'ARG',
  'ARM',
  'ATA',
  'ATF',
  'AUT',
  'AZE',
  'BDI',
  'BEL',
  'BEN',
  'BFA',
  'BGD',
  'BGR',
  'BHS',
  'BIH',
  'BLR',
  'BLZ',
  'BOL',
  'BRN',
  'BTN',
  'BWA',
  'CAF',
  'CAN',
  'BRA',
  'CHE',
  'CHL',
  'CHN',
  'CIV',
  'CMR',
  'COG',
  'COL',
  'CRI',
  'CUB',
  '-99',
  'CYP',
  'CZE',
  'DEU',
  'DJI',
  'DNK',
  'DOM',
  'DZA',
  'ECU',
  'EGY',
  'ERI',
  'ESP',
  'EST',
  'ETH',
  'FIN',
  'FJI',
  'FLK',
  'FRA',
  'GAB',
  'GBR',
  'GEO',
  'GHA',
  'GIN',
  'GMB',
  'GNB',
  'GNQ',
  'GRC',
  'GTM',
  'GUY',
  'HND',
  'HRV',
  'HTI',
  'HUN',
  'IDN',
  'IND',
  'IRL',
  'IRN',
  'IRQ',
  'ISL',
  'ISR',
  'ITA',
  'JAM',
  'JOR',
  'JPN',
  'KAZ',
  'KEN',
  'KGZ',
  'KHM',
  'OSA',
  'KWT',
  'LAO',
  'LBN',
  'LBR',
  'LBY',
  'LKA',
  'LSO',
  'LTU',
  'LUX',
  'LVA',
  'MAR',
  'MDA',
  'MDG',
  'MEX',
  'MKD',
  'MLI',
  'MMR',
  'MNE',
  'MNG',
  'MOZ',
  'MRT',
  'MWI',
  'MYS',
  'NAM',
  'NCL',
  'NER',
  'NGA',
  'NIC',
  'NLD',
  'NOR',
  'NPL',
  'NZL',
  'OMN',
  'PAK',
  'PAN',
  'PER',
  'PHL',
  'PNG',
  'POL',
  'PRI',
  'PRT',
  'PRY',
  'QAT',
  'ROU',
  'RUS',
  'RWA',
  'ESH',
  'SAU',
  'SDN',
  'SDS',
  'SEN',
  'SLB',
  'SLE',
  'SLV',
  'ABV',
  'SOM',
  'SRB',
  'SUR',
  'SVK',
  'SVN',
  'SWZ',
  'SYR',
  'TCD',
  'TGO',
  'THA',
  'TJK',
  'TKM',
  'TLS',
  'TTO',
  'TUN',
  'TUR',
  'TWN',
  'TZA',
  'UGA',
  'UKR',
  'URY',
  'USA',
  'UZB',
  'VEN',
  'VNM',
  'VUT',
  'PSE',
  'YEM',
  'ZAF',
  'ZMB',
  'ZWE',
  'KOR',
]
