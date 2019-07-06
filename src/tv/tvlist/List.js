import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import SingleMovie from "./SingleMovie.js";

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "-", className: "arrow-prev" });
const ArrowRight = Arrow({ text: "+", className: "arrow-next" });

class List extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }
  state = {
    movies: [],
    movie: {}
  };

  componentDidMount() {
    this.mounted = true;
    const url =
      typeof this.props.apiCall === "number"
        ? `https://api.themoviedb.org/3/discover/tv?api_key=15508eca3e4b3e62415fe35be0a4a80a&language=en-US&sort_by=popularity.desc&page=1&with_genres=${
            this.props.apiCall
          }`
        : `https://api.themoviedb.org/3/tv/${this.props.apiCall}?api_key=15508eca3e4b3e62415fe35be0a4a80a&language=en-US&page=1`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (this.mounted) {

                  this.setState({ movies: data.results });
        }

      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.mounted = false;
  }



  render() {
    const { movies } = this.state;
    const menu = movies.map(movie => {
      return (
        <div className="menu-item" key={movie.id}>
          <SingleMovie movie={movie} />
        </div>
      );
    });

    return (
      <div className="lists">
        <h2>{this.props.heading}</h2>

        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          dragging={true}
          wheel={false}
          alignCenter={false}
          clickWhenDrag={false}

        />
      </div>
    );
  }
}

export default List;
