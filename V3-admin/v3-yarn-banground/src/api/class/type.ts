//定义分页查询数据类型
export interface getType{
    search?:string,
    page:number,
    pageSize:number
}
//定义新增
export interface insertType{
    className:string,
    teacherId:number,
}

//定义修改
export interface updateType{
    className:string,
}