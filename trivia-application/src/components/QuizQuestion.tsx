import { useForm } from "react-hook-form";

import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"

export interface QuizQuestionProps {
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

interface QuizAnswers {
  answer: string;
  correct_answer: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = (props: QuizQuestionProps) => {  
  const questionForm = useForm();
  const handleQuestionSubmit = (values: any) => {
    console.log(values)
  }

  const jumbleAnswers = () => {
    const correctAnswerIndex: number = Math.floor(Math.random() * props.incorrect_answers.length + 1);
    const answers: Array<QuizAnswers> = new Array<QuizAnswers>(props.incorrect_answers.length + 1);

    for (let i = 0; i < props.incorrect_answers.length + 1; i++){
      if (i < correctAnswerIndex) {
        answers[i] = {
          answer: props.incorrect_answers[i],
          correct_answer: false,
        }
      }
      else if (i === correctAnswerIndex) {
        answers[i] = {
          answer: props.correct_answer,
          correct_answer: true,
        }
      }
      else {
        answers[i] = {
          answer: props.incorrect_answers[i - 1],
          correct_answer: false,
        }
      }
    }

    return answers;
  }
  
  const answers: Array<QuizAnswers> = jumbleAnswers();
  console.log(answers);

  return (
    <>
      <p>{props.question}</p>
      <Form>
        <form onSubmit={questionForm.handleSubmit(handleQuestionSubmit)}>
          {answers.map((answer) => 
            <FormItem>
              <Button key={answer.answer} type="submit" className="text-gray-800">{answer.answer}</Button>
            </FormItem>
          )}
        </form>
      </Form>
    </>
  )
}

export default QuizQuestion;