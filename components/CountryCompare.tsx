import { Country } from '@/types/country'
import { useEffect, useState } from 'react'

export default function CountryCompare({
  country1,
  country2,
}: {
  country1: Country | null
  country2: Country | null
}) {
  const [isWideScreen, setIsWideScreen] = useState(false)

  useEffect(() => {
    const checkWidth = () => {
      setIsWideScreen(window.innerWidth >= 768)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  if (!country1 || !country2)
    return (
      <div style={{ textAlign: 'center', color: '#6B7280' }}>
        No countries to compare
      </div>
    )

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: isWideScreen ? '1fr 1fr' : '1fr',
      gap: '2rem',
      padding: '2rem',
      backgroundColor: '#f0f4f8',
      borderRadius: '0.5rem',
    },
    card: {
      border: '1px solid #e5e7eb',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      transition: 'background-color 0.3s ease',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#333',
    },
    paragraph: {
      margin: '0.25rem 0',
      color: '#555',
    },
  }

  return (
    <div style={styles.container}>
      {[country1, country2].map((country, idx) => (
        <div key={idx} style={styles.card}>
          <h2 style={styles.title}>{country.name.common}</h2>
          <p style={styles.paragraph}>
            <strong>Region:</strong> {country.region}
          </p>
          <p style={styles.paragraph}>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p style={styles.paragraph}>
            <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
          </p>
          <p style={styles.paragraph}>
            <strong>Currency:</strong>{' '}
            {country.currencies
              ? Object.values(country.currencies)[0].name
              : 'N/A'}
          </p>
          <p style={styles.paragraph}>
            <strong>Languages:</strong>{' '}
            {country.languages
              ? Object.values(country.languages).join(', ')
              : 'N/A'}
          </p>
        </div>
      ))}
    </div>
  )
}
