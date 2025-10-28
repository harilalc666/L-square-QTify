import { useState, useEffect, useMemo, useCallback } from 'react';
// The API endpoint
const COUNTRY_LIST_API = 'https://countries-search-data-prod-812920491762.asia-south1.run.app/countries';

const App = () => {
  const [allCountries, setAllCountries] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(COUNTRY_LIST_API);
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        setAllCountries(data);
      } catch (err) {
        console.error("Error fetching countries data:", err);
        setError("Failed to load country data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);


  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredCountries = useMemo(() => {
  
    if (!searchTerm) {
      return allCountries;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return allCountries.filter(country =>
      country.common.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [allCountries, searchTerm]); 

  if (isLoading) {
    return <div className="loading-message">Loading countries...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="app-container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          // filtered countries
          filteredCountries.map(country => (
            <CountryCard key={country.name} country={country} />
          ))
        ) : (
         
          <div className="no-results-message">
            {searchTerm && `No countries found matching "${searchTerm}".`}
          </div>
        )}
      </div>
    </div>
  );
};

// CountryCard Component
const CountryCard = ({ country }) => {
  console.log("country", country);
  return (
 
    <div className="countryCard">
      <img
        src={country.png}
        alt={`${country.common} flag`}
        className="flag-image"
      />
      <div className="country-name">
        {country.common}
      </div>
    </div>
  );
};

export default App;