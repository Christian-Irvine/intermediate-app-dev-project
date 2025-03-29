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
  description: string,
  popularity: number,
}

const MovieCard: React.FC<MovieCardProps> = (props: MovieCardProps) => {
  return (
    <>
      <div className="grid grid-cols-10 gap-4 py-50 px-15">
        <Card>
          <CardHeader>
            <CardTitle>{props.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{props.description}</p>
            <p>Popularity: {props.popularity}</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
  
export default MovieCard
  