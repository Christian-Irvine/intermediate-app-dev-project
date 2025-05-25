import { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import type { QuizQuestionProps } from "./QuizQuestion";
import type { Score } from "../Utils";
import { useForm } from "react-hook-form";

import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"

import parse from 'html-react-parser';
import { addNewHighScore, formatCategory, loadHighScores } from "../Utils";

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
  const [highScores, setHighScores] = useState<Array<any>>([]);

  const answerQuestion: Function = (isCorrect: boolean) => {
    quizScore[quizIndex] = isCorrect;
    setQuizIndex(quizIndex + 1);
  }

  const saveScore: Function = () => {
    const score: Score = {
      userName: props.userName,
      score: quizScore.filter((score) => score == true).length,
      category: props.category,
    }

    addNewHighScore(props.category, score);
  }

  useEffect(() => {
    if (showAnswers) {
      saveScore();
      // map this function down in html loadHighScores();
      setHighScores(loadHighScores(props.category))
    }
  }, [showAnswers]);

  if (quizIndex >= props.results.length) {
    return (
      <>
        {showAnswers ? (
          <section className="flex justify-center m-5">
            <article>
              <ol>
                {props.results.map((question, index) => 
                  <li key={question.question} className="text-l w-200 py-2">
                    <label>{parse(question.question)}: </label>
                    <label className={(quizScore[index] ? 'text-green-500' : 'text-red-600') + ' font-bold'}>{parse(question.correct_answer)}</label>
                  </li>
                )}
              </ol>
              <p className="py-5">{props.userName} scored: {quizScore.filter((score) => score == true).length} points! out of a {quizScore.length} possible points.</p>
              <Button onClick={() => props.resetQuiz()} className="text-black">Back To Selection</Button>
              {highScores.length > 0 ? (
                <>
                  <p className="py-5 font-bold text-xl" >High Scores for: {formatCategory(props.category, props.categoryData)}</p>
                  {highScores.map((score: Score, index: number) =>
                    <div key={index}>
                      {(index < 5) &&
                        <p>{score.userName} scored: {score.score} points!</p>
                      }
                    </div>
                  )}
                </>
                ) : (
                  <p>No High scores to show for {}</p>
                )
              }
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