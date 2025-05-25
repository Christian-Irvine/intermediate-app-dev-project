import { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import type { QuizQuestionProps } from "./QuizQuestion";
import type { Score } from "../Utils";
import { useForm } from "react-hook-form";

import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"

import parse from 'html-react-parser';
import { addNewHighScore, loadHighScores } from "../Utils";

interface QuizDisplayProps {
  results: Array<QuizQuestionProps>;
  categoryData: Array<string>;
  userName: string;
  resetQuiz: Function;
  category: string;
}

const QuizDisplay: React.FC<QuizDisplayProps> = (props: QuizDisplayProps) => { 
  const quizForm = useForm();
  
  const [quizScore, setQuizScore] = useState<Array<boolean>>(new Array(props.results.length))
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [showAnswers, setshowAnswers] = useState<boolean>(false);

  const answerQuestion = (isCorrect: boolean) => {
    quizScore[quizIndex] = isCorrect;
    setQuizIndex(quizIndex + 1);
  }

  const saveScore = () => {
    const score: Score = {
      userName: props.userName,
      score: quizScore.filter((score) => score == true).length,
      category: props.category,
    }

    addNewHighScore(props.category, score);

    console.log(loadHighScores(props.category));
  }

  useEffect(() => {
    if (showAnswers) {
      saveScore();
      // map this function down in html loadHighScores();
    }
  }, [showAnswers]);

  if (quizIndex >= props.results.length) {
    return (
      <>
        {showAnswers ? (
          <section className="flex justify-center m-20">
            <article>
              <ol>
                {props.results.map((question, index) => 
                  <li key={question.question} className="text-xl w-200 py-2">
                    <label>{parse(question.question)}: </label>
                    <label className={(quizScore[index] ? 'text-green-500' : 'text-red-600') + ' font-bold'}>{parse(question.correct_answer)}</label>
                  </li>
                )}
              </ol>
              <p className="py-10">{props.userName} scored: {quizScore.filter((score) => score == true).length} points! out of a {quizScore.length} possible points.</p>
              
            </article>
          </section>
        ) : (
          <form onSubmit={quizForm.handleSubmit(() => setshowAnswers(true))} className="flex justify-center m-40">
            <Label htmlFor="name" className="text-2xl">Thats all the questions! Are you ready to see how you did?</Label>
            <Button type="submit" className="m-10 text-black">Submit Answers</Button>
          </form>
        )}
      </>
    )
  }

  return (
    <>
      <QuizQuestion question={props.results[quizIndex].question} correct_answer={props.results[quizIndex].correct_answer} incorrect_answers={props.results[quizIndex].incorrect_answers} answerQuestion={answerQuestion}/>
    </>
  )
}

export default QuizDisplay;