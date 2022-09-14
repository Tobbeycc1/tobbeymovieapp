import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import styled from "styled-components";
import classes from '../styles/MovieComponent.module.css'
import arrow from '../images/arr.png'



const Container = styled.div`
  // display: flex;
  // flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: white;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`,
    ).then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
        <div className={classes.xcancel}>
          <img onClick={() => props.onMovieSelect()} src={arrow} className={classes.arrow} alt= 'arrow'/>
          
          <br/> <p  className= {classes.plot2}>{movieInfo?.Runtime} {movieInfo?.Year}</p> 

        </div>
        
    <div className= {classes.detailsCon}>
      <div className= {classes.movieTitleCon}>  
        <h1 className= {classes.movieTitle}>{movieInfo?.Title}</h1>
        <div className= {classes.imdbCon}>
        <p  className= {classes.imdb}>IMDb </p><span className= {classes.imdbNumber}>{movieInfo?.imdbRating}</span>
        </div>
        <p  className= {classes.plotHeader} >Plot</p>
        <p  className= {classes.plot}>{movieInfo?.Plot}</p>

        <div>
        <p  className= {classes.plotHeader} >Cast</p>
        <p>{movieInfo?.Actors}</p>

{/* Genre */}
        <p  className= {classes.plotHeader} >Cast</p>
        <p>{movieInfo?.Genre}</p>

{/* Director */}
        <p  className= {classes.plotHeader} >Cast</p>
        <p>{movieInfo?.Director}</p>
        </div>

        </div>
   
    <img className={classes.coverImage} src={movieInfo?.Poster} alt={movieInfo?.Title} />
    
    </div>

          
         
          
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfoComponent;
