<template>
  <div class="class-container">
    <el-card>
      <div class="header">
        <el-input
          v-model="searchQuery"
          placeholder="搜索班级"
          style="width: 300px; margin-right: 10px"
          @keyup.enter="handleSearch"
        />
        <el-button size="large" :icon="Search" circle @click="handleSearch" />
        <el-button size="large" type="primary" :icon="Edit" circle  @click="handleAdd" />
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        v-loading="loading"
      >
        <el-table-column prop="classId" label="ID" width="80" />
        <el-table-column prop="className" label="班级名称" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button size="small" @click="classStudent(scope.row)">查看本班学生</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
      style="margin-top: 10px;"
      background
      layout="prev, pager, next"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form" label-width="80px">
        <el-form-item label="班级名称">
          <el-input v-model="form.className" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getClasses, createClass, updateClass, deleteClass } from '@/api/class/index'
import { Edit, Search} from '@element-plus/icons-vue'
import router from '@/router'

interface ClassItem {
  classId: number
  className: string
  teacherId: number
}

const searchQuery = ref('')
const tableData = ref<ClassItem[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({
    classId:0,
    teacherId: 0,
    className: '',
})

const fetchData = async () => {
  try {
    loading.value = true
    const res = await getClasses({
      page: currentPage.value,
      pageSize: pageSize.value,
      search: searchQuery.value,
      teacherId: Number(localStorage.getItem('userId'))
    })
    tableData.value = res.data.data
    total.value = res.data.total
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchData()
}

const handleAdd = () => {
  dialogTitle.value = '新增班级'
  form.value = { classId: 0, className: '', teacherId: 0 }
  dialogVisible.value = true
}

const handleEdit = (row: ClassItem) => {
  dialogTitle.value = '编辑班级'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = async (row: ClassItem) => {
  try {
    await ElMessageBox.confirm('确定删除该班级吗，这么做会删除本班所有学生数据？', '提示', {
      type: 'warning'
    })
    await deleteClass(row.classId)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    console.log(error)
  }
}

const handleSubmit = async () => {
  try {
    if (form.value.classId) {
      await updateClass(form.value.classId,{className:form.value.className})
    } else {
      form.value.teacherId = Number(localStorage.getItem('userId'))
      await createClass(form.value)
    }
    dialogVisible.value = false
    ElMessage.success('操作成功')
    fetchData()
  } catch (error) {
    console.log(error)
  }
}

const handlePageChange = () => {
  fetchData()
}

const handleSizeChange = () => {
  currentPage.value = 1
  fetchData()
}

const classStudent = (row: ClassItem) => {
  router.push({
    path: '/student',
    query: {
      classId: row.classId,
      className: row.className,
    }
  })
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.class-container {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}
</style>
