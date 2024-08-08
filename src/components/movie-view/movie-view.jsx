import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import {
  Card,
  Container,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useState, useEffect } from "react";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const movieData = movies.find((movie) => movie._id === movieId);
    setMovie(movieData);
  }, [movieId, movies]);

  const handleAddFavorite = async () => {
    try {
      const response = await fetch(
        `https://rendermovieapi.onrender.com/users/${localStorage.getItem(
          "username"
        )}/movies/${movieId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setIsFavorite(true);
        setToastMessage("Movie added to Favorites!");
        setShowToast(true);
      } else {
        alert("Failed to add to favorites");
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const response = await fetch(
        `https://rendermovieapi.onrender.com/users/${localStorage.getItem(
          "username"
        )}/movies/${movie._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setIsFavorite(false);
        setToastMessage("Movie removed from Favorites.");
        setShowToast(true);
      } else {
        alert("Failed to remove from favorites");
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <Container className="movie-view-container">
      <Card className="movie-view-card">
        <div className="card-image-wrapper">
          <Card.Img className="card-img" src={movie.ImageURL} />
        </div>
        <Card.Body className="card-body2">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text> Description: {movie.Description}</Card.Text>
          <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
          <Card.Text>Director: {movie.Director.Name}</Card.Text>
          <Button onClick={handleAddFavorite} variant="success">
            Add to Favorites
          </Button>
          <Button onClick={handleRemoveFavorite} variant="danger">
            Remove from Favorites
          </Button>
          <Link to={"/"}>
            <Button variant="primary" className="mt-2">
              Back
            </Button>
          </Link>
        </Card.Body>
      </Card>

      <ToastContainer position="middle-center">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={1500}
          autohide
          className="toast-custom"
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};
