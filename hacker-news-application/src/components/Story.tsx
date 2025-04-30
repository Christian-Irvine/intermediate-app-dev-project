import { useParams } from "react-router";
import { getStoryApiRoute, getDisplayName, formatTime } from "../Utils";
import { useQuery } from "@tanstack/react-query";
import parse from 'html-react-parser';

import "../App.css";

const Story: React.FC = () => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    data: storyData,
  } = useQuery({
    queryKey: [id],
    queryFn: () =>
      fetch(getStoryApiRoute(id || "")).then((res: Response) => res.json()),
  });

  if (isLoading) return <h1 className="p-20">Loading...</h1>;
  if (error) 
    return (
      <>
        <h2 className="p-20">Something went wrong, please try again later.</h2>
        <p>{error.message}</p> 
      </>
    );

  return (
    <>
      <section className="mx-100 px-20 justify-start text-left bg-slate-100">
        <p className="font-bold pt-5">By: {storyData.by || "No username."}</p>
        <h2 className="font-bold p-b5">{storyData.title || "No title"}</h2>
        <p className="pt-5">Type: {getDisplayName(storyData.type || "No type")} | Points: {storyData.points || "0"} | Time: {formatTime(storyData.time || "No Time")}</p>
        <article className="text-lg py-5">{parse(storyData.text || "")}</article>
        <a href={storyData.url} target="_blank">{storyData.url}</a>
      </section>
    </>
  );
};

export default Story;
