import './App.css'

interface RouteProps {
  type: string,
}

const MovieDisplay: React.FC<RouteProps> = (props) => {
  const getDisplayName = (type: string) => {
    let nameArr = type.replace('-', ' ').split(' ');
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

    return `https://api.themoviedb.org/3/${categoryString}?api_key=${"key"}&${queryString}`
  }

  const fetchData = () => {
    const route: string = getApiRoute(props.type);


    // fetch and stuff
  }

  const displayName: string = getDisplayName(props.type)

  return (
    <>
      <div className="pt-50">
        <h1>{displayName}</h1>
        <h2>{getApiRoute(props.type)}</h2>
      </div>
    </>
  )
}
  
export default MovieDisplay
  