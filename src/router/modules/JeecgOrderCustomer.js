/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const jeecgOrderCustomerRouter = {
  path: '/JeecgOrderCustomer',
  component: Layout,
  redirect: '/JeecgOrderCustomer/JeecgOrderCustomerIndex',
  name: 'jeecgOrderCustomer',
  meta: {
    title: '',
    icon: 'table'
  },
  children: [
    {
      path: 'JeecgOrderCustomerIndex',
      component: () => import('@/views/JeecgOrderCustomer/JeecgOrderCustomerIndex'),
      name: 'jeecgOrderCustomer',
      meta: { title: '' }
    }
  ]
}
export default jeecgOrderCustomerRouter
