import React, { useState } from "react";
import styled from "styled-components";
import classes from "../styles/MovieComponent.module.css";
import heart from "../images/icon-heart-white.png";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  width: 150px;

  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 250px;
  border-radius: 5px;
  width: 150px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const MovieComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  const { showOverlay, setShowOverlay } = useState(false);
  const overlayDisplays = (
    <div className={classes.overLayTitle}>
      <img src={heart} alt="heart icon" className={classes.heart} />
      <h3>icon-heart-white.png</h3>
    </div>
  );

  function overlay() {
    setShowOverlay(true);
    console.log("showing");
  }

  return (
    <MovieContainer
      onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onMouseOver={overlay}
    >
      <CoverImage src={Poster} alt={Title} onMouseOver={overlay} />
      {showOverlay && overlayDisplays}

      {/* <MovieName>{Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year : {Year}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn> */}
    </MovieContainer>
  );
};
export default MovieComponent;
