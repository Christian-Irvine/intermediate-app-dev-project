import QuizSelection from "./QuizSelection";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../main";

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
    quizIsLoading,
    quizError,
    data: quizData,
    refetch
  } = useQuery({
    enabled: false,
    queryKey: ["quizData"],
    queryFn: () => 
      fetch(getQuizURL(formValues)).then((res: Response) => res.json()),
  });

  useEffect(() => {
    console.log(quizData);
  }, [quizData]);

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
    console.log(quizData)
  };

  console.log(quizData);

  return (
    <>
      <QuizSelection handleFormSubmit={handleQuizFormSubmit} defaultFormValues={defaultValues}/>
    </>
  )
}

export default Quiz
