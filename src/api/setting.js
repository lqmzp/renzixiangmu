import request from '@/utils/request.js'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // page 页码  pagesize 每页条数
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
