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

interface QuizQuestions {
  question: string;
  correct_answer: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = (props: QuizQuestionProps) => {  
  const questionForm = useForm();
  
  const handleQuestionSubmit = (values: any) => {
    console.log(values)
  }

  const correct_index: number = Math.floor(Math.random() * props.incorrect_answers.length + 1);

  const questions: Array<QuizQuestions> = [];

  for (let i = 0; i < props.incorrect_answers.length + 1; i++){
    if (i < correct_index) {
      questions[i].question = props.incorrect_answers[i];
      questions[i].correct_answer = false;
    }
    else if (i === correct_index) {
      questions[i].question = props.correct_answer;
      questions[i].correct_answer = true;
    }
    else {
      questions[i].question = props.incorrect_answers[i - 1];
      questions[i].correct_answer = false;
    }
  }

  console.log(questions);

  return (
    <>
      <Form>
        <form onSubmit={questionForm.handleSubmit(handleQuestionSubmit)}>
          {questions.map((question) => 
            <FormItem>
              <Button key={question.question} type="submit" className="text-gray-800">{question.question}</Button>
            </FormItem>
          )}
        </form>
      </Form>
    </>
  )
}

export default QuizQuestion;