import { useQuery } from "@tanstack/react-query";

import '../App.css'
//import StoryCard from "./StoryCard";
import { getDisplayName } from "../Utils";

interface RouteProps {
  type: string,
}

const StoryDisplay: React.FC<RouteProps> = (props: RouteProps) => {
  const {
    isLoading,
    error,
    data: storyData,
  } = useQuery({
    queryKey: [props.type],
    queryFn: () =>
      fetch(getApiRoute(props.type)).then((res: Response) => res.json()),
  });

  const getApiRoute = (type: string) => {
    let urlType: string = type.replace('-', '')

    return `https://hacker-news.firebaseio.com/v0/${urlType}.json?print=pretty`
  }

  const displayName: string = getDisplayName(props.type)

  if (isLoading) return <h1 className="p-20">Loading...</h1>;
  if (error) 
    return (
      <>
        <h2 className="p-20">Something went wrong, please try again later.</h2>
        <p>{error.message}</p> 
      </>
    );

  console.log(storyData)

  const maxStories: number = 25;

  const storyMax: number = Math.min(maxStories, storyData.length);
  const displayData: Array<Object> = storyData.slice(0, storyMax);


  if (displayData.length === 0)
    return (
      <>
        <h2 className="p-20">No data to show for {displayName}, please Try Again Later.</h2>
      </>
    );

  return (
    <>
      <h1 className="p-20">{displayName}</h1>
      {displayData.length > 0 ? (
        <>
          <div className="grid grid-cols-5 gap-4 py-20 px-15">
            {displayData.map((story: any) => (
              <h1>{story}</h1>
              // <StoryCard key={story.id} name={story.title || story.name} posterPath={story.poster_path} overview={story.overview} releaseDate={story.release_date || story.first_air_date}/>
            ))}
          </div>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </>
  )
}
  
export default StoryDisplay
  