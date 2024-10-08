'use client'

import React from 'react';

const experiences = [
  {
    "title": "Senior Software Developer / UX Engineer",
    "company": "Computershare",
    "period": "2021 - Present",
    "description": "At Computershare, as a Senior Software Developer and UX Engineer, I took charge of developing and structuring the Frontend of the Global Design System, resulting in substantial gains in product consistency and development efficiency. I led the design and implementation of reusable React components which are used across multiple projects and revolutionized the design-to-code workflow by automating the entire process. This automation seamlessly integrated Figma, Token Studio, ZeroHeight, and JSON files to generate production-ready components, drastically reducing manual effort and ensuring consistency across the design system.\n\nI pioneered automated design-to-code workflows utilizing tools like Node.js and Style Dictionary, further streamlining the development process. As the company's accessibility champion, I focused on improving accessibility using tools like Axe Dev Tools, WAVE, and Lighthouse. Additionally, I ensured the technical feasibility of visual and UX designs, facilitated collaboration between design and development teams, mentored developers on Angular/.NET projects, and established best practices for component development across the organization.\n\nIn a key project, I served as the team lead for the design team, overseeing one design team and three development teams. In this role, I successfully managed resources and priorities to keep the design team ahead of the development schedule, ensuring smooth workflow and timely delivery of design assets.",
    "skills": ["JavaScript", "React", "TypeScript", "Angular", "Figma", "Token Studio", "ZeroHeight", "Node.js", "Style Dictionary", "Axe Dev Tools", "WAVE", "Lighthouse"]
  },
  {
    "title": "Software Developer",
    "company": "Beroe Inc",
    "period": "2018 - 2021",
    "description": "As a Software Developer at Beroe Inc, I crafted user-centric web solutions using Angular, Bootstrap, and Material Design, significantly enhancing user experience and expanding the product range. I led efforts to identify and resolve performance bottlenecks in Angular applications, improving web performance and UI responsiveness. Collaborating closely with the marketing team, I rapidly prototyped new products, iterating based on stakeholder feedback. I also developed custom Angular tools to automate repetitive tasks, saving the data analyst team over 100 hours annually. Additionally, I contributed to the architectural design and implementation of JAVA-based microservices for backend systems.",
    "skills": ["Angular", "Bootstrap", "Material Design", "Java", "Microservices", "Prototyping", "Performance Optimization", "Automation"]
  },
  {
    "title": "Software Developer",
    "company": "Judge Consulting Group",
    "period": "2017 - 2018",
    "description": "As a Software Developer consulting for Judge Consulting Group, I drove the development of innovative software solutions for the fabric industry, guiding projects from concept to deployment. I successfully led a standout project utilizing PowerBuilder to enhance material production machinery, significantly improving operational efficiency.\n\nI took charge of redesigning company website pages, focusing on enhancing user experience based on comprehensive user needs analysis. My active participation in system specification meetings ensured seamless alignment with project requirements, while I facilitated effective team communication by implementing Agile and Scrum methodologies.\n\nMy technical contributions spanned a diverse tech stack including VS2012/PowerBuilder, .NET Framework, ASP.NET, C#, and VB.NET. Additionally, I played a key role in improving database efficiency through the strategic use of LINQ, Entity Framework, and SQL Server, resulting in optimized data management and retrieval processes.",
    "skills": ["PowerBuilder", ".NET Framework", "ASP.NET", "C#", "VB.NET", "Bootsrap", "SQL Server", "Agile", "Scrum"]
  },
  {
    "title": "IT Specialist / Web Developer",
    "company": "Naval Air Systems Command",
    "period": "2015 - 2017",
    "description": "At Naval Air Systems Command, I served as an IT Specialist and Web Developer supporting the V-22 Program. My role involved creating site layouts and user interfaces using standard HTML5/CSS3 practices, developing robust .NET-based web applications, and designing relational database schemas using SQL Server and Oracle 11g PL/SQL. I led the development and optimization of applications for maximum speed and scalability while ensuring technical feasibility of UI/UX designs. I was also responsible for gathering requirements, conducting analytical studies, and managing program objectives, funding, and staffing. Additionally, I oversaw compliance with IT Governance laws, established Customer Service Agreements, and provided technical guidance to senior leadership. My work included managing and leading team personnel and collaborating with both local and national Contracting Officer Representatives (CORs) on IT product and service support.",
    "skills": ["HTML5", "CSS3", ".NET Framework", "SQL Server", "Oracle 11g PL/SQL", "Program Management", "IT Governance", "Contract Management"]
  },
  {
    "title": "Jr. Developer / Tier 2/3 Support Lead",
    "company": "Spalding Consulting",
    "period": "2012 - 2015",
    "description": "At Spalding Consulting, I served as a Jr. Developer and Tier 2/3 Support Lead, where I provided comprehensive support and development for the Workload Management System (WMS) used by NAVAIR ISSIC, FRC, and F-35 Lightning II program users. My role involved developing database scripts to implement system-wide changes, resolving an average of 150 issues per month, and working with technologies such as HTML, XML, CSS, Java, ColdFusion, and PL/SQL. I managed web services like IIS and Apache, while also supporting databases in Microsoft Access and Oracle 11gR2. In an agile environment, I contributed to all phases of the software development lifecycle (SDLC), including planning, analysis, design, development, testing, implementation, and maintenance. Additionally, I provided training, supervised a geographically dispersed support team, and collaborated with stakeholders to ensure the ongoing integrity of production data and alignment with business requirements.",
    "skills": ["HTML", "XML", "CSS", "Java", "ColdFusion", "SQL", "PL/SQL", "IIS", "Apache", "Microsoft Access", "Oracle 11gR2", "Agile", "SDLC", "Data Integrity", "Support Management"]
  },
  {
    "title": "System Administrator",
    "company": "Advanced Information System Technology Inc",
    "period": "2011 - 2012",
    "description": "As a System Administrator at Advanced Information System Technology Inc., I provided Tier 2 support for the Naval Medical Clinic at Cherry Point Air Station, managing technical support for over 300 users and more than 30 desktop applications. I handled network system analysis, system security, and administration for Windows servers and workstations, which included upgrades, disaster recovery planning, and user account management. I developed scripts to automate network administration tasks and streamlined application deployments. Additionally, I conducted individual and group training on medical devices and programs, ensured compliance with security protocols by performing IAVA scans, and resolved security vulnerabilities using the RETINA scanner.",
    "skills": ["System Administration", "Windows Server", "Network Security", "User Support", "Automation", "Disaster Recovery", "IAVA Scans", "RETINA Scanner"]
  },
  {
    "title": "Sergeant, Tactical Data Systems Specialist",
    "company": "United States Marine Corps",
    "period": "2006 - 2011",
    "description": "Combat Veteran, Technical Leader, and Communications Specialist. \n\nI served in both combat and garrison environments, playing a critical role in establishing and maintaining essential communications systems. While deployed to Iraq in combat roles, I was recognized for exceptional service and leadership, consistently exceeding expectations in operational efficiency, network security, and mission success.",
    "skills": [
      "Network Design & Implementation",
      "Satellite Communications",
      "Network Security",
      "Leadership",
      "Systems Integration",
      "Web Development",
      "Database Management",
      "Tactical Data Systems",
      "Troubleshooting"
    ],
    "achievements": [
      "First Marine to set up and deploy the G-SWAN satellite communication system in Iraq",
      "Key contributor to the initial setup of the MARSOC compound",
      "Led design and implementation of complex LAN/WAN systems",
      "Received multiple awards for maintaining critical communications in Iraq",
      "Managed installation and maintenance of comprehensive communications systems",
      "Enhanced network security using advanced tools like GFI LANguard and Nessus",
      "Developed SharePoint on SIPRNet for Marine Special Operations Support Group"
    ]
  }
];

const Experience = () => {
  // Function to convert \n\n to line breaks
  const formatDescription = (description: string) => {
    return description.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-light-text dark:text-dark-text mb-4">
        {paragraph}
      </p>
    ));
  };

  return (
    <section id="experience" className="py-16 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center text-navy-blue dark:text-usmc-gold">Professional Experience</h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white/90 dark:bg-dark-accent/90 p-8 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-2xl font-semibold text-navy-blue dark:text-usmc-gold">{exp.title}</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary font-medium">{exp.period}</p>
              </div>
              <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-4">{exp.company}</p>
              <div className="mb-6">
                {formatDescription(exp.description)}
              </div>
              
              {exp.company === "United States Marine Corps" && exp.achievements && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-navy-blue dark:text-usmc-gold mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside text-light-text dark:text-dark-text">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="bg-navy-blue/10 dark:bg-usmc-gold/20 text-navy-blue dark:text-usmc-gold px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;