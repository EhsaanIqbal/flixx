import React from "react";
import List from "./List";

const movies = {
  upcoming: {
    apiCall: "popular",
    header: "Popular"
  },
  action: {
    apiCall: 28,
    header: "Action"
  },
  adventure: {
    apiCall: 12,
    header: "Adventure"
  },
  comedy: {
    apiCall: 35,
    header: "Comedy"
  },
  crime: {
    apiCall: 80,
    header: "Crime"
  },
  drama: {
    apiCall: 18,
    header: "Drama"
  },
  romance: {
    apiCall: 10749,
    header: "Romance"
  }
};

const ListOfShows = () => {
  return (
    <div>
      {Object.keys(movies).map((item, i) => (
        <div key={i}>
          <List heading={movies[item].header} apiCall={movies[item].apiCall} />
        </div>
      ))}
    </div>
  );
};


export default ListOfShows;
