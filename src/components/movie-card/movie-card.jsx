import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Card, Container } from "react-bootstrap";
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
      `http://35.94.33.77/users/${localStorage.getItem("username")}/movies/${
        movie._id
      }`,
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
      `http://35.94.33.77/users/${localStorage.getItem("username")}/movies/${
        movie._id
      }`,
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
