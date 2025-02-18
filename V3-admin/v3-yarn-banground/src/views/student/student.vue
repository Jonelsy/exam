<template>
    <div class="class-container">
      <el-card>
        <div class="header">
          <el-input
            v-model="searchQuery"
            placeholder="搜索学生"
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
          <el-table-column prop="userId" label="ID" width="80" />
          <el-table-column prop="username" label="学生用户名" />
          <el-table-column prop="name" label="学生姓名" />
          <el-table-column prop="classId" label="所属班级" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column label="操作" width="180">
            <template #default="scope">
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
          <el-form-item label="学生姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="学生账号">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="学生密码">
            <el-input v-model="form.password" />
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
  import { getStudent, createStudent, updateStudent, deleteStudent } from '@/api/student/index'
  import { Edit, Search} from '@element-plus/icons-vue'
  
  interface StudentItem {
    teacherId: number,
      username: string,
      name: string,
      password: string,
      openid: number,
      class_id: number,
      userId: number
  }
  
  const searchQuery = ref('')
  const tableData = ref<StudentItem[]>([])
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const dialogVisible = ref(false)
  const dialogTitle = ref('')
  const form = ref({
      teacherId: 0,
      username: '20201104385',
      name: '李世宇',
      password: '1234567',
      openid: Date.now(),
      class_id: 0,
  })
  
  const fetchData = async () => {
    try {
      loading.value = true
      const res = await getStudent({
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
    form.value = { teacherId: 0,
      username: '20201104385',
      name: '李世宇',
      password: '1234567',openid: String(Date.now()), class_id: 0 }
    dialogVisible.value = true
  }
  
  const handleEdit = (row: StudentItem) => {
    dialogTitle.value = '编辑班级'
    form.value = { ...row }
    dialogVisible.value = true
  }
  
  const handleDelete = async (row: StudentItem) => {
    try {
      await ElMessageBox.confirm('确定删除吗？', '提示', {
        type: 'warning'
      })
      let item = await deleteStudent(row.userId)
      ElMessage.success(item.data.message)
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleSubmit = async () => {
    try {
      if (form.value.classId) {
        await updateStudent(form.value.classId,form.value.className)
      } else {
        form.value.teacherId = Number(localStorage.getItem('userId'))
        await createStudent(form.value)
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
  