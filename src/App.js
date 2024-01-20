// import {TiWeatherPartlySunny} from 'react-icons-ai';
import './App.css';
// import {TiWeatherCloudy} from 'react-icons/ti';
// import axios from 'axios';
import React, {useState} from 'react';

const api = {
  key: "f00c38e0279b7bc85480c3fe775d518c",
  base: "https://api.openweathermap.org/data/2.5/"
}

export default function Time() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    
    const search = evt => {
      if (evt.key === "Enter") {
        fetch( `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          setWeather(result);
          setQuery('');
          console.log(result);
        }); 
      }
      else {
        
      }
    }

    const date = (d) => {
      let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
    
      return `${day} ${date} ${month} ${year}`
    }


    return(
      <>
      <div className=" flex flex-col h-[500px] w-[500px] bg-white mx-auto my-20 rounded-xl text-center shadow-lg shadow-black">
          <div className="my-10">
            <h1 className="mb-10 font-bold text-4xl text-center">Weather App</h1>
            <input type ="text" placeholder="Search City..." className="text-white rounded-3xl pl-5 bg-[#4d4d4d] w-[200px] outline-none p-2 text-lg duration-500 focus:w-[50%]" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
          </div>
          {(typeof weather.main != "undefined") ? (
             <><div className="font-bold text-3xl">{weather.name}, {weather.sys.country} </div>
             <div className="font-medium text-2xl mt-5">{date(new Date())}</div>
              <div className="flex flex-row justify-center items-center mt-5 font-bold text-3xl">
             <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
               <span>{Math.round(weather.main.temp)} °C</span>
            </div> 
       
            <div className="my-5 font-bold text-lg">
                <p>{weather.weather[0].description.toUpperCase()}</p>
                <p>Wind Speed: {weather.wind.speed}m/s</p>
            </div>
              </>
          ) : ('')}
       </div>
      </>
    )
  }



