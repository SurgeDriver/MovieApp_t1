// import React from 'react';
// import PropTypes from 'prop-types'; // Добавляем импорт
// import { Row, Col, Grid } from 'antd';
// import MovieCard from './MovieCard.jsx';

// const { useBreakpoint } = Grid;

// const MovieTable = ({ movies }) => {
//     const screens = useBreakpoint();
//     const isMobile = screens.xs;

//     return (
//         <Row gutter={[16, 16]}>
//             {movies.map(movie => (
//                 <Col key={movie.id} span={isMobile ? 24 : 12}>
//                     <MovieCard movie={movie} />
//                 </Col>
//             ))}
//         </Row>
//     );
// };

// MovieTable.propTypes = {
//     movies: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//             title: PropTypes.string.isRequired,
//             // остальные свойства, которые есть в movie
//         })
//     ).isRequired,
// };

// export default MovieTable;