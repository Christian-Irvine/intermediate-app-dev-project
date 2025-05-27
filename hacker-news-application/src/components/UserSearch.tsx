import { useQueries } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import UserCard from "./UserCard";
import { UserProps } from "./UserCard";
import { useState } from "react";

export interface UserInfo {
  name: string;
}

interface UserData {
  data: UserProps;
}

const UserSearch: React.FC = () => {
  const userForm = useForm();
  const usernames: Array<string> = [
    "tptacek",
    "jacquesm",
    "ingve",
    "todsacerdoti",
    "rbanffy",
    "pseudolus",
    "danso",
    "tosh",
    "JumpCrisscross",
    "Tomte",
  ];

  const [selectedUsernameIndex, setSelectedUsernameIndex] =
    useState<number>(-2);

  const usersData: Array<UserData> = useQueries({
    queries: usernames.map((username) => ({
      queryKey: [username],
      queryFn: () =>
        fetch(getApiRoute(username)).then((res: Response) => res.json()),
    })),
  });

  const getApiRoute: Function = (username: string) => {
    return `https://hacker-news.firebaseio.com/v0/user/${username}.json?print=pretty`;
  };

  const handleUserSubmit = (values: any) => {
    setSelectedUsernameIndex(usernames.indexOf(values.name));
  };

  if (usersData === undefined) return <h1 className="p-20">Loading...</h1>;
  if (usersData.length !== usernames.length) {
    return (
      <>
        <h2 className="p-20">
          Something went wrong with fetching users, please try again later.
        </h2>
      </>
    );
  }

  return (
    <>
      <section className="mx-100 px-20 bg-slate-100 justify-start text-left">
        <form
          className="py-20"
          onSubmit={userForm.handleSubmit(handleUserSubmit)}
        >
          <label className="font-bold" htmlFor="name">
            Search for user
          </label>
          <input
            className="w-1/2 mx-5 border-4 rounded-md"
            type="text"
            id="name"
            {...userForm.register("name")}
          />
          <button className="bg-slate-100" type="submit">
            Submit
          </button>
        </form>

        <p className="font-bold">Top Users:</p>

        {usernames.map((name: string) => (
          <p key={name.toString()} className="text-lg">
            {name}
          </p>
        ))}

        {selectedUsernameIndex >= 0 &&
        selectedUsernameIndex < usernames.length ? ( // if number is in array display that user
          <UserCard
            id={usersData[selectedUsernameIndex].data.id}
            submitted={usersData[selectedUsernameIndex].data.submitted}
            about={usersData[selectedUsernameIndex].data.about}
            karma={usersData[selectedUsernameIndex].data.karma}
            created={usersData[selectedUsernameIndex].data.created}
          />
        ) : (
          selectedUsernameIndex === -1 && ( // if it isn't in array say couldn't find it, else do nothing.
            <p>Couldn't find user. Try a different spelling!</p>
          )
        )}
      </section>
    </>
  );
};

export default UserSearch;
