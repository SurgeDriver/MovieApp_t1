// src/contexts/movies-context.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchGenres } from './API/api-client';
import PropTypes from 'prop-types';

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres()
            .then(data => setGenres(data.genres))
            .catch(error => console.error('Error fetching genres:', error));
    }, []);

    const getGenreNames = (genreIds) => {
        return genreIds.map(id => genres.find(genre => genre.id === id)?.name || 'Unknown');
    };

    return (
        <MoviesContext.Provider value={{ getGenreNames }}>
            {children}
        </MoviesContext.Provider>
    );
};

MoviesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useMovies = () => {
    const context = useContext(MoviesContext);
    if (!context) {
        throw new Error('useMovies must be used within a MoviesProvider');
    }
    return context;
};