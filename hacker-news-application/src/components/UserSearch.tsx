import { useForm } from "react-hook-form"
import UserDisplay from "./UserDisplay";
import { UserInfo } from "./UserDisplay";
import { useState } from "react";

const UserSearch: React.FC = () => {
  const userForm = useForm();
  const users: Array<string> = ['tptacek', 'jacquesm', 'ingve', 'todsacerdoti', 'rbanffy', 'pseudolus', 'danso', 'tosh', 'JumpCrisscross', 'Tomte'];

  const [selectedUsername, setSelectedUsername] = useState<string>('');

  const handleUserSubmit = (values: UserInfo) => {
    setSelectedUsername(values.name);
    console.log(selectedUsername);
  }

  return (
    <>
      <section className="mx-100 px-20 bg-slate-100 justify-start text-left">
        <form className="py-20" onSubmit={userForm.handleSubmit(handleUserSubmit)}>
          <label className="font-bold" htmlFor="name">Search for user</label>
          <input className="border-solid" type="text" id="name" {...userForm.register("name")} />
          <button className="bg-slate-100" type="submit">Submit</button>
        </form>
        {users.includes(selectedUsername) ? (
          <UserDisplay name={selectedUsername}/>
        ) : selectedUsername !== '' && 
          <p>Couldn't find user {selectedUsername}.</p>
        }
      </section>
    </>
  );
};

export default UserSearch;
