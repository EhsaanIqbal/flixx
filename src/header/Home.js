import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ListsOfMovies from "../movie/movieslist/ListsOfMovies";

const Home = () => {
  return (
    <div>
      <Header />
      <ListsOfMovies />
      <Footer />
    </div>
  );
};

export default Home;
