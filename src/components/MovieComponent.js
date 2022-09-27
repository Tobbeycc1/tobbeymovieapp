import React, { useState } from "react";
import classes from "../styles/MovieComponent.module.css";
import { FaRegHeart } from "react-icons/fa";

const MovieComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  const overlayDisplays = (
    <div className={classes.overLayTitleCon}>
      <FaRegHeart className={classes.heart} />

      <p className={classes.overlayTitle}>{Title}</p>
    </div>
  );

  // Display favorite and black Modal
  const [posterModal, sePosterModal] = useState(false);

  return (
    <div
      className={classes.movieComponentCon}
      onMouseEnter={() => {
        sePosterModal(true);
      }}
      onMouseLeave={() => {
        sePosterModal(false);
      }}
      onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {posterModal && overlayDisplays}
      <img src={Poster} alt={Title} className={classes.poster} />
    </div>
  );
};
export default MovieComponent;
