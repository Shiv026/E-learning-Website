import React from 'react';
import { useNavigate } from 'react-router-dom';

// Container component for consistent horizontal padding & max-width
import Container from '../components/Container.jsx';

import InfoCard from '../components/InfoCard';
import infoCardData from '../data/home/infoCardData.js';

import FeatureCard from '../components/FeaturesCard.jsx';
import featuresCardData from '../data/home/featuresCardData.js';



const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-text">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <Container className="text-center">
          {/* Main Hero Container with Background Image */}
          <div className="relative bg-[url('../assets/Landing%20Page%20Image.png')] bg-cover bg-[center_top_-13px] bg-no-repeat p-18.5">
            {/* Semi-transparent Overlay */}
            <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>

            {/* Content (Title, Text, Button) */}
            <div className="relative z-10 text-white text-left max-w-xxl">
              <h1 className="mt-20 text-4xl font-display font-bold tracking-tight sm:text-5xl">
                Skill Shelf: <br /> Learn, Teach, Grow.
              </h1>
              <p className="mt-5 text-lg">
                Explore a vast library of courses taught by industry experts. Learn at your own pace and achieve your goals.
              </p>
              <div className="mt-7">
                <button
                  className="px-6 py-3 rounded-3xl text-base text-white bg-primary hover:bg-accent transition duration-300"
                  onClick={() => navigate('/courses')}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Text added here */}
          <div className="text-center my-10">
            <h2 className="text-2xl font-display text-gray-700">
              Whether you're a curious learner or an experienced instructor, we have something for everyone.
            </h2>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-10 text-left">
            {infoCardData.map((cardData, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-secondary border border-border hover:shadow-lg transition-shadow"
              >
                <InfoCard {...cardData} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Features Section */}
      <section className="pt-15 bg-background">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-semi-bold mb-4">
              Everything you need to learn and teach effectively.
            </h2>
            <p className="text-lg text-gray-700">
              Courses, quizzes, certificates, and more — all in one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresCardData.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>

          {/* Mid-section CTA */}
          <div className="text-center mt-12">
            <button
              className="bg-primary text-white px-8 py-3 rounded-3xl font-semi-bold hover:bg-accent transition duration-300"
              onClick={() => navigate('/courses')}
            >
              Explore Courses
            </button>
          </div>
        </Container>
      </section>

      <hr className="mt-20 mx-auto w-1/2 border-t-3 border-border" />

      {/* How It Works Section */}
      <section className="py-20 bg-secondary">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-semi-bold mb-4">
              From idea to impact in 3 steps.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: 1, title: 'Sign Up', text: 'Create your free Skill Shelf account.', color: 'bg-primary/80' },
              { num: 2, title: 'Choose Your Role', text: 'Start learning or become an instructor (or both!).', color: 'bg-accent' },
              { num: 3, title: 'Start Your Journey', text: 'Learn, teach, and share your expertise with the world.', color: 'bg-purple-600' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className={`${step.color} text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                  {step.num}
                </div>
                <h3 className="text-2xl font-display font-semi-bold mb-3">{step.title}</h3>
                <p className="text-gray-700">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <hr className="mx-auto w-1/2 border-t-3 border-border" />

      {/* Social Proof Section */}
      <section className="py-20 bg-background">
        <Container className="text-center max-w-4xl">
          <h2 className="text-4xl font-display font-semi-bold mb-6">
            Built for passionate learners and teachers.
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're learning your first programming language, improving your design skills,
            or teaching baking from your home kitchen — Skill Shelf gives your passion a place to grow.
          </p>
          <h2 className="text-2xl text-primary font-display font-semi-bold">
            100+ learners already exploring their skills.
          </h2>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <Container className="text-center max-w-4xl">
          <h2 className="text-4xl font-display font-semi-bold text-white mb-6">
            Your next skill is waiting.
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join Skill Shelf today — and start learning or teaching in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white text-primary px-8 py-3 rounded-3xl font-semi-bold hover:bg-gray-200 transition duration-300"
              onClick={() => navigate('/courses')}
            >
              Start Learning Now
            </button>
            <button
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-3xl font-semi-bold hover:bg-white hover:text-primary transition duration-300"
              onClick={() => navigate('/dashboard')}
            >
              Publish Your First Course
            </button>
          </div>
        </Container>
      </section>

    </div>
  );
};

export default Home;