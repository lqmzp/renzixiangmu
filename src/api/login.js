import requst from '@/utils/request.js'

export function login(data) {
  return requst({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
