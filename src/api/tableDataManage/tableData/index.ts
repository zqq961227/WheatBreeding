import request from '@/config/axios'

// 根据id获取小麦表型数据
export const getWheatData = async (wheatVarietyNameCn:string) => {
  return await request.get({ url: '/wheat/wheat/page?wheatVarietyNameCn='+ wheatVarietyNameCn })
}
// 获取小麦表型数据
export const getWheatDataList = async (params) => {
  return await request.get({ url: '/wheat/wheat/page', params })
}

// 删除单条小麦表型数据
export const deleteSingleWheatData = async (id: number) => {
  return await request.delete({ url: `/wheat/wheat/delete?id=` + id })
}
// 批量删除小麦表型数据
export const deleteBatchWheatData = async (ids: string[]) => {
  // const query = ids.map(id => `id=${id}`).join('&');
  
  return await request.delete({ url: `/wheat/wheat/delBatch`,data: ids })
}

// 下载表头
export const downloadTableTemplate = async (params) => {
  return await request.download({ url: `/wheat/wheat/export-excel`, params})
}

