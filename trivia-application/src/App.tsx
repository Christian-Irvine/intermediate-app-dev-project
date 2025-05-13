import QuizSelection from "./components/QuizSelection"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const [quizData, setQuizData] = useState(undefined);

  useEffect(() => {
    console.log(quizData);
  }, [quizData]);

  return (
    <>
      <QuizSelection setQuizData={() => setQuizData}/>
    </>
  )
}

export default App
