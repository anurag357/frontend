export default function Filters({
  onRegionChange,
  onTimezoneChange,
}: {
  onRegionChange: (region: string) => void
  onTimezoneChange: (tz: string) => void
}) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  const timezones = ['UTC', 'UTC+01:00', 'UTC+05:30', 'UTC-04:00']

  const styles = {
    container: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap' as const,
      marginBottom: '1.5rem',
    },
    select: {
      border: '1px solid #e5e7eb',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.375rem',
      fontSize: '1rem',
    },
  }

  return (
    <div style={styles.container}>
      <select style={styles.select} onChange={(e) => onRegionChange(e.target.value)}>
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select style={styles.select} onChange={(e) => onTimezoneChange(e.target.value)}>
        <option value="">All Timezones</option>
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  )
}
