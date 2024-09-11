import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const FormCadastroFarmer = React.lazy(
  () => import('./views/forms/formcadastrofarmer/FormCadastroFarmer'),
)

const FarmersTable = React.lazy(() => import('./views/forms/famerstable/FarmersTable'))
const EditProducerForm = React.lazy(() => import('./views/forms/editform/EditProducerForm'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/forms/formcadastrofarmer', name: 'FormCadastroFarmer', element: FormCadastroFarmer },
  { path: '/forms/famerstable', name: 'FarmersTable', element: FarmersTable },
  { path: '/forms/editform/:id', name: 'EditProducerForm', element: EditProducerForm },
]

export default routes
