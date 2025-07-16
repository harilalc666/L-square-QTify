import React from "react";
import styles from "./Search.module.css";
import SearchIcon from "../../assets/search-icon.svg";

function Search({ searchData, placeholder }) {
  const [searchValue, setSearchValue] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchValue);
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <input
        name="search"
        className={styles.search}
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className={styles.searchButton} type="submit">
        <img src={SearchIcon} alt="Search" width="20" height="20" />
      </button>
    </form>
  );
}

export default Search;
