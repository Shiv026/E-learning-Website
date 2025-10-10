// src/data/home/featuresCardData.js

// Import the icons you want to use for features
import { MdVideoLibrary, MdQuiz, MdEmojiEvents, MdDashboard, MdPeople } from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa'; // Example of another icon library

const featuresCardData = [
  {
    title: 'Easy Course Creation',
    description: 'Upload videos, PDFs, and assignments in a simple, intuitive interface.',
    icon: MdVideoLibrary, // Example icon for video/course creation
    colorClass: 'text-green-500', // Example color
  },
  {
    title: 'Interactive Quizzes',
    description: 'Keep learners engaged with quizzes and instant feedback.',
    icon: MdQuiz, // Example icon for quizzes
    colorClass: 'text-sky-500', // Example color
  },
  {
    title: 'Course Completion Certificates',
    description: 'Reward learners with professional-looking certificates.',
    icon: MdEmojiEvents, // Example icon for certificates/events
    colorClass: 'text-yellow-500', // Example color
  },
  {
    title: 'Learning Dashboard',
    description: 'Track progress, resume lessons, and never lose your place.',
    icon: MdDashboard, // Example icon for dashboard
    colorClass: 'text-teal-500', // Example color
  },
  {
    title: 'Community & Discussions',
    description: 'Share insights, ask questions, and learn together.',
    icon: FaRegComments, // Example icon for community/discussions
    colorClass: 'text-purple-500', // Example color
  },
];

export default featuresCardData;