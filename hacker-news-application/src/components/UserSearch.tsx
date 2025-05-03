import { useQueries } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import UserCard from "./UserCard";
import { useState } from "react";

export interface UserInfo {
  name: string;
}

const UserSearch: React.FC = () => {
  const userForm = useForm();
  const usernames: Array<string> = ['tptacek', 'jacquesm', 'ingve', 'todsacerdoti', 'rbanffy', 'pseudolus', 'danso', 'tosh', 'JumpCrisscross', 'Tomte'];

  const [selectedUsernameIndex, setSelectedUsernameIndex] = useState<number>(-2);

  const usersData = useQueries({
    queries: usernames.map((username) => ({
      queryKey: [username], 
      queryFn: () => fetch(getApiRoute(username)).then((res: Response) => res.json()),
    }))
  });

  const getApiRoute = (name: string) => {
    return `https://hacker-news.firebaseio.com/v0/user/${name}.json?print=pretty`
  }

  const handleUserSubmit = (values: UserInfo) => {
    setSelectedUsernameIndex(usernames.indexOf(values.name));
    console.log(selectedUsernameIndex);
  }

  if (usersData === undefined) return <h1 className="p-20">Loading...</h1>;
  if (usersData.length !== 10) {
    return (
      <>
        <h2 className="p-20">Something went wrong with fetching users, please try again later.</h2>
      </>
    );
  }

  return (
    <>
      <section className="mx-100 px-20 bg-slate-100 justify-start text-left">
        <form className="py-20" onSubmit={userForm.handleSubmit(handleUserSubmit)}>
          <label className="font-bold" htmlFor="name">Search for user</label>
          <input className="border-solid" type="text" id="name" {...userForm.register("name")} />
          <button className="bg-slate-100" type="submit">Submit</button>
        </form>
        {selectedUsernameIndex >= 0 ? (
          <UserCard name={selectedUsernameIndex}/>
        ) : selectedUsernameIndex === -1 && 
          <p>Couldn't find user. Try a different spelling!</p>
        }
      </section>
    </>
  );
};

export default UserSearch;
