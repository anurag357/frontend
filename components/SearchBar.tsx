export default function SearchBar({ onChange }: { onChange: (value: string) => void }) {
  const styles = {
    input: {
      border: '1px solid #e5e7eb',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      width: '100%',
      maxWidth: '28rem',
      marginBottom: '1rem',
      fontSize: '1rem',
    },
  }

  return (
    <input
      type="text"
      placeholder="Search by name or capital..."
      style={styles.input}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
