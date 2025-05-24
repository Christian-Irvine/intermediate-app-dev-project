import { useForm, } from "react-hook-form";

import parse from 'html-react-parser';

import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { useState, useEffect } from "react";

export interface QuizQuestionProps {
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  answerQuestion: Function;
}

interface QuizAnswers {
  answer: string;
  correct_answer: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = (props: QuizQuestionProps) => {  
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(-1);
  const [answers, setAnswers] = useState<Array<QuizAnswers>>([]);

  const questionForm = useForm();

  const jumbleAnswers = () => {
    const correctIndex = Math.floor(Math.random() * props.incorrect_answers.length + 1);
    setCorrectAnswerIndex(correctIndex);
    const answers: Array<QuizAnswers> = new Array<QuizAnswers>(props.incorrect_answers.length + 1);

    for (let i = 0; i < props.incorrect_answers.length + 1; i++){
      if (i < correctIndex) {
        answers[i] = {
          answer: props.incorrect_answers[i],
          correct_answer: false,
        }
      }
      else if (i === correctIndex) {
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
  
  useEffect(() => {
    setAnswers(jumbleAnswers());
  }, [props.correct_answer]);

  return (
    <>
      <section className="flex justify-center m-40">
        <div>
          <Label htmlFor="question" className="text-2xl">{parse(props.question)}</Label>
          <article className="flex justify-center">
            {answers.map((answer, index) => 
              <Button key={answer.answer} onClick={() => props.answerQuestion(index == correctAnswerIndex)} type="submit" className="text-gray-800 m-10">{parse(answer.answer)}</Button>
            )}
          </article>
        </div>
      </section>
    </>
  )
}

export default QuizQuestion;