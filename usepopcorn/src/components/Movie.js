export default function Movie({
    movie,
    onSelectMovie,
    onCloseMovie,
    selectedId,
}) {
    return (
        <li
            onClick={() => {
                onSelectMovie(movie.imdbID);
                if (selectedId === movie.imdbID) {
                    onCloseMovie();
                }
            }}
        >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}
