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
          <div slot="header" class="clearfix">
            <span>{{ item.examName }}</span>
          </div>
          <el-tag 
              :type="new Date(item.startTime) > new Date() ? 'info' : new Date() <= new Date(item.endTime) ? 'success' : 'danger'"
              class="exam-tag"
            >
              {{ item.examName }} 
              ({{ new Date(item.startTime) > new Date() ? '未开始' : new Date() <= new Date(item.endTime) ? '进行中' : '已结束' }})
            </el-tag>
        </el-card>
      </el-col>
    </el-row>

    <el-button 
      type="primary" 
      class="publish-btn"
      @click="openDig()"
    >
      发布考试
    </el-button>

    <el-dialog 
      title="发布考试" 
      v-model="showPublishDialog"
      width="30%"
      :before-close="closeDig"
    >
      <el-form label-width="80px">
        <el-form-item label="选择班级">
          <el-select v-model="selectedClass" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择考试">
          <el-select v-model="selectedExam" placeholder="请选择考试">
            <el-option
              v-for="item in examList"
              :key="item.examId"
              :label="item.examName"
              :value="item.examId"
              :disabled="isExamExpired(item.endTime)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDig">取消</el-button>
        <el-button type="primary" @click="publishExam">确定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getClassList, getExamList, publishClassExam, getExamClassList } from '@/api/exam'

interface ClassItem {
  classId: string
  className: string
}

interface ExamItem {
  examId: string
  examName: string
  endTime: string
}

interface ClassExamItem {
  className: string
  classId:number
  endTime:string
  examId:number
  examName:string
  id:number
  startTime:string
}

const classExamList = ref<ClassExamItem[]>([])
const classList = ref<ClassItem[]>([])
const examList = ref<ExamItem[]>([])
const selectedClass = ref('')
const selectedExam = ref('')
const showPublishDialog = ref(false)

const getClassExamData = async () => {
  // TODO: 获取班级考试数据
  const { data } = await getExamClassList({
    page:1,
    pageSize:10,
    teacherId:Number(localStorage.getItem('userId'))
  })
  classExamList.value = data.data
}

const getClassLists = async () => {
  const { data } = await getClassList({
    page:1,
    pageSize:1000,
    search:'',
    teacherId:Number(localStorage.getItem('userId'))
  })
  
  classList.value = data.data
}

const getExamLists = async (userId: number) => {
  const { data } = await getExamList({
    page:1,
    pageSize:1000,
    teacherId:userId,
  })
  
  examList.value = data.exams
}

const isExamExpired = (endTime: string): boolean => {
  return new Date(endTime) < new Date()
}

const publishExam = async () => {
  try {
    await publishClassExam({
      classId: Number(selectedClass.value),
      examId: Number(selectedExam.value),
      teacherId: Number(localStorage.getItem('userId'))
    })
    ElMessage.success('发布成功')
    showPublishDialog.value = false
    getClassExamData()
  } catch (error) {
    ElMessage.error('发布失败')
  }
}

const openDig = ()=>{
  showPublishDialog.value = true
}

const closeDig = ()=>{
  showPublishDialog.value = false
  selectedClass.value = ''
  selectedExam.value = ''
}

// 初始化数据
getClassExamData()
getClassLists()
getExamLists(Number(localStorage.getItem('userId')))
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
