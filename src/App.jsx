import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/SearchResult/SearchResult";

import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/search" element={<SearchResult />} />

      </Routes>
    </Router>
  );
}

export default App;