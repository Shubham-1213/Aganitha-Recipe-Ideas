import { useState, useEffect } from "react";
import "./searchbar.css";

const SearchBar = ({
  searchTerm,
  onSearch,
  onFilterChange,
  filters,
  onSearchTermChange,
}) => {
  const { area, category } = filters;
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // Fetch categories
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((response) => response.json())
      .then((data) => setCategories(data.meals))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch areas
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((response) => response.json())
      .then((data) => setAreas(data.meals))
      .catch((error) => console.error("Error fetching areas:", error));
  }, []);

  const handleInputChange = (e) => {
    onSearchTermChange(e.target.value); // Update the search term in the parent (HomePage)
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(); // Call the onSearch function passed from the parent (HomePage)
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (onFilterChange) {
      onFilterChange(name, value); // Pass the selected filter back to the parent (HomePage)
    }
  };

  return (
    <div className="container">
      <div className="dropdown-container">
        <div className="search-box">
          <div className="drop-heading">Enter your main ingrident </div>
          <input
            type="text"
            placeholder="Search for ingredients..."
            value={searchTerm} // Use searchTerm passed from HomePage
            onChange={handleInputChange} // Update searchTerm in HomePage
            className="input"
          />
        </div>
        <div className="area-dropdown">
          <div className="drop-heading">
              Enter the area
          </div>
          <select
          name="area"
          value={area}
          onChange={handleFilterChange}
          className="dropdown"
        >
          <option value="">Select Area</option>
          {areas.map((area, index) => (
            <option key={index} value={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </select>
        </div>
        <div className="cat-dropdown">
          <div className="drop-heading">
            Enter category
          </div>
          <select
          name="category"
          value={category}
          onChange={handleFilterChange}
          className="dropdown"
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
        </div>
        <button onClick={handleSearch} className="button-hero">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
