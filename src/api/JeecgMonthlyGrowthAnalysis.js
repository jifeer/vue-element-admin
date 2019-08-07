import request from '@/utils/request'
/**
* 查询分页列表
* @param id
* @param data
*/
export function fetchList(query) {
  return request({
    url: '/basic/jeecg-monthly-growth-analysis/list',
    method: 'get',
    params: query
  })
}
/**
* 根据ID查询对象
* @param id
* @param data
*/
export function fetchJeecgMonthlyGrowthAnalysis(id) {
  return request({
    url: '/basic/jeecg-monthly-growth-analysis/detail/${id}',
    method: 'get'
    // params: { id }
  })
}
/**
* 新增
* @param id
* @param data
*/
export function createJeecgMonthlyGrowthAnalysis(data) {
  return request({
    url: '/basic/jeecg-monthly-growth-analysis/add',
    method: 'post',
    data
  })
}
/**
* 更新
* @param id
* @param data
*/
export function updateJeecgMonthlyGrowthAnalysis(data) {
  return request({
    url: '/basic/jeecg-monthly-growth-analysis/edit',
    method: 'put',
    enctype: 'application/x-www-form-urlencoded',
    data
  })
}
/**
* 根据ID删除单个对象
* @param id
* @param data
*/
export function deleteJeecgMonthlyGrowthAnalysis(id) {
  return request({
    url: '/basic/jeecg-monthly-growth-analysis/single/${id}',
    method: 'delete'
  })
}
/**
* 根据IDS批量删除对象
* @param id
* @param data
*/
export function deleteJeecgMonthlyGrowthAnalysiss(ids) {
  return request({
    url: '/basic/jeecg-monthly-growth-analysis/batch/${ids}',
    method: 'delete'
  })
}
