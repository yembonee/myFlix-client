import React from "react";
import { Form, FormControl } from "react-bootstrap";

export const SearchBar = ({ movies, setMovies }) => {
  const handleSearch = (event) => {
    const query = event.target.value;

    const filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );

    if (!filteredMovies.length || !query) {
      setMovies(movies);
    } else {
      setMovies(filteredMovies);
    }
  };

  const handleKeyPress = (event) => {
    const query = event.target.value;

    if (event.key === "Enter" && query.length == 0) {
      event.preventDefault();
      window.location.reload();
    }
  };

  return (
    <Form>
      <FormControl
        type="text"
        placeholder="Search for movies here..."
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
      />
    </Form>
  );
};
