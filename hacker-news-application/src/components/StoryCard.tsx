import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardTitle,
} from "./ui/card"

import '../App.css'

interface StoryCardProps {
  id: string,
}

const StoryCard: React.FC<StoryCardProps> = (props: StoryCardProps) => {
  const {
    isLoading,
    error,
    data: storyData,
  } = useQuery({
    queryKey: [props.id],
    queryFn: () =>
      fetch(getApiRoute(props.id)).then((res: Response) => res.json()),
  });

  const getApiRoute = (id: string) => {
    return `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  }


  if (isLoading) return <h1 className="p-20">Loading...</h1>;
  if (error) 
    return (
      <>
        <Card className="bg-cover aspect-[2/3] py-0 flex shadow-md justify-between">
          <CardTitle className="text-white">
            <div className="bg-linear-to-t from-0% to-gray-950 py-3 rounded-t-xl">Couldn't Find Story: {storyData.id}</div>
          </CardTitle>
          <CardTitle className="text-white">
            <div className="bg-linear-to-b from-0% to-gray-950 py-2 rounded-b-xl">{error.message}</div>
          </CardTitle>
        </Card>
      </>
    );

  console.log(storyData)

  return (
    <>
      <div className="flex flex-col">
        <Card className="bg-cover aspect-[2/3] py-0 flex shadow-md justify-between">
          <CardTitle className="text-white font-bold">
            <div className="bg-linear-to-t from-0% to-gray-950 py-3 rounded-t-xl">{storyData.title}</div>
          </CardTitle>
          <CardTitle className="text-white">
            <div className="bg-linear-to-b from-0% to-gray-950 py-2 rounded-b-xl">{props.id}</div>
          </CardTitle>
        </Card>
      </div>
    </>
  )
}
  
export default StoryCard
  