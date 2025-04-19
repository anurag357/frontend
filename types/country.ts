export interface Country {
    name: { common: string; official: string }
    cca2: string
    capital?: string[]
    region: string
    population: number
    flags: { svg: string }
    timezones: string[]
    languages?: Record<string, string>
    currencies?: Record<string, { name: string; symbol: string }>
  }
  