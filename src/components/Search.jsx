import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Search = ({ filter, setFilter, setSearchMade, setSearch, setPageNumber }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (inputSearch === "") {
      return;
    }

    setSearch(inputSearch);
    setFilter('featured')
    setSearchMade(true);
    setPageNumber(1)
  }

  return (
    <div className="search">
      <div className="container search__container">
        <div className="row search__row">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="search__input--wrapper">
              <input
                type="text"
                placeholder="Enter keywords..."
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
              <button type="submit" className="pointer">
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className="relative">
            <div
              className="search__filter pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <p>{filter}</p>
              <KeyboardArrowDownIcon
                className={dropdownOpen && "rotate-search-open"}
              />
            </div>
            <div
              className="search__dropdown"
              style={{ visibility: !dropdownOpen && "hidden" }}
            >
              <div
                className="search__dropdown--option pointer"
                onClick={() => {
                  setFilter("featured");
                  setDropdownOpen(false);
                }}
              >
                <p>Featured</p>
              </div>
              <div
                className="search__dropdown--option pointer"
                onClick={() => {
                  setFilter("newest");
                  setDropdownOpen(false);
                }}
              >
                <p>Newest</p>
              </div>
              <div
                className="search__dropdown--option pointer"
                onClick={() => {
                  setFilter("oldest");
                  setDropdownOpen(false);
                }}
              >
                <p>Oldest</p>
              </div>
              <div
                className="search__dropdown--option pointer"
                onClick={() => {
                  setFilter("rating");
                  setDropdownOpen(false);
                }}
              >
                <p>Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
