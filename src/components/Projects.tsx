'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  type: 'Mobile App' | 'Web App';
  dateActive: string;
  metrics: string;
  link?: string;
  isActive: boolean;
}

const projects: Project[] = [
  {
    title: 'SI Eclipse',
    description: 'Your Essential Companion for the 2024 Solar Eclipse in Southern Illinois!',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Python', 'Wordpress'],
    images: ['/SI-Eclipse-Icon.png'],
    type: 'Mobile App',
    dateActive: 'Jun 2023 - Present',
    metrics: '2,000+ downloads',
    link: 'https://www.sieclipse.com/',
    isActive: true
  },
  {
    title: 'AssessmentSphere',
    description: 'Take quizzes to reinforce your knowledge and identify areas for improvement. The app tracks your progress and provides detailed analytics to help you study more effectively. Active development of version 2.0 of AssessmentSphere. This version is built with Go Lang, Next.js, Supabase, and Docker as a muti-tennant assessment platform. ',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Go Lang', 'Docker'],
    images: ['/assessment-sphere.png'],
    type: 'Web App',
    dateActive: 'Jan 2024 - Present',
    metrics: '10 - 100 Daily active users',
    link: 'https://flashcard-tan-psi.vercel.app/',
    isActive: true
  },
  {
    title: 'CoinFaucet Suite',
    description: 'Official App for the Coin Faucet site',
    technologies: ['Flutter', 'Firebase', 'Dart'],
    images: ['/coinfaucet2.jpg'],
    type: 'Mobile App',
    dateActive: 'Jan 2022 - Jan 2024',
    metrics: '4,000+ downloads',
    link: '',
    isActive: false
  },
  {
    title: 'Crypto Faucet Hub',
    description: 'Web 3 crypto centralized mobile app and web platform.',
    technologies: ['Flutter', 'Dart', 'SQLite', 'Firebase'],
    images: ['/cfh.png', '/cfh2.png'],
    type: 'Mobile App',
    dateActive: 'July 2019 - Dec 2021',
    metrics: '2,000+ total users',
    link: '',
    isActive: false
  }
];

const ImageCarousel: React.FC<{ images: string[]; projectTitle: string }> = ({ images, projectTitle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <div className="relative w-full h-64 overflow-hidden bg-gray-200">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`${projectTitle} - Project image ${index + 1}`}
            layout="fill"
            objectFit="contain"
            className="p-2"
          />
        </div>
      ))}
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="pt-24 py-16 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-navy-blue dark:text-usmc-gold">Personal Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white/80 dark:bg-dark-accent/80 rounded-lg shadow-md overflow-hidden backdrop-blur-sm flex flex-col">
              <ImageCarousel images={project.images} projectTitle={project.title} />
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold mb-2 text-navy-blue dark:text-usmc-gold">{project.title}</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-2">{project.description}</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                  <span className="font-semibold">{project.type}</span> | {project.dateActive}
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  <span className="font-semibold">Metrics:</span> {project.metrics}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-navy-blue/10 dark:bg-usmc-gold/20 text-navy-blue dark:text-usmc-gold px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  {project.isActive && project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-usmc-scarlet hover:bg-usmc-gold text-white font-bold py-2 px-4 rounded transition duration-300 inline-block"
                    >
                      View Project
                    </a>
                  )}
                  {!project.isActive && (
                    <span className="text-light-text-secondary dark:text-dark-text-secondary italic">
                      Project no longer active
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;