import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { CardGroup, Card, Container, Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie._id === movieId);
  return (
    <Container>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Img
              className="justify-content-md-center align-items-center"
              style={{
                width: 400,
              }}
              src={movie.ImageURL}
            />
            <Card.Title>Title: {movie.Title}</Card.Title>
            <Card.Text> Description: {movie.Description}</Card.Text>
            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
            <Card.Text>Director: {movie.Director.Name}</Card.Text>
            <Link to={"/"}>
              <Button variant="primary">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </Container>
  );
};
