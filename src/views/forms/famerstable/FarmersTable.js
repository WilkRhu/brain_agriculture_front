import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'

const ProducersPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/farmers')
        setData(response.data)
      } catch (error) {
        setError('Erro ao carregar produtores')
      } finally {
        setLoading(false)
      }
    }

    fetchProducers()
  }, [])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  return <DataTable data={data} />
}

export default ProducersPage
