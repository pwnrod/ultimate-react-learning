import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

export default function MovieDetails({
    selectedId,
    onCloseMovie,
    apiURL,
    apiKey,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        Title: title,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

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
                    console.log(data);
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
        [selectedId],
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
                                <span>🌟</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className='rating'>
                            <StarRating maxRating={10} size={24} />
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
