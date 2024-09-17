import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { HomeView } from "../home-view/home-view";
import { useNavigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = localStorage.getItem("user"); //works as as it should
  const storedToken = localStorage.getItem("token");
  const parseUser = JSON.parse(JSON.stringify(storedUser));

  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? parseUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://rendermovieapi.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data);
        setOriginalMovies(data);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        movies={movies}
        setMovies={setMovies}
        originalMovies={originalMovies}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/home"
            element={
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <HomeView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            className="movieRoute"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The List is Empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      style={{ border: "1px solid green" }}
                      movies={movies}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is Empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mb-4"
                        xl={2}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        key={movie._id}
                      >
                        <MovieCard movie={movie} user={user} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileView
                user={user}
                token={token}
                setUser={setUser}
                movies={movies}
              />
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
