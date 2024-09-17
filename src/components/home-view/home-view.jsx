import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./home-view.scss";

export const HomeView = ({ onLoggedIn }) => {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleLoginClose = () => setShowLogin(false);
  const handleSignupClose = () => setShowSignup(false);
  const handleLoginShow = () => setShowLogin(true);
  const handleSignupShow = () => setShowSignup(true);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const data = { Username: username, Password: password };

    fetch("https://rendermovieapi.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("username", data.user.Username);
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          handleLoginClose();
          navigate("/");
        } else {
          alert("Invalid credentials!");
        }
      })
      .catch((err) => console.log("error", err));
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://rendermovieapi.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.ok) {
        alert("Signup Successfull!");
        handleSignupClose();
        navigate("/");
      } else {
        alert("Signup Failed");
      }
    });
  };

  return (
    <div className="home-view">
      <Button variant="primary" onClick={handleLoginShow}>
        Login
      </Button>
      <Button variant="primary" onClick={handleSignupShow}>
        Signup
      </Button>

      <Modal show={showLogin} onHide={handleLoginClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showSignup} onHide={handleSignupClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group controlId="signUpFormUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="6"
              />
            </Form.Group>
            <Form.Group controlId="signUpFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </Form.Group>
            <Form.Group controlId="signUpFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="signUpFormBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
