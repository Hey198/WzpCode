import request from '@/utils/request'
//获取信息列表
export function informationList() {
    return request({
        url: '/showMessage',
        method: 'get',
    })
}
//添加信息列表
export function addInformation(data) {
    return request({
        url: '/insertAllMessage',
        method: 'post',
        data
    })
}
//根据地址检索内容
export function messageByAddress(data) {
    return request({
        url:'/searchaddressid',
        method:"post",
        data
    })
}

//根据id获取信息列表
export function informationId(params){
    return request({
        url:'/showOneMessage',
        method:'get',
        params
    })
}

// 删除数据
export function delInformation(params){
    return request({
        url:'/delOneMessage',
        method:'get',
        params
    })
}
//修改数据
export function udInformation(data) {
    return request({
        url:'/updateMessage',
        method:'post',
        data
    })
    
}