import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Interstellar",
      image:
        "https://www.originalfilmart.com/cdn/shop/products/interstellar_2014_advance_original_film_art_682852f2-23f6-46de-a1db-4029d5b6f0b4_5000x.jpg?v=1574284010",
      description:
        "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
      director: "Christopher Nolan",
      genre: "Drama",
    },
    {
      id: 2,
      title: "Rango",
      image:
        "https://www.moviepostersetc.com/_staticProxy/content/ff808081163c05b001169d6655243ae9/Rango_movie_poster_one-sheet.jpg",
      description: "Gore Verbinksi",
      director:
        "Rango is an ordinary chameleon who accidentally winds up in the town of Dirt, a lawless outpost in the Wild West in desperate need of a new sheriff.",
      genre: "Western",
    },
    {
      id: 3,
      title: "Django Unchained",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_FMjpg_UX1000_.jpg",
      description:
        "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.",
      director: "Quentin Tarantino",
      genre: "Western",
    },
    {
      id: 4,
      title: "Midsommar",
      image:
        "https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_.jpg",
      description: "Horror",
      director: "Ari Aster",
      genre:
        "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
    },
    {
      id: 5,
      title: "Akira",
      image:
        "https://www.limitedruns.com/media/cache/69/6d/696d915cd0690bd32801924937f5207a.jpg",
      description:
        "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath who can only be stopped by a teenager, his gang of biker friends and a group of psychics.",
      director: "Katsuhiro Ôtomo",
      genre: "Action",
    },
    {
      id: 6,
      title: "1917",
      image:
        "https://m.media-amazon.com/images/I/61yYNBjFRjL._AC_UF894,1000_QL80_.jpg",
      description:
        "April 6th, 1917. As an infantry battalion assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
      director: "Sam Mendes",
      genre: "War",
    },
    {
      id: 7,
      title: "Prisoners",
      image:
        "https://m.media-amazon.com/images/I/71vRDJdr14L._AC_UF894,1000_QL80_.jpg",
      description:
        "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts.",
      director: "Denis Villeneuve",
      genre: "Crime",
    },
    {
      id: 8,
      title: "Soul",
      image:
        "https://i0.wp.com/pixarpost.com/wp-content/uploads/2020/10/b4786-pixar-soul-poster.jpg?fit=1182%2C1478&ssl=1",
      description:
        "After landing the gig of a lifetime, a New York jazz pianist suddenly finds himself trapped in a strange land between Earth and the afterlife.",
      director: "Pete Docter",
      genre: "Adventure",
    },
    {
      id: 9,
      title: "A Silent Voice",
      image:
        "https://m.media-amazon.com/images/M/MV5BZGRkOGMxYTUtZTBhYS00NzI3LWEzMDQtOWRhMmNjNjJjMzM4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      description:
        "A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption.",
      director: "Naoko Yamada",
      genre: "Drama",
    },
    {
      id: 10,
      title: "Oppenheimer",
      image:
        "https://m.media-amazon.com/images/I/71xDtUSyAKL._AC_UF894,1000_QL80_.jpg",
      description:
        "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
      director: "Christopher Nolan",
      genre: "Drama",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
