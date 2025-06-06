/**
 * Created by Christian James Irvine
 * Renders all movie cards to the screen in a grid like format, also fetches the data from the API
 */

import { useQuery } from "@tanstack/react-query";

import "../App.css";
import MovieCard from "./MovieCard";
import { getDisplayName } from "../Utils";

interface RouteProps {
  type: string;
}

const MovieDisplay: React.FC<RouteProps> = (props: RouteProps) => {
  const {
    isLoading,
    error,
    data: movieData,
  } = useQuery({
    queryKey: [props.type],
    queryFn: () =>
      fetch(getApiRoute(props.type)).then((res: Response) => res.json()),
  });

  const getApiRoute = (type: string) => {
    let categoryString: string = "";
    let queryString: string = "";

    switch (type) {
      case "trending":
        categoryString = "trending/all/week";
        queryString = "language=en-US";
        break;
      case "top-rated":
        categoryString = "movie/top_rated";
        queryString = "language=en-US";
        break;
      case "action":
        categoryString = "discover/movie";
        queryString = "with_genres=28";
        break;
      case "animation":
        categoryString = "discover/movie";
        queryString = "with_genres=16";
        break;
      case "comedy":
        categoryString = "discover/movie";
        queryString = "with_genres=35";
        break;
      default:
        console.log(
          `Error: invalid type ${type} was entered, this type does not exist.`,
        );
        return "";
    }

    return `https://api.themoviedb.org/3/${categoryString}?api_key=${import.meta.env.VITE_API_KEY}&${queryString}`;
  };

  const displayName: string = getDisplayName(props.type);

  if (isLoading) return <h1 className="p-20">Loading...</h1>;
  console.log(movieData.status_code)
  if (movieData.status_code === 7)    
    return (
      <>
        <h2 className="p-20">No API Key has been provided</h2>
        <p>are you sure you added the .env file?</p>
      </>
    );
  if (error)
    return (
      <>
        <h2 className="p-20">Something went wrong, please try again later.</h2>
        <p>{error.message}</p>
      </>
    );

  const movieMax: number = Math.min(10, movieData.results.length);
  const displayData: Array<Object> = movieData.results.slice(0, movieMax);

  if (displayData.length === 0)
    return (
      <>
        <h2 className="p-20">
          No data to show for {displayName}, please Try Again Later.
        </h2>
      </>
    );

  return (
    <>
      <h1 className="p-20">{displayName}</h1>
      {displayData.length > 0 ? (
        <>
          <div className="grid grid-cols-5 gap-4 py-20 px-15">
            {displayData.map((movie: any) => (
              <MovieCard
                key={movie.id}
                name={movie.title || movie.name}
                posterPath={movie.poster_path}
                overview={movie.overview}
                releaseDate={movie.release_date || movie.first_air_date}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </>
  );
};

export default MovieDisplay;
