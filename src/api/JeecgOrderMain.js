import request from '@/utils/request'
/**
* 查询分页列表
* @param id
* @param data
*/
export function fetchList(query) {
  return request({
    url: '/basic/jeecg-order-main/list',
    method: 'get',
    params: query
  })
}
/**
* 根据ID查询对象
* @param id
* @param data
*/
export function fetchJeecgOrderMain(id) {
  return request({
    url: '/basic/jeecg-order-main/detail/${id}',
    method: 'get'
    // params: { id }
  })
}
/**
* 新增
* @param id
* @param data
*/
export function createJeecgOrderMain(data) {
  return request({
    url: '/basic/jeecg-order-main/add',
    method: 'post',
    data
  })
}
/**
* 更新
* @param id
* @param data
*/
export function updateJeecgOrderMain(data) {
  return request({
    url: '/basic/jeecg-order-main/edit',
    method: 'post',
    data
  })
}
/**
* 根据ID删除单个对象
* @param id
* @param data
*/
export function deleteJeecgOrderMain(id) {
  return request({
    url: '/basic/jeecg-order-main/single/${id}',
    method: 'delete'
  })
}
/**
* 根据IDS批量删除对象
* @param id
* @param data
*/
export function deleteJeecgOrderMains(ids) {
  return request({
    url: '/basic/jeecg-order-main/batch/${ids}',
    method: 'delete'
  })
}
