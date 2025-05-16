import React, { useState, useEffect, useContext } from 'react';
import { Spin, Alert, Row, Col, Pagination } from 'antd';
import { searchMovies } from '../../API/api-client';
import MovieCard from '../MovieCard/MovieCard';
import { GenresContext } from '../App/App';
import './MovieList.css';

const MovieList = ({ searchQuery }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const genres = useContext(GenresContext);


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const data = await searchMovies(searchQuery, currentPage);
                setMovies(data.results);
                setTotalPages(data.total_pages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchQuery, currentPage]);

    if (loading) return <Spin className="movie-list-spin" />;
    if (error) return <Alert className="movie-list-alert" message="Error" description={error} type="error" showIcon />;

    return (
        <div className="movie-list-container">
            <Row className="movie-list-row" gutter={[16, 16]} justify="center">
                {movies.map(movie => (
                    <Col key={movie.id} className="movie-list-col" xs={24} sm={24} md={12} lg={12} xl={12}>
                        <MovieCard movie={movie} genres={genres} />
                    </Col>
                ))}
            </Row>

            {movies.length > 0 && (
                <Pagination
                    className="movie-list-pagination"
                    current={currentPage}
                    total={totalPages * 20}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                />
            )}
        </div>
    );

};

export default MovieList;