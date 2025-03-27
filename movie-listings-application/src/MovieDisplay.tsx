import './App.css'

interface RouteProps {
  type: string,
}

const MovieDisplay: React.FC<RouteProps> = (props) => {
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
      case "action":
        categoryString = "discover/movie"
        queryString = "with_genres=35"
        break;
    }

    return `https://api.themoviedb.org/3/${categoryString}?api_key=${"key"}&${queryString}`
  }

  const fetchData = () => {
    const route: string = getApiRoute(props.type);


    // fetch and stuff
  }

  return (
    <>
      <h1>Home {getApiRoute(props.type)}</h1>
    </>
  )
}
  
export default MovieDisplay
  