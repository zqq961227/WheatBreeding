import { EChartsOption } from 'echarts'

const { t } = useI18n()


export const lineOptions: EChartsOption = {
  title: {
    text: t('analysis.monthlySales'),
    left: 'center'
  },
  xAxis: {
    data: [
      t('analysis.january'),
      t('analysis.february'),
      t('analysis.march'),
      t('analysis.april'),
      t('analysis.may'),
      t('analysis.june'),
      t('analysis.july'),
      t('analysis.august'),
      t('analysis.september'),
      t('analysis.october'),
      t('analysis.november'),
      t('analysis.december')
    ],
    boundaryGap: false,
    axisTick: {
      show: false
    }
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    top: 80,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  yAxis: {
    axisTick: {
      show: false
    }
  },
  legend: {
    // data: [t('analysis.estimate'), t('analysis.actual')],
    top: 50
  },
  series: [
    // {
    //   name: t('analysis.estimate'),
    //   smooth: true,
    //   type: 'line',
    //   data: [100, 120, 161, 134, 105, 160, 165, 114, 163, 185, 118, 123],
    //   animationDuration: 2800,
    //   animationEasing: 'cubicInOut',
    //   areaStyle: {
    //     color: 'rgba(0, 153, 255, 0.2)'  // 设置下方区域的颜色
    //   }
    // },
    {
      name: t('analysis.actual'),
      smooth: true,
      type: 'line',
      itemStyle: {},
      data: [120, 82, 91, 154, 162, 140, 145, 250, 134, 56, 99, 123],
      animationDuration: 2800,
      animationEasing: 'quadraticOut',
      areaStyle: {
        color: '#E6F9F6'  // 设置下方区域的颜色
      },
      lineStyle: {
        color: '#00C19E',  // 设置线条的颜色
        width: 3,  // 设置线条宽度
        type: 'solid'  // 设置线条样式（实线、虚线等）
      }
    }
  ]
}


export const pieOptions: EChartsOption = {
  title: {
    text: t('气象分析'),
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [
      t('高温'),
      t('正常'),
      t('洪水'),
      t('大风'),
      t('大雾')
    ]
  },
  series: [
    {
      name: t('气象分析'),
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: t('高温'), itemStyle: { color: '#0DCEDA' } },   // 高温颜色
        { value: 310, name: t('大风'), itemStyle: { color: '#FECEA8' } },   // 大风颜色
        { value: 234, name: t('大雾'), itemStyle: { color: '#FF9DE2' } },   // 大雾颜色
        { value: 235, name: t('洪水'), itemStyle: { color: '#B693FE' } },   // 洪水颜色
        { value: 748, name: t('正常'), itemStyle: { color: '#00C19E' } }   // 正常颜色
      ]
    }
  ]
}

export const barOptions: EChartsOption = {
  title: {
    text: t('analysis.weeklyUserActivity'),
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: 50,
    right: 20,
    bottom: 20
  },
  xAxis: {
    type: 'category',
    data: [
      t('analysis.monday'),
      t('analysis.tuesday'),
      t('analysis.wednesday'),
      t('analysis.thursday'),
      t('analysis.friday'),
      t('analysis.saturday'),
      t('analysis.sunday')
    ],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value'
  },
  legend: {
    data: [t('百农4199产量'), t('中麦578产量')],
    top: 50
  },
  series: [
    {
      name: t('百农4199产量'),
      data: [13253, 34235, 26321, 12340, 24643, 1322, 1324], // 个人活跃度数据
      type: 'bar'
    },
    {
      name: t('中麦578产量'),
      data: [14000, 34500, 28000, 13000, 25000, 1500, 1500], // 团队活跃度数据
      type: 'bar'
    }
  ]
}


// export const barOptions: EChartsOption = {
//   title: {
//     text: t('analysis.weeklyUserActivity'),
//     left: 'center'
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//   grid: {
//     left: 50,
//     right: 20,
//     bottom: 20
//   },
//   xAxis: {
//     type: 'category',
//     data: [
//       t('analysis.monday'),
//       t('analysis.tuesday'),
//       t('analysis.wednesday'),
//       t('analysis.thursday'),
//       t('analysis.friday'),
//       t('analysis.saturday'),
//       t('analysis.sunday')
//     ],
//     axisTick: {
//       alignWithLabel: true
//     }
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       name: t('analysis.weeklyUserActivity'),
//       data: [13253, 34235, 26321, 12340, 24643, 1322, 1324],
//       type: 'bar'
//     }
//   ]
// }

export const radarOption: EChartsOption = {
  legend: {
    data: [t('workplace.personal'), t('workplace.team')]
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: t('workplace.quote'), max: 65 },
      { name: t('workplace.contribution'), max: 160 },
      { name: t('workplace.hot'), max: 300 },
      { name: t('workplace.yield'), max: 130 },
      { name: t('workplace.follow'), max: 100 }
    ]
  },
  series: [
    {
      name: `xxx${t('workplace.index')}`,
      type: 'radar',
      data: [
        {
          value: [42, 30, 20, 35, 80],
          name: t('workplace.personal')
        },
        {
          value: [50, 140, 290, 100, 90],
          name: t('workplace.team')
        }
      ]
    }
  ]
}

export const wordOptions = {
  series: [
    {
      type: 'wordCloud',
      gridSize: 2,
      sizeRange: [12, 50],
      rotationRange: [-90, 90],
      shape: 'pentagon',
      width: 600,
      height: 400,
      drawOutOfBound: true,
      textStyle: {
        color: function () {
          return (
            'rgb(' +
            [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') +
            ')'
          )
        }
      },
      emphasis: {
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: [
        {
          name: 'Sam S Club',
          value: 10000,
          textStyle: {
            color: 'black'
          },
          emphasis: {
            textStyle: {
              color: 'red'
            }
          }
        },
        {
          name: 'Macys',
          value: 6181
        },
        {
          name: 'Amy Schumer',
          value: 4386
        },
        {
          name: 'Jurassic World',
          value: 4055
        },
        {
          name: 'Charter Communications',
          value: 2467
        },
        {
          name: 'Chick Fil A',
          value: 2244
        },
        {
          name: 'Planet Fitness',
          value: 1898
        },
        {
          name: 'Pitch Perfect',
          value: 1484
        },
        {
          name: 'Express',
          value: 1112
        },
        {
          name: 'Home',
          value: 965
        },
        {
          name: 'Johnny Depp',
          value: 847
        },
        {
          name: 'Lena Dunham',
          value: 582
        },
        {
          name: 'Lewis Hamilton',
          value: 555
        },
        {
          name: 'KXAN',
          value: 550
        },
        {
          name: 'Mary Ellen Mark',
          value: 462
        },
        {
          name: 'Farrah Abraham',
          value: 366
        },
        {
          name: 'Rita Ora',
          value: 360
        },
        {
          name: 'Serena Williams',
          value: 282
        },
        {
          name: 'NCAA baseball tournament',
          value: 273
        },
        {
          name: 'Point Break',
          value: 265
        }
      ]
    }
  ]
}
