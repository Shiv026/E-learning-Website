import { useEffect, useState } from "react";
import api from "../utils/api";
import Loader from "./Loader";

const StudentDashboard = ({ userToken }) => {
  const [studentCourses, setStudentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/dashboard/user", { headers: { Authorization: `Bearer ${userToken}` } })
      .then((res) => {
        setStudentCourses(res.data.result || []);
      })
      .finally(() => setLoading(false));
  }, [userToken]);

  const getProgress = () => Math.floor(Math.random() * 100);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-primary mb-4">My Courses</h2>
      {studentCourses.length === 0 ? (
        <div className="text-muted text-center">You are not enrolled in any courses yet.</div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {studentCourses.map((course) => (
            <div
              key={course.course_id}
              className="bg-secondary border border-border rounded-xl shadow p-5 flex flex-col"
            >
              <h3 className="text-lg font-bold text-primary mb-1">{course.title}</h3>
              <div className="text-muted text-sm mb-2">
                Instructor: {course.instructor_name}
              </div>
              <div className="text-text mb-2">
                Enrolled: {new Date(course.enrolled_at).toLocaleDateString()}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-primary">
                  ₹{course.price}
                </span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>Progress</span>
                  <span>{getProgress()}%</span>
                </div>
                <div className="w-full h-2 bg-border rounded">
                  <div
                    className="h-2 rounded bg-primary transition-all"
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;