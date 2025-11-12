import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('App Component', () => {
  test('renders app without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Online Shop/i)).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to Online Shop/i)).toBeInTheDocument();
  });
});
