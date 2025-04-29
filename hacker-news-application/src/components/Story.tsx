import { useParams } from "react-router";
import { getStoryApiRoute } from "../Utils";
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
      <h2 className="font-bold py-10">{storyData.title}</h2>
      <p className="text-lg">{parse(storyData.text || "No description.")}</p>
    </section>
    </>
  );
};

export default Story;
