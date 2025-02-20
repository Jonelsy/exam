export interface  userStoreType {
    users:userType,
    token:string|null
}
export interface userType {
    userId?:number;
    username?:string;
    openid?:string;
    header?:string;
    name?:string;
    password?:string;
    role?:string,
    createTime?:string,
}