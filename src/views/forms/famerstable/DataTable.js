/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

const DataTable = ({ data }) => {
  useEffect(() => {
    $('#dataTable').DataTable({
      data: data,
      columns: [
        { title: 'ID', data: 'id' },
        { title: 'CPF/CNPJ', data: 'cpfOrCnpj' },
        { title: 'Nome do Produtor', data: 'farmerName' },
        { title: 'Nome da Fazenda', data: 'farmName' },
        { title: 'Cidade', data: 'city' },
        { title: 'Estado', data: 'state' },
        {
          title: 'Ações',
          data: null,
          render: (data, type, row) => `
            <button class="btn btn-danger" onclick="handleDelete('${row.id}')">
              <i class="fa fa-trash"></i>
            </button>
          `,
        },
      ],
    })

    window.handleDelete = (id) => {
      console.log('Deletar', id)
    }

    return () => {
      $('#dataTable').DataTable().destroy(true)
    }
  }, [data])

  return (
    <div className="container mt-4">
      <h2>Lista de Produtores</h2>
      <table id="dataTable" className="display" style={{ width: '100%' }}></table>
    </div>
  )
}

export default DataTable
