import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NavBar = ({ onSearch, user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Navbar color="dark" dark expand="md" className="navbar-custom">
      <NavbarBrand tag={Link} to="/" className="brand">
        🛒 Online Shop
      </NavbarBrand>

      <Nav className="ml-auto" navbar>
        <NavItem>
          <form onSubmit={handleSearch} className="search-form">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <Button color="primary" size="sm" type="submit">
              Search
            </Button>
          </form>
        </NavItem>

        {user ? (
          <>
            <NavItem>
              <NavLink tag={Link} to="/orders">
                Orders
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/profile">
                {user.name}
              </NavLink>
            </NavItem>
            <NavItem>
              <Button
                color="danger"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  onLogout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <NavLink tag={Link} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/register">
                Register
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
