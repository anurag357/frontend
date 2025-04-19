import { getCountryByCode } from '@/services/api'
import { Country } from '@/types/country'
import { GetServerSideProps } from 'next'
import { getLocalTime } from '@/utils/time'
import Image from 'next/image'
import Link from 'next/link'

export default function CountryDetail({ country }: { country: Country }) {
  if (!country)
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
        Country not found.
      </div>
    )

  const styles = {
    main: {
      padding: '2rem',
      maxWidth: '64rem',
      margin: '2rem auto 0 auto',
      backgroundColor: '#fff',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    backLink: {
      color: '#2563eb',
      textDecoration: 'underline',
      display: 'inline-block',
      marginBottom: '1rem',
    },
    layout: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem',
    },
    layoutMd: {
      flexDirection: 'row' as const,
    },
    imageWrapper: {
      width: '100%',
    },
    detailWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 600,
      color: '#1F2937',
    },
    detailText: {
      color: '#374151',
      lineHeight: '1.5',
    },
    label: {
      fontWeight: 600,
    },
    flagImage: {
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  }

  return (
    <main style={styles.main}>
      <Link href="/" style={styles.backLink}>
        ← Back to Countries List
      </Link>
      <div
        style={{
          ...styles.layout,
          ...(typeof window !== 'undefined' && window.innerWidth >= 768
            ? styles.layoutMd
            : {}),
        }}
      >
        {/* Country Image Section */}
        <div style={styles.imageWrapper}>
          <Image
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            width={400}
            height={250}
            style={styles.flagImage}
          />
        </div>

        {/* Country Details Section */}
        <div style={styles.detailWrapper}>
          <h1 style={styles.title}>{country.name.common}</h1>
          <div style={styles.detailText}>
            <p>
              <strong style={styles.label}>Official Name:</strong>{' '}
              {country.name.official}
            </p>
            <p>
              <strong style={styles.label}>Capital:</strong>{' '}
              {country.capital?.[0] || 'N/A'}
            </p>
            <p>
              <strong style={styles.label}>Region:</strong> {country.region}
            </p>
            <p>
              <strong style={styles.label}>Population:</strong>{' '}
              {country.population.toLocaleString()}
            </p>
            <p>
              <strong style={styles.label}>Timezones:</strong>{' '}
              {country.timezones.join(', ')}
            </p>
            <p>
              <strong style={styles.label}>Local Time:</strong>{' '}
              {getLocalTime(country.timezones[0])}
            </p>
            <p>
              <strong style={styles.label}>Languages:</strong>{' '}
              {country.languages
                ? Object.values(country.languages).join(', ')
                : 'N/A'}
            </p>
            <p>
              <strong style={styles.label}>Currency:</strong>{' '}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((c: { name: string; symbol: string }) => `${c.name} (${c.symbol})`)
                    .join(', ')
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const country = await getCountryByCode(params?.code as string)
    return { props: { country } }
  } catch {
    return { props: { country: null } }
  }
}
