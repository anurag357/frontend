// lib/api.ts
import axios from 'axios'
import { Country } from '@/types/country'

export const getAllCountries = async (): Promise<Country[]> => {
  const res = await axios.get('http://localhost:4000/countries')
  return res.data
}

export const getCountryByCode = async (code: string): Promise<Country> => {
  const res = await axios.get(`http://localhost:4000/countries/${code}`)
  return res.data
}
