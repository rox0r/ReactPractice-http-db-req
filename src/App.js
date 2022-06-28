import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function fetchMoviesHandler() {
    try {
      setIsLoading(true);
      setErr(null);
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const data = await response.json();

      let transformedData = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });

      setMovies(transformedData);
    } catch (error) {
      setErr(error.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !err && <p>No movies found.</p>}
        {!isLoading && err && <p>{err}</p>}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
