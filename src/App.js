import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      type: null
    };
  }

  GetDogMedia(props) {
    const type = props.type;
    const url = props.url;
    if (type === ".mp4") {
      return (
        <video className="dogMedia" autoPlay="true" loop muted={true} controls>
          <source src={url} type="video/mp4" />
        </video>
      );
    } else if (type === "webm") {
      return (
        <video className="dogMedia" autoPlay="true" loop muted={true} controls>
          <source src={url} type="video/webm" />
        </video>
      );
    } else if (type === null) {
      return <p />;
    } else {
      return <img className="dogMedia" src={url} alt="Broken Dog Link" />;
    }
  }

  fetchData = () => {
    axios
      .get("https://random.dog/woof.json")
      .then(response => {
        if (response.status === 200 && response.statusText === "OK") {
          let lastFour = response.data.url
            .substr(response.data.url.length - 4)
            .toLowerCase();
          this.setState({
            url: response.data.url,
            type: lastFour
          });
        } else {
          console.log("Error getting dog :(");
          this.setState({
            url: "Error getting dog :(",
            type: null
          });
        }
        this.forceUpdate();
      })
      .catch(error => {
        console.log("Error getting dog :(");
        this.setState({ url: "Error getting dog :(", type: null });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  NewDogButton() {
    return <button onClick={() => this.fetchData()}>Get a New Dog</button>;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Random Dog Generator</h1>
          {this.NewDogButton()}
        </header>
        <div className="dogContainer">
          <this.GetDogMedia url={this.state.url} type={this.state.type} />
        </div>
      </div>
    );
  }
}

export default App;
