import axios from 'axios'
import { Country } from '@/types/country'

const BASE_URL = 'http://localhost:4000'

export const getAllCountries = async (): Promise<Country[]> => {
  const res = await axios.get(`${BASE_URL}/countries`)
  return res.data
}

export const getCountryByCode = async (code: string): Promise<Country> => {
  const res = await axios.get(`${BASE_URL}/countries/${code}`)
  return res.data
}

export const searchCountries = async (params: Record<string, string>): Promise<Country[]> => {
  const query = new URLSearchParams(params).toString()
  const res = await axios.get(`${BASE_URL}/countries/search?${query}`)
  return res.data
}
