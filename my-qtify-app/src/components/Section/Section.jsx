// import React, { useEffect, useState } from 'react';
// import styles from './Section.module.css';
// import AlbumCard from '../Card/AlbumCard';
// import axios from 'axios';
// import Carousel from '../Carousel/Carousel';

// const Section = ({ title, endpoint }) => {
//   const [albums, setAlbums] = useState([]);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     axios.get(endpoint)
//       .then(res => setAlbums(res.data))
//       .catch(err => console.error('Error fetching albums:', err));
//   }, [endpoint]);

//   const renderCard = (album) => <AlbumCard key={album.id} title={album.title} image={album.image} follows={album.follows} label="New English Songs" />;

//     const slidesPerViewConfig = {
//     0: { slidesPerView: 1 },
//     480: { slidesPerView: 2 },
//     768: { slidesPerView: 3 },
//     1024: { slidesPerView: 5 },
//     1280: { slidesPerView: 6 },
//   };


//   return (
//     <div className={styles.sectionContainer}>
//       <div className={styles.header}>
//         <h3>{title}</h3>
//         <button className={styles.collapseBtn} onClick={()=> setShowAll(!showAll)}>{showAll ? "Collapse" : "Show All"}</button>
//       </div>
//       { showAll  ? 
//       <div className={styles.albumGrid}>
//         {filteredData.map(album => (
//           <AlbumCard
//             key={album.id}
//             title={album.title}
//             image={album.image}
//             follows={album.follows}
//             label="New English Songs"
//           />
//         ))}
//       </div> :
//      <Carousel data={albums} renderCard={renderCard} slidesPerViewConfig={slidesPerViewConfig} />
//     }
//     </div>
//   );
// };

// export default Section;


/**
 * songs api response structure
[{
"id": "5ff5d89c-ff3c-497d-a580-5ad144492689",
"title": "Hey There Delilah",
"artists": [
"Kelley Cummings",
"Irving Dickinson V"
],
"genre": {
"key": "pop",
"label": "Pop"
},
"likes": 72735,
"image": "https://images.pexels.com/photos/442580/pexels-photo-442580.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
"durationInMs": 49685
}]
 */


/**
 * genres api response structure
 * 
 * {
    data: [{
      "key": "blues",
      "label": "Blues"
    }]
  }
*/

import React, { useEffect, useState } from 'react';
import styles from './Section.module.css';
import AlbumCard from '../Card/AlbumCard';
import Carousel from '../Carousel/Carousel';
import axios from 'axios';
import { Tabs, Tab } from '@mui/material';

const Section = ({
  title,
  endpoint,
  isSongSection = false,
  genresEndpoint = '',
  labelKey = 'label',
  filterKey = 'genre',
  renderCard
}) => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const handleGenresFilter = (value)=>{
    setSelectedGenre(value)
  }

  useEffect(() => {
    axios.get(endpoint)
      .then(res => setData(res.data))
      .catch(err => console.error(`Error fetching ${title}:`, err));
  }, [endpoint]);

  useEffect(() => {
    if (isSongSection && genresEndpoint) {
      axios.get(genresEndpoint)
        .then(res => {
          const genreList = res.data.data.map(genre => genre.label);
          setGenres(['All', ...genreList]);
        })
        .catch(err => console.error('Error fetching genres:', err));
    }
  }, [isSongSection, genresEndpoint]);

const filteredData = isSongSection && selectedGenre !== 'All'
  ? data.filter(item => item[filterKey]?.[labelKey] === selectedGenre)
  : data;

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
      {!isSongSection && (
        <button
          className={styles.collapseBtn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Collapse" : "Show All"}
        </button>
      )}
    </div>

    {isSongSection && (
      <Tabs
        value={selectedGenre}
        onChange={(e, val) => handleGenresFilter(val)}
        className={styles.customTabs}
        TabIndicatorProps={{ style: { backgroundColor: '#34c94b' } }}
      >
        {genres.map((genre) => (
          <Tab
            key={genre}
            label={genre}
            value={genre}
            className={styles.tab}
            style={{ color: 'white' }}
          />
        ))}
      </Tabs>
    )}

    {showAll && !isSongSection ? (
      <div className={styles.albumGrid}>
        {filteredData.map((item) => renderCard(item))}
      </div>
    ) : (
      <Carousel
        data={filteredData}
        renderCard={renderCard}
        slidesPerViewConfig={slidesPerViewConfig}
      />
    )}
  </div>
);

};

export default Section;
