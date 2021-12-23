import React, { Component } from "react";
import axios from "axios";
import Validator from "validator";
import "./App.css";

class App extends Component {
  state = {
    url: "",
    link: ""
  };

  handleChange = (event) => {
    this.setState({
      url: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const validURL = Validator.isURL(this.state.url,{
      require_protocol: true
    });
    if(!validURL){
      alert("Please ensure this URL is correct and includes the http(s) protocol");
    }else{
      console.log("URL is: ",this.state.url);
      axios.post("https://joyce-url-shortner.herokuapp.com/api/shorten",{
        url:this.state.url
      })
      .then(res => {
        console.log(res.data.hash);
        this.setState({
          link:`http://${res.data.hash}`
        })
      })
      .catch(err => console.log(err));
    }
   
  };
  render() {
    return (
      <div className="App">
      <header>
        <h1>URL Shortner</h1>
      </header>
      <main>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <input type="text" name="url" placeholder="Enter URL with http(s)" onChange={this.handleChange} />
            <input type="submit" value="shorten" />
          </fieldset>
          <fieldset>
            <span id="result">{this.state.link}</span>
          </fieldset>
        </form>
        </main>
      </div>
    );
  }
}
export default App;