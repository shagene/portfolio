'use client'

import React from 'react';

const skills = [
  { name: 'React', icon: '⚛️' },
  { name: 'Angular', icon: '🅰️' },
  { name: 'Flutter', icon: '📱' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'Python', icon: '🐍' },
  { name: 'SQL', icon: '🗃️' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-navy-blue dark:text-usmc-gold">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="bg-white/80 dark:bg-dark-accent/80 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center backdrop-blur-sm">
              <span className="text-4xl mb-2">{skill.icon}</span>
              <h3 className="text-lg font-semibold text-navy-blue dark:text-usmc-gold">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;