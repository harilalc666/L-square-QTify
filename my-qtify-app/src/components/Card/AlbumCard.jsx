import React from "react";
import { Card, CardMedia, Chip, Typography, Box } from "@mui/material";
import styles from "./AlbumCard.module.css";

const AlbumCard = ({ title, image, follows, label }) => {
  return (
    <Box className={styles.albumContainer}>
      <Card className={styles.albumCard}>
        <Box className={styles.imageWrapper}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            className={styles.albumImage}
          />
          <Typography className={styles.albumTitle}>{title}</Typography>
        </Box>
        <Box className={styles.chipWrapper}>
          <Chip
            label={`${follows} Follows`}
            className={styles.followsChip}
            size="small"
          />
        </Box>
      </Card>
      {label && (
        <Typography className={styles.sectionLabel}>{label}</Typography>
      )}
    </Box>
  );
};

export default AlbumCard;
