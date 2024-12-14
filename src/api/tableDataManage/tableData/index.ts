import request from '@/config/axios'

// 小麦表型数据 VO
export interface WheatVO {
  id: number // 小麦品种id
  wheatVarietyCode: string // 小麦品种编码
  wheatVarietyNameCn: string // 小麦品种中文名称
  wheatVarietyNameEn: string // 小麦品种英文名称
  determinationTaskId: string // 测定任务编号
  determinationTaskName: string // 测定任务名称
  phenotypicDeterminationBatchId: string // 表型数据测定批次编号
  determinationTime: Date // 表型数据测定时间
  growthPeriod: number // 小麦生长时期
  plantHeightTotal: number // 总株高
  plantHeightFirstSection: number // 第一节株高
  plantHeightSecondSection: number // 第二节株高
  plantHeightThirdSection: number // 第三节株高
  plantHeightFourthSection: number // 第四节株高
  plantHeightFifthSection: number // 第五节株高
  planHeightSixthSection: number // 第六节株高
  tillsNumber: number // 分蘖数
  leavesNumber: number // 叶片数
  leavesHeight: number // 叶长
  leavesWidth: number // 叶宽
  leavesAngel: number // 叶夹角
  stemThickness: number // 茎粗
  spikesNumber: number // 总穗数
  spikesHeight: number // 穗长
  spikesWidth: number // 穗宽
  spikesPerWheat: number // 穗粒数
  spikesWeight: number // 穗重
  userId: number // 数据上传账号
  uploadTime: Date // 数据上传时间
  status: number // 状态
  barycenterHeight: number // 重心高
  dendingResistance: number // 抗折力
  lodgingIndex: string // 倒伏指数
  dryMatterWeight: number // 干物质重量
}
// 根据id获取小麦表型数据
export const getWheatData = async (id:number) => {
  return await request.get({ url: '/wheat/wheat/get?id='+ id })
}
// 获取小麦表型数据
export const getWheatDataList = async (params) => {
  return await request.get({ url: '/wheat/wheat/page', params })
}
  // 修改小麦表型数据
  export const  updateWheat = async (data: WheatVO) => {
    return await request.put({ url: `/wheat/wheat/update`, data })
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

