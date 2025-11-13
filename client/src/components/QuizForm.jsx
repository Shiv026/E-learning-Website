import { useState, useContext } from 'react';
import api from '../utils/api.js';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';


export default function QuizForm() {
  const [quizTitle, setQuizTitle] = useState('');
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 1,
    }
  ]);

  // Add a new blank question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        questionText: '',
        options: ['', '', '', ''],
        correctAnswerIndex: null,
      },
    ]);
  };

  // Delete a question by its ID
  const deleteQuestion = (id) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Update a question's text
  const handleQuestionTextChange = (id, newText) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, questionText: newText } : q
      )
    );
  };

  // Update an option's text
  const handleOptionChange = (qId, optionIndex, newText) => {
    setQuestions(
      questions.map((q) =>
        q.id === qId
          ? {
            ...q,
            options: q.options.map((opt, i) =>
              i === optionIndex ? newText : opt
            ),
          }
          : q
      )
    );
  };

  // Update the correct answer for a question
  const handleCorrectAnswerChange = (qId, optionIndex) => {
    setQuestions(
      questions.map((q) =>
        q.id === qId ? { ...q, correctAnswerIndex: optionIndex } : q
      )
    );
  };

  // Handle the final form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quizTitle.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }

    // Validate all questions are filled
    const allFilled = questions.every(q =>
      q.questionText.trim() &&
      q.options.every(opt => opt.trim()) &&
      q.correctAnswerIndex !== null
    );

    if (!allFilled) {
      toast.error("Please fill in all questions and select correct answers");
      return;
    }

    const payload = questions.map(q => ({
      quiz_title: quizTitle,
      question_text: q.questionText,
      option_a: q.options[0],
      option_b: q.options[1],
      option_c: q.options[2],
      option_d: q.options[3],
      correct_option: String.fromCharCode(65 + q.correctAnswerIndex),
      course_id: courseId
    }));

    console.log("Payload sent to backend:", payload);

    try {
      const res = await api.post(
        `/quizzes/create-quiz/${courseId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          }
        }
      );
      toast.success(res.data.message || "Quiz created successfully!");
      navigate("/")
    } catch (err) {
      console.error("Error creating quiz:", err);
      toast.error(err.response?.data?.message || "Failed to create quiz");
    }
  };

  return (
    <div className="pt-16 flex justify-center items-center min-h-screen bg-secondary p-4">
      <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-2xl border border-border text-text">
        <h1 className="text-2xl font-bold text-primary mb-2 font-display">
          Create a New Quiz
        </h1>
        <p className="text-muted mb-6">
          Fill in the details to create a new quiz for your course.
        </p>

        <form onSubmit={handleSubmit}>
          {/* --- Quiz Title Section --- */}
          <div className="mb-6">
            <label
              htmlFor="quizTitle"
              className="block text-sm font-medium text-text mb-2"
            >
              Quiz Title
            </label>
            <input
              type="text"
              id="quizTitle"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="e.g., Introduction to Calculus Quiz"
              className="w-full p-3 border border-border rounded-md bg-secondary text-text focus:ring-primary focus:border-primary"
            />
          </div>

          {/* --- Dynamic Questions Section --- */}
          {questions.map((question, qIndex) => (
            <div
              key={question.id}
              className="mb-8 p-6 border border-border rounded-lg bg-secondary"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-primary">
                  Question {qIndex + 1}
                </h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteQuestion(question.id)}
                    className="text-danger hover:text-accent transition cursor-pointer"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Question Text Input */}
              <div className="mb-4">
                <label
                  htmlFor={`question-${question.id}`}
                  className="block text-sm font-medium text-text mb-2"
                >
                  Question
                </label>
                <input
                  type="text"
                  id={`question-${question.id}`}
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionTextChange(question.id, e.target.value)
                  }
                  placeholder="e.g., What is the derivative of x^2?"
                  className="w-full p-3 border border-border rounded-md bg-secondary text-text focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(question.id, oIndex, e.target.value)
                      }
                      placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                      className="flex-1 p-3 border border-border rounded-md bg-secondary text-text focus:ring-primary focus:border-primary"
                    />
                    {/* Radio button to select the correct answer */}
                    <input
                      type="radio"
                      name={`correct-answer-${question.id}`}
                      checked={question.correctAnswerIndex === oIndex}
                      onChange={() =>
                        handleCorrectAnswerChange(question.id, oIndex)
                      }
                      className="h-5 w-5 text-primary border-border focus:ring-primary cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* --- Form Footer Buttons --- */}
          <div className="flex justify-between items-center mt-8 gap-4">
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-accent transition cursor-pointer"
            >
              <FaPlus className="w-4 h-4" />
              Add Question
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-accent transition cursor-pointer"
            >
              Save Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}