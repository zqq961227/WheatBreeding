<script lang="tsx">
import { ElTable, ElTableColumn, ElPagination, ElButton } from 'element-plus'
import { defineComponent, PropType, ref, computed, unref, watch, onMounted } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { setIndex } from './helper'
import { getSlot } from '@/utils/tsxHelper'
import type { TableProps } from './types'
import { set } from 'lodash-es'
import { Pagination, TableColumn, TableSetPropsType, TableSlotDefault } from '@/types/table'

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Table',
  props: {
    pageSize: propTypes.number.def(10),
    currentPage: propTypes.number.def(1),
    // 是否多选
    selection: propTypes.bool.def(false),
    // 是否所有的超出隐藏，优先级低于schema中的showOverflowTooltip,
    showOverflowTooltip: propTypes.bool.def(true),
    // 表头
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    // 展开行
    expand: propTypes.bool.def(false),
    // 是否展示分页
    pagination: {
      type: Object as PropType<Pagination>,
      default: (): Pagination | undefined => undefined
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: propTypes.bool.def(false),
    // 加载状态
    loading: propTypes.bool.def(false),
    // 是否冻结
    frozen: propTypes.bool.def(false), // 新增冻结属性
    showBatchDelete: {
      type: Boolean,
      default: true // 默认为 true，显示批量删除按钮
    },
    // 是否叠加索引
    reserveIndex: propTypes.bool.def(false),
    // 对齐方式
    align: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    // 表头对齐方式
    headerAlign: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    data: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    }
  },
  emits: ['update:pageSize', 'update:currentPage', 'register', 'batch-delete'],
  setup(props, { attrs, slots, emit, expose }) {
    const elTableRef = ref<ComponentRef<typeof ElTable>>()

    // 注册
    onMounted(() => {
      const tableRef = unref(elTableRef)
      emit('register', tableRef?.$parent, elTableRef)
    })

    const pageSizeRef = ref(props.pageSize)

    const currentPageRef = ref(props.currentPage)

    // useTable传入的props
    const outsideProps = ref<TableProps>({})

    const mergeProps = ref<TableProps>({})

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    const setProps = (props: TableProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    const setColumn = (columnProps: TableSetPropsType[], columnsChildren?: TableColumn[]) => {
      const { columns } = unref(getProps)
      for (const v of columnsChildren || columns) {
        for (const item of columnProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value)
          } else if (v.children?.length) {
            setColumn(columnProps, v.children)
          }
        }
      }
    }

    const selections = ref<Recordable[]>([])

    const selectionChange = (selection: Recordable[]) => {
      selections.value = selection
    }

    expose({
      setProps,
      setColumn,
      selections
    })

    const pagination = computed(() => {
      // update by 芋艿：保持和 Pagination 组件的逻辑一致
      return Object.assign(
        {
          small: false,
          background: true,
          pagerCount: document.body.clientWidth < 992 ? 5 : 7,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50, 100],
          disabled: false,
          hideOnSinglePage: false,
          total: 10
        },
        unref(getProps).pagination
      )
    })

    watch(
      () => unref(getProps).pageSize,
      (val: number) => {
        pageSizeRef.value = val
      }
    )

    watch(
      () => unref(getProps).currentPage,
      (val: number) => {
        currentPageRef.value = val
      }
    )

    watch(
      () => pageSizeRef.value,
      (val: number) => {
        emit('update:pageSize', val)
      }
    )

    watch(
      () => currentPageRef.value,
      (val: number) => {
        emit('update:currentPage', val)
      }
    )

    const getBindValue = computed(() => {
      const bindValue: Recordable = { ...attrs, ...props }
      delete bindValue.columns
      delete bindValue.data
      return bindValue
    })

    const renderTableSelection = () => {
      const { selection, reserveSelection, align, headerAlign } = unref(getProps)
      // 渲染多选
      return selection ? (
        <ElTableColumn
          type="selection"
          reserveSelection={reserveSelection}
          align={align}
          headerAlign={headerAlign}
          width="50"
        ></ElTableColumn>
      ) : undefined
    }

    const renderTableExpand = () => {
      const { align, headerAlign, expand } = unref(getProps)
      // 渲染展开行
      return expand ? (
        <ElTableColumn type="expand" align={align} headerAlign={headerAlign}>
          {{
            // @ts-ignore
            default: (data: TableSlotDefault) => getSlot(slots, 'expand', data)
          }}
        </ElTableColumn>
      ) : undefined
    }

    const rnderTreeTableColumn = (columnsChildren: TableColumn[]) => {
      const { align, headerAlign, showOverflowTooltip } = unref(getProps)
      return columnsChildren.map((v) => {
        const props = { ...v }
        if (props.children) delete props.children
        return (
          <ElTableColumn
            showOverflowTooltip={showOverflowTooltip}
            align={align}
            headerAlign={headerAlign}
            {...props}
            prop={v.field}
            fixed={v.frozen === 'left' || v.frozen === 'right' ? v.frozen : undefined}
          >
            {{
              default: (data: TableSlotDefault) =>
                v.children && v.children.length
                  ? rnderTableColumn(v.children)
                  : // @ts-ignore
                    getSlot(slots, v.field, data) ||
                    v?.formatter?.(data.row, data.column, data.row[v.field], data.$index) ||
                    data.row[v.field],
              // @ts-ignore
              header: getSlot(slots, `${v.field}-header`)
            }}
          </ElTableColumn>
        )
      })
    }
    const handleBatchDelete = () => {
      if (selections.value.length > 0) {
        emit('batch-delete', selections.value) // 触发 batch-delete 事件
        selections.value = [] // 清空选中的行
      } else {
        alert('请选择要删除的数据')
      }
    }
    // const canShowDeleteButton = ref(false); // 控制按钮的显示与否
    const rnderTableColumn = (columnsChildren?: TableColumn[]) => {
      const {
        columns,
        reserveIndex,
        pageSize,
        currentPage,
        align,
        headerAlign,
        showOverflowTooltip,
        batchDelete
      } = unref(getProps)
      return [...[renderTableExpand()], ...[renderTableSelection()]].concat(
        (columnsChildren || columns).map((v) => {
          // 自定生成序号
          if (v.type === 'index') {
            return (
              <ElTableColumn
                type="index"
                index={
                  v.index
                    ? v.index
                    : (index) => setIndex(reserveIndex, index, pageSize, currentPage)
                }
                align={v.align || align}
                headerAlign={v.headerAlign || headerAlign}
                label={v.label}
                width="65px"
              ></ElTableColumn>
            )
          } else {
            const props = { ...v }
            if (props.children) delete props.children
            return (
              <ElTableColumn
                showOverflowTooltip={showOverflowTooltip}
                align={align}
                headerAlign={headerAlign}
                {...props}
                prop={v.field}
                fixed={v.frozen === 'left' || v.frozen === 'right' ? v.frozen : undefined} // 动态设置冻结
              >
                {{
                  default: (data: TableSlotDefault) =>
                    v.children && v.children.length
                      ? rnderTreeTableColumn(v.children)
                      : // @ts-ignore
                        getSlot(slots, v.field, data) ||
                        v?.formatter?.(data.row, data.column, data.row[v.field], data.$index) ||
                        data.row[v.field],
                  // @ts-ignore
                  header: () => getSlot(slots, `${v.field}-header`) || v.label
                }}
              </ElTableColumn>
            )
          }
        })
      )
    }

    return () => (
      <div v-loading={unref(getProps).loading}>
        <ElTable
          // @ts-ignore
          ref={elTableRef}
          data={unref(getProps).data}
          onSelection-change={selectionChange}
          {...unref(getBindValue)}
        >
          {{
            default: () => rnderTableColumn(),
            // @ts-ignore
            append: () => getSlot(slots, 'append')
          }}
        </ElTable>

        {unref(getProps).pagination ? (
          // update by 芋艿：保持和 Pagination 组件一致
          <div>
            <ElPagination
              v-model:pageSize={pageSizeRef.value}
              v-model:currentPage={currentPageRef.value}
              class="float-left mb-15px mt-15px"
              {...unref(pagination)}
            ></ElPagination>{' '}
            {props.showBatchDelete && selections.value.length > 0 ? (
              <ElButton
                class="float-right mb-15px mt-15px"
                icon="el-icon-delete"
                onClick={handleBatchDelete}
              >
                批量删除
              </ElButton>
            ) : null}
          </div>
        ) : undefined}
      </div>
    )
  }
})
</script>
<style lang="scss" scoped>
:deep(.el-button.is-text) {
  padding: 8px 4px;
  margin-left: 0;
}
:deep(.el-button.is-link) {
  padding: 8px 4px;
  margin-left: 0;
}
::deep(.el-table .is-fixed-left) {
  background-color: #f9f9f9; /* 可选：设置背景色 */
  border-right: 2px solid #dcdfe6; /* 添加右侧边框 */
  z-index: 1; /* 确保层级高于非冻结列 */
}

/* 右侧冻结列：添加左侧边框 */
::deep(.el-table .is-fixed-right) {
  background-color: #f9f9f9; /* 可选：设置背景色 */
  border-left: 2px solid #dcdfe6; /* 添加左侧边框 */
  z-index: 1; /* 确保层级高于非冻结列 */
}
</style>
