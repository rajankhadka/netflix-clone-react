import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results[0].backdrop_path);
      setMovies(request.data.results);
      return request;
    }

    fetchData();

    // axios
    //   .get(fetchUrl)
    //   .then((response) => {
    //     console.log(response.data);
    //     setMovies(response.data);
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.log("[error]", error);
    //   });
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log("[youtube]");
      console.log("[movie]", movie);
      console.log("object", movie?.name);
      movieTrailer(movie?.name || "")
        .then((url) => {
          console.log("[url]", url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log("[urlParams]", urlParams);
          urlParams.get("v");
        })
        .catch((error) => console.log("[error]", error));
    }
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              onClick={() => handleClick(movie)}
              className={
                isLargeRow
                  ? "row__poster row__posterlarge"
                  : "row__poster row__postersmall"
              }
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
              key={movie.id}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
