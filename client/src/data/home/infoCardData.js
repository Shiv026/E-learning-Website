// src/data/home/infoCardData.js

// YOU NEED THIS IMPORT STATEMENT!
import { FaGraduationCap, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

const infoCardData = [
  {
    title: "For Students",
    titleColor: "text-sky-500",
    description:
      "Browse practical, instructor-led courses. Learn at your pace with videos, quizzes, and notes.",
    icon: FaGraduationCap, // Now FaGraduationCap is defined because it's imported
  },
  {
    title: "For Instructors",
    titleColor: "text-orange-500",
    description:
      "Publish your course in minutes, track student progress, and engage with your audience.",
    icon: FaChalkboardTeacher, // Now FaChalkboardTeacher is defined
  },
  {
    title: "For Everyone",
    titleColor: "text-teal-500",
    description:
      "Progress tracking, completion certificates, and an active learning community — all in one place.",
    icon: FaUsers, // Now FaUsers is defined
  },
];

export default infoCardData;
