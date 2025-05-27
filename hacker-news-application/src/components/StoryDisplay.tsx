/**
 * Created by Christian James Irvine
 * Displays each story card to the screen, also fetches that data from the API and limits stories to 25
 */
import { useQuery } from "@tanstack/react-query";

import "../App.css";
import StoryCard from "./StoryCard";
import { getDisplayName } from "../Utils";

interface RouteProps {
  type: string;
}

const StoryDisplay: React.FC<RouteProps> = (props: RouteProps) => {
  const {
    isLoading,
    error,
    data: storiesData,
  } = useQuery({
    queryKey: [props.type],
    queryFn: () =>
      fetch(getApiRoute(props.type)).then((res: Response) => res.json()),
  });

  const getApiRoute = (type: string) => {
    let urlType: string = type.replace("-", "");

    return `https://hacker-news.firebaseio.com/v0/${urlType}.json?print=pretty`;
  };

  const displayName: string = getDisplayName(props.type);

  if (isLoading) return <h1 className="p-20">Loading...</h1>;
  if (error)
    return (
      <>
        <h2 className="p-20">Something went wrong, please try again later.</h2>
        <p>{error.message}</p>
      </>
    );

  const maxStories: number = 25;

  const storyMax: number = Math.min(maxStories, storiesData.length);
  const displayData: Array<Object> = storiesData.slice(0, storyMax);

  if (displayData.length === 0)
    return (
      <>
        <h2 className="p-20">
          No data to show for {displayName}, please Try Again Later.
        </h2>
      </>
    );

  return (
    <>
      <h1 className="p-20">{displayName}</h1>
      {displayData.length > 0 ? (
        <>
          <div className="grid grid-cols-5 gap-4 py-20 px-15">
            {displayData.map((storyId: any) => (
              <StoryCard key={storyId} id={storyId} />
            ))}
          </div>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </>
  );
};

export default StoryDisplay;
