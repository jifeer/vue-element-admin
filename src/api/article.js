import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/basic/sys/dict/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/basic/sys/dict/add',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/basic/sys/dict/edit',
    method: 'post',
    data
  })
}
