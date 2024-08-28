import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';
import '@testing-library/jest-dom'

// Mock the i18next library
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('LandingPage', () => {
  beforeEach(() => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
  });

  it('displays the correct title', () => {
    expect(screen.getByText('landingPage.title')).toBeInTheDocument();
  });

  it('displays the correct description', () => {
    expect(screen.getByText('landingPage.description')).toBeInTheDocument();
  });

  it('renders all project links', () => {
    expect(screen.getByText('nav.todoApp')).toBeInTheDocument();
    expect(screen.getByText('nav.dataVisualizer')).toBeInTheDocument();
    expect(screen.getByText('nav.dataTables')).toBeInTheDocument();
  });

  it('renders correct number of project cards', () => {
    const projectCards = screen.getAllByText('landingPage.viewProject');
    expect(projectCards).toHaveLength(3);
  });
});
