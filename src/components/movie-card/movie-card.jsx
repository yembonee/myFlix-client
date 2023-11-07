import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const { movieId } = useParams();
  const [Favorite, setFavorite] = useState(false);

  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId);
    setFavorite(isFavorited);
  }, []);

  const addFavoriteMovie = () => {
    fetch(
      `https://rendermovieapi.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
      .then((data) => {
        setFavorite(true);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://rendermovieapi.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json();
        } else {
          alert("Failed to Remove Movie");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setFavorite(false);
          alert("Successfully Removed Movie");
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <Container>
      <Card className="h-100">
        <Card.Img variant="top" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Button onClick={addFavoriteMovie}>+</Button>
          <Button onClick={removeFavoriteMovie}>-</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
