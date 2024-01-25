import React from 'react'
import ComparingList from './views/compare/ComparingList'
import GantHome from './views/viatize/GantHome'

const ProductList = React.lazy(() => import('./views/compare/ProductList'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/productList', name: 'ProductList', element: ProductList },
  { path: '/Aviatize', name: 'Aviatize', element: GantHome },
  { path: '/ComparingList', name: 'ComparingList', element: ComparingList },

]

export default routes
