import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormInput,
  CRow,
} from '@coreui/react'
import Select from 'react-select'
import useIBGE from '../../../hooks/useIBGE'
import InputMask from 'react-input-mask'

const FormCadastroFarmer = () => {
  const { states, cities, setSelectedState, loading, error } = useIBGE()
  const [validated, setValidated] = useState(false)
  const [selectedCrops, setSelectedCrops] = useState([])
  const [formData, setFormData] = useState({
    cpfOrCnpj: '',
    farmerName: '',
    farmName: '',
    state: '',
    city: '',
    totalAreaHectares: '',
    arableAreaHectares: '',
    vegetationAreaHectares: '',
    plantedCrops: [],
  })

  const formatOptions = (data) => {
    return data.map((item) => ({
      value: item.sigla || item.nome,
      label: item.nome,
    }))
  }

  const cropOptions = [
    { value: 'SOY', label: 'Soja' },
    { value: 'CORN', label: 'Milho' },
    { value: 'COFFEE', label: 'Café' },
    { value: 'COTTON', label: 'Algodão' },
    { value: 'SUGAR_CANE', label: 'Cana de Açúcar' },
  ]

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : '',
    })
    if (name === 'state') {
      setSelectedState(selectedOption ? selectedOption.value : '')
    }
  }

  const handleCropsChange = (selectedOptions) => {
    setSelectedCrops(selectedOptions)
    setFormData({
      ...formData,
      plantedCrops: selectedOptions.map((option) => option.value),
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      try {
        const dataToSubmit = {
          ...formData,
          totalAreaHectares: parseFloat(formData.totalAreaHectares) || 0,
          arableAreaHectares: parseFloat(formData.arableAreaHectares) || 0,
          vegetationAreaHectares: parseFloat(formData.vegetationAreaHectares) || 0,
        }

        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY5N2I5N2E4LWY4NzItNGNmNi04MjllLWQ5MWEwNDllYzRhYSIsImVtYWlsIjoiam9obl9kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjYwMDU5NzMsImV4cCI6MTcyNjAwOTU3M30.1ic5LXkd_PvhfXREkBWzZWAX9sE342QnasCPubGYgvs'

        await axios.post('http://localhost:3001/farmers', dataToSubmit, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        alert('Produtor cadastrado com sucesso!')
      } catch (error) {
        console.error('Erro ao cadastrar o produtor:', error)
        alert('Erro ao cadastrar o produtor.')
      }
    }

    setValidated(true)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro</strong> <small>Produtores Agrícolas</small>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              {/* CPF/CNPJ */}
              <CCol md={6}>
                <CFormLabel htmlFor="cpfOrCnpj">CPF ou CNPJ</CFormLabel>
                <InputMask
                  mask="999.999.999-99"
                  maskChar={null}
                  id="cpfOrCnpj"
                  className="form-control"
                  required
                  placeholder="Digite o CPF ou CNPJ"
                  value={formData.cpfOrCnpj}
                  onChange={handleInputChange}
                />
                <CFormFeedback invalid>CPF ou CNPJ inválido.</CFormFeedback>
              </CCol>

              {/* Nome do Produtor */}
              <CCol md={6}>
                <CFormLabel htmlFor="farmerName">Nome do Produtor</CFormLabel>
                <CFormInput
                  type="text"
                  id="farmerName"
                  value={formData.farmerName}
                  onChange={handleInputChange}
                  required
                  placeholder="Nome do Produtor"
                />
                <CFormFeedback invalid>Nome do produtor é obrigatório.</CFormFeedback>
              </CCol>

              {/* Nome da Fazenda */}
              <CCol md={6}>
                <CFormLabel htmlFor="farmName">Nome da Fazenda</CFormLabel>
                <CFormInput
                  type="text"
                  id="farmName"
                  value={formData.farmName}
                  onChange={handleInputChange}
                  required
                  placeholder="Nome da Fazenda"
                />
                <CFormFeedback invalid>Nome da fazenda é obrigatório.</CFormFeedback>
              </CCol>

              {/* Estado (com busca) */}
              <CCol md={6}>
                <CFormLabel htmlFor="state">Estado</CFormLabel>
                <Select
                  name="state"
                  id="state"
                  options={formatOptions(states)}
                  onChange={handleSelectChange}
                  isLoading={loading}
                  placeholder={loading ? 'Carregando estados...' : 'Selecione um estado'}
                  noOptionsMessage={() => 'Nenhum estado encontrado'}
                />
                <CFormFeedback invalid>Escolha um estado.</CFormFeedback>
              </CCol>

              {/* Cidade (com busca) */}
              <CCol md={6}>
                <CFormLabel htmlFor="city">Cidade</CFormLabel>
                <Select
                  name="city"
                  id="city"
                  options={formatOptions(cities)}
                  onChange={handleSelectChange}
                  isDisabled={cities.length === 0}
                  placeholder="Selecione uma cidade"
                  noOptionsMessage={() => 'Nenhuma cidade encontrada'}
                />
                <CFormFeedback invalid>Escolha uma cidade.</CFormFeedback>
              </CCol>

              {/* Área Total */}
              <CCol md={6}>
                <CFormLabel htmlFor="totalAreaHectares">Área Total (ha)</CFormLabel>
                <CFormInput
                  type="number"
                  id="totalAreaHectares"
                  value={formData.totalAreaHectares}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  placeholder="Área Total em Hectares"
                />
                <CFormFeedback invalid>Informe a área total em hectares.</CFormFeedback>
              </CCol>

              {/* Área Arável */}
              <CCol md={4}>
                <CFormLabel htmlFor="arableAreaHectares">Área Arável (ha)</CFormLabel>
                <CFormInput
                  type="number"
                  id="arableAreaHectares"
                  value={formData.arableAreaHectares}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  placeholder="Área Arável em Hectares"
                />
                <CFormFeedback invalid>Informe a área arável em hectares.</CFormFeedback>
              </CCol>

              {/* Área de Vegetação */}
              <CCol md={4}>
                <CFormLabel htmlFor="vegetationAreaHectares">Área de Vegetação (ha)</CFormLabel>
                <CFormInput
                  type="number"
                  id="vegetationAreaHectares"
                  value={formData.vegetationAreaHectares}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  placeholder="Área de Vegetação em Hectares"
                />
                <CFormFeedback invalid>Informe a área de vegetação em hectares.</CFormFeedback>
              </CCol>

              {/* Select Multi-opção para Culturas Plantadas */}
              <CCol md={4}>
                <CFormLabel htmlFor="plantedCrops">Culturas Plantadas</CFormLabel>
                <Select
                  id="plantedCrops"
                  name="plantedCrops"
                  options={cropOptions} // Opções das culturas
                  isMulti // Permite seleção múltipla
                  onChange={handleCropsChange}
                  placeholder="Selecione as culturas plantadas"
                />
              </CCol>

              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Enviar
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormCadastroFarmer
