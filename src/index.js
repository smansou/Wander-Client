import React from "react";
import ReactDOM from "react-dom/client";

import GuessLocation from "./components/gameModes/GuessLocation/GuessLocation";
import "./index.css";
import AiSpy from "./components/gameModes/AiSpy/AiSpy";
import Homepage from "./components/Homepage/Homepage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Auth0ProviderWithHistory from "./components/providers/Auth0ProviderWithHistory";
import GlobalState from "./components/providers/GlobalState";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
 <Auth0ProviderWithHistory>
  <GlobalState>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/AiSpy" element={<AiSpy />}></Route>
          <Route exact path="/GuessLocation" element={<GuessLocation />}></Route>
          <Route exact path="/Home" element={<Homepage />}></Route>
        </Routes>
      </Router>
      </GlobalState>
 </Auth0ProviderWithHistory>
    
);
