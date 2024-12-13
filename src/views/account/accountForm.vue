<template>
  <Dialog v-model="dialogVisible" :height="372" :width="560" :title="dialogTitle">
    <el-form
      ref="formRef"
      v-loading="formLoading"
      :model="formData"
      :rules="formRules"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入密码" type="password" />
      </el-form-item>
      <el-form-item label="角色" prop="roleName">
        <el-select v-model="formData.roleName" clearable placeholder="请选择角色">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.ROLE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分组" prop="deptName">
        <el-select v-model="formData.deptName" clearable placeholder="请选择分组">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.ROLE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输手机号" type="number" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :disabled="formLoading" type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
import { CommonStatusEnum } from '@/utils/constants'
import * as AccountApi from '@/api/account'

defineOptions({ name: 'SystemRoleForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  username: '',
  password: '',
  roleName: '',
  deptName: '',
  mobile: undefined

})
const formRules = reactive({
  username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'change' }],
  roleName: [{ required: true, message: '角色不能为空', trigger: 'change' }],
  deptName: [{ required: true, message: '分组不能为空', trigger: 'change' }],
  // mobile: [{ required: false, message: '备注不能为空', trigger: 'blur' }]
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
      formData.value = await AccountApi.getUser(id)
    } finally {
      formLoading.value = false
    }
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    username: '',
    password: '',
    roleName: '',
    deptName: '',
    mobile: undefined
  }
  formRef.value?.resetFields()
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as AccountApi.UserVO
    if (formType.value === 'create') {
      await AccountApi.createUser(data)
      message.success(t('common.createSuccess'))
    } else {
      await AccountApi.updateUser(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}
</script>
<style lang="scss" scoped>
:deep(.el-input__wrapper){
  border-radius: 10px;
  width: 462px;
  height: 32px;
}
</style>
