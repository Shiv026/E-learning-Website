import { useNavigate, useLocation } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const Error = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const message = state?.message || "Something went wrong";
  const navigateTo = state?.navigateTo || "/";
  const buttonText = state?.buttonText || "Go Back";

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-12 max-w-lg w-full text-center animate-fadeIn border border-gray-200">

        <div className="flex justify-center mb-4">
          <MdErrorOutline size={80} className="text-red-400" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Access Restricted
        </h2>

        <p className="text-gray-600 text-lg mb-6">
          {message}
        </p>

        <button
          onClick={() => navigate(navigateTo)}
          className="w-full py-3 bg-neutral-700 text-white font-semibold rounded-lg shadow hover:shadow-md hover:cursor-pointer hover:text-accent transition-all duration-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default Error;