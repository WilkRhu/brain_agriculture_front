import React, { useState } from 'react'
import useGeoNames from './useGeoNames' // Supondo que você salvou o hook como useGeoNames.js

const CitySelector = () => {
  const [countryCode, setCountryCode] = useState('BR') // Brasil
  const { data, loading, error } = useGeoNames(countryCode)

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <select>
        {data.map((city) => (
          <option key={city.geonameId} value={city.geonameId}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CitySelector
