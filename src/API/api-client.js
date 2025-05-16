import axios from 'axios'
const API_KEY = 'e17f40dadb8e20eaaf9e6ff62f13ab62'
const BASE_URL = 'https://api.themoviedb.org/3'
const SESSION_DATA_KEY = 'savedGuestSession'

export const makeRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        ...params,
        api_key: API_KEY,
        language: 'en-US',
      },
    })
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Ошибка сервера:', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('Нет ответа от сервера')
    } else {
      console.error('Ошибка формирования запроса:', error.message)
    }
    throw error
  }
}

export const searchMovies = async (query, page) => {
  return makeRequest('/search/movie', { query, page })
}

export const fetchGenres = async () => {
  return makeRequest('/genre/movie/list')
}

export const getRatedMovies = async (guestSessionId, page = 1) => {
  return makeRequest(`/guest_session/${guestSessionId}/rated/movies`, { page })
}

export const createGuestSession = async () => {
  const result = await makeRequest(`/authentication/guest_session/new`)
  return result.guest_session_id
}

export const rateMovie = async (guestSessionId, movieId, rating) => {
  try {
    if (typeof rating !== 'number' || rating < 0.5 || rating > 10) {
      throw new Error('Rating must be a number between 0.5 and 10.0')
    }

    const response = await axios.post(
      `${BASE_URL}/movie/${movieId}/rating`,
      { value: rating },
      {
        params: { api_key: API_KEY, guest_session_id: guestSessionId },
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error rating movie:', error)
    if (error.response) {
      console.error('API Response:', error.response.data)
    }
    throw error
  }
}
