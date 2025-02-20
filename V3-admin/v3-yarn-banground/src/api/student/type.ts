//定义分页查询数据类型
export interface getType{
    search?:string,
    page:number,
    pageSize:number,
    classId:number,
}
//定义新增
export interface insertType{
    username: string,
    name: string,
    password: string,
    openid: string,
    classId: number,
    userId: number,
}

//定义修改
export interface updateType{
    username: string,
    name: string,
}