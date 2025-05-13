import { useState } from "react"
import QuizSelection from "./components/QuizSelection"
import { useEffect } from "react"

const App: React.FC = () => {
  const [quizData, setQuizData] = useState(undefined)

  // useEffect(() => {
  //   console.log("hehehe");
  // }, [quizData])

  return (
    <>
      <QuizSelection setQuizData={5}/>
    </>
  )
}

export default App
