import React, { useState, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import MovieList from '../MovieList/MovieList'
import Header from '../Header/Header'
import { createGuestSession, fetchGenres, rateMovie } from '../../API/api-client'
import { GenresContext } from '../../Context/genresContext'
import './App.css'

const App = () => {
  const [genres, setGenres] = useState([])
  const [guestSessionId, setGuestSessionId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('return')
  const [activeTab, setActiveTab] = useState('1')
  const [userRatings, setUserRatings] = useState({})
  const [searchPage, setSearchPage] = useState(1)
  const [ratedPage, setRatedPage] = useState(1)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const sessionId = await createGuestSession()
        setGuestSessionId(sessionId)
        const genresData = await fetchGenres()
        setGenres(genresData.genres)
      } catch (error) {
        console.error('Initialization error:', error)
      }
    }

    initializeApp()
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query || 'return')
    setSearchPage(1)
  }

  const handleTabChange = (key) => {
    setActiveTab(key)
    if (key === '1') setSearchPage(1)
    if (key === '2') setRatedPage(1)
  }

  const handleRateChange = async (movieId, value) => {
    if (!guestSessionId) {
      console.error('Guest session ID is not available.')
      return
    }
    try {
      await rateMovie(guestSessionId, movieId, value)
      setUserRatings((prevRatings) => ({
        ...prevRatings,
        [movieId]: value,
      }))
    } catch (error) {
      console.error('Failed to rate movie:', error)
    }
  }

  const handlePageChange = (page) => {
    if (activeTab === '1') {
      setSearchPage(page)
    } else if (activeTab === '2') {
      setRatedPage(page)
    }
  }

  return (
    <GenresContext.Provider value={genres}>
      <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
        <div className="app-container">
          <Header onSearch={handleSearch} activeTab={activeTab} onChangeTab={handleTabChange} />
          <div className="movie-list-wrapper">
            <MovieList
              searchQuery={searchQuery}
              guestSessionId={guestSessionId}
              activeTab={activeTab}
              userRatings={userRatings}
              onRateChange={handleRateChange}
              currentPage={activeTab === '1' ? searchPage : ratedPage}
              onPageChange={handlePageChange}
              key={activeTab === '1' ? `search-${searchQuery}` : `rated-${guestSessionId}`}
            />
          </div>
        </div>
      </ConfigProvider>
    </GenresContext.Provider>
  )
}

export default App
