import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';

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
    <div className={`landing-page ${fadeIn ? 'fade-in' : 'fade-out'}`}>
      <div className="content-container">
        <h1 className="title">{t('landingPage.title')}</h1>
        <p className="description">{t('landingPage.description')}</p>
        <div className="projects-grid">
          {projects.map((project) => (
            <Link
              key={project.path}
              to={project.path}
              className="project-link"
            >
              <div className="project-content">
                <h2 className="project-title">{project.name}</h2>
                <p className="project-description">{project.description}</p>
              </div>
              <div className="view-project">
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