export interface Exam {
  examId: number
  examName: string
  description: string
  startTime: Date
  endTime: Date
  duration: number
  totalScore: number
  isLimit: string | number
  createTime: string
  teacherId: number
}

export interface ExamForm extends Exam{
    timeRange:[Date, Date]
}

export interface ExamListParams {
  page: number
  pageSize: number
  userId?: number
  teacherId?: number
  search?:string
}

export interface ExamListResponse {
  list: Exam[]
  total: number
}
export interface getExamListType {
  page: number
  pageSize: number
  search?:string
  teacherId: number
}