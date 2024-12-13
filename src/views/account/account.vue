<template>
  <!-- 列表 -->
  <ContentWrap class="table-container">
    <!-- 搜索工作栏 -->
    <Search
      :schema="allSchemas.searchSchema"
      :showReset="false"
      @search="setSearchParams"
      @reset="setSearchParams"
    >

      <!-- 新增等操作按钮 -->
      <template #actionMore>
        <el-button
        class="createBtn"
          plain
          @click="openForm('create')"
          v-hasPermi="['system:mail-account:create']"
        >
        <img style="margin-right: 10px;" src="@/assets/account/add.svg" alt="" /> 创建
        </el-button>
      </template>
    </Search>
    <Table
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :headerAlign="left"
      :pagination="{
        total: tableObject.total
      }"
      :showBatchDelete="false"
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
    >
      <template #action="{ row }">
        <el-button
          link
          type="primary"
          @click="openForm('update', row.id)"
          v-hasPermi="['system:mail-account:update']"
        >
        <img src="@/assets/account/edit.svg" alt="" />

        </el-button>
        <el-button
          link
          type="danger"
          v-hasPermi="['system:mail-account:delete']"
          @click="handleDelete(row.id)"
        >
        <img src="@/assets/account/delete.svg" alt="" />
        </el-button>
      </template>
    </Table>
  </ContentWrap>
  <AccountForm ref="formRef" @success="getList" />

  <!-- 表单弹窗：添加/修改 -->
  <!-- 详情弹窗 -->
</template>
<script lang="ts" setup>
import * as accountApi from '@/api/account/index'
import { allSchemas } from './index.account'
const router = useRouter() // 路由对象
import { ref } from 'vue'
import AccountForm from './accountForm.vue'

defineOptions({ name: 'Account' })

// tableObject：表格的属性对象，可获得分页大小、条数等属性
// tableMethods：表格的操作对象，可进行获得分页、删除记录等操作
// 详细可见：https://doc.iocoder.cn/vue3/crud-schema/
const { tableObject, tableMethods } = useTable({
  getListApi: accountApi.getUserList, // 获取小麦数据接口
  delListApi: accountApi.deleteUser // 删除接口
})
const activeTab = ref('experiment')
// 获得表格的各种操作
const { getList, setSearchParams } = tableMethods

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  console.log(type,id);
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = (id: number) => {
  tableMethods.delList(id, false)
}
const handleBatchDelete = (selectedRows: any[]) => {
  const rawRows = toRaw(selectedRows)
  const idsToDelete = rawRows.map((row: any) => row.id)
  console.log('删除的数据:', idsToDelete)
  tableDataApi.deleteBatchWheatData(idsToDelete).then(() => {
    tableObject.tableList.value = getList()

  })
}
/** 初始化 **/
onMounted(() => {
  tableObject.tableList.value = getList()
})
</script>
<style lang="scss" scoped>
.data-section {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 标签和按钮两端对齐 */
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  height: 11vh;
}
.tabs-container {
  width: 450px; /* 设置父容器的宽度 */
  background: #f5f7fa;
  border-radius: 16px;
  display: flex;
  justify-content: center;
}
.btn1 {
  position: relative;
  height: 70px;
  width: 200px;
  font-family: Source Han Sans CN;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  background: transparent;
  color: #1c1f37;
  border: 1px solid transparent;
}
.table-container {
  border-radius: 20px;
}
.btn1:hover {
  color: #00c19e;
}

::v-deep(.btn1.is-active) {
  color: #00c19e;
}

::v-deep(.btn1.is-active)::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 6px;
  background-color: #00c19e;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.tabs {
  flex-grow: 1; /* 标签部分占据剩余空间 */
}

.button-group {
  display: flex;
  gap: 10px; /* 按钮之间的间距 */
}
.button-group .el-button {
  border-radius: 12px; /* 圆角 */
  font-weight: bold; /* 加粗文字 */
  padding: 20px; /* 内边距 */
  color: white; /* 文字颜色 */
  background: #00c19e;
  //styleName: Text;
  font-family: Source Han Sans CN;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  width: 140px;
  height: 44px;
  border: 1px solid transparent;
}
.createBtn {
  width: 100px;
height: 44px;
background: #00C19E;
border-radius: 10px 10px 10px 10px;
font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
font-weight: 400;
font-size: 16px;
color: #FFFFFF;
line-height: 44px;
text-align: left;
font-style: normal;
text-transform: none;
border: transparent;
margin-top: 20px;
}
</style>
