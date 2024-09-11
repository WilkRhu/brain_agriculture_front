/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CButton,
} from '@coreui/react'
import InputMask from 'react-input-mask'
import Select from 'react-select'

const EditProducerForm = ({ producer, states, cities, cropOptions, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    cpfOrCnpj: producer.cpfOrCnpj || '',
    farmerName: producer.farmerName || '',
    farmName: producer.farmName || '',
    state: producer.state || '',
    city: producer.city || '',
    totalAreaHectares: producer.totalAreaHectares || 0,
    arableAreaHectares: producer.arableAreaHectares || 0,
    vegetationAreaHectares: producer.vegetationAreaHectares || 0,
    plantedCrops: producer.plantedCrops || [],
  })

  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData({
      ...formData,
      plantedCrops: producer.plantedCrops.map((crop) => ({ value: crop, label: crop })),
    })
  }, [producer])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData({ ...formData, [actionMeta.name]: selectedOption ? selectedOption.value : '' })
  }

  const handleCropsChange = (selectedOptions) => {
    setFormData({
      ...formData,
      plantedCrops: selectedOptions.map((option) => option.value),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidated(true)
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
    } else {
      onSubmit(formData)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Editar Produtor</strong> <small>Atualize os dados do produtor agrícola</small>
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

              {/* Estado */}
              <CCol md={6}>
                <CFormLabel htmlFor="state">Estado</CFormLabel>
                <Select
                  name="state"
                  id="state"
                  options={states}
                  onChange={handleSelectChange}
                  value={states.find((state) => state.value === formData.state)}
                  placeholder="Selecione um estado"
                />
                <CFormFeedback invalid>Escolha um estado.</CFormFeedback>
              </CCol>

              {/* Cidade */}
              <CCol md={6}>
                <CFormLabel htmlFor="city">Cidade</CFormLabel>
                <Select
                  name="city"
                  id="city"
                  options={cities}
                  onChange={handleSelectChange}
                  value={cities.find((city) => city.value === formData.city)}
                  placeholder="Selecione uma cidade"
                  isDisabled={cities.length === 0}
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

              {/* Culturas Plantadas */}
              <CCol md={4}>
                <CFormLabel htmlFor="plantedCrops">Culturas Plantadas</CFormLabel>
                <Select
                  id="plantedCrops"
                  name="plantedCrops"
                  options={cropOptions}
                  isMulti
                  onChange={handleCropsChange}
                  value={formData.plantedCrops.map((crop) => ({ value: crop, label: crop }))}
                  placeholder="Selecione as culturas plantadas"
                />
              </CCol>

              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Salvar
                </CButton>
                <CButton color="secondary" onClick={onCancel} className="ml-2">
                  Cancelar
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditProducerForm
