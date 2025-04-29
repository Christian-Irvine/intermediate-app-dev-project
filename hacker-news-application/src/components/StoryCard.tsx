import { useQuery } from "@tanstack/react-query";
import parse from 'html-react-parser';

import {
  Card,
  CardTitle,
  CardDescription,
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


  if (isLoading) return <p>Loading...</p>;
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

  const cutoffLength: number = 125;
  
  let description: any = parse(storyData.text || "No description.");

  console.log(description);

  let tempDescription: string = "";

  if (Array.isArray(description)) {
    description.forEach(section => {      
      if (typeof section === 'string') {
        tempDescription += section.toString();
      } 
      else {
        tempDescription += section.props.children;
      }
    })

    description = tempDescription;
  }

  const needsTruncating: boolean = description.length > cutoffLength;

  if (needsTruncating) {
    description = description.toString().substring(0, cutoffLength);
    description += '...'
  }



  return (
    <>
      <div className="flex flex-col">
        <Card className="bg-cover aspect-[2/3] py-0 flex shadow-md justify-between bg-slate-800">
          <CardTitle className="text-white font-bold text-lg">
            <div className="bg-linear-to-t from-0% to-gray-950 py-3 rounded-t-xl">{storyData.title || "No Title."}</div>
          </CardTitle>
          <CardDescription className="text-lg text-slate-400">
            {description}
          </CardDescription>
          <CardTitle className="text-white">
            <div className="bg-linear-to-b from-0% to-gray-950 py-2 rounded-b-xl">{props.id}</div>
          </CardTitle>
        </Card>
      </div>
    </>
  )
}
  
export default StoryCard
  