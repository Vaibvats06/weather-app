import React, { useEffect, useRef, useState } from 'react'
import searh from '../assets/search.png'
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'

const Weather = () => {
  const inputRef =useRef();

  const allIcons = {
  "01d": clear_icon,
  "01n": clear_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03d": cloud_icon,
  "03n": cloud_icon,
  "04d": drizzle_icon,
  "04n": drizzle_icon,
  "09d": rain_icon,
  "09n": rain_icon,
  "10d": rain_icon,
  "10n": rain_icon,
  "13d": snow_icon,
  "13n": snow_icon,
};


  const [weatherData,setWeatherData]=useState(false);
  const search = async (city)=>{
    if(city===""){
      alert("Enter city");
      return;
    }
    try{
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      const icon=allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
        
      })
      
    }
    catch(error){
     

    }
  }
  useEffect(()=>{
      search("Meerut");
  },[])

  return (
    <div className='flex py-20'>
      <div className='w-96 h-[550px] bg-blue-400 rounded-2xl mx-auto '>
        <div className='flex flex-col justify-center items-center gap-5'>
          <div className='flex flex-row gap-3 pt-10'>
            <input ref={inputRef} type="search" name="" id="" className='bg-white h-10 rounded-2xl px-3 outline-none text-lg' placeholder='Search' />
            <img onClick={()=>{search(inputRef.current.value)}} src={searh} alt="" className='bg-white  h-10 p-2 rounded-full cursor-pointer'/>
          </div>
          <img src={weatherData.icon} alt="" className='w-35 h-35' />
          <p className='font-semibold text-5xl'>{weatherData.temperature}&deg;c</p>
          <p className='font-semibold text-2xl'>{weatherData.location}</p>
        </div>
        <div className='flex pt-10'>
          <div className='w-1/2'>
          <div className='flex justify-center items-center gap-2'>
          <img src={humidity} alt="" />
          <p className=''>{weatherData.humidity}%</p>
          </div>
              <p className='pl-13 pt-3'>Humidity</p>
          </div>
          <div className='w-1/2 '>
          <div className=' flex justify-center items-center gap-2'>
          <img src={wind} alt="" />
          <p className='' >{weatherData.windSpeed} km/h</p>
          </div>
          <p className='pl-10 pt-3'>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather