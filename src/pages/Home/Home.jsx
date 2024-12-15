import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";

function HomePage() {
  const [searchInput, setSearchInput] = useState(""); // Maintain search input here
  const [filters, setFilters] = useState({
    area: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    // Use searchInput directly in the search handler
    if (searchInput.trim()) {
      // Navigate to the search results page, passing the search input and filters
      navigate(`/search?ingredient=${searchInput}&area=${filters.area}&category=${filters.category}`);
    }
  };

  const handleFilterChange = (filterName, filterValue) => {
    // Update the filters when the user selects a new filter
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  return (
    <div>
      <Hero />
      <SearchBar
        searchTerm={searchInput} // Pass the current search input to SearchBar
        onSearch={handleSearch} // Pass the search handler to SearchBar
        onFilterChange={handleFilterChange} // Pass the filter handler to SearchBar
        filters={filters} // Pass the current filter values
        onSearchTermChange={setSearchInput} // Pass the setter for search input to SearchBar
      />
    </div>
  );
}

export default HomePage;
