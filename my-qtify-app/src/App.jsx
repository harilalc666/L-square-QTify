import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Section from './components/Section/Section';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Section
        title="Top Albums"
        endpoint="https://qtify-backend-labs.crio.do/albums/top"
        showCollapse={true}
      />
    </div>
  )
}

export default App;
