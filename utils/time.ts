export const getLocalTime = (timezone: string): string => {
    try {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: timezone,
      }
      return new Intl.DateTimeFormat('en-US', options).format(now)
    } catch (error) {
      return 'N/A'
    }
  }
  