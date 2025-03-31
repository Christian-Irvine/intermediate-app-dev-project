import {
  Card,
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
      <div className="flex flex-col">
        <Card className="bg-cover aspect-[2/3] py-0 flex shadow-md justify-between" style={{ backgroundImage: `url("${`https://image.tmdb.org/t/p/w500${props.posterPath}`}")` }}>
          <CardTitle className="text-white">
            <div className="bg-linear-to-t from-0% to-gray-950 py-3 rounded-t-xl">{props.name}</div>
          </CardTitle>
          <CardTitle className="text-white">
            <div className="bg-linear-to-b from-0% to-gray-950 py-2 rounded-b-xl">{props.releaseDate}</div>
          </CardTitle>
        </Card>
        <div className="mx-3 px-2 bg-slate-200 rounded-b-xl aspect-[4/3] shadow-md">
          <p className="font-medium">{props.overview}</p>
        </div>
      </div>
    </>
  )
}
  
export default MovieCard
  