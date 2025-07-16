import * as React from "react";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";


function Navbar({ searchData }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <Logo />
      </div>
      <Search
        placeholder="Search a song of your choice"
        searchData={searchData}
      />
      <div className={styles.buttonSection}>
        <Button onClick={() => console.log('feedback clicked')}>Give Feedback</Button>
      </div>
    </nav>
  );
}

export default Navbar;
