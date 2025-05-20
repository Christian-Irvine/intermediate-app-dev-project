import QuizQuestion from "./QuizQuestion";
import type { QuizQuestionProps } from "./QuizQuestion";

interface QuizDisplayProps {
  results: Array<QuizQuestionProps>;
}

const QuizDisplay: React.FC<QuizDisplayProps> = (props: QuizDisplayProps) => {  
  return (
    <>
      <QuizQuestion question={props.results[0].question} correct_answer={props.results[0].correct_answer} incorrect_answers={props.results[0].incorrect_answers}/>
    </>
  )
}

export default QuizDisplay;