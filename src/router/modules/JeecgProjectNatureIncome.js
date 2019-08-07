/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const jeecgProjectNatureIncomeRouter = {
  path: '/JeecgProjectNatureIncome',
  component: Layout,
  redirect: '/JeecgProjectNatureIncome/JeecgProjectNatureIncomeIndex',
  name: 'jeecgProjectNatureIncome',
  meta: {
    title: '项目自然收入',
    icon: 'table'
  },
  children: [
    {
      path: 'JeecgProjectNatureIncomeIndex',
      component: () => import('@/views/JeecgProjectNatureIncome/JeecgProjectNatureIncomeIndex'),
      name: 'jeecgProjectNatureIncome',
      meta: { title: '项目自然收入' }
    }
  ]
}
export default jeecgProjectNatureIncomeRouter
