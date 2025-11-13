import { FiTrash2 } from "react-icons/fi";

export default function LessonInput({
  lesson,
  index,
  onChange,
  onRemove,
  canRemove,
}) {
  // Creates unique ID for the file input to link with its label
  const fileInputId = `video-upload-${lesson.id}`;

  return (
    <div className="border border-gray-200 p-6 rounded-lg relative bg-gray-50/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Lesson {index + 1}
        </h3>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(lesson.id)}
            className="text-gray-400 hover:text-red-600"
            aria-label={`Remove lesson ${index + 1}`}
          >
            <FiTrash2 className="w-5 h-7 hover:cursor-pointer" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Lesson Title */}
        <div>
          <label
            htmlFor={`lesson-title-${lesson.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Lesson Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              id={`lesson-title-${lesson.id}`}
              name="title"
              value={lesson.title}
              onChange={(e) => onChange(lesson.id, e)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g. Introduction to Tailwind CSS"
              required
            />
          </div>
        </div>

        {/* Video Description */}
        <div>
          <label
            htmlFor={`lesson-description-${lesson.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Video Description
          </label>
          <div className="mt-1">
            <textarea
              id={`lesson-description-${lesson.id}`}
              name="description"
              rows={4}
              value={lesson.description}
              onChange={(e) => onChange(lesson.id, e)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Add a short summary of what this lesson covers..."
              required
            />
          </div>
        </div>

        {/* Upload Video */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Video
          </label>
          <div className="mt-1 flex items-center space-x-3">
            <label
              htmlFor={fileInputId}
              className="cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Select Video File
            </label>
            <input
              id={fileInputId}
              name="videoFile"
              type="file"
              className="sr-only"
              onChange={(e) => onChange(lesson.id, e)}
              accept="video/*"
              required
            />
            <span className="text-sm text-gray-500">
              {lesson.videoFile ? lesson.videoFile.name : 'No file chosen'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}