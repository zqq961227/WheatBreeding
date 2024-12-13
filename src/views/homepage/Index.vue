<template>
  <!-- <doc-alert title="商城手册（功能开启）" url="https://doc.iocoder.cn/mall/build/" /> -->

  <div class="flex flex-col">
    <el-row :gutter="16" class="mb-4">
      <el-col :md="16" :sm="24">
        <!-- 近期实验 -->
        <el-card shadow="never">
          <template #header>
            <div class="h-3 flex justify-between">
              <div class="flex items-center">
                <img src="@/assets/svgs/home1.svg" alt="" />
                <span class="text-16px">{{ t('&nbsp;&nbsp;近期实验') }}</span>
              </div>
              <el-link type="primary" :underline="false" href="" target="_blank">
                {{ t('action.more') }}
              </el-link>
            </div>
          </template>
          <el-table :data="experimentData" style="width: 100%" :cell-style="setCellStyle" class="gradient-table">
            <el-table-column prop="name" label="实验名称" width="320" />
            <el-table-column prop="record" label="实验记录" width="380" />
            <el-table-column label="实验状态" width="270">
              <template #default="scope">
                <span v-html="formatStatus(scope.row)"></span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="实验日期" width="270" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :md="8" :sm="24">
        <!-- 操作记录 -->
        <el-card shadow="never" class="">
          <template #header>
            <div class="h-3 flex justify-between">
              <div class="flex items-center">
                <img src="@/assets/svgs/home2.svg" alt="" />
                <span class="text-16px">{{ t('&nbsp;&nbsp;操作记录') }}</span>
              </div>
              <el-link type="primary" :underline="false" href="" target="_blank">
                {{ t('action.more') }}
              </el-link>
            </div>
          </template>
          <el-skeleton :loading="loading" animated>
            <div v-for="(item, index) in notice" :key="`dynamics-${index}`">
              <div class="flex items-center">
                <el-avatar :src="avatar" :size="35" class="mr-16px">
                  <img src="@/assets/imgs/avatar.gif" alt="" />
                </el-avatar>
                <div>
                  <div class="text-14px">
                    <!-- <Highlight :keys="item.keys.map((v) => t(v))">
                      {{ item.type }} : {{ item.title }}
                    </Highlight> -->
                    <Highlight :keys="item.keys.map((v) => t(v))">
                       {{ item.title }}
                    </Highlight>
                  </div>
                  <div class="mt-16px text-12px text-gray-400">
                    {{ formatTime(item.date, 'yyyy-MM-dd') }}
                  </div>
                </div>
              </div>
              <el-divider />
            </div>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16" class="mb-4">
      <el-col :md="16" :sm="24">
        <!-- 条形图-育种数据监控 -->
        <el-card shadow="hover" class="mb-8px">
          <el-skeleton :loading="loading" animated>
            <Echart :options="barOptionsData" :height="300" />
          </el-skeleton>
        </el-card>
        <!-- </el-col> -->
      </el-col>
      <el-col :md="8" :sm="24">
        <!-- 饼图-气象分析 -->
        <el-card shadow="hover" class="mb-8px">
          <el-skeleton :loading="loading" animated>
            <Echart :options="pieOptionsData" :height="300" />
          </el-skeleton>
        </el-card>
        <!-- </el-col> -->
      </el-col>
    </el-row>
    <el-row :gutter="16" class="mb-4">
      <el-col :md="8" :sm="24">
        <!-- 账号管理 -->
        <el-card shadow="never">
          <template #header>
            <div class="h-3 flex justify-between">
              <span>{{ t('账号管理') }}</span>
              <el-link
                type="primary"
                :underline="false"
                href="https://github.com/yudaocode"
                target="_blank"
              >
                {{ t('action.more') }}
              </el-link>
            </div>
          </template>
          <el-skeleton :loading="loading" animated>
            <el-row>
              <el-col
                v-for="(item, index) in projects"
                :key="`card-${index}`"
                :xl="8"
                :lg="8"
                :md="8"
                :sm="24"
                :xs="24"
              >
                <el-card shadow="hover" class="mr-5px mt-5px">
                  <div class="flex items-center">
                    <Icon :icon="item.icon" :size="25" class="mr-8px" />
                    <span class="text-16px">{{ item.name }}</span>
                  </div>
                  <!-- <div class="mt-12px text-9px text-gray-400">{{ t(item.message) }}</div> -->
                  <div class="mt-12px flex justify-between text-12px text-gray-400">
                    <span>{{ item.personal }}</span>
                    <span>{{ formatTime(item.time, 'yyyy-MM-dd') }}</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :md="16" :sm="24">
        <!-- 折线图-历史数据 -->
        <el-card shadow="hover" class="mb-8px">
          <el-skeleton :loading="loading" animated>
            <Echart :options="lineOptionsData" :height="280" />
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>

import * as echarts from 'echarts'
import { set } from 'lodash-es'
import { EChartsOption } from 'echarts'
import { formatTime } from '@/utils'

import { useUserStore } from '@/store/modules/user'
import { useWatermark } from '@/hooks/web/useWatermark'
import type { WorkplaceTotal, Project, Notice, Shortcut } from './types'
import { pieOptions, barOptions, lineOptions } from './echarts-data'

const { t } = useI18n()
const userStore = useUserStore()
const { setWatermark } = useWatermark()
const loading = ref(true)
const avatar = userStore.getUser.avatar
const username = userStore.getUser.nickname

const experimentData = [
  {
    name: '百农4199实验B',
    record: '有增长趋势，但比同期的较缓慢',
    status: '异常',
    date: '12/22'
  },
  {
    name: '百农4199实验A',
    record: '记录',
    status: '正常',
    date: '12/21'
  },
  {
    name: '百农4199实验B',
    record: '有增长趋势，但比同期的较缓慢',
    status: '异常',
    date: '12/22'
  },
  {
    name: '百农4199实验A',
    record: '记录',
    status: '正常',
    date: '12/21'
  },
  {
    name: '百农4199实验A-2024',
    record: '记录',
    status: '正常',
    date: '12/20'
  },
  {
    name: '百农4199实验A-2024',
    record: '记录',
    status: '正常',
    date: '12/20'
  }
]

// 设置行间距
const setCellStyle = (row: any, column: any, rowIndex: number) => {
  // 偶数行和奇数行使用不同的渐变色
  const gradientColor = rowIndex % 2 === 0
    ? 'linear-gradient(135deg, rgba(0, 193, 158, 0.2), rgba(166, 232, 82, 0.2))'  // 偶数行渐变色
    : 'linear-gradient(135deg, rgba(0, 193, 158, 0.2), rgba(166, 232, 82, 0.2))';  // 奇数行渐变色
    // ? 'linear-gradient(135deg, rgb(0, 188, 212), rgb(0, 150, 136))'  // 偶数行渐变色
    // : 'linear-gradient(135deg, rgb(0, 150, 136), rgb(0, 188, 212))';  // 奇数行渐变色

  return { 
    padding: '10px 0', 
    background: gradientColor,  // 渐变背景
    color: '#333'  // 设置字体颜色
  }
}



// const setCellStyle = () => {
//   return { 
//     padding: '10px 0',backgroundColor: '#2AD3B9'

//   } // 增大行间距
// }

// 格式化实验状态列的显示
const formatStatus = (row: any) => {
  return row.status === '异常'
    ? '<span style="color: orange;">异常</span>'
    : '<span style="color: green;">正常</span>'
}

// 获取账号管理
let projects = reactive<Project[]>([])
const getProject = async () => {
  const data = [
    {
      name: 'admin1',
      icon: 'akar-icons:github-fill',
      message: 'https://github.com/YunaiV/ruoyi-vue-pro',
      personal: '科研1组-组长',
      time: new Date()
    },
    {
      name: 'admin2',
      icon: 'logos:vue',
      message: 'https://github.com/yudaocode/yudao-ui-admin-vue3',
      personal: '科研2组-组长',
      time: new Date()
    },
    {
      name: 'admin3',
      icon: 'logos:vue',
      message: 'https://github.com/yudaocode/yudao-ui-admin-vben',
      personal: '科研3组-组长',
      time: new Date()
    },
    {
      name: 'user1',
      icon: 'akar-icons:github',
      message: 'https://github.com/YunaiV/yudao-cloud',
      personal: '科研1组-组员',
      time: new Date()
    },
    {
      name: 'user2',
      icon: 'akar-icons:github',
      message: 'https://github.com/YunaiV/yudao-cloud',
      personal: '科研2组-组员',
      time: new Date()
    },
    {
      name: 'user3',
      icon: 'akar-icons:github',
      message: 'https://github.com/YunaiV/yudao-cloud',
      personal: '科研3组-组员',
      time: new Date()
    }
  ]
  projects = Object.assign(projects, data)
}

// 获取操作记录
let notice = reactive<Notice[]>([])
const getNotice = async () => {
  const data = [
    {
      title: '上传并更新高温育种监控数据',
      type: '通知',
      keys: ['通知', '8', '17', '21', '2', '3'],
      date: new Date()
    },
    {
      title: '上传并更新百农4199小麦叶片、叶长、叶宽数据，并导出excel文件',
      type: '公告',
      keys: ['公告', 'Boot', 'Cloud'],
      date: new Date()
    },
    {
      title: '上传并更新拔节前、拔节后及抽穗后的茎粗(cm)数据',
      type: '通知',
      keys: ['通知', '无需授权'],
      date: new Date()
    }
  ]
  notice = Object.assign(notice, data)
}

// 饼图
const pieOptionsData = reactive<EChartsOption>(pieOptions) as EChartsOption


// 获取统计数
let totalSate = reactive<WorkplaceTotal>({
  project: 0,
  access: 0,
  todo: 0
})

const getCount = async () => {
  const data = {
    project: 40,
    access: 2340,
    todo: 10
  }
  totalSate = Object.assign(totalSate, data)
}



// // 条形图
const barOptionsData = reactive<EChartsOption>(barOptions) as EChartsOption
const getWeeklyUserActivity = async () => {
  const data = [
    { value: 13253, name: 'analysis.monday' },
    { value: 34235, name: 'analysis.tuesday' },
    { value: 26321, name: 'analysis.wednesday' },
    { value: 12340, name: 'analysis.thursday' },
    { value: 24643, name: 'analysis.friday' },
    { value: 13202, name: 'analysis.saturday' },
    { value: 14324, name: 'analysis.sunday' }
  ];

  // 设置X轴数据
  set(barOptionsData, 'xAxis.data', data.map((v) => t(v.name)));

  // 设置series数据，加入两个数据系列（个人和团队）
  set(barOptionsData, 'series', [
    {
      name: t('百农4199产量'), // 个人活跃度
      data: data.map((v) => v.value), // 个人数据
      type: 'bar',
      itemStyle: {
        color: '#B693FE' // 设置个人活跃度的颜色
      }
    },
    {
      name: t('中麦578产量'), // 团队活跃度
      data: data.map((v) => v.value * 1.2), // 假设团队活跃度数据为个人数据的1.2倍
      type: 'bar',
      itemStyle: {
        color: '#00BE9C' // 设置团队活跃度的颜色
      }
    }
  ]);
};




// 折线图
const lineOptionsData = reactive<EChartsOption>(lineOptions) as EChartsOption;

const getMonthlySales = async () => {
  const data = {
    estimate: [100, 120, 161, 134, 105, 160, 165, 114, 163, 185, 118, 123],
    actual: [120, 82, 91, 154, 162, 140, 145, 250, 134, 56, 99, 123]
  }

  set(lineOptionsData, 'series[0].data', data.estimate);
  set(lineOptionsData, 'series[1].data', data.actual);

  // 添加 areaStyle 来设置线条下方的背景颜色
  set(lineOptionsData, 'series[0].areaStyle', {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: 'rgb(0, 188, 212)' },  // 起始色
      { offset: 1, color: 'rgb(0, 150, 136)' }   // 结束色
    ])
  });

  set(lineOptionsData, 'series[1].areaStyle', {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: 'rgb(0, 188, 212)' },
      { offset: 1, color: 'rgb(0, 150, 136)' }
    ])
  });
}

const getAllApi = async () => {
  await Promise.all([getProject(), getNotice(), getWeeklyUserActivity()])
  loading.value = false
}

getAllApi()

/** 商城首页 */
defineOptions({ name: 'MallHome' })

</script>
<style lang="scss" scoped>
.row {
  .el-col {
    margin-bottom: 1rem;
  }
}

.el-table .cell {
  padding: 10px 0 !important; /* 增加行间距 */
}

/* 为表格单元格添加渐变背景 */
.gradient-table {
  /* 不使用全表格的渐变背景 */
  background: red;
}

/* 设置表头背景 */
.gradient-table thead {
  color: white;
  background: #FF6347 !important; /* 表头背景色 */
}

/* 设置奇数行背景色 */
.gradient-table tr:nth-child(odd) {
  background: linear-gradient(90deg, #FF8C00, #FFD700) !important; /* 渐变色背景 */
}

/* 设置偶数行背景色 */
.gradient-table tr:nth-child(even) {
  background: linear-gradient(90deg, #FFD700, #FF8C00) !important; /* 渐变色背景 */
}

/* 设置表格单元格的样式 */
.gradient-table th, .gradient-table td {
  padding: 10px 0 !important; /* 增加行间距 */
  color: #333; /* 字体颜色 */
  text-align: center;
}

</style>