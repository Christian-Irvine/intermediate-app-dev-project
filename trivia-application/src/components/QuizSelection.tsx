import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface QuizSelectionData {
  name: string;
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}

const QuizSelection: React.FC = () => {
  const quizSelectionForm = useForm();
  
  const defaultValues: QuizSelectionData = {
    name: "Anonymous",
    amount: 10,
    category: "Any Category",
    difficulty: "Any Difficulty",
    type: "Any Type",
  }

  const [formValues, setFormValues] = useState<QuizSelectionData>(defaultValues)
  
  const {
    isLoading,
    error,
    data: quizData,
    refetch
  } = useQuery({
    enabled: false,
    queryKey: ["quizData"],
    queryFn: () =>
      fetch(getURL(formValues)).then((res) => res.json()),
  });

  const handleQuizFormSubmit = (values: QuizSelectionData) => {
    setFormValues(values);
    refetch();
  };

  const getURL = (values: QuizSelectionData) => {
    const baseURL = `https://opentdb.com/api.php`
    let URL = baseURL;

    URL += `?amount=${values.amount || defaultValues.amount}`;

    if (values.category && values.category !== defaultValues.category) URL += `&category=${values.category}`;

    if (values.difficulty && values.difficulty !== defaultValues.difficulty) URL += `&difficulty=${values.difficulty}`;

    if (values.type && values.type !== defaultValues.type) URL += `&type=${values.type}`;

    // if (values.type === defaultValues.type) URL += `&type=${defaultValues.type}`;
    // else if (values.type) URL += `&type=${values.type}`;

    return URL;
  }

  if (quizData) {
    console.log(quizData);
  }

  return (
    <>
      <form onSubmit={quizSelectionForm.handleSubmit(handleQuizFormSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" defaultValue={defaultValues.name} {...quizSelectionForm.register("name")} />
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" defaultValue={defaultValues.amount} {...quizSelectionForm.register("amount")} />
        <label htmlFor="category">Category</label>
        <input type="text" id="category" defaultValue={defaultValues.category} {...quizSelectionForm.register("category")}/>
        <label htmlFor="difficulty">Difficulty</label>
        <input type="text" id="difficulty" defaultValue={defaultValues.difficulty} {...quizSelectionForm.register("difficulty")}/>
        <label htmlFor="type">type</label>
        <input type="text" id="Type" defaultValue={defaultValues.type} {...quizSelectionForm.register("type")}/>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default QuizSelection;