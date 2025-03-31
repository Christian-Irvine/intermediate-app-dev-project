import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

import '../App.css'

interface MovieCardProps {
  name: string,
  posterPath: string,
  overview: string,
  releaseDate: string,
}

const MovieCard: React.FC<MovieCardProps> = (props: MovieCardProps) => {
  return (
    <>
      <Card className="bg-cover aspect-[2/3] py-0 flex shadow-md" style={{ backgroundImage: `url("${`https://image.tmdb.org/t/p/w500${props.posterPath}`}")` }}>
        <CardTitle className="text-white">
          <div className="bg-linear-to-t from-0% to-gray-950 py-3 rounded-xl">{props.name}</div>
        </CardTitle>
        <CardFooter className="text-white">
          <div className="bg-linear-to-b from-0% to-gray-950 py-2">{props.releaseDate}</div>
        </CardFooter>
      </Card>
    </>
  )
}
  
export default MovieCard
  