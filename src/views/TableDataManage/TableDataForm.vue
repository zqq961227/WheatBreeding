<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="小麦品种编码" prop="wheatVarietyCode">
        <el-input v-model="formData.wheatVarietyCode" placeholder="请输入小麦品种编码" />
      </el-form-item>
      <el-form-item label="小麦品种中文名称" prop="wheatVarietyNameCn">
        <el-input v-model="formData.wheatVarietyNameCn" placeholder="请输入小麦品种中文名称" />
      </el-form-item>
      <el-form-item label="小麦品种英文名称" prop="wheatVarietyNameEn">
        <el-input v-model="formData.wheatVarietyNameEn" placeholder="请输入小麦品种英文名称" />
      </el-form-item>
      <el-form-item label="测定任务编号" prop="determinationTaskId">
        <el-input v-model="formData.determinationTaskId" placeholder="请输入测定任务编号" />
      </el-form-item>
      <el-form-item label="测定任务名称" prop="determinationTaskName">
        <el-input v-model="formData.determinationTaskName" placeholder="请输入测定任务名称" />
      </el-form-item>
      <el-form-item label="表型数据测定批次编号" prop="phenotypicDeterminationBatchId">
        <el-input v-model="formData.phenotypicDeterminationBatchId" placeholder="请输入表型数据测定批次编号" />
      </el-form-item>
      <el-form-item label="表型数据测定时间" prop="determinationTime">
        <el-date-picker
          v-model="formData.determinationTime"
          type="date"
          value-format="x"
          placeholder="选择表型数据测定时间"
        />
      </el-form-item>
      <el-form-item label="小麦生长时期" prop="growthPeriod">
        <el-input v-model="formData.growthPeriod" placeholder="请输入小麦生长时期" />
      </el-form-item>
      <el-form-item label="总株高" prop="plantHeightTotal">
        <el-input v-model="formData.plantHeightTotal" placeholder="请输入总株高" />
      </el-form-item>
      <el-form-item label="第一节株高" prop="plantHeightFirstSection">
        <el-input v-model="formData.plantHeightFirstSection" placeholder="请输入第一节株高" />
      </el-form-item>
      <el-form-item label="第二节株高" prop="plantHeightSecondSection">
        <el-input v-model="formData.plantHeightSecondSection" placeholder="请输入第二节株高" />
      </el-form-item>
      <el-form-item label="第三节株高" prop="plantHeightThirdSection">
        <el-input v-model="formData.plantHeightThirdSection" placeholder="请输入第三节株高" />
      </el-form-item>
      <el-form-item label="第四节株高" prop="plantHeightFourthSection">
        <el-input v-model="formData.plantHeightFourthSection" placeholder="请输入第四节株高" />
      </el-form-item>
      <el-form-item label="第五节株高" prop="plantHeightFifthSection">
        <el-input v-model="formData.plantHeightFifthSection" placeholder="请输入第五节株高" />
      </el-form-item>
      <el-form-item label="第六节株高" prop="planHeightSixthSection">
        <el-input v-model="formData.planHeightSixthSection" placeholder="请输入第六节株高" />
      </el-form-item>
      <el-form-item label="分蘖数" prop="tillsNumber">
        <el-input v-model="formData.tillsNumber" placeholder="请输入分蘖数" />
      </el-form-item>
      <el-form-item label="叶片数" prop="leavesNumber">
        <el-input v-model="formData.leavesNumber" placeholder="请输入叶片数" />
      </el-form-item>
      <el-form-item label="叶长" prop="leavesHeight">
        <el-input v-model="formData.leavesHeight" placeholder="请输入叶长" />
      </el-form-item>
      <el-form-item label="叶宽" prop="leavesWidth">
        <el-input v-model="formData.leavesWidth" placeholder="请输入叶宽" />
      </el-form-item>
      <el-form-item label="叶夹角" prop="leavesAngel">
        <el-input v-model="formData.leavesAngel" placeholder="请输入叶夹角" />
      </el-form-item>
      <el-form-item label="茎粗" prop="stemThickness">
        <el-input v-model="formData.stemThickness" placeholder="请输入茎粗" />
      </el-form-item>
      <el-form-item label="总穗数" prop="spikesNumber">
        <el-input v-model="formData.spikesNumber" placeholder="请输入总穗数" />
      </el-form-item>
      <el-form-item label="穗长" prop="spikesHeight">
        <el-input v-model="formData.spikesHeight" placeholder="请输入穗长" />
      </el-form-item>
      <el-form-item label="穗宽" prop="spikesWidth">
        <el-input v-model="formData.spikesWidth" placeholder="请输入穗宽" />
      </el-form-item>
      <el-form-item label="穗粒数" prop="spikesPerWheat">
        <el-input v-model="formData.spikesPerWheat" placeholder="请输入穗粒数" />
      </el-form-item>
      <el-form-item label="穗重" prop="spikesWeight">
        <el-input v-model="formData.spikesWeight" placeholder="请输入穗重" />
      </el-form-item>
      <el-form-item label="数据上传账号" prop="userId">
        <el-input v-model="formData.userId" placeholder="请输入数据上传账号" />
      </el-form-item>
      <el-form-item label="数据上传时间" prop="uploadTime">
        <el-date-picker
          v-model="formData.uploadTime"
          type="date"
          value-format="x"
          placeholder="选择数据上传时间"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="重心高" prop="barycenterHeight">
        <el-input v-model="formData.barycenterHeight" placeholder="请输入重心高" />
      </el-form-item>
      <el-form-item label="抗折力" prop="dendingResistance">
        <el-input v-model="formData.dendingResistance" placeholder="请输入抗折力" />
      </el-form-item>
      <el-form-item label="倒伏指数" prop="lodgingIndex">
        <el-input v-model="formData.lodgingIndex" placeholder="请输入倒伏指数" />
      </el-form-item>
      <el-form-item label="干物质重量" prop="dryMatterWeight">
        <el-input v-model="formData.dryMatterWeight" placeholder="请输入干物质重量" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as tableDataApi from '@/api/tableDataManage/tableData'
/** 小麦表型数据 表单 */
defineOptions({ name: 'WheatForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  wheatVarietyCode: undefined,
  wheatVarietyNameCn: undefined,
  wheatVarietyNameEn: undefined,
  determinationTaskId: undefined,
  determinationTaskName: undefined,
  phenotypicDeterminationBatchId: undefined,
  determinationTime: undefined,
  growthPeriod: undefined,
  plantHeightTotal: undefined,
  plantHeightFirstSection: undefined,
  plantHeightSecondSection: undefined,
  plantHeightThirdSection: undefined,
  plantHeightFourthSection: undefined,
  plantHeightFifthSection: undefined,
  planHeightSixthSection: undefined,
  tillsNumber: undefined,
  leavesNumber: undefined,
  leavesHeight: undefined,
  leavesWidth: undefined,
  leavesAngel: undefined,
  stemThickness: undefined,
  spikesNumber: undefined,
  spikesHeight: undefined,
  spikesWidth: undefined,
  spikesPerWheat: undefined,
  spikesWeight: undefined,
  userId: undefined,
  uploadTime: undefined,
  status: undefined,
  barycenterHeight: undefined,
  dendingResistance: undefined,
  lodgingIndex: undefined,
  dryMatterWeight: undefined
})
const formRules = reactive({
  wheatVarietyCode: [{ required: true, message: '小麦品种编码不能为空', trigger: 'blur' }],
  wheatVarietyNameCn: [{ required: true, message: '小麦品种中文名称不能为空', trigger: 'blur' }],
  wheatVarietyNameEn: [{ required: true, message: '小麦品种英文名称不能为空', trigger: 'blur' }],
  determinationTime: [{ required: true, message: '表型数据测定时间不能为空', trigger: 'blur' }],
  growthPeriod: [{ required: true, message: '小麦生长时期不能为空', trigger: 'blur' }],
  uploadTime: [{ required: true, message: '数据上传时间不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await tableDataApi.getWheatData(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as WheatVO
    if (formType.value === 'create') {
      await tableDataApi.createWheat(data)
      message.success(t('common.createSuccess'))
    } else {
      await tableDataApi.updateWheat(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    wheatVarietyCode: undefined,
    wheatVarietyNameCn: undefined,
    wheatVarietyNameEn: undefined,
    determinationTaskId: undefined,
    determinationTaskName: undefined,
    phenotypicDeterminationBatchId: undefined,
    determinationTime: undefined,
    growthPeriod: undefined,
    plantHeightTotal: undefined,
    plantHeightFirstSection: undefined,
    plantHeightSecondSection: undefined,
    plantHeightThirdSection: undefined,
    plantHeightFourthSection: undefined,
    plantHeightFifthSection: undefined,
    planHeightSixthSection: undefined,
    tillsNumber: undefined,
    leavesNumber: undefined,
    leavesHeight: undefined,
    leavesWidth: undefined,
    leavesAngel: undefined,
    stemThickness: undefined,
    spikesNumber: undefined,
    spikesHeight: undefined,
    spikesWidth: undefined,
    spikesPerWheat: undefined,
    spikesWeight: undefined,
    userId: undefined,
    uploadTime: undefined,
    status: undefined,
    barycenterHeight: undefined,
    dendingResistance: undefined,
    lodgingIndex: undefined,
    dryMatterWeight: undefined
  }
  formRef.value?.resetFields()
}
</script>