import request from '@/utils/request'
/**
* 查询分页列表
* @param id
* @param data
*/
export function fetchList(query) {
  return request({
    url: '/basic/jeecg-order-customer/list',
    method: 'get',
    params: query
  })
}
/**
* 根据ID查询对象
* @param id
* @param data
*/
export function fetchJeecgOrderCustomer(id) {
  return request({
    url: '/basic/jeecg-order-customer/detail/${id}',
    method: 'get'
    // params: { id }
  })
}
/**
* 新增
* @param id
* @param data
*/
export function createJeecgOrderCustomer(data) {
  return request({
    url: '/basic/jeecg-order-customer/add',
    method: 'post',
    data
  })
}
/**
* 更新
* @param id
* @param data
*/
export function updateJeecgOrderCustomer(data) {
  return request({
    url: '/basic/jeecg-order-customer/edit',
    method: 'post',
    data
  })
}
/**
* 根据ID删除单个对象
* @param id
* @param data
*/
export function deleteJeecgOrderCustomer(id) {
  return request({
    url: '/basic/jeecg-order-customer/single/${id}',
    method: 'delete'
  })
}
/**
* 根据IDS批量删除对象
* @param id
* @param data
*/
export function deleteJeecgOrderCustomers(ids) {
  return request({
    url: '/basic/jeecg-order-customer/batch/${ids}',
    method: 'delete'
  })
}
