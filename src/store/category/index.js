const SESSION = sessionStorage.getItem('appCategoryIdList') && JSON.parse(sessionStorage.getItem('appCategoryIdList')) || [];

const state = {
    appCategoryIdList: SESSION.appCategoryIdList
}
// const SESSION = sessionStorage.getItem('appCategoryIdList') && JSON.parse(sessionStorage.getItem('appCategoryIdList')) || [];
// const state = {
//     appCategoryIdList: []
// }
const mutations = {
    getIdList (state, data) {
        state.appCategoryIdList = data
    }
}




export default {
    state,
    mutations
}