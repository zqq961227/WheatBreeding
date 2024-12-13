<template>
  <div class="data-section">
    <div class="tabs-container">
      <!-- 标签部分 -->
      <!-- <el-button
      type="primary"
      class="btn1"
      :class="{ 'is-active': activeTab === 'experiment' }"
      @click="activeTab = 'experiment'"
    >
      实验数据
    </el-button> -->
      <el-button
        class="btn1"
        :class="{ 'is-active': activeTab === 'measure' }"
        @click="activeTab = 'measure'"
      >
        测量数据
      </el-button>
    </div>

    <!-- 按钮部分 -->
    <div class="button-group">
      <el-button
        style="background: #00c19e; color: #ffffff"
        :loading="exportLoading"
        @click="downloadTableTemplate()"
      >
        <img src="@/assets/tableDataManage/download.svg" style="margin-right: 10px" alt="" />
        下载表头</el-button
      >
      <el-button @click="uploadTable()">
        <img src="@/assets/tableDataManage/upload.svg" style="margin-right: 10px" alt="" />

        上传表格</el-button
      >
      <!-- <el-button @click="saveData()">
        <img src="@/assets/tableDataManage/save.svg" style="margin-right: 10px" alt="" />
        保存</el-button
      > -->
    </div>
  </div>

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
    </Search>
    <Table
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      @batch-delete="handleBatchDelete"
      :pagination="{
        total: tableObject.total
      }"
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
    >
      <template #action="{ row }">
        <el-button
          link
          @click="openForm('update', row.id)"
          v-hasPermi="['system:mail-account:update']"
        >
        <img src="@/assets/tableDataManage/edit.svg" alt="" />
        </el-button>
        
        <el-button
          link
          v-hasPermi="['system:mail-account:delete']"
          @click="handleDelete(row.id)"
        >
        <img src="@/assets/tableDataManage/delete.svg" alt="" />
        </el-button>
        <el-button
          link
          @click="goDetail(row.id)"
          v-hasPermi="['system:mail-account:query']"
        >
        <img src="@/assets/tableDataManage/detail.svg" alt="" />
        </el-button> 
      </template>
      <template #footer>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </template>
      <template #append>
    <!-- <ElButton type="danger">批量删除</ElButton> -->
  </template>
    </Table>
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <!-- <MailAccountForm ref="formRef" @success="getList" /> -->
  <!-- 详情弹窗 -->
  <UserImportForm ref="importFormRef" @success="getList" />

  <MailAccountDetail ref="detailRef" />
</template>
<script lang="ts" setup>
import * as tableDataApi from '@/api/tableDataManage/tableData'
import { allSchemas } from './index.data'
const router = useRouter() // 路由对象
const message = useMessage() // 消息弹窗
import { ref } from 'vue'
import UserImportForm from './UserImportForm.vue'
import * as XLSX from 'xlsx'
import download from '@/utils/download'

// import MailAccountForm from './MailAccountForm.vue'
// import MailAccountDetail from './MailAccountDetail.vue'

defineOptions({ name: 'SystemMailAccount' })

// tableObject：表格的属性对象，可获得分页大小、条数等属性
// tableMethods：表格的操作对象，可进行获得分页、删除记录等操作
// 详细可见：https://doc.iocoder.cn/vue3/crud-schema/
const { tableObject, tableMethods } = useTable({
  getListApi: tableDataApi.getWheatDataList, // 获取小麦数据接口
  delListApi: tableDataApi.deleteSingleWheatData // 删除接口
})
const activeTab = ref('measure')
const exportLoading = ref(false)

// 获得表格的各种操作
const { getList, setSearchParams } = tableMethods

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 详情操作 */
const detailRef = ref()

// 上传表格
const importFormRef = ref()
const uploadTable = () => {
  importFormRef.value.open()
}

// 保存
const saveData = () => {}
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

    // 删除成功后，直接在本地更新表格数据
    // tableObject.tableList.value = tableObject.tableList.value.filter(
    //   (row: any) => !idsToDelete.includes(row.id)
    // );
  })
}
// 跳转到详情页
const goDetail = (id: number) => {
  router.push({ path: `/tableDataManage/detail?id=` + id })
}
// 跳转到编辑页
const edit = (id: number) => {
  router.push({ path: `/tableDataManage/detail?id=` + id })
}
// 下载表头
const downloadTableTemplate = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true

    const data = await tableDataApi.downloadTableTemplate()
    download.excel(data, '表格数据.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  tableObject.tableList.value = getList()
  tableDataApi.getWheatData(352);
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
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid transparent;
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
  color: #00c19e; /* 文字颜色 */
  background: #e6f9f6;
  //styleName: Text;
  font-family: Source Han Sans CN;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  width: 140px;
  height: 44px;
  border: 1px solid transparent;
}
</style>
