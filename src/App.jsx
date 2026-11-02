import './App.css'
import axios from 'axios'
import { useState } from 'react'
function App() {
  const [city, setCity] = useState("")
  const [myData, setMyData] = useState({})
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const getData = async (e) => {
    if (e.key == 'Enter') {
      try{
        setLoading(true)
        setErrorMessage("")
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=19b15efc74b01eb7cc0574d85791c65c`)
      console.log(response.data)
      setMyData(response.data)
      setLoading(false)
      }
      catch(error){
        setErrorMessage("Server Error")
      }
    }
  }
  return (
    <>
      <div className="app">
        <div className="search">
          <input onKeyDown={getData}
            onChange={(e) => setCity(e.target.value)}
            type="text" placeholder='Enter City Name' />
        </div>
        <div>
          <p style={{textAlign:"center"}}>{errorMessage}</p>
        </div>
        {loading && <div style={{textAlign:"center"}}>
          Loading...
        </div>}
        <div className="container">
          <div className="top">
            <div className="location">
              {myData["name"] && <p>{myData["name"]}</p>}
            </div>
            <div className="temp">
              {myData["main"] &&
          <h1>{myData["main"]["temp"].toFixed()}&deg;</h1>}
            </div>
            <div className="description">
            {myData["weather"] &&  
            <p>{myData["weather"][0]["main"]}</p>}
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              {myData["main"] &&
          <p>{myData["main"]["feels_like"].toFixed()}&deg;</p>}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {myData["main"] &&
          <p>{myData["main"]["humidity"]}%</p>}
              <p>Humidity</p>
            </div>
            <div className="wind">
             {myData["wind"] && 
             <p>{myData["wind"]["speed"].toFixed()} KPH</p>}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default App
