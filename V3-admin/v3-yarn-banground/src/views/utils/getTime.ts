export const getTime = ()=>{
    let message = ''
    let time = new Date().getHours()
    if (time<=9){
        message='早上'
    }else if (time<=11){
        message='上午'
    }else if (time<=14){
        message='中午'
    }else if (time<=18){
        message='下午'
    }else{
        message='晚上'
    }
    return message
}

export const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}
