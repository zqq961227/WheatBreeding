<template>
  <div class="contanier">
    <div class="title">百农4199</div>
    <el-table :data="tableList" style="width: 100%" :span-method="handleSpanMethod" :row-class-name="getRowClassName" :cell-class-name="getCellClassName" >
      <el-table-column prop="period" label="时期" :formatter="attributeFormatter" width="80"  />
      <el-table-column prop="attribute" label="属性" :formatter="attributeFormatter" width="130" />
      
      <!-- 动态表头部分，根据 tableList 中的日期生成列 -->
      <el-table-column
        v-for="(item, index) in dateColumns"
        :key="'date' + (index + 1)"
        :prop="'date' + (index + 1)"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
const TableSpan = [
  [3], // row 0
  [0], // row 1
  [0],
  [3],
  [0],
  [0],
];

export default {
  data() {
    return {
      tableList: [],
      dateColumns: [], // 存储动态列的日期
    }
  },
  mounted() {
    const tableList = [
      {
        date: '2024/12/12',
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
        date: '2024/12/13',
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
        date: '2024/12/14',
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
        date: '2024/12/12',
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
        date: '2024/12/12',
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
      },{
        date: '2024/12/12',
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
    ];

    // 定义需要提取的属性
    const attributes = ['zhugao', 'yepianshu', 'yepianchang'];

    // 定义周期数组，包含 qian 和 hou
    const periods = ['qian', 'hou'];

    // 用于存放所有生成的对象
    const resultArray = [];

    // 提取日期字段，用来动态生成列
    this.dateColumns = tableList.map(item => item.date);

    // 遍历周期（qian 和 hou）
    periods.forEach((period) => {
      // 为每个 period（qian 或 hou）创建属性
      attributes.forEach((attribute) => {
        const resultObject = { period, attribute };

        // 遍历 tableList，为每个日期对象动态生成 date1, date2, ...
        tableList.forEach((item, index) => {
          resultObject[`date${index + 1}`] = item[period][attribute];
        });

        // 将每个生成的对象放入结果数组
        resultArray.push(resultObject);
      });
    });

    this.tableList = resultArray;
  },
  methods: {
    handleSpanMethod({ row, column, rowIndex, columnIndex }) {
      const rowspan = TableSpan[rowIndex][columnIndex] ?? 1;

      return {
        colspan: 1,
        rowspan,
      };
    },
    // formatter 用于格式化属性显示
    attributeFormatter(row, column, cellValue, index) {
      if (column.property === 'attribute' && cellValue === 'zhugao') {
        return '株高';
      }
      if (column.property === 'attribute' && cellValue === 'yepianshu') {
        return '叶片数';
      }
      if (column.property === 'attribute' && cellValue === 'yepianchang') {
        return '叶片长';
      }
      if (column.property === 'period' && cellValue === 'qian') {
        return '拔节前';
      }
      if (column.property === 'period' && cellValue === 'hou') {
        return '拔节后';
      }
      return cellValue;
    },
    // 根据行的数据返回不同的类名
    getRowClassName({ row, rowIndex }) {
      // 输出 row 来检查数据结构
      console.log(row.period);  // 在控制台查看 row 数据
      if (row.period === 'qian') {
        return 'qian-row'; // 拔节前的行添加类名
      } else if (row.period === 'hou') {
        return 'hou-row'; // 拔节后的行添加类名
      }
      return '';
    },
    getCellClassName({row, column, rowIndex, columnIndex}) {
      if (column.property === 'period' && row.period === 'qian') {
        return 'greener'; // 为年龄大于28的单元格添加特殊样式
      }
       if (column.property === 'period' && row.period === 'hou') {
        return 'bluer'; // 为年龄大于28的单元格添加特殊样式
      }
      return ''; // 其他情况不添加任何类
    },
    spanMethod({ rowIndex, columnIndex, row, column }) {
      // 如果是第一列"period"和"attribute"列，检查合并条件
      if (column.property === 'period' || column.property === 'attribute') {
        if (rowIndex === 0) {
          return [1, 2]; // 合并第一行的"period"和"attribute"列
        } else {
          return [1, 1]; // 后面的行正常显示
        }
      }
      return [1, 1];
    }
  }
};
</script>

<style scoped lang="scss">
.contanier {
}

.title {
  height: 36px;
  font-weight: 400;
  font-size: 16px;
  color: #00C19E;
  line-height: 36px;
  background: rgb(240, 242, 245);
  text-align: center;
  font-style: normal;
  border: 1px solid #E6EFF5;
  font-family: Source Han Sans CN, Source Han Sans CN;
}

:deep(.el-table__header) {
  height: 72px;
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  background-color: red !important;

  color: #1C1F37;
  line-height: 72px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.el-table__cell) {
  height: 36px;
  border: 1px solid #E6EFF5;
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 16px;
  color: #1C1F37;
  line-height: 36px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

/* 设置拔节前的行背景颜色 */


:deep(.el-table .qian-row) {
  background-color: #E6FFE6;
}
/* 设置拔节后的行背景颜色 */
:deep(.el-table .hou-row) {
  background-color: #A5E1EB; /* 浅粉色 */
}
:deep(.el-table .greener) {
  background-color: #E8FFE8;
}
:deep(.el-table .bluer) {
  background-color: #A6E3E9;
}
// .qian-row, .hou-row {
//   background-color: inherit; /* 让特定的行使用类定义的背景色 */
// }


</style>
