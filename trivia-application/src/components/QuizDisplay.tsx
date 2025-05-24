import { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import type { QuizQuestionProps } from "./QuizQuestion";

interface QuizDisplayProps {
  results: Array<QuizQuestionProps>;
}

const QuizDisplay: React.FC<QuizDisplayProps> = (props: QuizDisplayProps) => { 
  const [quizScore, setQuizScore] = useState<Array<boolean>>(new Array(props.results.length))
  const [quizIndex, setQuizIndex] = useState<number>(0);

  const answerQuestion = (isCorrect: boolean) => {
    quizScore[quizIndex] = isCorrect;
    setQuizIndex(quizIndex + 1);
    console.log(props.results[quizIndex].correct_answer);
  }

  if (quizIndex >= props.results.length) {
    return (
      <p>Quiz Complete!</p>
    )
  }

  return (
    <>
      <QuizQuestion question={props.results[quizIndex].question} correct_answer={props.results[quizIndex].correct_answer} incorrect_answers={props.results[quizIndex].incorrect_answers} answerQuestion={answerQuestion}/>
    </>
  )
}

export default QuizDisplay;