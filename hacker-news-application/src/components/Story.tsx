import { useParams } from "react-router";
import { getStoryApiRoute, getDisplayName, formatTime } from "../Utils";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";

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
  if (error) {
    return (
      <>
        <h2 className="p-20">Something went wrong, please try again later.</h2>
        <p>{error.message}</p>
      </>
    );
  }

  const kids: Array<number> = storyData.kids
    ? storyData.kids.slice(0, Math.min(5, storyData.kids.length))
    : [];

  return (
    <>
      <section className="mx-100 px-20 justify-start text-left bg-slate-100">
        <p className="font-bold pt-5">By: {storyData.by || "No username."}</p>
        <h2 className="font-bold pt-5">{storyData.title || "No title"}</h2>
        <p className="pt-5">
          Type: {getDisplayName(storyData.type || "No type")} | Score:{" "}
          {storyData.points || "0"} | Posted:{" "}
          {formatTime(storyData.time || "No Time")}
        </p>
        <article className="text-lg pt-5">
          {parse(storyData.text || "")}
        </article>
        {storyData.url && (
          <a className="text-lg pt-5" href={storyData.url} target="_blank">
            {storyData.url}
          </a>
        )}

        {kids.length > 0 ? (
          <section className="pt-5 pb-15">
            <p className="font-bold pb-5">Comments/Kids:</p>
            {kids.map((kid: number) => (
              <a
                key={kid.toString()}
                className="text-lg pt-5"
                href={`https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`}
                target="_blank"
              >
                <p>{`https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`}</p>
              </a>
            ))}
          </section>
        ) : (
          <p className="font-bold pt-5 pb-15">Comments/Kids: N/A</p>
        )}
      </section>
    </>
  );
};

export default Story;
