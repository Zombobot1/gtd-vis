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
export type AttackPie = { id: CountryId; data: { id: PieSectorId; data: AttackPieData } }
export type AttackTypeData = AttackPie[]

// world map
export type CountryValue = number // used to set color
export type CountryData = { id: CountryId; value: CountryValue; killed: number; wounded: number }[] // goes into chart
export type WorldMap = { year: number; data: CountryData }[]
