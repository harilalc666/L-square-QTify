import { useEffect, useState } from 'react'


function App() {
  const [countries, setCountries] = useState({ country: [], selected: "" });
  const [state, setState] = useState({ state: [], selected: "" });
  const [city, setCity] = useState({ city: [], selected: "" });


  const fetchStateData = async (countryName) => {
    try {
      countryName = encodeURIComponent(countryName);
      const data = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      const stateList = await data.json();
      setState({state: stateList});
      setCountries((prev)=>({
        country: prev.country,
        selected: decodeURIComponent(countryName)
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

    const fetchCityData = async (stateName) => {
      try {
        const data = await fetch(`https://crio-location-selector.onrender.com/country=${countries.selected}/state=${stateName}/cities`);
        const cityList = await data.json();
        setState((prev)=>({
          state: prev.state,
          selected: stateName
        }));
        setCity({city: cityList});
      } catch (error) {
        console.error(error.message);
      }
  };

  const updateCityState = (selecedCity)=>{
    setCity((prev)=>({
      city: prev.city,
      selected: selecedCity
    }))
  }

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
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <h1>Select Location</h1>
        <div style = {{ display: "flex", justifyContent: "center"}}>
          <SelectionDropDown data={countries.country} triggerFunction handleOptionChange={fetchStateData}/>
          <SelectionDropDown data={state.state} triggerFunction handleOptionChange={fetchCityData}/>
          <SelectionDropDown data={city.city} handleOptionChange={updateCityState}/>
        </div>
        {city.selected && <p>You selected {city.selected}, {state.selected}, {countries.selected}</p>}
      </div>
  )
}

function SelectionDropDown({ data, handleOptionChange }){
  return (
    <div>
      <select defaultValue="" disabled={!data.length} onChange={(e)=> handleOptionChange(e.target.value) }>
        <option disabled selected>Select Country</option>
        {data.length && data.map((item)=>(
          <option value={item} key={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default App
