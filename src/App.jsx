import React from 'react'
import { Row, Col, Grid } from 'antd'
import fakeMovies from './Movies.mjs'
import MovieCard from './MovieCard.jsx'

const { useBreakpoint } = Grid;
const MovieTable = () => {
    const screens = useBreakpoint();
    const isMobile = screens.xs;

    return (
        <Row gutter={[16, 16]}>
            {fakeMovies.map(movie => (
                <Col key={movie.id} span={isMobile ? 24 : 12}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </Row>
    )
}

export default MovieTable