/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const jeecgOrderMainRouter = {
  path: '/JeecgOrderMain',
  component: Layout,
  redirect: '/JeecgOrderMain/JeecgOrderMainIndex',
  name: 'jeecgOrderMain',
  meta: {
    title: '',
    icon: 'table'
  },
  children: [
    {
      path: 'JeecgOrderMainIndex',
      component: () => import('@/views/JeecgOrderMain/JeecgOrderMainIndex'),
      name: 'jeecgOrderMain',
      meta: { title: '' }
    }
  ]
}
export default jeecgOrderMainRouter
