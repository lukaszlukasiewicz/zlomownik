import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "contexts/AuthContext";
import PlacesProvider from "contexts/PlacesContext";
import MapProvider from "contexts/MapContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <MapProvider>
          <PlacesProvider>
            <App />
          </PlacesProvider>
        </MapProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
