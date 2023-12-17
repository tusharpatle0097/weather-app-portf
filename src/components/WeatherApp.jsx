import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../context/DarkModeStore';

const WeatherApp = () => {

    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    const [searchInput, setsearchInput] = useState('nagpur')
    const [fetchData, setfetchData] = useState(null);
    const ref = useRef();
    useEffect(() => {
        ref.current.focus();
        if (searchInput !== " ") {
            getData();
        }
    }, [searchInput])

    const getData = () => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=cf0e170fd30d49d2de4e730dd301c718&units=metric`
        axios.get(apiUrl)
            .then(res => {
                console.log(res.data)
                setfetchData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
        <div className='text-center mt-2'>
        <button className={`bg-green-600 px-3 py-2 rounded-md ${isDarkMode ? "darkButton" : "lightButton"}`} onClick={toggleDarkMode}>{isDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}</button>
        </div>
            <h2 className='text-center py-[2rem] text-[30px] font-bold'>Well Come to My Weather App</h2>
            <div className='flex items-center justify-center '>
                <div className={`border border-rose-500 w-[30rem] h-[100%] text-center py-[2rem] rounded-md ${isDarkMode ? "weatherCardDark" : "weatherCardlight"}`}>
                    <input type='text' ref={ref} onChange={(e) => setsearchInput(e.target.value)} className='border-[2px] w-[300px] rounded-md py-2 px-2' placeholder='Search...' />
                    {fetchData ? (
                        <div>
                            <div className='mt-3 text-[25px] text-[#6e046e]'>City: <span className='text-red-600'>{fetchData.name}, {fetchData.sys.country}</span></div>
                            <div className={`mt-5 text-slate-800  ${isDarkMode ? 'temdark' : "temwhite"}`}><span className='text-[30px]'>{fetchData.main.temp}</span>  <span>°C</span></div>
                            <h2 className='text-[25px] mt-3 text-[#9332a8]'>{fetchData.weather[0].description}</h2>
                            <h2 className='text-[25px] mt-3 text-[#d62087]'>Humidity : {fetchData.main.humidity}</h2>
                        </div>
                    ) : "Loading..."}
                </div>
            </div>
        </>
    );
}

export default WeatherApp;
