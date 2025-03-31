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
      <Card className="bg-cover aspect-[2/3] py-0 flex justify-end shadow-md" style={{ backgroundImage: `url("${`https://image.tmdb.org/t/p/w500${props.posterPath}`}")` }}>
          <CardTitle className="text-white">
            <div className="bg-linear-to-b from-0% to-gray-950 py-2">{props.name}</div>
          </CardTitle>
      </Card>
    </>
  )
}
  
export default MovieCard
  