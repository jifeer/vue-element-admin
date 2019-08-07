/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const jeecgMonthlyGrowthAnalysisRouter = {
  path: '/JeecgMonthlyGrowthAnalysis',
  component: Layout,
  redirect: '/JeecgMonthlyGrowthAnalysis/JeecgMonthlyGrowthAnalysisIndex',
  name: 'jeecgMonthlyGrowthAnalysis',
  meta: {
    title: '月增长分析表',
    icon: 'table'
  },
  children: [
    {
      path: 'JeecgMonthlyGrowthAnalysisIndex',
      component: () => import('@/views/JeecgMonthlyGrowthAnalysis/JeecgMonthlyGrowthAnalysisIndex'),
      name: 'jeecgMonthlyGrowthAnalysis',
      meta: { title: '月增长分析表' }
    }
  ]
}
export default jeecgMonthlyGrowthAnalysisRouter
