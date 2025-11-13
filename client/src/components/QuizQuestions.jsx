import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function QuizQuestions() {
  const location = useLocation();
  const quiz = location.state?.quiz;
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="p-10 text-center text-red-500">
        No quiz data found. Go back and select a quiz.
        <pre className="text-sm bg-gray-100 p-4 mt-4 rounded">
          {JSON.stringify(location.state, null, 2)}
        </pre>
      </div>
    );
  }

  const { quiz_title, questions } = quiz;


  const handleSelectOption = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", selectedAnswers);
    alert("Quiz submitted! Check console for selected answers.");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Quiz Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
          {quiz_title}
        </h1>

        {/* Questions */}
        <div className="space-y-10">
          {questions.map((question, index) => (
            <div key={question.id}>
              {/* Question */}
              <div className="flex items-start mb-6">
                <span className="text-2xl font-bold text-primary mr-3">
                  {index + 1}.
                </span>
                <h2 className="text-xl font-semibold text-gray-800">
                  {question.question_text}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {["A", "B", "C", "D"].map((letter) => {
                  const optionText = question[`option_${letter.toLowerCase()}`];
                  const isSelected = selectedAnswers[question.id] === letter;

                  return (
                    optionText && (
                      <label
                        key={letter}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-150 ease-in-out ${isSelected
                          ? "border-blue-500 bg-green ring-2 ring-blue-300"
                          : "border-gray-300 bg-white hover:bg-gray-50"
                          }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={letter}
                          checked={isSelected}
                          onChange={() =>
                            handleSelectOption(question.id, letter)
                          }
                          className="w-5 h-5 mr-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="font-semibold text-gray-700 mr-2">
                          {letter}.
                        </span>
                        <span className="text-gray-700">{optionText}</span>
                      </label>
                    )
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 cursor-pointer"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}