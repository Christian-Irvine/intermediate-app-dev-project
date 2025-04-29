import { useParams } from "react-router";

import "../App.css";

const Story: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <p>Hello! this is {id}</p>
    </>
  );
};

export default Story;
