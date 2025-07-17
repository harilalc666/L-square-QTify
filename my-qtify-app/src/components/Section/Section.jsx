import React, { useEffect, useState } from 'react';
import styles from './Section.module.css';
import AlbumCard from '../Card/AlbumCard';
import axios from 'axios';
import Carousel from '../Carousel/Carousel';

const Section = ({ title, endpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get(endpoint)
      .then(res => setAlbums(res.data))
      .catch(err => console.error('Error fetching albums:', err));
  }, [endpoint]);

  const renderCard = (album) => <AlbumCard key={album.id} title={album.title} image={album.image} follows={album.follows} label="New English Songs" />;

    const slidesPerViewConfig = {
    0: { slidesPerView: 1 },
    480: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
    1280: { slidesPerView: 6 },
  };


  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button className={styles.collapseBtn} onClick={()=> setShowAll(!showAll)}>{showAll ? "Collapse" : "Show All"}</button>
      </div>
      { showAll  ? 
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
      </div> :
     <Carousel data={albums} renderCard={renderCard} slidesPerViewConfig={slidesPerViewConfig} />
    }
    </div>
  );
};

export default Section;
