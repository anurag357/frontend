import { useEffect, useState } from 'react'
import { Country } from '@/types/country'
import { getAllCountries } from '@/services/api'
import CountryCard from '@/components/CountryCard'
import Filters from '@/components/Filters'
import SearchBar from '@/components/SearchBar'
import PopulationChart from '@/components/PopulationChart'

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([])
  const [filtered, setFiltered] = useState<Country[]>([])
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('')
  const [timezone, setTimezone] = useState('')
  const [visible, setVisible] = useState(20)

  useEffect(() => {
    getAllCountries().then(setCountries)
  }, [])

  useEffect(() => {
    let result = [...countries]

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.common.toLowerCase().includes(q) ||
          c.capital?.[0]?.toLowerCase().includes(q)
      )
    }

    if (region) {
      result = result.filter((c) => c.region === region)
    }

    if (timezone) {
      result = result.filter((c) => c.timezones.includes(timezone))
    }

    setFiltered(result)
  }, [countries, query, region, timezone])

  const loadMore = () => setVisible((v) => v + 20)

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#3b82f6' }}>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '30.33%',  // 4/12 (4lg)
            backgroundColor: '#4f46e5',  // Add background color or gradient
            backgroundImage: 'linear-gradient(to bottom, #4f46e5, #3b82f6)', // Gradient effect
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            minHeight: '100vh',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            color: '#fff', // Text color for readability
          }}
        >
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            🌍 Country Dashboard
          </h1>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontWeight: 600 }}>Navigation</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a style={{ color: '#ffffff', textDecoration: 'none' }} href="#">Dashboard</a></li>
              <li><a style={{ color: '#ffffff', textDecoration: 'none' }} href="#">Charts</a></li>
              <li><a style={{ color: '#ffffff', textDecoration: 'none' }} href="#">Countries</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <section
          style={{
            width: '69.66%', // 8/12 (8lg)
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* Chart Section */}
          {/* <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <PopulationChart countries={countries.slice(0, 5)} />
          </div> */}

          {/* Search & Filters */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <SearchBar onChange={setQuery} />
              <Filters onRegionChange={setRegion} onTimezoneChange={setTimezone} />
            </div>
          </div>

          {/* Country Cards */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            {filtered.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#6b7280' }}>No countries found.</p>
            ) : (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {filtered.slice(0, visible).map((country) => (
                    <CountryCard key={country.cca2} country={country} />
                  ))}
                </div>
                {visible < filtered.length && (
                  <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button
                      style={{
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        border: 'none',
                        transition: 'background-color 0.2s ease',
                      }}
                      onClick={loadMore}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4338ca')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
