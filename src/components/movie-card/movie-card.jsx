import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Card, Container } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [Favorite, setFavorite] = useState(false);
  console.log(user);

  useEffect(() => {
    console.log(user);
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    console.log("called addFavoriteMovie");
    fetch(
      `https://rendermovieapi.onrender.com/users/${localStorage.getItem(
        "username"
      )}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to Add Movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("Succesfully added movie");
          localStorage.setItem("user", Json.stringify(user));
          setUser(user);
          setFavorite(true);
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://rendermovieapi.onrender.com/users/${localStorage.getItem(
        "username"
      )}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("movie removed successfully");
          response.json();
        } else {
          alert("Failed to Remove Movie");
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <Link
      to={`/movies/${encodeURIComponent(movie._id)}`}
      className="movie-card-link"
    >
      <Card className="h-100 movie-card">
        <Card.Img variant="top" className="card-img" src={movie.ImageURL} />
        <Card.Body className="card-body1">
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
