<template>
  <div class="class-container">
    <el-card>
      <div class="card-header">
        <span>考试管理</span>
        <el-button type="primary" @click="handleAdd">新增考试</el-button>
      </div>
      <div class="filter-container">
        <el-input v-model="searchQuery" placeholder="搜索考试名称" style="width: 200px; margin-right: 10px"
          @keyup.enter="fetchExamList" />
        <el-button type="primary" @click="fetchExamList">搜索</el-button>
      </div> 
      <el-table
        :data="examList"
        style="width: 100%"
        border
        stripe
        v-loading="loading"
      >
        <el-table-column prop="examName" label="考试名称" />
        <el-table-column prop="description" label="考试描述"  />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="endTime" label="结束时间"  />
        <el-table-column prop="duration" label="考试时长" />
        <el-table-column prop="totalScore" label="总分" />
        <el-table-column prop="isLimit" label="限制次数">
          <template #default="{ row }">
            <el-tag :type="row.isLimit ? 'danger' : 'success'">
              {{ row.isLimit ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="text" size="small" style="color: #f56c6c" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" background layout="prev, pager, next" :total="pagination.total"
      :page-size="pagination.pageSize" :current-page="pagination.page" @current-change="handlePageChange" />
    </el-card>
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="600px" @close="resetForm">
      <el-form :model="examForm" label-width="120px" ref="examFormRef" :rules="rules">
        <el-form-item label="考试名称" prop="examName">
          <el-input v-model="examForm.examName" placeholder="请输入考试名称" />
        </el-form-item>

        <el-form-item label="考试描述" prop="description">
          <el-input v-model="examForm.description" type="textarea" :rows="3" placeholder="请输入考试描述" />
        </el-form-item>

        <el-form-item label="考试时间" prop="timeRange">
          <el-date-picker v-model="examForm.timeRange" type="datetimerange" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间" @change="calculateDuration" />
          <span class="duration">考试时长：{{ examForm.duration }} 分钟</span>
        </el-form-item>

        <el-form-item label="考试总分" prop="totalScore">
          <el-input-number v-model="examForm.totalScore" :min="0" :max="1000" controls-position="right" />
        </el-form-item>

        <el-form-item label="限制考试次数">
          <el-switch v-model="examForm.isLimit" active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import {
  getExamList,
  createExam,
  updateExam,
  deleteExam,
  getExamDetail
} from '@/api/exam'
import type { Exam, ExamForm, ExamListParams, ExamListResponse } from '@/api/exam/type'

const examList = ref<Exam[]>([])
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

// 获取考试列表
const fetchExamList = async () => {
  try {
    loading.value = true
    const params: ExamListParams = {
      page: pagination.value.page,
      pageSize: pagination.value.pageSize,
      teacherId: Number(localStorage.getItem('userId')),
      search: searchQuery.value,
    }
    const res = await getExamList(params)
    examList.value = res.data.exams
    pagination.value.total = res.data.total
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 创建考试
const handleCreate = async (form: Exam) => {
  try {
    form.teacherId = Number(localStorage.getItem('userId'))
    form.isLimit = Number(form.isLimit)
    await createExam(form)
    fetchExamList()
  } catch (error) {
    console.error(error)
  }
}

// 更新考试
const handleUpdate = async (form: Exam) => {
  try {

    await updateExam(form)
    fetchExamList()
  } catch (error) {
    console.error(error)
  }
}
//删除
const handleDelete = async (row: Exam) => {
  try {
    await ElMessageBox.confirm('确定要删除该考试吗？', '提示', {
      type: 'warning'
    })
    // 这里添加删除逻辑
    loading.value = true
    await deleteExam(row.examId)
    await fetchExamList()
    ElMessage.success('删除成功')
    loading.value = false
  } catch {
    // 用户取消删除
  }
}

onMounted(() => {
  fetchExamList()
})

const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('新增考试')
const searchQuery = ref('')

const examForm = ref<ExamForm>({
  teacherId: 0,
  examName: '',
  description: '',
  startTime: new Date(),
  endTime: new Date(),
  totalScore: 100,
  isLimit: "0",
  examId: 0,
  createTime: '',
  duration: 0,
  timeRange: [new Date(), new Date()],
})



const rules = {
  examName: [{ required: true, message: '请输入考试名称', trigger: 'blur' }],
  description: [
    { required: true, message: '请输入考试描述', trigger: 'blur' }
  ],
  timeRange: [
    { required: true, message: '请选择考试时间', trigger: 'change' }
  ],
  totalScore: [
    { required: true, message: '请输入考试总分', trigger: 'blur' }
  ]
}

const calculateDuration = () => {
  if (examForm.value.timeRange.length === 2) {
    const [start, end] = examForm.value.timeRange as [Date, Date];
    examForm.value.startTime = start
    examForm.value.endTime = end
    const diff = end.getTime() - start.getTime(); // 时间差（毫秒）
    const totalMinutes = Math.floor(diff / (1000 * 60)); // 总分钟数
    examForm.value.duration = totalMinutes
  } else {
    examForm.value.duration = 0
  }
}

const handleAdd = () => {
  dialogTitle.value = '新增考试'
  dialogVisible.value = true
}

const handleEdit = (row: Exam) => {
  console.log(row);

  dialogTitle.value = '编辑考试'
  examForm.value = {
    examId: row.examId,
    examName: row.examName,
    description: row.description,
    timeRange: [new Date(row.startTime), new Date(row.endTime)],
    totalScore: row.totalScore,
    isLimit: row.isLimit + '',
    teacherId: row.teacherId,
    startTime: row.startTime,
    endTime: row.endTime,
    duration: row.duration,
    createTime: row.createTime,
  }
  dialogVisible.value = true
}

const handlePageChange = (page: number) => {
  pagination.value.page = page
  fetchExamList()
}

const submitForm = async () => {
  // 这里添加提交逻辑
  loading.value = true
  //处理考试时长
  if (examForm.value.examId) {
    //修改
    await handleUpdate(examForm.value)
  } else {
    //提交
    await handleCreate(examForm.value)
  }
  dialogVisible.value = false
  loading.value = false
  ElMessage.success('操作成功')
}

const resetForm = () => {
  examForm.value = {
    examId: 0,
    examName: '',
    description: '',
    timeRange: [new Date(), new Date()],
    totalScore: 100,
    isLimit: 0,
    teacherId: 0,
    startTime: new Date(),
    endTime: new Date(),
    duration: 0,
    createTime: ''
  }
  examForm.value.duration = 0
}
</script>

<style scoped>
.class-container {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}
</style>
