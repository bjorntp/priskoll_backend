import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import ApkComponent from "./components/ApkComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/page/apk" element={<ApkComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
