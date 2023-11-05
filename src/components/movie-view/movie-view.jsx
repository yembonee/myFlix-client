import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img
          style={{
            width: 400,
          }}
          src={movie.ImageURL}
        />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <button
          className="back-button"
          style={{ cursor: "pointer" }}
          onClick={onBackClick}
        >
          Back
        </button>
      </div>
    </div>
  );
};
