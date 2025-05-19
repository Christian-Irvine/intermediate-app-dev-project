import QuizSelection from "./QuizSelection";
import QuizDisplay from "./QuizDisplay";
import QuizLogo from "./QuizLogo";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface QuizSelectionData {
  name: string;
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}

const Quiz: React.FC = () => {  
  const defaultValues: QuizSelectionData = {
    name: "Anonymous",
    amount: 10,
    category: "any-category",
    difficulty: "any-difficulty",
    type: "any-type",
  }

  const [formValues, setFormValues] = useState(defaultValues);

  const {
    error: quizError,
    data: quizData,
    refetch
  } = useQuery({
    enabled: false,
    queryKey: ["quizData"],
    queryFn: () => 
      fetch(getQuizURL(formValues)).then((res: Response) => res.json()),
  });

  const getQuizURL = (values: QuizSelectionData) => {
    const baseURL = `https://opentdb.com/api.php`;
    let URL = baseURL;

    URL += `?amount=${values.amount || defaultValues.amount}`;

    if (values.category && values.category !== defaultValues.category) URL += `&category=${values.category}`;

    if (values.difficulty && values.difficulty !== defaultValues.difficulty) URL += `&difficulty=${values.difficulty}`;

    if (values.type && values.type !== defaultValues.type) URL += `&type=${values.type}`;

    return URL;
  }

  const handleQuizFormSubmit: Function = (values: QuizSelectionData) => {
    setFormValues(values);
    refetch();
  };

  if (quizError) {
    return (
      <>
        <h1>There was an error, Please try again later</h1>
        <p>{quizError.message}</p>
      </>
    )
  }

  return (
    <>
      <div className="items-center bg-amber-100 h-screen">
        <QuizLogo/>

        {quizData && quizData.response_code === 0 ? (
          <QuizDisplay/>
        ) : (
          <QuizSelection handleFormSubmit={handleQuizFormSubmit} defaultFormValues={defaultValues}/>
        )}
      </div>
    </>
  )
}

export default Quiz
