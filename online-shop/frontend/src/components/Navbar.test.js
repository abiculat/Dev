import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

const TestNavbar = () => (
  <BrowserRouter>
    <Navbar
      onSearch={() => {}}
      user={{
        id: '1',
        name: 'Test User',
        email: 'test@example.com'
      }}
      onLogout={() => {}}
    />
  </BrowserRouter>
);

describe('Navbar Component', () => {
  test('renders navbar with brand', () => {
    render(<TestNavbar />);
    const brand = screen.getByText(/Online Shop/i);
    expect(brand).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(<TestNavbar />);
    const searchInput = screen.getByPlaceholderText(/Search products/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders user name when logged in', () => {
    render(<TestNavbar />);
    const userName = screen.getByText('Test User');
    expect(userName).toBeInTheDocument();
  });

  test('renders logout button when user is logged in', () => {
    render(<TestNavbar />);
    const logoutBtn = screen.getByText('Logout');
    expect(logoutBtn).toBeInTheDocument();
  });
});
