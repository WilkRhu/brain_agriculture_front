import { useState, useEffect } from 'react'
import axios from 'axios'

const useIBGE = () => {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        )
        setStates(
          response.data.map((state) => ({
            id: state.id,
            sigla: state.sigla,
            nome: state.nome,
          })),
        )
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchStates()
  }, [])

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`,
          )
          setCities(
            response.data.map((city) => ({
              id: city.id,
              nome: city.nome,
            })),
          )
        } catch (error) {
          setError(error)
        }
      }

      fetchCities()
    }
  }, [selectedState])

  return { states, cities, setSelectedState, loading, error }
}

export default useIBGE
