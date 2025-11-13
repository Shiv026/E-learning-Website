const LessonList = ({ lessons, handleLessonClick, selectedLessonId }) => {
  return (
    <>
      {lessons.map((lesson) => (
        <div
          key={lesson.lesson_id}
          onClick={() => handleLessonClick(lesson.lesson_id)}
          className={`p-6 border rounded-lg cursor-pointer transition-shadow duration-300 
              ${lesson.lesson_id === selectedLessonId ? "border-accent shadow-md" : "border-gray-300 hover:shadow-md"}`}
        >
          <h2 className="text-lg text-neutral-500 font-semibold hover:text-accent">
            {lesson.title}
          </h2>
        </div>
      ))}
    </>);
}
export default LessonList;