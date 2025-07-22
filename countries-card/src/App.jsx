import { useEffect, useState } from 'react';

function App() {
  const [flags, setFlags] = useState([]);

  useEffect(()=>{
    try {
      async function fetchFlags() {
        const flagsData = await fetch('https://xcountries-backend.azurewebsites.net/all');
        const data = await flagsData.json();
        setFlags(data);
        
      }
      fetchFlags()
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px" }}>
      {flags.map((data, i) => <CountryFlag key={i} data={data}/>)}
    </div>
  )
}

function CountryFlag({ data }){
  return (
    <section style={{ 
      border: "1px solid black", 
      height: "180px", 
      width: "200px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems:"center",
      padding: "0px 5px"
      // objectFit: "contain",      
    }}>
      <img 
        src={data.flag} 
        alt={data.name} 
        style={{ 
          maxWidth: "100%", 
          maxHeight: "100%", 
          objectFit: "contain"
          
        }}
      />
      <p style={{ 
        margin: "0px", 
        textAlign: "center",
        wordBreak: "break-word",
        // width: "100%"
      }}>
        {data.name}
      </p>
    </section>
  )
}

export default App
