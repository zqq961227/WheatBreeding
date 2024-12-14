<template>
  <div class="contanier">
    <div class="title">{{title}}</div>
    <el-table
      :data="tableList"
      style="width: 100%"
      :span-method="handleSpanMethod"
      :row-class-name="getRowClassName"
      :cell-class-name="getCellClassName"
    >
      <el-table-column prop="period" label="时期" :formatter="attributeFormatter" width="80" fixed/>
      <el-table-column prop="attribute" label="属性" :formatter="attributeFormatter" width="130" fixed/>

      <!-- 动态表头部分，根据 tableList 中的日期生成列 -->
      <el-table-column
      fixed
        v-for="(item, index) in dateColumns"
        :key="'determinationTime' + (index + 1)"
        :prop="'determinationTime' + (index + 1)"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import * as tableDataApi from '@/api/tableDataManage/tableData'

const TableSpan = [
  [12], // row 0
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [12], // row 0
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1

  [12], // row 0
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1

  [12], // row 0
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1
  [0],
  [0], // row 1


]

export default {
  data() {
    return {
      tableList: [],
      dateColumns: [], // 存储动态列的日期
      title:''
    }
  },
  mounted() {
    const route = useRoute()
     tableDataApi.getWheatDataList(route.query).then((res) => {
      console.log("res",res)
     const  rows = res.list
     console.log(route.query)
    this.title = route.query.wheatVarietyNameCn + '-' + route.query.determinationTaskName + '-' + route.query.phenotypicDeterminationBatchId
const result = [];

// 处理每一行数据
rows.forEach((row) => {
    // 根据 determinationTime 找到或创建对应的结果对象

        // 如果没有找到对应的 entry，创建一个新的 entry
       const existingEntry = {
            determinationTime: row.determinationTime,
        };
        result.push(existingEntry);

    // 根据 growthPeriod 为 2 或 3，分别设置 qian 或 hou
    if (row.growthPeriod === 2) {
        existingEntry.qian = row;
    } else if (row.growthPeriod === 3) {
        existingEntry.hou = row;
    } else if(row.growthPeriod === 1){
      existingEntry.miao = row;
    } else {
      existingEntry.mature = row;

    }
});

console.log("result",JSON.stringify(result, null, 2));
    const tableList = [
      {
        determinationTime: '2024/12/12',
        qian: {
          zhugao: 1,
          yepianshu: 2,
          yepianchang: 3
        },
        hou: {
          zhugao: 4,
          yepianshu: 5,
          yepianchang: 6
        }
      },
      {
        determinationTime: '2024/12/13',
        qian: {
          zhugao: 7,
          yepianshu: 8,
          yepianchang: 9
        },
        hou: {
          zhugao: 10,
          yepianshu: 11,
          yepianchang: 12
        }
      },
      {
        determinationTime: '2024/12/14',
        qian: {
          zhugao: 13,
          yepianshu: 14,
          yepianchang: 15
        },
        hou: {
          zhugao: 16,
          yepianshu: 17,
          yepianchang: 18
        }
      },
      {
        determinationTime: '2024/12/12',
        qian: {
          zhugao: 1,
          yepianshu: 2,
          yepianchang: 3
        },
        hou: {
          zhugao: 4,
          yepianshu: 5,
          yepianchang: 6
        }
      },
      {
        determinationTime: '2024/12/12',
        qian: {
          zhugao: 1,
          yepianshu: 2,
          yepianchang: 3
        },
        hou: {
          zhugao: 4,
          yepianshu: 5,
          yepianchang: 6
        }
      },
      {
        determinationTime: '2024/12/12',
        qian: {
          zhugao: 1,
          yepianshu: 2,
          yepianchang: 3
        },
        hou: {
          zhugao: 4,
          yepianshu: 5,
          yepianchang: 6
        }
      }
    ]

    // 定义需要提取的属性
    // const attributes = ['zhugao', 'yepianshu', 'yepianchang']
    const attributes = ['plantHeightTotal','tillsNumber','leavesNumber','leavesHeight','leavesWidth','leavesAngel','stemThickness','spikesNumber','spikesHeight','spikesWidth','spikesPerWheat','spikesWeight']

    // 定义周期数组，包含 qian 和 hou
    const periods = ['miao','qian', 'hou','mature']

    // 用于存放所有生成的对象
    const resultArray = []

    // 提取日期字段，用来动态生成列
    this.dateColumns = result.map((item) => new Date(item.determinationTime).toLocaleDateString());

    // 遍历周期（qian 和 hou）
    periods.forEach((period) => {
      // 为每个 period（qian 或 hou）创建属性
      attributes.forEach((attribute) => {
        const resultObject = { period, attribute }
        console.log("rows",rows);
        console.log(resultObject)

        result.forEach((item, index) => {
      const dateKey = `determinationTime${index + 1}`;
      resultObject[dateKey] = item[period] ? item[period][attribute] : null;
    });
        // 遍历 tableList，为每个日期对象动态生成 date1, date2, ...
        // tableList.forEach((item, index) => {
        //   resultObject[`determinationTime${index + 1}`] = item[period][attribute]
        // })

        // 将每个生成的对象放入结果数组
        resultArray.push(resultObject)
      })
    })

    this.tableList = resultArray
    console.log(this.tableList);
      console.log("rows+++++++",rows)
    })
    
  },
  methods: {
    handleSpanMethod({ row, column, rowIndex, columnIndex }) {
      const rowspan = TableSpan[rowIndex][columnIndex] ?? 1

      return {
        colspan: 1,
        rowspan
      }
    },
    // formatter 用于格式化属性显示
    attributeFormatter(row, column, cellValue, index) {
      const attributeMap = {
    'plantHeightTotal': '总株高',
    'tillsNumber': '分蘖数',
    'leavesNumber': '叶片数',
    'leavesHeight':'叶长',
    'leavesWidth':'叶宽',
    'leavesAngel':'叶夹角',
    'stemThickness':'茎粗',
    'spikesNumber':'总穗数',
    'spikesHeight':'穗长',
    'spikesWidth':'穗宽',
    'spikesPerWheat':'穗粒数',
    'spikesWeight':'穗重'
  };
  if (column.property === 'attribute') {
    return attributeMap[cellValue] || cellValue;
  }
      
      if (column.property === 'period' && cellValue === 'qian') {
        return '拔节期'
      }
      if (column.property === 'period' && cellValue === 'hou') {
        return '开花期'
      }
      if (column.property === 'period' && cellValue === 'miao') {
        return '苗期'
      }
      if (column.property === 'period' && cellValue === 'mature') {
        return '成熟期'
      }
      return cellValue
    },
    // 根据行的数据返回不同的类名
    getRowClassName({ row, rowIndex }) {
      // 输出 row 来检查数据结构
      console.log(row.period) // 在控制台查看 row 数据
      if (row.period === 'miao') {
        return 'miao-row' // 拔节前的行添加类名
      } else if (row.period === 'hou') {
        return 'hou-row' // 拔节后的行添加类名
      } else if (row.period === 'qian') {
        return 'qian-row' // 拔节后的行添加类名
      } else if (row.period === 'mature') {
        return 'mature-row' // 拔节后的行添加类名
      }
      return ''
    },
    getCellClassName({ row, column, rowIndex, columnIndex }) {
      if (column.property === 'period' && row.period === 'miao') {
        return 'greener' // 为年龄大于28的单元格添加特殊样式
      }
      if (column.property === 'period' && row.period === 'qian') {
        return 'bluer' // 为年龄大于28的单元格添加特殊样式
      }
      if (column.property === 'period' && row.period === 'hou') {
        return 'darkgreen' // 为年龄大于28的单元格添加特殊样式
      }
      if (column.property === 'period' && row.period === 'mature') {
        return 'oranger' // 为年龄大于28的单元格添加特殊样式
      }
      return '' // 其他情况不添加任何类
    },
    spanMethod({ rowIndex, columnIndex, row, column }) {
      // 如果是第一列"period"和"attribute"列，检查合并条件
      if (column.property === 'period' || column.property === 'attribute') {
        if (rowIndex === 0) {
          return [1, 2] // 合并第一行的"period"和"attribute"列
        } else {
          return [1, 1] // 后面的行正常显示
        }
      }
      return [1, 1]
    }
  }
}
</script>

<style scoped lang="scss">
.contanier {
}

.title {
  height: 36px;
  font-weight: 400;
  font-size: 16px;
  color: #00c19e;
  line-height: 36px;
  background: rgb(240, 242, 245);
  text-align: center;
  font-style: normal;
  border: 1px solid #e6eff5;
  font-family:
    Source Han Sans CN,
    Source Han Sans CN;
}

:deep(.el-table__header) {
  height: 72px;
  font-family:
    Source Han Sans CN,
    Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  background-color: red !important;

  color: #1c1f37;
  line-height: 72px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.el-table__cell) {
  height: 36px;
  border: 1px solid #e6eff5;
  font-family:
    Source Han Sans CN,
    Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  color: #1c1f37;
  line-height: 36px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

/* 设置拔节前的行背景颜色 */

:deep(.el-table .qian-row) {
  background-color: rgb(227, 239, 244);
}
/* 设置拔节后的行背景颜色 */
:deep(.el-table .hou-row) {
  background-color: rgb(222,239,238);
  // opacity: 0.5;
}
/* 设置拔节后的行背景颜色 */
:deep(.el-table .miao-row) {
  background-color: rgb(238, 245, 242);

}
/* 设置拔节后的行背景颜色 */
:deep(.el-table .mature-row) {
  background-color: rgb(243,240,227);

}
:deep(.el-table .greener) {
  background-color: #E8FFE8;
}
:deep(.el-table .bluer) {
  background-color: rgb(166, 227, 233);
}
:deep(.el-table .oranger) {
background-color: #FFE49A;
}
:deep(.el-table .darkgreen) {
  background-color: #95E1D3;

}
// .qian-row, .hou-row {
//   background-color: inherit; /* 让特定的行使用类定义的背景色 */
// }
</style>
