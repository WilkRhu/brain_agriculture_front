import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFarmers } from '../../../actions/farmerActions'

const ProducersPage = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.farmers)

  useEffect(() => {
    dispatch(fetchFarmers())
  }, [dispatch])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  return <DataTable data={data} />
}

export default ProducersPage
