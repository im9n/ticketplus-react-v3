import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Search = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="search">
      <div className="container search__container">
        <div className="row search__row">
          <form action="">
            <div className="search__input--wrapper">
              <input type="text" placeholder="Enter keywords..." />
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
              <p>Featured</p>
              <KeyboardArrowDownIcon
                className={dropdownOpen && "rotate-search-open"}
              />
            </div>
            <div
                className="search__dropdown"
                style={{ visibility: !dropdownOpen && "hidden" }}
              >
                <div className="search__dropdown--option pointer">
                  <p>Featured</p>
                </div>
                <div className="search__dropdown--option pointer">
                  <p>Newest</p>
                </div>
                <div className="search__dropdown--option pointer">
                  <p>Oldest</p>
                </div>
                <div className="search__dropdown--option pointer">
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
