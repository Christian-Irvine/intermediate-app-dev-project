import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

const QuizSelection: React.FC = () => {
  const quizSelectionForm = useForm();
  
  const { mutate: getQuizMutation, data: getQuizData } =
  useMutation({
    mutationFn: (quizData: any) =>
      fetch("http://opentdb.com/api_config.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: quizData.name,
          region: quizData.region,
          country: quizData.country,
        }),
      }).then((res) => res.json()),
    onSuccess: () =>{
      queryClient.invalidateQueries({
        queryKey: ["quizData"],
      }),
      console.log(getQuizData);
    }
      
  });

  const handleQuizFormSubmit = (values: any) => getQuizMutation(values)

  
  return (
    <>
      <form onSubmit={quizSelectionForm.handleSubmit(handleQuizFormSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...quizSelectionForm.register("name")} />
        <label htmlFor="region">Region</label>
        <input type="text" id="region" {...quizSelectionForm.register("region")} />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          {...quizSelectionForm.register("country")}
        />
        <button type="submit">Submit</button>
      </form>
      {/* // ...  */}
    </>
  )
}

export default QuizSelection;