const relation = {
    state: {
        isAbandonentry: false, // 放弃入职页面true展示，false，不展示
        isHadLeave: false, // 已经离职页面 true展示
        isTransRecord: false, // 异动记录 true 展示
        isImportResult: false, // 导入结果，true展示,
        resultInfo: {}, // 导入数据成功后的返货结果
        isImportRecord: false, // 导入记录
        recordStatus: 0, // 记录状态
        faildStatus: 1, // 导出失败数据
        isRegistration: false, // 登记表
        entryInfo: {}, // 待入职列表信息
        isFlag: false // 判断是待入职还是放弃入职待入职为false

    },
    mutations: {
        changeFlag(state, payload) {
            state.isFlag = payload;
        },
        changeAbandonShow(state, payload) {
            state.isAbandonentry = payload;
        },
        changeHadleave(state, payload) {
            state.isHadLeave = payload;
        },
        changeTransRecoed(state, payload) {
            state.isTransRecord = payload;
        },
        changeImportResult(state, payload) {
            state.isImportResult = payload;
        },
        getResult(state, payload) {
            state.resultInfo = payload;
        },
        changeImportRecord(state, payload) {
            state.isImportRecord = payload;
        },
        changeStatus(state, payload) {
            state.recordStatus = payload;
        },
        changeFailStatus(state, payload) {
            state.faildStatus = payload;
        },
        changeRegistration(state, payload) {
            state.isRegistration = payload;
        },
        changeEntryInfo(state, payload) {
            state.entryInfo = payload;
        }

    },
    actions: {

    }
};
export default relation;
