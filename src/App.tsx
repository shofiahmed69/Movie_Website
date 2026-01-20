import { useState, useEffect } from 'react';
import { fetchMovies, searchMovies } from './lib/api';
import type { Movie } from './lib/api';
import { MovieCard } from './components/MovieCard';
import { Modal } from './components/Modal';
import './App.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies();
      setMovies(data);
      setLoading(false);
    };
    loadMovies();
  }, []);

  // Search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        setLoading(true);
        const results = await searchMovies(searchTerm);
        setMovies(results);
        setLoading(false);
      } else {
        // If search is cleared, reload popular movies
        setLoading(true);
        const data = await fetchMovies();
        setMovies(data);
        setLoading(false);
      }
    }, 500); // Debounce search

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>MovieWorld</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      {loading ? (
        <div className="loading">Loading amazing content...</div>
      ) : (
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={openModal} />
          ))}
        </div>
      )}

      {movies.length === 0 && !loading && (
        <div className="no-results">No movies found. Try another search.</div>
      )}

      <Modal movie={selectedMovie} onClose={closeModal} />

      <footer>
        <p>Powered by TMDB</p>
      </footer>
    </div>
  );
}

export default App;
