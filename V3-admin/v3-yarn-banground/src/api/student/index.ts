//统一管理用户相关接口
import request from "@/axios/axios";
//引入数据规则
import {getType, insertType, updateType} from "@/api/student/type";

//对外暴露方法

export const getStudent = (data:getType)=>{
    return request.post('/user/userList',data)
}

//删除
export const deleteStudent = (id:number)=>{
    return request.delete('/user/'+id)
}

//新增
export const createStudent = (data:insertType)=>{
    return request.post('/user/register',data)
}
//修改
export const updateStudent = (id:number,data:updateType)=>{
    return request.patch('/user/'+id,{...data})
}