import React from "react";
import "./search-form.scss";
import { Form, FormControl } from "react-bootstrap";

export const SearchBar = ({ movies, setMovies, originalMovies }) => {
  const handleSearch = (event) => {
    const query = event.target.value;

    const filteredMovies = originalMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered Movies:", filteredMovies);
    setMovies(filteredMovies);
  };

  const handleKeyPress = (event) => {
    const query = event.target.value;

    if (event.key === "Enter" && query.length == 0) {
      event.preventDefault();
      setMovies(originalMovies);
    }
  };

  return (
    <Form className="form">
      <FormControl
        type="text"
        placeholder="Search for movies here..."
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5d4c0",
        }}
      />
    </Form>
  );
};
