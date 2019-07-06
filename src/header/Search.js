import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
//css overrides
const styles = {
  root:{
    backgroundColor: 'transparent',
    color:'#ffffff',
    width: "230px",
    padding:"6px 23px 7px"

  },
  redInkbar: {
   '&:after': {
     borderBottomColor: '#ff0000',
   },
}
}


class Search extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }
  state = {
    val: "",
    searchVal: [],
    showRes: false
  };

  componentDidMount() {
    this.mounted = true;

  }

  handleChange = e => {
    this.setState({ val: e.target.value });
    if (e.target.value !== "")
      fetch(`
    https://api.themoviedb.org/3/search/multi?api_key=15508eca3e4b3e62415fe35be0a4a80a&language=en-US&query=${
      e.target.value
    }&page=1`)
        .then(r => r.json())
        .then(data => {
              if (this.mounted)
            this.setState({ searchVal: data.results, showRes: true });
          })
        .catch(err => console.log(err));
    else if (e.target.value === "") this.setState({ showRes: false });
  };

  closeRes = () => {
    this.setState({ showRes: false });
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { val, searchVal, showRes } = this.state;
    const {classes} = this.props;

    const moviesList = searchVal.length
      ? searchVal.slice(0, 3).map(movie => {
          let imgLink = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
          let first_air_date = movie.first_air_date
          let release_date = movie.release_date

          return (

            <li key={movie.id}>

              <Card >
     <CardActionArea>
       <CardMedia
        style={{height:"120px", width:"auto"}}
         image={imgLink}
         title={movie.title||movie.name}
       />
       <CardContent>

                        {
                          movie.media_type === 'tv' ?
                          <div>
                            <Typography >
                              <Link to={"/tv/watch/" + movie.id} onClick={this.closeRes}>
                                {movie.name}
                              </Link>
                            </Typography>
                            <Divider />
                            <p>
                               {movie.media_type.toUpperCase()} |
                               <span> {first_air_date}</span>

                            </p>
                          </div>

                        :
                        <div>
                          <Typography >
                            <Link to={"/watch/" + movie.id} onClick={this.closeRes}>
                              {movie.title}
                            </Link>
                          </Typography>
                          <Divider />
                          <p>
                             {movie.media_type.toUpperCase()} |
                             <span> {release_date}</span>

                          </p>
                        </div>

                        }

       </CardContent>
     </CardActionArea>
   </Card>



            </li>



          );
        })
      : null;

    return (
      <React.Fragment>

        <Input
          type="text"
          name="searchVal"
          onChange={this.handleChange}
          classes={{root:classes.root, underline: classes.redInkbar}}
          placeholder="Search.."
          value={val}


        />
        {showRes && (
          <div className="search-values">
            <ul>{moviesList}</ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Search);
