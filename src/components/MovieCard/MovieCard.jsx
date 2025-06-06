import React from 'react'
import { Card, Rate } from 'antd'
import './MovieCard.css'
import NO_POSTER_IMAGE from '/no-poster.png'
import PropTypes from 'prop-types'
import { formatReleaseDate, getGenreNamesArray, truncateText, getRatingColor } from '../../utils' // Assuming utils.js is in src/utils/utils.js and MovieCard in src/components/MovieCard/MovieCard.js

const MAX_DESCRIPTION_LENGTH = 150
const MAX_TITLE_LENGTH = 55

const MovieCard = ({ movie, genres, onRateChange, userRating, isRatedTab }) => {
  const {
    id,
    title = 'Untitled',
    release_date,
    genre_ids = [],
    overview,
    vote_average = 0,
    poster_path,
  } = movie

  const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : NO_POSTER_IMAGE

  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = NO_POSTER_IMAGE
  }

  const displayRating = vote_average !== undefined ? vote_average.toFixed(1) : 'N/A'
  const genreNamesArray = getGenreNamesArray(genre_ids, genres)

  return (
    <Card hoverable className="movie-card-custom">
      <div className="movie-card-poster-area">
        <img
          alt={title}
          src={posterUrl}
          onError={handleImageError}
          className="movie-card-poster-img"
        />
      </div>
      <div className="movie-card-info-area">
        <div
          className="movie-card-rating-badge"
          style={{ borderColor: getRatingColor(vote_average) }}
        >
          {displayRating}
        </div>

        <h3 className="movie-card-title">{truncateText(title, MAX_TITLE_LENGTH)}</h3>

        <p className="movie-card-release-date"> {formatReleaseDate(release_date)} </p>

        {genreNamesArray.length > 0 && (
          <div className="movie-card-genres-container">
            {genreNamesArray.map((genreName) => (
              <span key={genreName} className="movie-card-genre-tag">
                {genreName}
              </span>
            ))}
          </div>
        )}

        <p className="movie-card-description">{truncateText(overview, MAX_DESCRIPTION_LENGTH)}</p>

        <div className="movie-card-user-rating-wrapper">
          <Rate
            allowHalf
            count={10}
            value={userRating || 0}
            onChange={(value) => {
              if (!isRatedTab && onRateChange) {
                onRateChange(id, value)
              }
            }}
            disabled={isRatedTab}
            className="movie-card-user-rating"
          />
        </div>
      </div>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
  }).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRateChange: PropTypes.func.isRequired,
  userRating: PropTypes.number,
  isRatedTab: PropTypes.bool.isRequired,
}

export default MovieCard
