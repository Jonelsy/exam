<template>
  <div class="exam-class-container">
    <el-row :gutter="20">
      <el-col 
        v-for="(item, index) in classExamList" 
        :key="index" 
        :span="6"
      >
        <el-card class="exam-card">
          <div slot="header" class="clearfix">
            <span>{{ item.className }}</span>
          </div>
          <div v-for="exam in item.exams" :key="exam.id">
            <el-tag 
              :type="exam.status === '进行中' ? 'success' : 'info'"
              class="exam-tag"
            >
              {{ exam.name }} ({{ exam.status }})
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-button 
      type="primary" 
      class="publish-btn"
      @click="showPublishDialog = true"
    >
      发布考试
    </el-button>

    <el-dialog 
      title="发布考试" 
      :visible.sync="showPublishDialog"
      width="30%"
    >
      <el-form label-width="80px">
        <el-form-item label="选择班级">
          <el-select v-model="selectedClass" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择考试">
          <el-select v-model="selectedExam" placeholder="请选择考试">
            <el-option
              v-for="item in examList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="isExamExpired(item.endTime)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showPublishDialog = false">取消</el-button>
        <el-button type="primary" @click="publishExam">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getClassList, getExamList, publishClassExam } from '@/api/exam'

interface ClassItem {
  id: string
  name: string
}

interface ExamItem {
  id: string
  name: string
  endTime: string
}

interface ClassExamItem {
  className: string
  exams: {
    id: string
    name: string
    status: string
  }[]
}

const classExamList = reactive<ClassExamItem[]>([])
const classList = ref<ClassItem[]>([])
const examList = ref<ExamItem[]>([])
const selectedClass = ref('')
const selectedExam = ref('')
const showPublishDialog = ref(false)

const getClassExamData = async () => {
  // TODO: 获取班级考试数据
}

const getClassList = async () => {
  const { data } = await getClassList()
  classList.value = data
}

const getExamList = async () => {
  const { data } = await getExamList()
  examList.value = data
}

const isExamExpired = (endTime: string): boolean => {
  return new Date(endTime) < new Date()
}

const publishExam = async () => {
  try {
    await publishClassExam({
      classId: selectedClass.value,
      examId: selectedExam.value
    })
    ElMessage.success('发布成功')
    showPublishDialog.value = false
    getClassExamData()
  } catch (error) {
    ElMessage.error('发布失败')
  }
}

// 初始化数据
getClassExamData()
getClassList()
getExamList()
</script>

<style lang="scss" scoped>
.exam-class-container {
  padding: 20px;

  .exam-card {
    margin-bottom: 20px;

    .exam-tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }

  .publish-btn {
    position: fixed;
    right: 40px;
    bottom: 40px;
  }
}
</style>
