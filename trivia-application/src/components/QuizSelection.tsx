import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getDisplayName } from "../Utils";
import type { QuizSelectionData } from "./Quiz"; 

interface QuizSelectionProps {
  handleFormSubmit: Function;
  defaultFormValues: QuizSelectionData; 
}

const QuizSelection: React.FC<QuizSelectionProps> = (props: QuizSelectionProps) => {
  const quizSelectionForm = useForm();

  const {
    isLoading: categoryIsLoading,
    error: categoryError,
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
        <h1 className="justify-self-center">There was an error, Please try again later</h1>
        <p className="justify-self-center">{categoryError.message}</p>
      </>
    )
  }

  if (categoryIsLoading || !categoryData) {
    return (
      <h1 className="justify-self-center">Loading...</h1>
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

  return (
    <>
      <section>
        <h2 className="font-bold text-2xl justify-self-center pb-10 pt-5">Craft Your Quiz!</h2>

        <form onSubmit={quizSelectionForm.handleSubmit(() => props.handleFormSubmit())} className="justify-center flex">
          <article className="px-5">
            <label htmlFor="name" className="pr-2">Name:</label>
            <input type="text" id="name" defaultValue={props.defaultFormValues.name} {...quizSelectionForm.register("name")} />
          </article>
          
          <article className="px-5">
            <label htmlFor="amount" className="pr-2">Amount:</label>
            <input type="number" id="amount" defaultValue={props.defaultFormValues.amount} {...quizSelectionForm.register("amount")} />
          </article>

          <article className="px-5">
            <label htmlFor="category" className="pr-2">Category:</label>
            <select id="category" defaultValue={props.defaultFormValues.category} {...quizSelectionForm.register("category")}>
              <option value={props.defaultFormValues.category}>{getDisplayName(props.defaultFormValues.category)}</option>
              {categoryData.trivia_categories.map((category: any) => (
                <option key={category.id} value={category.id}>{getDisplayName(category.name)}</option>
              ))}
            </select>
          </article>

          <article className="px-5">
            <label htmlFor="difficulty" className="pr-2">Difficulty:</label>
            <select id="difficulty" defaultValue={props.defaultFormValues.difficulty} {...quizSelectionForm.register("difficulty")}>
              <option value={props.defaultFormValues.difficulty}>{getDisplayName(props.defaultFormValues.difficulty)}</option>
              {difficulties.map((difficulty: any) => (
                <option key={difficulty} value={difficulty}>{getDisplayName(difficulty)}</option>
              ))}
            </select>
          </article>

          <article className="px-5">
            <label htmlFor="type" className="pr-2">Type:</label>
            <select id="type" defaultValue={props.defaultFormValues.type} {...quizSelectionForm.register("type")}>
              <option value={props.defaultFormValues.type}>{getDisplayName(props.defaultFormValues.type)}</option>
              {types.map((type: any) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </article>
          
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  )
}

export default QuizSelection;