import React, { useState, useEffect } from 'react';
import axios from "axios"
import Find from "./components/Find"
import Countries from "./components/Countries"


function App() {

  const [filter, setFilter] = useState('')
  const [allData, setAllData] = useState(null)

  const [countries, setCountries] = useState([])
  const useGetCountries = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        const data = res.data
        const countryNames = data.map(data => data.name)
        setCountries(countryNames)
        setAllData(data)
      })
  }
  useEffect(useGetCountries, [])

  const onChangeHandlerFilter = (e) => {
    setFilter(e.target.value)
  }

  const filteredCountries = filter === ""
    ? []
    : countries.filter(country => country.toLowerCase().includes(filter))

  return (
    <div>
      <Find value={filter} filter={onChangeHandlerFilter} />
      <h1>Countries</h1>
      <Countries countries={filteredCountries} data={allData} setFilter={setFilter} />
    </div>

  );
}

export default App;