import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Tag, Grid, Row, Col } from 'antd';

const { useBreakpoint } = Grid;
const { Title, Text, Paragraph } = Typography;

const MovieCard = ({ movie }) => {
    const screens = useBreakpoint();
    const isMobile = screens.xs;

    if (isMobile) {
        return (
            <Card
                hoverable
                style={{ width: '100%', marginBottom: '16px' }}
                bodyStyle={{ padding: '16px' }}
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <div style={{
                            height: '100px',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text type="secondary">Постер {movie.title}</Text>
                        </div>
                    </Col>
                    <Col span={16}>
                        <Title level={5}>{movie.title}</Title>
                        <Text type="secondary" style={{ display: 'block', margin: '4px 0' }}>
                            {movie.date}
                        </Text>
                        <div style={{ marginBottom: '8px' }}>
                            {movie.genres.map(genre => (
                                <Tag key={`${movie.id}-${genre}`}>{genre}</Tag>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Paragraph style={{ marginTop: '12px' }}>
                    {movie.description}
                </Paragraph>
            </Card>
        );
    }

    return (
        <Card
            hoverable
            style={{ width: '451px', height: '279px', marginBottom: '16px' }}
            bodyStyle={{ padding: 0 }}
        >
            <Row gutter={0}>
                <Col span={12}>
                    <div style={{
                        height: '200px',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text type="secondary">Постер {movie.title}</Text>
                    </div>
                </Col>
                <Col span={12} style={{ padding: '16px' }}>
                    <Title level={4}>{movie.title}</Title>
                    <Text type="secondary" style={{ display: 'block', margin: '8px 0' }}>
                        {movie.date}
                    </Text>
                    <div style={{ marginBottom: '12px' }}>
                        {movie.genres.map(genre => (
                            <Tag key={`${movie.id}-${genre}`}>{genre}</Tag>
                        ))}
                    </div>
                    <Paragraph>
                        {movie.description}
                    </Paragraph>
                </Col>
            </Row>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default MovieCard;