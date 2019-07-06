import React from "react";
import Header from "./Header_tv";
import Footer from "../header/Footer";
import ListOfShows from "./tvlist/ListOfShows";

const Home_tv = () => {
  return (
    <div>
      <Header />
      <ListOfShows />
      <Footer />
    </div>
  );
};

export default Home_tv;
