import { useEffect, useState } from 'react'


function App() {
  const [countries, setCountries] = useState({ country: [], selected: "" });
  const [state, setState] = useState({ state: [], selected: "" });
  const [city, setCity] = useState({ city: [], selected: "" });


  const fetchStateData = async (countryName) => {
    countryName = encodeURIComponent(countryName);
    const data = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
    const stateList = await data.json();
    setState({state: stateList});
    setCountries((prev)=>({
      country: prev.country,
      selected: decodeURIComponent(countryName)
    }));
  };

    const fetchCityData = async (stateName) => {
    const data = await fetch(`https://crio-location-selector.onrender.com/country=${countries.selected}/state=${stateName}/cities`);
    const cityList = await data.json();

    setCity({city: cityList});
  };

  useEffect(()=>{
    async function getCountryList(){
      fetch('https://crio-location-selector.onrender.com/countries')
      .then((data)=>{
        return data.json();
      })
      .then((finalData)=>{
        setCountries((prev)=>({
          ...prev,
          country: finalData
        }));
      })
      .catch((error)=>{
        console.error(error.message);
      });
    }
    getCountryList();
  }, [])

  return (
    <>
      <h1>Select Location</h1>
      <div style={{ display: "flex", justifyContent: "center"}}>
        <SelectionDropDown data={countries.country} triggerFunction handleOptionChange={fetchStateData}/>
        <SelectionDropDown data={state.state} triggerFunction handleOptionChange={fetchCityData}/>
        <SelectionDropDown data={city.city} />
      </div>
    </>
  )
}

function SelectionDropDown({ data, handleOptionChange, triggerFunction }){
  return (
    <div>
      <select defaultValue="" disabled={!data.length} onChange={(e)=> triggerFunction && handleOptionChange(e.target.value)}>
        <option disabled selected>Select Country</option>
        {data.length && data.map((item)=>(
          <option value={item} key={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default App
