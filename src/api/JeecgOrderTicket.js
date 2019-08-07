import request from '@/utils/request'
/**
* 查询分页列表
* @param id
* @param data
*/
export function fetchList(query) {
  return request({
    url: '/basic/jeecg-order-ticket/list',
    method: 'get',
    params: query
  })
}
/**
* 根据ID查询对象
* @param id
* @param data
*/
export function fetchJeecgOrderTicket(id) {
  return request({
    url: '/basic/jeecg-order-ticket/detail/${id}',
    method: 'get'
    // params: { id }
  })
}
/**
* 新增
* @param id
* @param data
*/
export function createJeecgOrderTicket(data) {
  return request({
    url: '/basic/jeecg-order-ticket/add',
    method: 'post',
    data
  })
}
/**
* 更新
* @param id
* @param data
*/
export function updateJeecgOrderTicket(data) {
  return request({
    url: '/basic/jeecg-order-ticket/edit',
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
export function deleteJeecgOrderTicket(id) {
  return request({
    url: '/basic/jeecg-order-ticket/single/${id}',
    method: 'delete'
  })
}
/**
* 根据IDS批量删除对象
* @param id
* @param data
*/
export function deleteJeecgOrderTickets(ids) {
  return request({
    url: '/basic/jeecg-order-ticket/batch/${ids}',
    method: 'delete'
  })
}
