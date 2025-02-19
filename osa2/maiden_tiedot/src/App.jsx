import { useState, useEffect } from 'react'
import axios from 'axios'
import Naytto from './components/Naytto'

const App = () => {
  const [maat, setMaat] = useState([])
  const [haku, setHaku] = useState("")
  const [naytaMaa, setNaytaMaa] = useState(null)
  const [saa, setSaa] = useState(null)

  const apiKey = import.meta.env.VITE_SOME_KEY
  
  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setMaat(response.data)
    })
  }, [])

  useEffect(() => {
    if (naytaMaa) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${naytaMaa.capital}&appid=${apiKey}&units=metric`
    
      axios.get(URL)
        .then(response => {
          setSaa(response.data)
          
      })
      .catch(error => {
        console.error("Virhe haettaessa säätietoja:", error)
      })
    }
  }, [naytaMaa])

  useEffect(() => {
    if (suodatetut.length === 1) {
      setNaytaMaa(suodatetut[0])
    } else if (!naytaMaa) {
      setNaytaMaa(null)
      setSaa(null)
    }
  }, [haku, maat]) 

  const handleChange = (tapahtuma) => {
    setHaku(tapahtuma.target.value)
    setNaytaMaa(null)
    setSaa(null)
  }

  const show = (maa) => {
    setNaytaMaa(maa)
  }

  const suodatetut = maat.filter(maa => maa.name.common.toLowerCase().includes(haku.toLowerCase()))
  const pituus = suodatetut.length
  const naytto = () => {
    if (pituus > 10) {
      return <p>too many matches, specify another filter</p>
    }   
    else if (pituus > 1) {
      return suodatetut.map((maa, index) => (
        <p key={index}>
          {maa.name.common} <button onClick={() => show(maa)}>show</button>
        </p>
      ))
    } else if (pituus === 1) {
      const maa = suodatetut[0]
      const kielet = maa.languages

      return (
        <div>
          <h1>{maa.name.common}</h1>
          <p>capital {maa.capital}</p>
          <p>area {maa.area}</p>
          <h3>languages:</h3>
            {Object.values(kielet).map((kieli, index) => (<li key={index}>{kieli}</li>
            ))
          }
          <p>
          <img src={maa.flags.png} width="100"></img>
          </p>
          <h2>Weather in {maa.capital}</h2>
        {saa ? (
          <div>
            <p>Temperature {saa.main.temp} °C</p>
            <img src={`https://openweathermap.org/img/wn/${saa.weather[0].icon}@2x.png`}></img>
            <p>wind {saa.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Säätietoja ei löydy</p>
        )}

        </div>
      )
    }

  }

  const naytto2 = (maa) => {
    return (
      <div>
        <h1>{maa.name.common}</h1>
        <p>capital {maa.capital}</p>
        <p>area {maa.area}</p>
        <h3>languages:</h3>
          {Object.values(maa.languages).map((kieli, index) => (<li key={index}>{kieli}</li>
          ))
        }
        <p>
        <img src={maa.flags.png} width="100"></img>
        </p>
        <h2>Weather in {maa.capital}</h2>
        {saa ? (
          <div>
            <p>Temperature {saa.main.temp} °C</p>
            <img src={`https://openweathermap.org/img/wn/${saa.weather[0].icon}@2x.png`}></img>
            <p>wind {saa.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Säätietoja ei löydy</p>
        )}

      </div>
    )
  }

  return (
    <div>
        find countries <input id="haku" value={haku} onChange={handleChange} />
        <div>
          {naytto()}
          {suodatetut.length > 1 && 
          naytaMaa && naytto2(naytaMaa)}
        </div>
    </div>
  )
}

export default App
