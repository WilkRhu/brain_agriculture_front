import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { CChartDoughnut, CChartPie, CChartPolarArea } from '@coreui/react-chartjs'
import axios from 'axios'

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  })

  const [chartDataCrop, setChartDataCrop] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  })

  const [chartDataLand, setChartDataLand] = useState({
    labels: ['Área Agricultável', 'Área de Vegetação'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#36A2EB', '#4BC0C0'],
        hoverBackgroundColor: ['#36A2EB', '#4BC0C0'],
      },
    ],
  })

  useEffect(() => {
    const fetchDataCrop = async () => {
      try {
        const response = await axios.get('http://localhost:3001/farmers/by-crop')

        const crops = Object.keys(response.data)
        const counts = Object.values(response.data)

        const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        const hoverBackgroundColors = backgroundColors

        setChartDataCrop({
          labels: crops,
          datasets: [
            {
              data: counts,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: hoverBackgroundColors,
            },
          ],
        })
      } catch (error) {
        console.error('Erro ao buscar dados de fazendas por cultura:', error)
      }
    }

    fetchDataCrop()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/farmers/by-state')

        const states = response.data.map((item) => item.state)
        const counts = response.data.map((item) => item.count)
        const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        const hoverBackgroundColors = backgroundColors

        setChartData({
          labels: states,
          datasets: [
            {
              data: counts,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: hoverBackgroundColors,
            },
          ],
        })
      } catch (error) {
        console.error('Erro ao buscar dados de fazendas por estado:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchDataLand = async () => {
      try {
        const response = await axios.get('http://localhost:3001/farmers/land-use')
        const { arableArea, vegetationArea } = response.data

        setChartDataLand({
          labels: ['Área Agricultável', 'Área de Vegetação'],
          datasets: [
            {
              data: [arableArea, vegetationArea],
              backgroundColor: ['#36A2EB', '#4BC0C0'],
              hoverBackgroundColor: ['#36A2EB', '#4BC0C0'],
            },
          ],
        })
      } catch (error) {
        console.error('Erro ao buscar dados de uso do solo:', error)
      }
    }

    fetchDataLand()
  }, [])

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CRow>
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>Fazendas Por Estado</CCardHeader>
            <CCardBody>
              <CChartPie data={chartData} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>Culturas Plantadas</CCardHeader>
            <CCardBody>
              <CChartDoughnut data={chartDataCrop} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>Área agricultável e Vegetação</CCardHeader>
            <CCardBody>
              <CChartPolarArea data={chartDataLand} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
