import { useEffect, useState } from 'react'
import './App.css'
import searchIcon from './assets/search.png';
import cloudIcon from './assets/cloud.png';
import drizzleIcon from './assets/drizzle.png';
import rainyIcon from './assets/rainy.png';
import sunnyIcon from './assets/sunny.png';
import toohotIcon from './assets/toohot.png';
import windIcon from './assets/wind.png';
import snowIcon from './assets/snow.png';
import humidityIcon from './assets/humidity.png';
import wind1Icon from './assets/wind1.png';
const Weatherdetails=({icon,temp,city,country,lat,log,hum,win})=>{
  return(
    <>
    <div className="image">
      <img src={cloudIcon} alt="image" />
      <div className="temp">{temp}'C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    </div>
    
    <div className="cord">
          <div>
            <span className="latitude">Latitude</span>
            <span>{lat}</span>
          </div>
          <div>
            <span className="longitude">Longitude</span>
            <span>{log}</span>
          </div>
    </div>
    <div className="data-container">
          <div className="element">
            <img src={humidityIcon} alt="image" />
            <div className="percentage">{hum}%</div>
            <div className="text">Humidity</div>
          </div>
          <div className="element">
            <img src={wind1Icon} alt="image" />
            <div className="percentage">{win}km/h</div>
            <div className="text">Wind</div>
          </div>
      </div>  
    </>
  );
}

function App() {
  var api_key="bb7a8d7815c45af0b2392f646b320d8d";


  const [loading,setLoading]=useState(false);
  const [citynotfound,setCitynotfound]=useState(false);
  const [icon,setIcon]=useState(cloudIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("chennai");
  const [country,setCountry]=useState("IN");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [hum,setHum]=useState(0);
  const [win,setWin]=useState(0);
  const [text,setText]=useState("chennai");

  const weatherIconMap={
    "01d":sunnyIcon,
    "01n":sunnyIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainyIcon,
    "09n":rainyIcon,
    "10d":rainyIcon,
    "10n":rainyIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  }

  const search=async ()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res=await fetch(url);
      let data=await res.json();
      if(data.cod=="404"){
        console.error("City Not Found");
        setLoading(false);
        setCitynotfound(true);
        return;
      }
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setHum(data.main.humidity);
      setWin(data.wind.speed);
      const weathercode=data.weather[0].icon;
      setIcon(weatherIconMap[weathercode] || sunnyIcon)
      setLoading(false);
      setCitynotfound(false);

    }catch(error){
      console.error("Error occured:"+error.message)
    }finally{
      setLoading(false);
    }
  }
  const handleCity=(e)=>{
    setText(e.target.value);
  }
  const handleKeyDown=(e)=>{
    if(e.key === "Enter"){
      search();
    }
  }
  useEffect(function(){
    search();
  },[]);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="city-input" placeholder="Enter city" onChange={handleCity} onKeyDown={handleKeyDown} value={text}/>
          <div className="search-icon" onClick={()=>search} >
          <img src={searchIcon} alt="Search" />
        </div>
        </div>
        {loading && <div className="loading-page">Loading...</div>}
        {citynotfound && <div className="not-found">City Not Found</div>}
        {!loading && !citynotfound && <Weatherdetails icon={cloudIcon} temp={temp} city={city} country={country} lat={lat} log={log} hum={hum} win={win} />}
      </div>
    </>
  )
}

export default App
