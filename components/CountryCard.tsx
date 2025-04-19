import { Country } from '@/types/country'
import { getLocalTime } from '@/utils/time'
import Link from 'next/link'
import Image from 'next/image'


export default function CountryCard({ country }: { country: Country }) {
  const styles = {
    card: {
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      transition: 'box-shadow 0.2s ease',
      cursor: 'pointer',
    },
    image: {
      borderRadius: '8px',
      width: '100%',
      height: '160px',
      objectFit: 'cover' as const, // Make TS happy with this
    },
    info: {
      marginTop: '16px',
    },
    name: {
      fontSize: '20px',
      fontWeight: 600,
    },
    text: {
      fontSize: '14px',
      color: '#4B5563',
    },
  }

  return (
    <Link href={`/country/${country.cca2}`}>
      <div
        style={styles.card}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)')
        }
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
      >
        <Image
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          style={styles.image}
        />
        <div style={styles.info}>
          <h2 style={styles.name}>{country.name.common}</h2>
          <p style={styles.text}>Region: {country.region}</p>
          <p style={styles.text}>
            Local Time: {getLocalTime(country.timezones?.[0] || 'UTC')}
          </p>
        </div>
      </div>
    </Link>
  )
}
