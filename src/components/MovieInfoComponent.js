import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import styled from "styled-components";
import classes from "../styles/MovieComponent.module.css";
import { TiArrowBack } from "react-icons/ti";

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`
    ).then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  return (
    <container>
      {movieInfo ? (
        <>
          <div className={classes.xcancel}>
            <TiArrowBack
              onClick={() => props.onMovieSelect()}
              className={classes.arrow}
            />
            <p className={classes.plot2}>
              {movieInfo?.Runtime} {movieInfo?.Year}
            </p>
          </div>

          <div className={classes.detailsCon}>
            <div className={classes.movieTitleCon}>
              <h1 className={classes.movieTitle}>{movieInfo?.Title}</h1>
              <div className={classes.imdbCon}>
                <p className={classes.imdb}>IMDb </p>
                <span className={classes.imdbNumber}>
                  {movieInfo?.imdbRating}
                </span>
              </div>
              <p className={classes.plotHeader}>Plot</p>
              <p className={classes.plot}>{movieInfo?.Plot}</p>

              <div>
                <p className={classes.plotHeader}>Cast</p>
                <p>{movieInfo?.Actors}</p>

                {/* Genre */}
                <p className={classes.plotHeader}>Cast</p>
                <p>{movieInfo?.Genre}</p>

                {/* Director */}
                <p className={classes.plotHeader}>Cast</p>
                <p>{movieInfo?.Director}</p>
              </div>
            </div>

            <img
              className={classes.coverImage}
              src={movieInfo?.Poster}
              alt={movieInfo?.Title}
            />
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </container>
  );
};
export default MovieInfoComponent;
