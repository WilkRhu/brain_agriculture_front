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
        console.log(response.data, 'Teste')

        const states = response.data.map((item) => item.state)
        const counts = response.data.map((item) => item.count)
        const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        const hoverBackgroundColors = backgroundColors
        console.log(states)
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

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
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
            <CCardHeader>Polar Area Chart</CCardHeader>
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
