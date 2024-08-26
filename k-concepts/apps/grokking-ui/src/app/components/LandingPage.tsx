import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingPage: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const projects = [
    { path: '/todo', name: t('nav.todoApp'), description: t('todoApp.description') },
    { path: '/workingwithdata', name: t('nav.dataVisualizer'), description: t('dataVisualizer.description') },
    { path: '/datatables', name: t('nav.dataTables'), description: t('dataTables.description') },
  ];

  return (
    <div className={`min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-primary-600">{t('landingPage.title')}</h1>
        <p className="mb-8 text-gray-700 text-center">{t('landingPage.description')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.path}
              to={project.path}
              className="block bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-primary-600">{project.name}</h2>
                <p className="text-gray-600">{project.description}</p>
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