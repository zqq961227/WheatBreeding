import type { CrudSchema } from '@/hooks/web/useCrudSchemas'
import { dateFormatter } from '@/utils/formatTime'
const { t } = useI18n() // 国际化

// 表单校验
export const rules = reactive({
  // mail: [
  //   { required: true, message: t('profile.rules.mail'), trigger: 'blur' },
  //   {
  //     type: 'email',
  //     message: t('profile.rules.truemail'),
  //     trigger: ['blur', 'change']
  //   }
  // ],
  username: [required],
  password: [required],
  roleName: [required],
  deptName: [required],
})

// CrudSchema：https://doc.iocoder.cn/vue3/crud-schema/
const crudSchemas = reactive<CrudSchema[]>([
  {
    label: '序号',
    field: 'id',
    frozen: "left",
    // width: 64,
    isForm: false
  },

  {
    label: '姓名',
    field: 'username',
    // width: 120,

    isSearch: true,
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
    label: '密码',
    field: 'password',
    isTable: false

  },
  {
    label: '角色',
    field: 'roleName',
    // width: 213,

    componentProps: {
      placeholder: '请选择角色',  // 设置占位符
      clearable: true,  // 允许清除选择
      formatter(row) {
        const options = [
          { label: '超级管理员', value: '0' },
          { label: '管理员', value: '1' },
          { label: '教师', value: '2' },
          { label: '学生', value: '3' }
        ];
        
        // 通过角色值（roleName）找到对应的label
        const selectedOption = options.find(option => option.value === row.roleName);
        return selectedOption ? selectedOption.label : ''; // 如果没有找到匹配项，返回空
      }
    }
    
  },
  {
    label: '分组',
    field: 'deptName',
    // width: 213,

    
  },
  {
    label: '手机号',
    field: 'mobile',
    // width: 333,

    isSearch: true,
    search: {
      componentProps: {
        style: {
          width: '270px',
          marginTop: '20px',
          height: '44px',
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
    label: '操作',
    field: 'action',
    // width: 151,

    isForm: false,
    isDetail: false,
    frozen: "right",
  }
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
