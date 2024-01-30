import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Main from './components/Main';
import Box from './components/Box';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';
import NumResults from './components/NumResults';

const apiURL = 'http://www.omdbapi.com/?apikey=';
const apiKey = 'c62657a3';

export default function App() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    useEffect(
        function () {
            const controller = new AbortController();

            async function fetchMovies() {
                try {
                    setError('');
                    setIsLoading(true);
                    const res = await fetch(`${apiURL}${apiKey}&s=${query}`, {
                        signal: controller.signal,
                    });

                    if (!res.ok)
                        throw new Error(
                            'Something went wrong with fetching the movies',
                        );

                    const data = await res.json();
                    if (data.Response === 'False')
                        throw new Error('Movie not found');

                    setMovies(data.Search);
                    setError('');
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.log(err.message);
                        setError(err.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([]);
                setError('');
                return;
            }

            handleCloseMovie();
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query],
    );

    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Navbar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            apiURL={apiURL}
                            apiKey={apiKey}
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
