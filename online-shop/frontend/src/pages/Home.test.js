import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

const TestHome = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);

describe('Home Page', () => {
  test('renders welcome message', () => {
    render(<TestHome />);
    expect(screen.getByText(/Welcome to Online Shop/i)).toBeInTheDocument();
  });

  test('renders start shopping button', () => {
    render(<TestHome />);
    expect(screen.getByText('Start Shopping')).toBeInTheDocument();
  });

  test('renders feature cards', () => {
    render(<TestHome />);
    expect(screen.getByText('Fast Shipping')).toBeInTheDocument();
    expect(screen.getByText('Best Prices')).toBeInTheDocument();
    expect(screen.getByText('Secure Shopping')).toBeInTheDocument();
  });

  test('renders collection links', () => {
    render(<TestHome />);
    expect(screen.getByText('Browse Collection')).toBeInTheDocument();
    expect(screen.getByText('View Orders')).toBeInTheDocument();
  });
});
