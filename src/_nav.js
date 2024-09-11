import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Agricultores',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cadastro de Agricultores',
        to: '/forms/formcadastrofarmer',
      },
      {
        component: CNavItem,
        name: 'Listagem de Agricultores',
        to: '/forms/famerstable',
      },
    ],
  },
]

export default _nav
