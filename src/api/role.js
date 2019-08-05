import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/dev-api/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/dev-api/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/dev-api/role',
    method: 'post',
    data
  })
}

/**
 * 更新
 * @param id
 * @param data
 */
export function updateRole(id, data) {
  return request({
    url: `/dev-api/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/dev-api/role/${id}`,
    method: 'delete'
  })
}
