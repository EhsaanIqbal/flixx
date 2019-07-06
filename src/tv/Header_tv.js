import React, { Component } from "react";
import Animate from "react-smooth";
import Navbar from "../header/Navbar";
import { Link } from "react-router-dom";
import 'loaders.css'

class Header_tv extends Component {
  constructor(props) {
    super(props);
    this.showcaseMovies = 5;
    this.timeoutTime = 5000;
    this.mounted = false;
  }
  state = {
    movies: [],
    i: 0
  };

  componentDidMount() {
    this.mounted = true;
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=15508eca3e4b3e62415fe35be0a4a80a&language=en-US&page=1"
    )
      .then(res => res.json())
      .then(data => {
        if (this.mounted) this.setState({ movies: data.results });
      })
      .catch(err => console.log(err));
    this.startTimeout();
  }

  startTimeout = () => {
    this.timeout = setTimeout(() => {
      if (this.state.i < this.showcaseMovies)
        this.setState({ i: this.state.i + 1 });
      else this.setState({ i: 0 });
      this.startTimeout();
    }, this.timeoutTime);
  };

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.timeout);
  }

  render() {
    const { movies, i } = this.state;

    const divs = movies.length
      ? movies.map((movie, index) => {
          if (index <= this.showcaseMovies) {
            return (
              <div
                key={index}
                className={i === index ? "active" : null}
                onClick={() =>
                  this.setState({ i: index }, () => {
                    clearTimeout(this.timeout);
                    this.startTimeout();
                  })
                }
              />
            );
          } else return null;
        })
      : null;

    const moviesList = movies.length ? (
      <div key={movies[i].id}>
        <Animate to="1" from="0.2" attributeName="opacity">
          <div
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 60%), url("https://image.tmdb.org/t/p/original/${
                movies[i].backdrop_path
              }")`
            }}
            className="bgImage"
          >
            <div className="popularInfo">
              <h1>{movies[i].name}</h1>

              <p className="header-overview">{movies[i].overview}</p>
              <Link to={"tv/watch/" + movies[i].id}>
                <button>See More</button>
              </Link>
            </div>
            <div className="switchImg">{divs}</div>
          </div>
        </Animate>
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
      <header>
        <Navbar />
        <div className="popular">{moviesList}</div>
      </header>
    );
  }
}
export default Header_tv;
