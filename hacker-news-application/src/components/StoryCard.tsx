/**
 * Created by Christian James Irvine
 * Displays a card like format of some story data to give a brief overview of what that is, also fetches that data from the API
 */
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import parse from "html-react-parser";
import { getStoryApiRoute } from "../Utils";

import { Card, CardTitle, CardDescription } from "./ui/card";

import "../App.css";

interface StoryCardProps {
  id: string;
}

const StoryCard: React.FC<StoryCardProps> = (props: StoryCardProps) => {
  const {
    isLoading,
    error,
    data: storyData,
  } = useQuery({
    queryKey: [props.id],
    queryFn: () =>
      fetch(getStoryApiRoute(props.id)).then((res: Response) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <Card className="bg-cover aspect-[2/3] py-0 flex shadow-md justify-between">
          <CardTitle className="text-white">
            <div className="bg-linear-to-t from-0% to-gray-950 py-3 rounded-t-xl">
              Couldn't Find Story: {storyData.id}
            </div>
          </CardTitle>
          <CardTitle className="text-white">
            <div className="bg-linear-to-b from-0% to-gray-950 py-2 rounded-b-xl">
              {error.message}
            </div>
          </CardTitle>
        </Card>
      </>
    );

  const cutoffLength: number = 125;

  let description: any = parse(storyData.text || "No description.");

  let tempDescription: string = "";

  if (Array.isArray(description)) {
    description.forEach((section) => {
      if (typeof section === "string") {
        tempDescription += section.toString();
      } else {
        tempDescription += section.props.children;
      }
    });

    description = tempDescription;
  }

  const needsTruncating: boolean = description.length > cutoffLength;

  if (needsTruncating) {
    description = description.toString().substring(0, cutoffLength);
    description += "...";
  }

  return (
    <>
      <NavLink to={`/story/${props.id}`}>
        <Card className="bg-cover aspect-[15/16] py-0 flex shadow-md justify-between bg-slate-700 hover:bg-slate-800 cursor-pointer">
          <CardTitle className="text-white font-bold text-lg">
            <p className="bg-linear-to-t from-0% to-gray-950 py-3 rounded-t-xl">
              {storyData.title || "No Title."}
            </p>
          </CardTitle>
          <CardDescription className="text-lg text-slate-300 p-5">
            <p>{description}</p>
          </CardDescription>
          <CardTitle className="text-white">
            <p className="bg-linear-to-b from-0% to-gray-950 py-2 rounded-b-xl">{`By: ${storyData.by}`}</p>
          </CardTitle>
        </Card>
      </NavLink>
    </>
  );
};

export default StoryCard;
