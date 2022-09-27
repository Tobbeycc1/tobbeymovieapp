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

const Container = styled.div`
  padding: 60px;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  // padding: 30px;
  margin-top: 20px;
  gap: 10px;
  // justify-content: space-evenly;
  align-items: center;
`;

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
    <Container>
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
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <div className={classes.placeholderCon}>
            <img src={rottenTomaoes} className={classes.placeholder} />
          </div>
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
