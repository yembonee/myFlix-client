import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {
  Container,
  Button,
  Card,
  CardGroup,
  Col,
  Row,
  Form,
  CardText,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://rendermovieapi.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Update Successful");
          const data = response.json();
          localStorage.setItem("user", JSON.stringify(data));
          window.location.reload();
        } else {
          alert("Update Unsuccesful");
        }
      })
      .catch((err) => console.log("error", err));
  };

  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`https://rendermovieapi.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          localStorage.clear();
          alert("Succesfully Deleted Account");
          <Navigate to="/signup" replace />;
        } else {
          alert("Troubles Deleting Account");
        }
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>My Profile</Card.Title>
                  <CardText>Update Information</CardText>
                  <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="updateUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength="6"
                      />
                    </Form.Group>
                    <Form.Group controlId="updatePassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                      />
                    </Form.Group>
                    <Form.Group controlId="updateEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="updateBirthday">
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control
                        type="birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={handleUpdate}
                      type="submit"
                    >
                      Update Info
                    </Button>
                  </Form>
                  <Link to="/signup">
                    <Button variant="danger" type="" onClick={handleDelete}>
                      Delete Account
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
      ;
      <Container>
        <Row className="justify-content-md-center align-items-center">
          {favoriteMovies.map((movie) => {
            return (
              <Col
                key={movie._id}
                className="justify-content-center align-items-center"
              >
                <MovieCard
                  movie={movie}
                  token={token}
                  user={user}
                  setUser={setUser}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
