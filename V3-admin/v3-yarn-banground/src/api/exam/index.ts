import request from '@/axios/axios'
import type { Exam, getExamListType } from './type'

// 获取考试列表
export const getExamList = (params: any) => {
  return request({ url: '/exam/list', method: 'get', params })
}

// 创建考试
export const createExam = (data: Exam) => {
  return request({ url: '/exam', method: 'post', data })
}

// 更新考试
export const updateExam = (data: Exam) => {
  return request({ url: '/exam/update', method: 'post', data })
}

// 删除考试
export const deleteExam = (id: number) => {
  return request({ url: `/exam/${id}`, method: 'delete' })
}

// 获取考试详情
export const getExamDetail = (id: number) => {
  return request({ url: `/exam/detail/${id}`, method: 'get' })
}

// 获取题目与选项
export const getQuestionList = (params: any) => {
  return request({ url: `/exam/question/${params.examId}/${params.page}/${params.pageSize}`, method: 'get' })
}

export const creatQuestion = (data: any) => {
  return request({ url: '/exam/question', method: 'post', data })
}

export const creatOption = (data: any) => {
  return request({ url: '/exam/option', method: 'post', data })
}


export const deleteQuestion = (id: number) => {
  return request.delete('/exam/question/'+id)
}

// 获取班级列表
export const getClassList = (data: getExamListType) => {
  return request({ url: '/class/getClass', method: 'post', data })
}

// 发布班级考试
export const publishClassExam = (data: { classId: number, examId: number, teacherId:number }) => {
  return request({ url: '/class-exam/publish', method: 'post', data })
}

//获取班级考试列表
export const getExamClassList = (params: any) => {
  return request({ url: '/class-exam', method: 'get', params })
}
