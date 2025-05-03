import {
  Card,
  CardTitle,
  CardDescription,
} from "./ui/card"
import parse from 'html-react-parser';
import { formatTime } from "../Utils";

export interface UserProps {
  id: string;
  submitted: Array<number>;
  about: string;
  karma: number;
  created: number;
}

const UserCard: React.FC<UserProps> = (props: UserProps) => {
  const maxSubmitted: number = 5;

  const submittedMax: number = Math.min(maxSubmitted, props.submitted.length);
  const submittedData: Array<number> = props.submitted.slice(0, submittedMax);

  return (
    <>
      <Card className="bg-cover aspect-[15/16] py-0 flex shadow-md justify-between bg-slate-700 m-30">
        <CardTitle className="text-white font-bold text-lg">
          <p className="bg-linear-to-t from-0% to-gray-950 py-5 rounded-t-xl px-5">{props.id || "No Id."}</p>
        </CardTitle>
        <CardDescription className="text-lg text-slate-300 p-5">
          {parse(props.about || "No description.")}
        </CardDescription>
        <CardDescription className="text-lg text-slate-300 p-5">
          Karma: {props.karma || 0}
        </CardDescription>
        <CardDescription className="text-lg text-slate-300 p-5">
          {submittedData.map((submitted: number) => (
            <a key={submitted.toString()} className="text-lg pt-5" href={`https://hacker-news.firebaseio.com/v0/item/${submitted}.json?print=pretty`} target="_blank"><p>{`https://hacker-news.firebaseio.com/v0/item/${submitted}.json?print=pretty`}</p></a>           
          ))}
        </CardDescription>
        <CardTitle className="text-white">
          <p className="bg-linear-to-b from-0% to-gray-950 py-5 rounded-b-xl px-5">{`Account created on: ${formatTime(props.created || 0)}`}</p>
        </CardTitle>
      </Card>
    </>
  )
}
  
export default UserCard
  