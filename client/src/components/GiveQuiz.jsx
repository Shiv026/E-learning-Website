import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GiveQuiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/quizzes/${courseId}`);
        const data = await response.json();
        setQuizzes(data.quizzes || []);
        console.log("Fetched quizzes:", data.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [courseId]);

  if (loading)
    return <div className="p-10 text-center text-gray-600">Loading quizzes...</div>;

  const handleStartQuiz = (quiz) => {
    console.log("Navigating with quiz:", quiz);
    navigate("/quizzes", {
      state: { quiz },
    });
  };

  return (
    <div className="flex justify-center min-h-screen bg-violet-50 p-4 sm:p-8 md:p-12 font-['Inter',_sans-serif]">
      <div className="w-full max-w-5xl">
        <header className="m-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Quizzes</h1>
          <p className="text-lg text-gray-600">
            Choose a quiz to test your knowledge. Good luck!
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
            <span className="flex-grow text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Quiz Title
            </span>
            <span className="w-40 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Action
            </span>
          </div>

          <div>
            {quizzes.length > 0 ? (
              quizzes.map((quiz, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center px-6 py-5 ${index < quizzes.length - 1 ? "border-b border-gray-200" : ""
                    }`}
                >
                  <span className="flex-grow font-semibold text-gray-800 pr-4">
                    {quiz.quiz_title}
                  </span>
                  <div className="w-40 flex justify-center">
                    <button
                      className="bg-primary text-white hover:bg-green-700 rounded-lg text-sm font-semibold h-12 w-32 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 p-6">
                No quizzes available for this course.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}