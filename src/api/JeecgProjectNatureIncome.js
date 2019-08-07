import request from '@/utils/request'
/**
* 查询分页列表
* @param id
* @param data
*/
export function fetchList(query) {
  return request({
    url: '/basic/jeecg-project-nature-income/list',
    method: 'get',
    params: query
  })
}
/**
* 根据ID查询对象
* @param id
* @param data
*/
export function fetchJeecgProjectNatureIncome(id) {
  return request({
    url: '/basic/jeecg-project-nature-income/detail/${id}',
    method: 'get'
    // params: { id }
  })
}
/**
* 新增
* @param id
* @param data
*/
export function createJeecgProjectNatureIncome(data) {
  return request({
    url: '/basic/jeecg-project-nature-income/add',
    method: 'post',
    data
  })
}
/**
* 更新
* @param id
* @param data
*/
export function updateJeecgProjectNatureIncome(data) {
  return request({
    url: '/basic/jeecg-project-nature-income/edit',
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
export function deleteJeecgProjectNatureIncome(id) {
  return request({
    url: '/basic/jeecg-project-nature-income/single/${id}',
    method: 'delete'
  })
}
/**
* 根据IDS批量删除对象
* @param id
* @param data
*/
export function deleteJeecgProjectNatureIncomes(ids) {
  return request({
    url: '/basic/jeecg-project-nature-income/batch/${ids}',
    method: 'delete'
  })
}
