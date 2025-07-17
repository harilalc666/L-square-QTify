import React from 'react';
import styles from './SongCard.module.css'; // Create this for styling

const SongCard = ({ title, image, likes }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.likes}>{likes} Likes</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default SongCard;
