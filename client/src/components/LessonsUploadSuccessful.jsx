import React from 'react';

// --- Icon (from heroicons) ---
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * LessonsUploadSuccessful Component
 *
 * Displays a success message and a summary of uploaded lessons.
 * @param {object} props
 * @param {Array<{id: string, title: string}>} props.lessons - An array of lesson objects.
 */
function LessonsUploadSuccessful({ lessons }) {
  return (
    <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Lessons Uploaded Successfully!
          </h1>
          <p className="mt-1 text-gray-600">
            Your lessons are now live for students. Ready to create a quiz to
            test their knowledge?
          </p>
        </div>
        <button className="flex items-center justify-center flex-shrink-0 gap-1.5 px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Create Quiz
        </button>
      </div>

      {/* Uploaded Lessons Summary Card */}
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <h3 className="px-6 py-4 text-lg font-medium text-gray-900 bg-gray-50">
          Uploaded Lessons Summary
        </h3>

        {/* Header Row */}
        <div className="flex justify-between px-6 py-3 border-b border-gray-200">
          <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
            Lesson Title
          </span>
          <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
            Status
          </span>
        </div>

        {/* Lesson List */}
        <div className="divide-y divide-gray-200">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <span className="text-sm font-medium text-gray-900">
                {lesson.title}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <CheckCircleIcon />
                Uploaded
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Example Usage ---
// This is how you would use the component in your application.

export default function App() {
  // This data would come from your server response
  const uploadedLessons = [
    { id: 'L1', title: 'Introduction to Programming' },
    { id: 'L2', title: 'Data Structures' },
    { id: 'L3', title: 'Algorithms' },
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <LessonsUploadSuccessful lessons={uploadedLessons} />
    </div>
  );
}