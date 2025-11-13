import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FaCheckCircle, FaPlus } from "react-icons/fa";

function LessonsUploadSuccessful() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const lessons = location.state?.lessons || [];

  return (
    <div className="max-w-2xl p-8 mx-auto bg-secondary rounded-lg shadow-lg mt-20 border border-border">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-primary font-display">
            Lessons Uploaded Successfully!
          </h1>
          <p className="mt-1 text-muted font-medium">
            Your lessons are now live for students. Ready to create a quiz to
            test their knowledge?
          </p>
        </div>
        <button
          className="flex items-center justify-center flex-shrink-0 gap-1.5 px-4 py-2 font-medium text-white bg-primary rounded-md shadow-sm hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={() => navigate(`/quizzes/create-quiz/${courseId}`)}
        >
          <FaPlus className="w-5 h-5" />
          Create Quiz
        </button>
      </div>

      {/* Uploaded Lessons Summary Card */}
      <div className="overflow-hidden border border-border rounded-lg">
        <h3 className="px-6 py-4 text-lg font-semibold text-neutral-600">
          Uploaded Lessons Summary
        </h3>

        {/* Header Row */}
        <div className="flex justify-between px-6 py-3 border-b border-border">
          <span className="text-xs font-semibold tracking-wider text-text uppercase">
            Lesson Title
          </span>
          <span className="text-xs font-semibold tracking-wider text-text uppercase">
            Status
          </span>
        </div>

        {/* Lesson List */}
        <div className="divide-y divide-border">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <span className="text-sm font-medium text-text">
                {lesson.title}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary bg-opacity-10 text-white">
                <FaCheckCircle className="w-4 h-4" />
                Uploaded
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LessonsUploadSuccessful;