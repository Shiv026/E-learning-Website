const LessonInfo = ({ lesson }) => {
  if (!lesson) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight">
        {lesson.title}
      </h2>

      <div className="h-px w-full bg-gray-300"></div>

      <p className="text-neutral-700 text-lg leading-relaxed">
        {lesson.description}
      </p>
    </div>
  );
};

export default LessonInfo;