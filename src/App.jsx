// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Aboutus from "./Pages/aboutus"
import Contactus from "./Pages/contactus"
function App() {
  // const [count, setCount] = useState(0);

  return (
      <Router>
        <Routes>
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/contactus" element={<Contactus />} />
        </Routes>
      </Router>
  )
}

export default App;
