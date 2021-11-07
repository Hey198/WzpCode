import request from '@/utils/request'
//位置查询
export function locationList() {
    return request({
        url: '/showAddresses',
        method: 'get',
    })
}
//添加地址
export function addLocation(data) {
    return request({
        url: '/insertOneAddress',
        method: 'post',
        data
    })
}
//删除地址
export function delLocation(params) {
    return request({
        url: '/delOneAddress',
        method: 'get',
        params
    })
}
