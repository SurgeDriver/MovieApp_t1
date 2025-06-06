import React, { useState, useEffect, useContext } from 'react'
import { Spin, Alert, Row, Col, Pagination } from 'antd'
import { searchMovies, getRatedMovies } from '../../API/api-client'
import MovieCard from '../MovieCard/MovieCard'
import { GenresContext } from '../../Context/genresContext'
import PropTypes from 'prop-types'

const MovieList = ({
  searchQuery,
  guestSessionId,
  activeTab,
  userRatings,
  onRateChange,
  currentPage,
  onPageChange,
}) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const allGenres = useContext(GenresContext)

  useEffect(() => {
    const fetchMoviesData = async () => {
      if (activeTab === '2' && !guestSessionId) {
        setMovies([])
        setTotalPages(0)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        let data
        if (activeTab === '1') {
          if (typeof searchQuery === 'undefined') {
            setMovies([])
            setTotalPages(0)
            setLoading(false)
            return
          }
          data = await searchMovies(searchQuery, currentPage)
        } else {
          data = await getRatedMovies(guestSessionId, currentPage)
        }
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 0)
      } finally {
        setLoading(false)
      }
    }

    fetchMoviesData()
  }, [searchQuery, currentPage, activeTab, guestSessionId])

  if (loading) return <Spin className="movie-list-spin" />
  if (error)
    return (
      <Alert
        className="movie-list-alert"
        message="Error"
        description={error}
        type="error"
        showIcon
      />
    )

  if (!loading && movies.length === 0 && activeTab === '1' && searchQuery) {
    return (
      <Alert
        className="movie-list-alert"
        message="Not Found"
        description={`No movies found for "${searchQuery}".`}
        type="info"
        showIcon
      />
    )
  }
  if (!loading && movies.length === 0 && activeTab === '2') {
    return (
      <Alert
        className="movie-list-alert"
        message="No Rated Movies"
        description="You haven't rated any movies yet. You can rate movies on the 'Search' tab."
        type="info"
        showIcon
      />
    )
  }

  return (
    <div className="movie-list-container">
      <Row className="movie-list-row" gutter={[16, 16]} justify="center">
        {movies.map((movie) => (
          <Col key={movie.id} className="movie-list-col" xs={24} sm={24} md={12} lg={12} xl={12}>
            <MovieCard
              movie={movie}
              genres={allGenres}
              userRating={userRatings[movie.id]}
              onRateChange={onRateChange}
              isRatedTab={activeTab === '2'}
            />
          </Col>
        ))}
      </Row>

      {movies.length > 0 && totalPages > 0 && (
        <div className="pagination-container">
          <Pagination
            className="movie-list-pagination"
            current={currentPage}
            total={totalPages * 20}
            pageSize={20}
            onChange={onPageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  )
}

MovieList.propTypes = {
  searchQuery: PropTypes.string,
  guestSessionId: PropTypes.string,
  activeTab: PropTypes.string.isRequired,
  userRatings: PropTypes.objectOf(PropTypes.number),
  onRateChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default MovieList
