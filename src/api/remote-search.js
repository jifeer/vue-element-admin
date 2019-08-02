import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/dev-api/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/dev-api/transaction/list',
    method: 'get',
    params: query
  })
}
