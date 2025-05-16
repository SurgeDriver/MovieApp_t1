import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const formatReleaseDate = (releaseDate) => {
  if (!releaseDate) return 'Unknown release date'
  try {
    const date = new Date(releaseDate)
    return isNaN(date.getTime())
      ? 'Unknown release date'
      : format(date, 'MMMM d, yyyy', { locale: enUS })
  } catch (error) {
    return 'Invalid date'
  }
}

export const getGenreNamesArray = (genreIds, allGenres) => {
  if (!genreIds || !allGenres || genreIds.length === 0) return []
  return genreIds
    .map((id) => {
      const genre = allGenres.find((g) => g.id === id)
      return genre ? genre.name : null
    })
    .filter((name) => name)
    .slice(0, 3)
}

export const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  let truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  truncated =
    lastSpace > 0 && lastSpace > maxLength - 20 ? truncated.slice(0, lastSpace) : truncated
  return truncated + '...'
}

export const getRatingColor = (rating) => {
  if (rating >= 0 && rating < 3) return '#E90000'
  if (rating >= 3 && rating < 5) return '#E97E00'
  if (rating >= 5 && rating < 7) return '#E9D100'
  if (rating >= 7) return '#66E900'
  return '#E9D100' // Default color
}
