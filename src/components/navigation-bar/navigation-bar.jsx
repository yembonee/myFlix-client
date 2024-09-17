import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchBar } from "../search-form/search-form";
import "./navigation-bar.scss";

export const NavigationBar = ({
  user,
  onLoggedOut,
  movies,
  setMovies,
  originalMovies,
}) => {
  return (
    <Navbar
      expand="lg"
      className="shadow-sm"
      fixed="top"
      style={{
        backgroundColor: "#E5D4C0",
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold">
          MyFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/home">
                  Welcome
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <SearchBar
                  movies={movies}
                  setMovies={setMovies}
                  originalMovies={originalMovies}
                />
                <Nav.Link as={Link} to="/profile">
                  My Profile
                </Nav.Link>
                <Nav.Link to="/home" as={Link} onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
