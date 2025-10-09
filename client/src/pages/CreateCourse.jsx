import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import CourseForm from "../components/CourseForm";
import api from "../utils/api";
import { toast } from "react-toastify";


const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleCreateCourse = async (form) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category_id", form.category_id);
      formData.append("price", form.price);
      formData.append("thumbnail", form.thumbnail);


      const { data } = await api.post("/courses", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });


      toast.success(data.message || "Course created successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to create course. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CourseForm onSubmit={handleCreateCourse} loading={loading} />
    </div>
  );
};

export default CreateCourse;
