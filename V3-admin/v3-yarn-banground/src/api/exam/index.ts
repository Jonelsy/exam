import request from '@/axios/axios'
import type { Exam } from './type'

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
