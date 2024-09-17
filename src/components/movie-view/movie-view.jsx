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
import StarRating from "./star-rating";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [userRating, setUserRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieData = movies.find((movie) => movie._id === movieId);
      setMovie(movieData);

      if (movieData) {
        try {
          const response = await fetch(
            `https://rendermovieapi.onrender.com/movies/${movieId}/rating`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setUserRating(data.rating || 0);
          } else {
            console.error("Error fetching rating:", data.errors);
          }
        } catch (err) {
          console.error("Error fetching rating:", err);
        }
      }
    };

    fetchMovieData();
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
        setToastMessage("Movie removed from Favorites. ");
        setShowToast(true);
      } else {
        alert("Failed to remove from favorites");
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const handleRating = async (movieId, rating) => {
    try {
      const response = await fetch(
        `https://rendermovieapi.onrender.com/movies/${movieId}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ rating }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserRating(rating);
        setToastMessage("Rating updated successfully!");
        setShowToast(true);
      } else {
        console.error("Error updating rating:", data.errors);
      }
    } catch (err) {
      console.error("Error updating rating:", err);
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
          <StarRating
            movieId={movie._id}
            handleRating={handleRating}
            initialRating={userRating}
          />
          <Card.Text>Average Rating: {movie.AverageRating || "N/A"}</Card.Text>
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
