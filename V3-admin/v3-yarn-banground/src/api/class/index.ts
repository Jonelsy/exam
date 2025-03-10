//统一管理用户相关接口
import request from "@/axios/axios";
//引入数据规则
import type {reqLoginresPonse, reqLoginType, reqReginType, reqReginresPonse, updateUserType} from "@/api/user/type";
import {getType, insertType, updateType} from "@/api/class/type";

//对外暴露方法获取班级列表，绑定老师ID
export const getClasses = (data:getType)=>{
    return request.post('/class/getClass',data)
}

//删除
export const deleteClass = (id:number)=>{
    return request.delete('/class/deleteClass'+id)
}

//新增
export const createClass = (data:insertType)=>{
    return request.post('/class/createClass',data)
}
//修改
export const updateClass = (id:number,data:updateType)=>{
    return request.patch('/class/'+id,{className:data})
}