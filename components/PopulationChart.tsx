// components/PopulationChart.tsx

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Country } from '@/types/country'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function PopulationChart({ countries }: { countries: Country[] }) {
  const data = {
    labels: countries.map((country) => country.name.common),
    datasets: [
      {
        label: 'Population',
        data: countries.map((country) => country.population),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  return <Bar data={data} />
}
