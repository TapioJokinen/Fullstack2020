import React from 'react';

import Country from "./Country"


const Countries = ({ countries, data, setFilter }) => {

    if (countries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter.</p>
        </div>
      )
    }
    else if (countries.length === 1) {
      return (
        <div>
          <Country country={countries} data={data} />
        </div>
      )
    }
  
    const arr = countries.map((country, i) => {
      return (
        <li key={i}>
          {country} - <button onClick={() => setFilter(country.toLowerCase())}>show</button>
        </li>
      )
    })
  
    return (
      <div>
        <ul>
          {arr}
        </ul>
      </div>
    )
  }

export default Countries  