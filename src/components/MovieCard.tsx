import React from 'react';
import type { Movie } from '../lib/api';
import './MovieCard.css';

interface MovieCardProps {
    movie: Movie;
    onClick: (movie: Movie) => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
    return (
        <div className="movie-card" onClick={() => onClick(movie)}>
            <div className="image-container">
                {movie.poster_path ? (
                    <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} loading="lazy" />
                ) : (
                    <div className="placeholder-image">
                        <span>No Image</span>
                    </div>
                )}
                <div className="overlay">
                    <button className="view-btn">View Details</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="meta">
                    <span className="rating">
                        ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </span>
                    <span className="year">{movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'}</span>
                </div>
            </div>
        </div>
    );
};
