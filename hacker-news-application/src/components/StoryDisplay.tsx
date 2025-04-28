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
    let categoryString: string = "";
    let queryString: string = "";

    switch (type) {
      case "trending":
        categoryString = "trending/all/week"
        queryString = "language=en-US"
        break;
      case "top-rated":
        categoryString = "story/top_rated"
        queryString = "language=en-US"
        break;
      case "action":
        categoryString = "discover/story"
        queryString = "with_genres=28"
        break;
      case "animation":
        categoryString = "discover/story"
        queryString = "with_genres=16"
        break;
      case "comedy":
        categoryString = "discover/story"
        queryString = "with_genres=35"
        break;
      default:
        console.log(`Error: invalid type ${type} was entered, this type does not exist.`);
        return ""
    }

    return `https://api.thestorydb.org/3/${categoryString}?api_key=${import.meta.env.VITE_API_KEY}&${queryString}`
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

  const storyMax: number = Math.min(10, storyData.results.length);
  const displayData: Array<Object> = storyData.results.slice(0, storyMax);

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
              <h1>Hello</h1>
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
  