import React, { useEffect, useState } from 'react';
import styles from './Section.module.css';
import AlbumCard from '../Card/AlbumCard';
import axios from 'axios';

const Section = ({ title, endpoint, showCollapse }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(endpoint)
      .then(res => setAlbums(res.data))
      .catch(err => console.error('Error fetching albums:', err));
  }, [endpoint]);

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {showCollapse && <button className={styles.collapseBtn}>Collapse</button>}
      </div>
      <div className={styles.albumGrid}>
        {albums.map(album => (
          <AlbumCard
            key={album.id}
            title={album.title}
            image={album.image}
            follows={album.follows}
            label="New English Songs"
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
