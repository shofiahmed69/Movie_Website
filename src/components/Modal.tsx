import React, { useEffect, useRef } from 'react';
import type { Movie } from '../lib/api';
import './Modal.css';

interface ModalProps {
    movie: Movie | null;
    onClose: () => void;
}

const IMAGE_BASE_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original';

export const Modal: React.FC<ModalProps> = ({ movie, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (movie) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [movie, onClose]);

    if (!movie) return null;

    const backdropUrl = movie.backdrop_path
        ? `${IMAGE_BASE_URL_ORIGINAL}${movie.backdrop_path}`
        : (movie.poster_path ? `${IMAGE_BASE_URL_ORIGINAL}${movie.poster_path}` : '');

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} ref={modalRef}>
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="modal-header" style={{ backgroundImage: `url(${backdropUrl})` }}>
                    <div className="modal-header-gradient"></div>
                    <div className="modal-title-container">
                        <h2>{movie.title}</h2>
                        <div className="modal-meta">
                            <span className="rating">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-info">
                        <p className="summary">{movie.overview}</p>
                        <div className="details-list">
                            <p><strong>Release Date:</strong> {movie.release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
