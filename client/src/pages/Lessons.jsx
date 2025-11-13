import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import api from "../utils/api.js";
import Loader from '../components/Loader';
import LessonList from "../components/LessonList.jsx";
import LessonInfo from "../components/LessonInfo.jsx";

const Lessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");
  const [lessons, setLessons] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [error, setError] = useState(null);

  const handleLessonClick = (id) => {
    setSelectedLessonId(id);
  };

  useEffect(() => {
    if (!user?.token) return;
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/lessons/${courseId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setLessons(data);

        if (data.length > 0) {
          setSelectedLessonId(data[0].lesson_id);
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setError("You are not enrolled in this course.");
        } else {
          setError("Failed to load lessons.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId, user]);

  useEffect(() => {
    if (!selectedLessonId) console.log("FailedFetchingLessonID");
    if (!selectedLessonId || !user?.token) return;

    const fetchLessonDetails = async () => {
      try {
        const { data } = await api.get(
          `/lessons/${courseId}/${selectedLessonId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` }
          }
        );
        setSelectedLesson(data.lesson);
      } catch (err) {
        console.error("Failed to load lesson:", err);
      }
    };

    fetchLessonDetails();
  }, [selectedLessonId, courseId, user]);

  useEffect(() => {
    if (error) {
      navigate("/errors", {
        state: {
          message: error,
          navigateTo: `/courses`,
          buttonText: "Back to Course Page",
        },
      });
    }
  }, [error, navigate]);

  if (loading) return <Loader />;
  if (error) return null;
  return (
    <div className="pt-16 font-display pb-8">

      {selectedLesson && (
        <video
          className="w-full h-64 sm:h-80 md:h-96 lg:h-112 xl:h-150 object-cover mx-auto"
          src={selectedLesson.video_url}
          controls
          autoPlay
          muted
        />
      )}

      <div className="flex items-center w-full border-b border-gray-300 mb-8 px-12 relative">

        {/* LEFT SIDE TABS */}
        <ul className="flex gap-10 relative mt-1"> {/* lowered the tabs slightly */}

          <li>
            <button
              onClick={() => setActiveTab("content")}
              className={`
          pb-5 text-lg font-medium transition-all duration-500 ease-in-out
          ${activeTab === "content"
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-800"}
        `}
            >
              Course Content

              {activeTab === "content" && (
                <div className="h-[3px] bg-accent w-full rounded-full mt-3 transition-all duration-500 ease-in-out"></div>
              )}
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("overview")}
              className={`
          pb-5 text-lg font-medium transition-all duration-500 ease-in-out
          ${activeTab === "overview"
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-800"}
        `}
            >
              Overview

              {activeTab === "overview" && (
                <div className="h-[3px] bg-accent w-full rounded-full mt-3 transition-all duration-500 ease-in-out"></div>
              )}
            </button>
          </li>

        </ul>

        {/* RIGHT SIDE QUIZ */}
        <button
          onClick={() => navigate(`/quizzes/${courseId}`)}
          className="ml-auto flex items-center gap-2 text-lg font-medium text-neutral-600 hover:text-neutral-900 transition-all duration-500 ease-in-out pb-5 mt-1"
        >
          Attempt Quiz!
        </button>
      </div>



      <div className="max-w-3xl mx-auto space-y-4">
        {activeTab === "content" && (
          <LessonList
            handleLessonClick={handleLessonClick}
            selectedLessonId={selectedLessonId}
            lessons={lessons}
          />
        )}

        {activeTab === "overview" && (
          <LessonInfo lesson={selectedLesson} />
        )}
        {activeTab === 'quiz' && console.log('route to quiz')}
      </div>
    </div>
  );
};

export default Lessons;