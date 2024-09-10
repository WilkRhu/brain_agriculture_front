import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useGeoNames = (countryCode) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.geonames.org/childrenJSON?geonameId=${countryCode}&username=YOUR_USERNAME`,
        )
        setData(response.data.geonames)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [countryCode])

  return { data, loading, error }
}

export default useGeoNames
