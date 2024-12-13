import type { CrudSchema } from '@/hooks/web/useCrudSchemas'
import { dateFormatter } from '@/utils/formatTime'
const { t } = useI18n() // 国际化

// 表单校验
export const rules = reactive({
  mail: [
    { required: true, message: t('profile.rules.mail'), trigger: 'blur' },
    {
      type: 'email',
      message: t('profile.rules.truemail'),
      trigger: ['blur', 'change']
    }
  ],
  username: [required],
  password: [required],
  host: [required],
  port: [required],
  sslEnable: [required],
  starttlsEnable: [required]
})

// CrudSchema：https://doc.iocoder.cn/vue3/crud-schema/
const crudSchemas = reactive<CrudSchema[]>([
  {
    label: '',
    field: 'selection',
    isForm: false,
    width: 46,
    height: 46,
    isDetail: false,
    type: 'selection',  // 选择框类型
    frozen: 'left' // 可以冻结列，保持其在左侧
  },
  {
    label: '小麦品种（中）',
    field: 'wheatVarietyNameCn',
    isSearch: true,
    width:120,
    frozen: "left",
    search: {
      componentProps: {
        style: {
          marginTop: '20px',
          marginLeft: '20px',
          width: '400px',
          height: '44px',
          fontFamily: 'Source Han Sans CN, Source Han Sans CN',
          fontWeight: '400',
          fontSize: '16px',
          color: '#B2B8C2',
          lineHeight: '44px',
          textAlign: 'left',
          fontStyle: 'normal',
          textTransform: 'none',
          borderRadius: '16px !important',
          border: '1px solid transparent'
        }
      }
    }
  },
  {
    label: '小麦品种（英）',
    field: 'wheatVarietyNameEn',
    width: 120,
    search: {
      componentProps: {
        style: {
        }
      }
    }
  },
  {
    label: '测定任务编号',
    field: 'determinationTaskId',
    width: 120,
    search: {
      componentProps: {
        style: {
        }
      }
    }
  },
  {
    label: '测定任务名称',
    field: 'determinationTaskName',
    isSearch: true,
    width: 120,
    search: {
      componentProps: {
        style: {
          width: '270px',
          height: '44px',
          marginTop: '20px',
          fontFamily: 'Source Han Sans CN, Source Han Sans CN',
          fontWeight: '400',
          fontSize: '16px',
          color: '#B2B8C2',
          lineHeight: '44px',
          textAlign: 'left',
          fontStyle: 'normal',
          textTransform: 'none'
        }
      }
    }
  },
  {
    label: '表型数据测定批次编号',
    field: 'phenotypicDeterminationBatchId',
    isSearch: true,
    width: 120,
    search: {
      componentProps: {
        style: {
          width: '270px',
          height: '44px',
          fontFamily: 'Source Han Sans CN, Source Han Sans CN',
          fontWeight: '400',
          marginTop: '20px',
          fontSize: '16px',
          color: '#B2B8C2',
          lineHeight: '44px',
          textAlign: 'left',
          fontStyle: 'normal',
          textTransform: 'none'
        }
      }
    }
  },
  {
    label: '测定时间',
    field: 'determinationTime',
    // isSearch: true,
    width: 188,
    formatter: dateFormatter,

    search: {
      componentProps: {
        style: {
          width: '240px'
        }
      }
    }
  },
  {
    label: '株高(cm)',
    field: 'plantHeightTotal',
    width: 120,
  },
  {
    label: '分蘖数',
    field: 'tillsNumber',
    width: 120,

  },
  {
    label: '叶片数',
    field: 'leavesNumber',
    width: 120,

    form: {
      component: 'InputNumber',
      value: 465
    }
  },
  {
    label: '叶长',
    field: 'leavesHeight',
    width: 120,

    // dictType: DICT_TYPE.INFRA_BOOLEAN_STRING,
    dictClass: 'boolean',
    form: {
      component: 'Radio'
    }
  },
  {
    label: '叶宽(cm)',
    field: 'leavesWidth',
    width: 120,

    // dictType: DICT_TYPE.INFRA_BOOLEAN_STRING,
    dictClass: 'boolean',
    form: {
      component: 'Radio'
    }
  },
  {
    label: '叶夹角',
    field: 'leavesAngel',
    width: 120,

    isForm: false,
    // formatter: dateFormatter,
    // detail: {
    //   dateFormat: 'YYYY-MM-DD HH:mm:ss'
    // }
  },
  {
    label: '茎粗(cm)',
    field: 'stemThickness',
    width: 120,

    isForm: false,
    isDetail: false
  },
  {
    label: '总穗数',
    field: 'spikesNumber',
    width: 120,

    isForm: false,
    // formatter: dateFormatter,
    // detail: {
    //   dateFormat: 'YYYY-MM-DD HH:mm:ss'
    // }
  },
  {
    label: '穗长(cm)',
    field: 'spikesHeight',
    width: 120,

    isForm: false,
  },
  {
    label: '穗宽(cm)',
    field: 'spikesWidth',
    width: 120,

    isForm: false,
  },
  {
    label: '穗粒数',
    field: 'spikesPerWheat',
    width: 120,

    isForm: false,
  },
  {
    label: '穗重(g)',
    field: 'spikesWeight',
    width: 120,

    isForm: false,
  },
  {
    label: '数据上传人姓名',
    field: 'userId',
    width: 188,

    isForm: false,
  },
  {
    label: '数据上传时间',
    field: 'uploadTime',
    width: 188,

    isForm: false,
    formatter: dateFormatter,
    detail: {
      dateFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    label: '操作',
    field: 'action',
    isDetail: false,
    width: 167,
    frozen: "right",
    search: {
      componentProps: {
        style: {
          width: '360px'
        }
      }
    }
  }
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
