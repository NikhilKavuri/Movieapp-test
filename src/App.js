import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img
          class="poster"
          src="https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg"
          alt="Kung Fu Panda 4 Poster"
        />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <div style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <Home />
      </div>
    </div>
  );
}

export default App;
