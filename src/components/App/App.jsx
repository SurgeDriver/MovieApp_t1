import React, { useState, useEffect, createContext } from 'react';
import { ConfigProvider } from 'antd';
import MovieList from '../MovieList/MovieList';
import Header from '../Header/Header';
import { createGuestSession, fetchGenres } from '../../API/api-client';
import './App.css';

export const GenresContext = createContext();

const App = () => {
    const [genres, setGenres] = useState([]);
    const [guestSessionId, setGuestSessionId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('return'); // значение по умолчанию для поиска
    const [activeTab, setActiveTab] = useState('1'); // для реализации табов "Search" / "Rated"
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const sessionId = await createGuestSession();
                setGuestSessionId(sessionId);

                const genresData = await fetchGenres();
                setGenres(genresData.genres);
            } catch (error) {
                console.error('Initialization error:', error);
            }
        };

        initializeApp();
    }, []);
    return (
        <GenresContext.Provider value={genres}>
            <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
                <div className="app-container">
                    <Header
                        onSearch={handleSearch}
                        activeTab={activeTab}
                        onChangeTab={handleTabChange}
                    />
                    <div
                        className="movie-list-wrapper">

                        <MovieList
                            searchQuery={searchQuery}
                            guestSessionId={guestSessionId}
                            activeTab={activeTab}
                        />
                    </div>
                </div>
            </ConfigProvider>
        </GenresContext.Provider>
    );
};

export default App;