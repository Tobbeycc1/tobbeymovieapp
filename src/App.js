import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import logo from "../src/images/logo.png";
import rottenTomaoes from "../src/images/illustration-empty-state.png";
import classes from "../src/styles/styles.module.css";
import { FiSearch } from "react-icons/fi";

export const API_KEY = "a9118a3a";

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logoCon}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>

        <div className={classes.searchBarCon}>
          <FiSearch className={classes.searchIcon} />

          <input
            type={"text"}
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
            className={classes.searchBar}
          />
        </div>
      </header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <div className={classes.fetchedMovies}>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              overlayTitle={"abc"}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <div className={classes.placeholderCon}>
            <img src={rottenTomaoes} className={classes.placeholder} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
