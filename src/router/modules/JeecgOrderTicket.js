/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const jeecgOrderTicketRouter = {
  path: '/JeecgOrderTicket',
  component: Layout,
  redirect: '/JeecgOrderTicket/JeecgOrderTicketIndex',
  name: 'jeecgOrderTicket',
  meta: {
    title: '航班信息表',
    icon: 'table'
  },
  children: [
    {
      path: 'JeecgOrderTicketIndex',
      component: () => import('@/views/JeecgOrderTicket/JeecgOrderTicketIndex'),
      name: 'jeecgOrderTicket',
      meta: { title: '航班信息表' }
    }
  ]
}
export default jeecgOrderTicketRouter
