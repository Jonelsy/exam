<template>
    <div class="question-editor">
        <el-button type="primary" :icon="Edit" @click="addQuestion(questions.length)">添加题目</el-button>

        <div v-for="(question, qIndex) in questions" :key="qIndex" class="question-item">
            <!-- 选择题型，用于下方展示 -->
            <div class="question-header">
                <el-select v-model="question.questionType" placeholder="请选择题型" @change="handleTypeChange(qIndex)">
                    <el-option label="单选题" :value=0></el-option>
                    <el-option label="多选题" :value=1></el-option>
                    <el-option label="判断题" :value=2></el-option>
                    <el-option label="简答题" :value=3></el-option>
                </el-select>
                <el-button type="danger" :icon="Delete" circle @click="removeQuestion(qIndex)"></el-button>
            </div>
            <!-- 设置分值 -->
            <div class="score">
                <el-tag type="warning">分值</el-tag>
                <el-input v-model.number="question.score" type="number" placeholder="请输入分值" class="code-block"></el-input>
            </div>

            <div class="question-content">
                <!-- 题目固定 -->
                <el-input v-model="question.content" type="textarea" :rows="2" placeholder="请输入题目内容"
                    class="code-block"></el-input>
                <!-- 单选显示 -->
                <div v-if="question.questionType === 0">
                    <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-item">
                        <el-input v-model="option.content" type="textarea" :rows="1" placeholder="请输入选项内容"
                            class="code-block"></el-input>
                        <!-- 是否正确选项,单选 -->
                        <el-radio-group v-model="option.isCorrect" @change="changOption(question, oIndex)">
                            <el-radio :value=1 size="large">正确答案</el-radio>
                        </el-radio-group>
                        <!-- 增加删除选项 -->
                        <el-button type="danger" :icon="Delete" circle
                            @click="removeOption(qIndex, oIndex)"></el-button>
                    </div>
                    <el-button type="info" :icon="Edit" @click="addOption(qIndex)">添加选项</el-button>
                </div>
                <!-- 多选显示 -->
                <div v-if="question.questionType === 1">
                    <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-item">
                        <el-input v-model="option.content" type="textarea" :rows="1" placeholder="请输入选项内容"
                            class="code-block"></el-input>
                        <!-- 是否正确选项,多选 -->
                        <el-radio-group v-model="option.isCorrect">
                            <el-radio :value=1 size="large">正确答案</el-radio>
                        </el-radio-group>
                        <!-- 增加删除选项 -->
                        <el-button type="danger" :icon="Delete" circle
                            @click="removeOption(qIndex, oIndex)"></el-button>
                    </div>
                    <el-button type="info" :icon="Edit" @click="addOption(qIndex)">添加选项</el-button>
                </div>
                <!-- 判断题 -->
                <div v-else-if="question.questionType === 2">
                    <div v-for="(option, oIndex) in question.options" :key="oIndex">
                        <el-radio-group v-model="option.isCorrect">
                            <el-radio :value=1 size="large">正确</el-radio>
                            <el-radio :value=0 size="large">错误</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <!-- 简答题 -->
                <div v-else-if="question.questionType === 3">
                    <el-input v-model="question.options[0].content" type="textarea" :rows="4" placeholder="请输入参考答案"
                        class="code-block"></el-input>
                </div>
            </div>
        </div>

        <el-button type="primary" :icon="Edit" @click="submitQuestion(examId)">保存试题</el-button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
    Delete,
    Edit,
} from '@element-plus/icons-vue'
import { creatOption, creatQuestion, deleteQuestion, getQuestionList } from '@/api/exam'
import { ElMessage } from 'element-plus'

const route = useRoute()
const examId = route.query.examId
const score = route.query.score
const examName = route.query.examName
const questions = ref<Array<{
    questionType: number//类型
    content: string//题目
    options: Array<{ optionId?: number, questionId?: number, content: string, isCorrect: number }>//选项（答案）
    orderNum: number
    examId?: number
    score: number
}>>([])

const addQuestion = (index: number) => {
    questions.value.push({
        questionType: 0,
        content: '',
        options: [{ content: '', isCorrect: 0 }],
        score: 10,
        orderNum: index
    })
}

const removeQuestion = (index: number) => {
    questions.value.splice(index, 1)
}

const addOption = (qIndex: number) => {
    questions.value[qIndex].options?.push({ content: '', isCorrect: 0 })
}

const removeOption = (qIndex: number, oIndex: number) => {
    questions.value[qIndex].options?.splice(oIndex, 1)
}

const handleTypeChange = (qIndex: number) => {
    const question = questions.value[qIndex]
    if (question.questionType === 0 || question.questionType === 1) {
        question.options = [{ content: '', isCorrect: 0 }]
    } else if (question.questionType === 2) {
        question.options = [{ content: '判断题', isCorrect: 0 }]
    }
}

const changOption = (question: any, oIndex: number) => {
    question.options.forEach((option: any, Index: number) => {
        if (oIndex === Index) {
            return
        } else {
            option.isCorrect = false
        }
    });
}

// 接口相关
const getTableData = async () => {
    try {
        const params: any = {
            page: 1,
            pageSize: 1000,
            examId: examId,
        }
        const res = await getQuestionList(params)
        questions.value = res.data.questions
    } catch (error) {
        console.error(error)
    } finally {

    }
}

// 保存试题
const submitQuestion = async (id: any) => {
    // 判断分值是否满足
    let fullNumber = 0
    questions.value.forEach(item => {
        fullNumber += item.score
    })
    if (Number(fullNumber) !== Number(score)) {
        ElMessage({
            message: '题目总分值未达到考试设立目标分值',
            type: 'warning',
        })
    } else {
        try {
            // 先清空所有题目与答案
            await deleteQuestion(id)
            for (const [qindex, item] of questions.value.entries()) {
                const question = {
                    content: item.content,
                    questionType: item.questionType,
                    examId: examId,
                    score: item.score,
                    orderNum: qindex
                }
                // 先保存题目
                const res = await creatQuestion(question)

                // 再保存选项
                if (item.questionType === 3) {
                    // 简答题
                    for (const optionItem of item.options) {
                        await creatOption({
                            questionId: res.data.questionId,
                            content: optionItem.content,
                            isCorrect: 1,
                            examId: examId
                        })
                    }
                } else {
                    // 其他题型
                    for (const optionItem of item.options) {
                        await creatOption({
                            questionId: res.data.questionId,
                            content: optionItem.content,
                            isCorrect: optionItem.isCorrect,
                            examId: examId
                        })
                    }
                }
            }
            ElMessage.success('操作成功')
        } catch (error) {
            console.error(error)
        } finally {

        }
    }
}
onMounted(() => {
    getTableData()
})
</script>

<style scoped>
.question-editor {
    padding: 20px;
}

.question-item {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
}

.question-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.question-header>* {
    margin-right: 10px;
}

.option-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.option-item>* {
    margin-right: 10px;
}

.code-block {
    font-family: Consolas, Monaco, monospace;
    font-size: 14px;
}

.score {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.question-content {
    margin-top: 10px;
}
</style>
