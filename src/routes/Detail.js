import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovie = async () => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            )
        ).json();
        console.log(json);
        setMovies(json.data.movie);
        setLoading(false);
    };
    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <img src={movies.medium_cover_image} />
                    <h1>
                        {movies.title} ({movies.year})
                    </h1>
                    <h2>Genres: {movies.genres.join(", ")}</h2>

                    <h3>
                        Content:
                        <br />
                        {movies.description_full
                            ? movies.description_full
                            : "There is no description of the movie."}
                    </h3>
                </div>
            )}
        </div>
    );
}
export default Detail;
