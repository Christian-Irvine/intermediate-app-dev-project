import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getDisplayName } from "../Utils";

interface QuizSelectionData {
  name: string;
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}

interface QuizSelectionProps {
  setQuizData: Function
}

const QuizSelection: React.FC<any> = (props: QuizSelectionProps) => {
  const quizSelectionForm = useForm();
  
  const defaultValues: QuizSelectionData = {
    name: "Anonymous",
    amount: 10,
    category: "any-category",
    difficulty: "any-difficulty",
    type: "any-type",
  }

  let formValues = defaultValues
  
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

  const handleQuizFormSubmit = (values: QuizSelectionData) => {
    props.setQuizData('Howdy')
    formValues = values;
    refetch();
  };

  const getQuizURL = (values: QuizSelectionData) => {
    const baseURL = `https://opentdb.com/api.php`;
    let URL = baseURL;

    URL += `?amount=${values.amount || defaultValues.amount}`;

    if (values.category && values.category !== defaultValues.category) URL += `&category=${values.category}`;

    if (values.difficulty && values.difficulty !== defaultValues.difficulty) URL += `&difficulty=${values.difficulty}`;

    if (values.type && values.type !== defaultValues.type) URL += `&type=${values.type}`;

    return URL;
  }

  const {
    categoryIsLoading,
    categoryError,
    data: categoryData,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () =>
      fetch(getCategoryURL()).then((res: Response) => res.json()),
  });

  const getCategoryURL = () => {
    return `https://opentdb.com/api_category.php`;
  }

  if (categoryError) {
    return (
      <>
        <h1>There was an error, Please try again later</h1>
        <p>{categoryError}</p>
      </>
    )
  }

  if (categoryIsLoading || !categoryData) {
    return (
      <h1>Loading...</h1>
    )
  }

  const difficulties = ['easy', 'medium', 'hard'];
  const types = [
  {
    id: 'multiple',
    name: 'Multi Choice'
  }, 
  {
    id: 'boolean',
    name: 'True or False'
  }];

  if (quizData) {
    console.log("chicken joekcy");
    props.setQuizData('Hello!');
  }

  return (
    <>
      <form onSubmit={quizSelectionForm.handleSubmit(handleQuizFormSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" defaultValue={defaultValues.name} {...quizSelectionForm.register("name")} />
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" defaultValue={defaultValues.amount} {...quizSelectionForm.register("amount")} />
        <label htmlFor="category">Category</label>
        <select id="category" defaultValue={defaultValues.category} {...quizSelectionForm.register("category")}>
          <option value={defaultValues.category}>{getDisplayName(defaultValues.category)}</option>
          {categoryData.trivia_categories.map((category: any) => (
            <option key={category.id} value={category.id}>{getDisplayName(category.name)}</option>
          ))}
        </select>
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" defaultValue={defaultValues.difficulty} {...quizSelectionForm.register("difficulty")}>
          <option value={defaultValues.difficulty}>{getDisplayName(defaultValues.difficulty)}</option>
          {difficulties.map((difficulty: any) => (
            <option key={difficulty} value={difficulty}>{getDisplayName(difficulty)}</option>
          ))}
        </select>
        <label htmlFor="type">Type</label>
        <select id="type" defaultValue={defaultValues.type} {...quizSelectionForm.register("type")}>
          <option value={defaultValues.type}>{getDisplayName(defaultValues.type)}</option>
          {types.map((type: any) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default QuizSelection;