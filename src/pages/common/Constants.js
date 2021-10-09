import axios from 'axios'

function httpQuery(isPost, url, params) {
    return axios({
        method: isPost ? 'post' : 'get',
        url: url,
        params: undefined !== params ? params : '',
        timeout: 500
    })
}

export const testUrl = () => httpQuery(false, "http://127.0.0.1:8901/test/hello", {
    name: "李仁杰"
})
// 菜单
export const getMenuInfo = () => httpQuery(false, "http://127.0.0.1:8901/pandokola/menuInfo")
// 配置数据
export const getAllSystemSettingByPage = (pageStart, pageLimit) => httpQuery(false, "http://127.0.0.1:8901/pandokola/systemSettings",
    {
        pageStart: pageStart,
        pageLimit: pageLimit
    }
)
// 测试搜索
export const testSearch = (text) => httpQuery(true, "http://192.168.133.213:8901/pandokola/testSearch",
    {
        text: text
    })