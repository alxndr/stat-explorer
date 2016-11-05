import React, { Component } from "react";
import "./App.css";

const encodeData = (data) => Object.keys(data).map((key) => [key, data[key]].map(encodeURIComponent).join("=")).join("&");

const pnet = (params) => `https://api.phish.net/api.js?${encodeData(params)}`;

class App extends Component {
  componentDidMount() {
    console.log("good for you!");
    fetch(pnet({method: "pnet.shows.setlists.tiph"}))
      .then((res) => res.json())
      .then((json) => console.log(json))
    ;
  }
  render() {
    return (
      <div>
        <h1>Today in Phish History</h1>
        <p>...thinking about it...</p>
        <p>{}</p>
      </div>
    );
  }
}

export default App;
