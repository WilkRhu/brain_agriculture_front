import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFarmer, updateFarmer } from '../../../actions/farmerActions'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPen } from '@coreui/icons'
import {
  CForm,
  CFormInput,
  CButton,
  CCol,
  CFormLabel,
  CFormFeedback,
  CRow,
  CCard,
  CCardBody,
} from '@coreui/react'
import Select from 'react-select'

const cropOptions = [
  { value: 'soja', label: 'Soja' },
  { value: 'milho', label: 'Milho' },
  { value: 'algodao', label: 'Algodão' },
]

const DataTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.farmers.data)
  const [expandedRow, setExpandedRow] = useState(null)
  const [editFormData, setEditFormData] = useState(null)

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este registro?')) {
      try {
        await dispatch(deleteFarmer(id))
      } catch (error) {
        console.error('Erro ao deletar:', error)
      }
    }
  }

  const handleEditClick = (producer) => {
    setExpandedRow(producer.id)
    setEditFormData({ ...producer })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCropsChange = (selectedOptions) => {
    const crops = selectedOptions ? selectedOptions.map((option) => option.value) : []
    setEditFormData((prevState) => ({
      ...prevState,
      plantedCrops: crops,
    }))
  }

  const handleSave = async () => {
    const dataToSubmit = {
      ...editFormData,
      totalAreaHectares: parseFloat(editFormData.totalAreaHectares) || 0,
      arableAreaHectares: parseFloat(editFormData.arableAreaHectares) || 0,
      vegetationAreaHectares: parseFloat(editFormData.vegetationAreaHectares) || 0,
    }

    try {
      await dispatch(updateFarmer(dataToSubmit))
      setExpandedRow(null)
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  const handleCancel = () => {
    setExpandedRow(null)
  }

  return (
    <div className="container mt-4">
      <h2>Lista de Produtores</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>CPF/CNPJ</th>
            <th>Nome do Produtor</th>
            <th>Nome da Fazenda</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((producer) => (
            <tr key={producer.id}>
              <td>{producer.id}</td>
              <td>{producer.cpfOrCnpj}</td>
              <td>{producer.farmerName}</td>
              <td>{producer.farmName}</td>
              <td>{producer.city}</td>
              <td>{producer.state}</td>
              <td>
                <button className="btn btn-info" onClick={() => handleEditClick(producer)}>
                  <CIcon icon={cilPen} /> Editar
                </button>
                {'  '}
                <button className="btn btn-danger" onClick={() => handleDelete(producer.id)}>
                  <CIcon icon={cilDelete} /> Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulário de Edição */}
      {expandedRow && editFormData && (
        <div className="mt-4">
          <h3>Editar Produtor</h3>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardBody>
                  <CForm>
                    {/* Linha 1 - Nome do Produtor e CPF/CNPJ */}
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="plantedCrops">Nome do Produtor</CFormLabel>
                        <CFormInput
                          type="text"
                          name="farmerName"
                          value={editFormData.farmerName || ''}
                          onChange={handleInputChange}
                          placeholder="Nome do Produtor"
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="plantedCrops">Cpf ou Cnpj</CFormLabel>
                        <CFormInput
                          type="text"
                          name="cpfOrCnpj"
                          value={editFormData.cpfOrCnpj || ''}
                          onChange={handleInputChange}
                          placeholder="CPF ou CNPJ"
                          required
                        />
                      </CCol>
                    </CRow>

                    {/* Linha 2 - Nome da Fazenda e Cidade */}
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="plantedCrops">Nome da Fazenda</CFormLabel>
                        <CFormInput
                          type="text"
                          name="farmName"
                          value={editFormData.farmName || ''}
                          onChange={handleInputChange}
                          placeholder="Nome da Fazenda"
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="plantedCrops">Cidade</CFormLabel>
                        <CFormInput
                          type="text"
                          name="city"
                          value={editFormData.city || ''}
                          onChange={handleInputChange}
                          placeholder="Cidade"
                          required
                        />
                      </CCol>
                    </CRow>

                    {/* Linha 3 - Estado e Área Total */}
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="plantedCrops">Estado</CFormLabel>
                        <CFormInput
                          type="text"
                          name="state"
                          value={editFormData.state || ''}
                          onChange={handleInputChange}
                          placeholder="Estado"
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="totalAreaHectares">Área Total (ha)</CFormLabel>
                        <CFormInput
                          type="number"
                          id="totalAreaHectares"
                          name="totalAreaHectares"
                          value={editFormData.totalAreaHectares || ''}
                          onChange={handleInputChange}
                          step="0.01"
                          required
                          placeholder="Área Total em Hectares"
                        />
                        <CFormFeedback invalid>Informe a área total em hectares.</CFormFeedback>
                      </CCol>
                    </CRow>

                    {/* Linha 4 - Área Arável e Área de Vegetação */}
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="arableAreaHectares">Área Arável (ha)</CFormLabel>
                        <CFormInput
                          type="number"
                          id="arableAreaHectares"
                          name="arableAreaHectares"
                          value={editFormData.arableAreaHectares || ''}
                          onChange={handleInputChange}
                          step="0.01"
                          required
                          placeholder="Área Arável em Hectares"
                        />
                        <CFormFeedback invalid>Informe a área arável em hectares.</CFormFeedback>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="vegetationAreaHectares">
                          Área de Vegetação (ha)
                        </CFormLabel>
                        <CFormInput
                          type="number"
                          id="vegetationAreaHectares"
                          name="vegetationAreaHectares"
                          value={editFormData.vegetationAreaHectares || ''}
                          onChange={handleInputChange}
                          step="0.01"
                          required
                          placeholder="Área de Vegetação em Hectares"
                        />
                        <CFormFeedback invalid>
                          Informe a área de vegetação em hectares.
                        </CFormFeedback>
                      </CCol>
                    </CRow>

                    {/* Linha 5 - Culturas Plantadas */}
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="plantedCrops">Culturas Plantadas</CFormLabel>
                        <Select
                          id="plantedCrops"
                          name="plantedCrops"
                          options={cropOptions}
                          isMulti
                          value={cropOptions.filter((option) =>
                            editFormData.plantedCrops?.includes(option.value),
                          )}
                          onChange={handleCropsChange}
                          placeholder="Selecione as culturas plantadas"
                        />
                      </CCol>
                    </CRow>

                    <CButton color="primary" onClick={handleSave}>
                      Salvar
                    </CButton>
                    <CButton color="secondary" onClick={handleCancel} className="ms-2">
                      Cancelar
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      )}
    </div>
  )
}

export default DataTable
