import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

export default function MovieDetails({
    selectedId,
    onCloseMovie,
    apiURL,
    apiKey,
    onAddWatched,
    watched,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userRating, setUserRating] = useState('');

    const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbId === selectedId,
    )?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAddWatched() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
        };
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(
        function () {
            async function getMovieDetails() {
                try {
                    setError('');
                    setIsLoading(true);
                    const res = await fetch(
                        `${apiURL}${apiKey}&i=${selectedId}`,
                    );

                    if (!res.ok)
                        throw new Error(
                            'Something went wrong with fetching movie details',
                        );

                    const data = await res.json();
                    if (data.Response === 'False')
                        throw new Error('Movie not found');
                    setMovie(data);
                } catch (err) {
                    setError(err.message);
                    console.error(err.message);
                } finally {
                    setIsLoading(false);
                }
            }

            getMovieDetails();
        },
        [selectedId, apiKey, apiURL],
    );

    useEffect(
        function () {
            if (!title) {
                return;
            }
            document.title = `MOVIE | ${title}`;

            return function () {
                document.title = 'usePopcorn';
            };
        },
        [title],
    );

    useEffect(
        function () {
            function callback(e) {
                if (e.code === 'Escape') {
                    onCloseMovie();
                }
            }

            document.addEventListener('keydown', callback);

            return function () {
                document.removeEventListener('keydown', callback);
            };
        },
        [onCloseMovie],
    );

    return (
        <div className='details'>
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error && (
                <>
                    <header>
                        <button className='btn-back' onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${title} movie`} />
                        <div className='details-overview'>
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className='rating'>
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className='btn-add'
                                            onClick={handleAddWatched}
                                        >
                                            + Add Movie
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated this movie {watchedUserRating}{' '}
                                    <span>⭐</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
