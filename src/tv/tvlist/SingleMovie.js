import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SingleMovie extends Component {
  state = {
    isHovering: false
  };

  handleEnter = () => {
    this.setState({ isHovering: true });
  };

  handleLeave = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const { movie } = this.props;
    return (
      <Link to={"/tv/watch/" + movie.id}>
        <div className="movie-card" onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
          {movie.backdrop_path !== null ? (
            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.backdrop_path} />
          ) : (
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.poster_path} />
          )}

         <h3 className="movie-title">{movie.name}</h3>
        </div>
      </Link>
    );
  }
}
