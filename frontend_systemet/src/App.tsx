import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import ApkComponent from "./components/ApkComponent";
import LoweredComponent from "./components/LoweredComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/page/apk" element={<ApkComponent />} />
        <Route path="/page/lowered" element={<LoweredComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
