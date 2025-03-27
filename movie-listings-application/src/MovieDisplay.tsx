import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"

import { useState } from "react";

import './App.css'

interface RouteProps {
  type: string,
}

const MovieDisplay: React.FC<RouteProps> = (props) => {
  const [movies] = useState([]);

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
      <h1 className="p-20">{displayName}</h1>
      <div className="grid grid-cols-10 gap-4 py-50 px-15">
        <Card>
          <CardHeader>
            <CardTitle>Movie Name</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Movie Name</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
  
export default MovieDisplay
  