import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getDisplayName } from "../Utils";

interface QuizSelectionProps {
  handleFormSubmit: Function;
  defaultFormValues: any;
}

const QuizSelection: React.FC<QuizSelectionProps> = (props: QuizSelectionProps) => {
  const quizSelectionForm = useForm();

  // useEffect(() => {
  //   console.log("Hey");
  //   () => props.setQuizData();
  // }, [quizData]);

  // const handleQuizFormSubmit = (values: QuizSelectionData) => {      
  //   formValues = values;
  //   refetch();
  // };

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

  return (
    <>
      <form onSubmit={quizSelectionForm.handleSubmit(() => props.handleFormSubmit())}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" defaultValue={props.defaultFormValues.name} {...quizSelectionForm.register("name")} />
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" defaultValue={props.defaultFormValues.amount} {...quizSelectionForm.register("amount")} />
        <label htmlFor="category">Category</label>
        <select id="category" defaultValue={props.defaultFormValues.category} {...quizSelectionForm.register("category")}>
          <option value={props.defaultFormValues.category}>{getDisplayName(props.defaultFormValues.category)}</option>
          {categoryData.trivia_categories.map((category: any) => (
            <option key={category.id} value={category.id}>{getDisplayName(category.name)}</option>
          ))}
        </select>
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" defaultValue={props.defaultFormValues.difficulty} {...quizSelectionForm.register("difficulty")}>
          <option value={props.defaultFormValues.difficulty}>{getDisplayName(props.defaultFormValues.difficulty)}</option>
          {difficulties.map((difficulty: any) => (
            <option key={difficulty} value={difficulty}>{getDisplayName(difficulty)}</option>
          ))}
        </select>
        <label htmlFor="type">Type</label>
        <select id="type" defaultValue={props.defaultFormValues.type} {...quizSelectionForm.register("type")}>
          <option value={props.defaultFormValues.type}>{getDisplayName(props.defaultFormValues.type)}</option>
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