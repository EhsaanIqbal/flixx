import React, { Component } from "react";
import Navbar from "../header/Navbar";
import Footer from "../header/Footer";
import axios from 'axios';
import {Home} from '@material-ui/icons';
import {Link} from 'react-router-dom'
import 'loaders.css'
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import Button from '@material-ui/core/Button';

export default class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }

  state = {
    movie: {},
    credits: [],
    title_link:[]
  };

  fetchMovie = () => {
    const urlMovie = fetch(
      `https://api.themoviedb.org/3/tv/${
        this.props.match.params.tv_id
      }?api_key=15508eca3e4b3e62415fe35be0a4a80a&language=en-US`
    );
    const urlCredits = fetch(`https://api.themoviedb.org/3/tv/${
      this.props.match.params.tv_id
    }/credits?api_key=15508eca3e4b3e62415fe35be0a4a80a
        `);

    const urls = [urlMovie, urlCredits];

    Promise.all(urls)
      .then(([r1, r2]) => Promise.all([r1.json(), r2.json()]))
      .then(([data1, data2]) => {
        if (this.mounted)
          this.setState({
            movie: data1,
            credits: data2,
          });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.mounted = true;
    this.fetchMovie();

    axios.get(`https://flixx-v1.herokuapp.com/api/watch/${this.props.match.params.tv_id}`)
          .then(res=>{
            this.setState({
              title_link: res.data.title_link
            })
          })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchMovie();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  time_convert = num => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  };

  render() {
    const { movie, credits, title_link } = this.state;

    const backgroundImg = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7) , rgba(0, 0, 0, 0.7)), url("https://image.tmdb.org/t/p/original/${
        movie.backdrop_path
      }")`
    };

    const backwithPoster = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.8) 60%), url("https://image.tmdb.org/t/p/original/${movie.poster_path}")`
    };
    const imgLink = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`

    const content =
      Object.keys(movie).length > 0 ? (
        <div
          style={movie.backdrop_path !== null ? backgroundImg : backwithPoster}
          className="back-height"
        >
          <div className="content">
              <Link to="/tv"><Home style={{color:'white'}} fontSize="large"/></Link>
            <h1>{movie.name}</h1>
            <div className="video">
                  <Player
                    playsInline
                    poster={imgLink}
                    src={title_link} />

            </div>


            <p className="year-run-vote">
              <span className="year">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="run">
                {" "}
                {movie.runtime && this.time_convert(movie.runtime)}
              </span>
              <span className="vote">
                <i className="fas fa-star" /> {movie.vote_average}
              </span>
            </p>
            <div className="overview-container">
              <p className="overview">{movie.overview}</p>
              <p>
                <span className="greyed">Starring: </span>
                {credits.cast &&
                  credits.cast.map((cast, i) => {
                    if (i < 4)
                      return <span key={cast.cast_id}>{cast.name}, </span>;
                    if (i === 4)
                      return <span key={cast.cast_id}>{cast.name}</span>;
                    else return null;
                  })}
              </p>

              <p>
                <span className="greyed">Genres: </span>
                {movie.genres.map((genre, i, arr) => {
                  if (i === arr.length - 1)
                    return <span key={genre.id}>{genre.name}</span>;
                  return <span key={genre.id}>{genre.name}, </span>;
                })}
              </p>

              {credits && credits.crew.length > 0 && (
                <p>
                  <span className="greyed">Director: </span>{" "}
                  {credits.crew[0].name}
                </p>

              )}
              <Button color="secondary"  href="https://flixx.typeform.com/to/gJOwts">Request show</Button>

            </div>
          </div>
        </div>
      ) : (
        <div style={{  margin: 'auto',
  width: '0%',
}} className="pacman">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );

    return (
      <div>
        <Navbar />
        <div className="movie-page">{content}</div>
        <Footer/>
        </div>
    );
  }
}
