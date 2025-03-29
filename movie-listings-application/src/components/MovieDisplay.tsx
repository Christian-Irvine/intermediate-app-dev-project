import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import '../App.css'
import MovieCard from "./MovieCard";

interface RouteProps {
  type: string,
}

const MovieDisplay: React.FC<RouteProps> = (props: RouteProps) => {
  const {
    isLoading,
    error,
    data: movieData,
  } = useQuery({
    queryKey: ["movieData"],
    queryFn: () =>
      fetch(getApiRoute(props.type)).then((res: Response) => res.json()),
  });

  console.log(movieData);

  // turns the url name into the display title for the page
  const getDisplayName = (type: string) => {
    let nameArr: string[] = type.replace('-', ' ').split(' ');
    for (var i = 0; i < nameArr.length; i++) {
      nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].substring(1);     
    }
    return nameArr.join(' ');
  }

  const getApiRoute = (type: string) => {
    let categoryString: string = "";
    let queryString: string = "";
    

    switch (type) {
      case "trending":
        categoryString = "trending/all/week"
        queryString = "language=en-US"
        break;
      case "top-rated":
        categoryString = "top_rated"
        queryString = "language=en-US"
        break;
      case "action":
        categoryString = "discover/movie"
        queryString = "with_genres=28"
        break;
      case "animation":
        categoryString = "discover/movie"
        queryString = "with_genres=16"
        break;
      case "comedy":
        categoryString = "discover/movie"
        queryString = "with_genres=35"
        break;
      default:
        console.log(`Error: invalid type ${type} was entered, this type does not exist.`);
        return ""
    }

    return `https://api.themoviedb.org/3/${categoryString}?api_key=${DONTPUSHKEY}&${queryString}`
  }

  const displayName: string = getDisplayName(props.type)

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <h1 className="p-20">{displayName}</h1>
      {movieData.results.length > 0 ? (
        <>
          {movieData.results.map((movie: any) => (
            <MovieCard key={movie.id} name={movie.title || movie.name} description={movie.overview} popularity={movie.popularity}/>
            
          ))}
        </>
      ) : (
        <p>No data available.</p>
      )}
    </>
  )
}
  
export default MovieDisplay
  