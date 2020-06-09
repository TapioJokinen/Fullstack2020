import React from 'react';

import Weather from "./Weather"


const Country = ({ data, country }) => {

    const filteredCountry = data.filter(c => c.name.includes(country))
    const countryData = filteredCountry[0]
    const flag = countryData.flag
    const flagStyle = {
      width: "100px",
      heigth: "50px"
    }
    const languages = countryData.languages.map((language, i) => {
      return <li key={i}>{language.name}</li>
    })
  
    return (
      <div>
        <h2>{countryData.name}</h2>
        <br></br>
        <p>Capital: {countryData.capital}</p>
        <p>Population: {countryData.population}</p>
        <br></br>
        <h2>Languages</h2>
        <ul>
          {languages}
        </ul>
        <img src={flag} alt="Country's flag" style={flagStyle}></img>
        <Weather city={countryData.capital} />
      </div>
    )
  }

export default Country
  