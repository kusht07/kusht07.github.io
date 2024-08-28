import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const LandingPage: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const projects = [
    { path: '/todo', name: t('nav.todoApp'), description: t('todoApp.description') },
    { path: '/datatables', name: t('nav.dataTables'), description: t('dataTables.description') },
    { path: '/search', name: t('nav.searchEngine'), description: t('searchEngine.description') },
  ];

  return (
    <div className={`min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full relative">
        <div className="absolute top-4 right-4 flex space-x-4">
          <a
            href="https://www.linkedin.com/in/kushtrivedi-07/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/kusht07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center text-primary-600">{t('landingPage.title')}</h1>
        <p className="mb-8 text-primary-700 text-center">{t('landingPage.description')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.path}
              to={project.path}
              className="block bg-white border border-primary-100 rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-primary-600">{project.name}</h2>
                <p className="text-primary-700">{project.description}</p>
              </div>
              <div className="bg-primary-500 text-white text-center py-2 font-semibold">
                {t('landingPage.viewProject')}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;