/**
 * Created by Christian James Irvine
 * Renders the quiz logo to the screen
 */
const QuizLogo: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-center p-10">
        <div className="bg-blue-200 radius rounded-full w-80">
          <h1 className="p-5 font-bold text-center">Quizinga!</h1>
        </div>
      </div>
    </>
  );
};

export default QuizLogo;
