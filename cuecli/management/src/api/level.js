import request from '@/utils/request'
//等级查询
export function levelList() {
    return request({
        url: '/showLevel',
        method: 'get',
    })
}
//添加等级内容import request from '@/utils/request'
export function addLevel(data) {
    return request({
        url: '/insertOneLevel',
        method: 'post',
        data
    })
}
//删除等级
export function delLevel(params) {
    return request({
        url: '/delOneLevel',
        method: 'get',
        params
    })
}