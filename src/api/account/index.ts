import request from '@/config/axios'

// 获取用户列表
export const getUserList = async (params: PageParam) => {
  return await request.get({ url: '/system/user/page',params })
}
export type UserVO = {
  id: number
  username: string
  password: string
  userrole: string
  deptName: string
  mobile: number
}

// 创建用户
export const createUser = async (data: UserVO) => {
  return await request.post({
    url: '/system/user/create',
    data: data
  })
}

// 删除用户
export const deleteUser = async (id: number) => {
  return await request.delete({ url: `/system/user/delete?id=` + id })
}
// 修改用户
export const updateUser = async (data: UserVO) => {
  return await request.put({ url: `/system/user/update`, data })
}

// 下载表头
export const downloadTableTemplate = async () => {
  return await request.get({ url: `/wheat/wheat/export-excel`, responseType: 'arraybuffer',})
}
// 获得用户详情
export const getUser = async (id: number) => {
  return await request.get({ url: '/system/user/get?id=' + id })
}