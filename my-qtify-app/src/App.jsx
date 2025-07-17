import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Section from "./components/Section/Section";
import AlbumCard from "./components/Card/AlbumCard";
import SongCard from "./components/Card/SongCard";

function App() {
  const renderAlbumCard = (album) => (
    <AlbumCard
      key={album.id}
      title={album.title}
      image={album.image}
      follows={album.follows}
      label="New English Songs"
    />
  );

  const renderSongCard = (song) => (
    <SongCard
      key={song.id}
      title={song.title}
      image={song.image}
      likes={song.likes}
    />
  );

  return (
    <div>
      <Navbar />
      <Hero />

      {/* Top Albums */}
      <Section
        title="Top Albums"
        endpoint="https://qtify-backend-labs.crio.do/albums/top"
        renderCard={renderAlbumCard}
      />

      {/* New Albums */}
      <Section
        title="New Albums"
        endpoint="https://qtify-backend-labs.crio.do/albums/new"
        renderCard={renderAlbumCard}
      />

      {/* Songs with Tabs */}
      <Section
        title="Songs"
        endpoint="https://qtify-backend-labs.crio.do/songs"
        genresEndpoint="https://qtify-backend-labs.crio.do/genres"
        isSongSection={true}
        filterKey="genre"
        renderCard={renderSongCard}
      />
    </div>
  );
}

export default App;
