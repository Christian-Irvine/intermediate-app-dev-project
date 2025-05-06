import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

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

  const { mutate: getQuizMutation, data: getQuizData } =
  useMutation({
    mutationFn: (quizData: QuizSelectionData) =>
      fetch(getURL(quizData), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: quizData.name,
          amount: quizData.amount,
          category: quizData.category,
          difficulty: quizData.difficulty,
          type: quizData.type,
        }),
      }).then((res) => {
        console.log(res);
        if (res.status === 201 || res.status === 200) {
          quizSelectionForm.reset((formValues) => ({
            ...formValues,
            name: defaultValues.name,
            amount: defaultValues.amount,
            category: defaultValues.category,
            difficulty: defaultValues.difficulty,
            type: defaultValues.type,
          }));
        }
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quizData"],
      })
    }
  });

  const handleQuizFormSubmit = (values: QuizSelectionData) => getQuizMutation(values)

  const getURL = (values: any) => {
    return `https://opentdb.com/api.php?amount=${values.amount || defaultValues}&category=${values.category || defaultValues.category}&difficulty=${values.difficulty || defaultValues.difficulty}&type=${values.type || defaultValues.type}`
  }
  
  return (
    <>
      <form onSubmit={quizSelectionForm.handleSubmit(handleQuizFormSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...quizSelectionForm.register("name")} />
        <label htmlFor="amount">Amount</label>
        <input type="text" id="amount" {...quizSelectionForm.register("amount")} />
        <label htmlFor="category">Category</label>
        <input type="text" id="category" {...quizSelectionForm.register("category")}/>
        <label htmlFor="difficulty">Difficulty</label>
        <input type="text" id="difficulty" {...quizSelectionForm.register("difficulty")}/>
        <label htmlFor="type">type</label>
        <input type="text" id="Type" {...quizSelectionForm.register("type")}/>
        <button type="submit">Submit</button>
      </form>
      <p>{}</p>
    </>
  )
}

export default QuizSelection;