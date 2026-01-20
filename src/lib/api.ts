export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  genre_ids: number[];
}

interface TMDBResponse {
  results: Movie[];
}

const API_KEY = '0bca76273ef71293c3217a098d3c7d1f';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data: TMDBResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    const data: TMDBResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};
