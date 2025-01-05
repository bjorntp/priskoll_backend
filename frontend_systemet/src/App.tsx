import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import ApkComponent from "./components/ApkComponent";
import LoweredComponent from "./components/LoweredComponent";
import RaisedComponent from "./components/RaisedComponent";
import AboutComponent from "./components/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/page/apk" element={<ApkComponent />} />
        <Route path="/page/lowered" element={<LoweredComponent />} />
        <Route path="/page/raised" element={<RaisedComponent />} />
        <Route path="/page/about" element={<AboutComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
