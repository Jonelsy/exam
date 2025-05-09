//定义用户登录数据类型
export interface reqLoginType{
    username:string,
    password:string,
}
export interface dataType{
    message?:string,
    token:string,
    payload:payloadType
    code:string
}
export interface payloadType{
    username:string,
    role:number,
    userId:number,
}
//定义登陆后返回数据类型
export interface reqLoginresPonse{
    data:dataType,
}
//定义注册提交数据类型
export interface reqReginType{
    username:string,
    password:string,
    repassword:string,
    name:string,
    openid?:number,
    classId?:number
}
//定义注册后返回数据类型\
export interface dataReginType{
    item:any,
    message:string
    statusCode:number
}
export interface reqReginresPonse{
    data:dataReginType
}
//定义分页查询数据类型
export interface getUserType{
    name?:string,
    page:number,
    pageSize:number
}
//定义新增
export interface insertUserType{
    username:string,
    nickname:string
    email:string,
    password:string
}

//定义修改
export interface updateUserType{
    username?:string,
    nickname:string
    email:string,
    id:number | null,
    header?:string
}