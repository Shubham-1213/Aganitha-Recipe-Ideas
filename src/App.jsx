import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/SearchResult/SearchResult";
import Recipe  from "./pages/Recipe/Recipe";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/search" element={<SearchResult />} />
         <Route path="/recipe/:id" element={<Recipe />} /> {/* Recipe route */}
      </Routes>
    </Router>
  );
}

export default App;