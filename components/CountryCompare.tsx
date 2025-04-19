import { Country } from '@/types/country'

export default function CountryCompare({
  country1,
  country2,
}: {
  country1: Country | null
  country2: Country | null
}) {
  if (!country1 || !country2)
    return (
      <div style={{ textAlign: 'center', color: '#6B7280' }}>
        No countries to compare
      </div>
    )

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '2rem',
      padding: '2rem',
      backgroundColor: '#f0f4f8', // Light background color for the entire container
      borderRadius: '0.5rem',
    },
    containerMd: {
      display: 'grid',
      gap: '2rem',
      gridTemplateColumns: '1fr 1fr',
    },
    card: {
      border: '1px solid #e5e7eb',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff', // White background for each card
      transition: 'background-color 0.3s ease', // Smooth transition for hover effect
    },
    cardHover: {
      backgroundColor: '#f3f4f6', // Background color on hover
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#333', // Dark text for readability
    },
    paragraph: {
      margin: '0.25rem 0',
      color: '#555', // Light gray text for better contrast
    },
  }

  // Optional: responsive layout handling
  const isClient = typeof window !== 'undefined'
  const useResponsiveStyle = () =>
    isClient && window.innerWidth >= 768 ? styles.containerMd : styles.container

  const containerStyle =
    typeof window === 'undefined' ? styles.container : useResponsiveStyle()

  return (
    <div style={containerStyle}>
      <div
        style={{
          ...styles.card,
          ...(typeof window !== 'undefined' &&
          window.innerWidth >= 768
            ? styles.cardHover
            : {}),
        }}
      >
        <h2 style={styles.title}>{country1.name.common}</h2>
        <p style={styles.paragraph}>
          <strong>Region:</strong> {country1.region}
        </p>
        <p style={styles.paragraph}>
          <strong>Population:</strong> {country1.population.toLocaleString()}
        </p>
        <p style={styles.paragraph}>
          <strong>Capital:</strong> {country1.capital?.[0] || 'N/A'}
        </p>
        <p style={styles.paragraph}>
          <strong>Currency:</strong>{' '}
          {country1.currencies
            ? Object.values(country1.currencies)[0].name
            : 'N/A'}
        </p>
        <p style={styles.paragraph}>
          <strong>Languages:</strong>{' '}
          {country1.languages
            ? Object.values(country1.languages).join(', ')
            : 'N/A'}
        </p>
      </div>

      <div
        style={{
          ...styles.card,
          ...(typeof window !== 'undefined' &&
          window.innerWidth >= 768
            ? styles.cardHover
            : {}),
        }}
      >
        <h2 style={styles.title}>{country2.name.common}</h2>
        <p style={styles.paragraph}>
          <strong>Region:</strong> {country2.region}
        </p>
        <p style={styles.paragraph}>
          <strong>Population:</strong> {country2.population.toLocaleString()}
        </p>
        <p style={styles.paragraph}>
          <strong>Capital:</strong> {country2.capital?.[0] || 'N/A'}
        </p>
        <p style={styles.paragraph}>
          <strong>Currency:</strong>{' '}
          {country2.currencies
            ? Object.values(country2.currencies)[0].name
            : 'N/A'}
        </p>
        <p style={styles.paragraph}>
          <strong>Languages:</strong>{' '}
          {country2.languages
            ? Object.values(country2.languages).join(', ')
            : 'N/A'}
        </p>
      </div>
    </div>
  )
}
