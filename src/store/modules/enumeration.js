import { getEnumDict } from '@src/api/enumDict';

const state = {
    city: [],
    bank: [],
    certType: [], // 证件类型
    nationality: [],
    ethnicity: [],
    employeeGrade: [], // 职级
    politicalStatus: [],
    contractStatus: [],
    abandonType: [],
    householdType: [],
    suitSize: [],
    eduGrade: [],
    academicDegree: [],
    workStatusList: [], // 员工状态
    policy: [], // 合同政策
    hireType: [], // 招聘类型,
    rpType: [], // 奖惩类型
    penaltyGrade: [], // 处罚等级
    relationshipList: [] // 与本人关系
};

const mutations = {
    SET_CITY: (state, city) => {
        state.city = city;
    },
    SET_BANK: (state, bank) => {
        state.bank = bank;
    },
    SET_CERTTYPE: (state, certType) => {
        state.certType = certType;
    },
    SET_NATIONALITY: (state, nationality) => {
        state.nationality = nationality;
    },
    SET_ETHNICITY: (state, ethnicity) => {
        state.ethnicity = ethnicity;
    },
    SET_EMPLOYEEGRADE: (state, employeeGrade) => {
        state.employeeGrade = employeeGrade;
    },
    SET_POLITICALSTATUS: (state, politicalStatus) => {
        state.politicalStatus = politicalStatus;
    },
    SET_CONTRACTSTATUS: (state, contractStatus) => {
        state.contractStatus = contractStatus;
    },
    SET_ABANDONTYPE: (state, abandonType) => {
        state.abandonType = abandonType;
    },
    SET_HOUSEHOLDTYPE: (state, householdType) => {
        state.householdType = householdType;
    },
    SET_SUITSIZE: (state, suitSize) => {
        state.suitSize = suitSize;
    },
    SET_EDUGRADE: (state, eduGrade) => {
        state.eduGrade = eduGrade;
    },
    SET_ACADEMICDEGREE: (state, academicDegree) => {
        state.academicDegree = academicDegree;
    },
    SET_EMPLOYEESTATUS: (state, workStatusList) => {
        state.workStatusList = workStatusList;
    },
    SET_RELATIONSHIP: (state, relationshipList) => {
        state.relationshipList = relationshipList;
    },
    SET_POLICY: (state, policy) => {
        state.policy = policy;
    },
    SET_HIRETYPE: (state, hireType) => {
        state.hireType = hireType;
    },
    SET_SALARYTYPE: (state, salaryType) => {
        state.salaryType = salaryType;
    },
    SET_RPTYPE: (state, rpType) => {
        state.rpType = rpType;
    },
    SET_PENALTYGRADE: (state, penaltyGrade) => {
        state.penaltyGrade = penaltyGrade;
    }
};

const enumType = {
    city: 'CITY', // 城市
    bank: 'BANK', // 银行
    cert_type: 'CERTTYPE', // 证件类型
    nationality: 'NATIONALITY', // 国籍
    ethnicity: 'ETHNICITY', // 民族
    employee_grade: 'EMPLOYEEGRADE', // 职级
    political_status: 'POLITICALSTATUS', // 政治面貌
    contract_status: 'CONTRACTSTATUS', // 合同状态
    abandon_type: 'ABANDONTYPE', // 放弃入职原因类别
    household_type: 'HOUSEHOLDTYPE', // 户口性质
    suit_size: 'SUITSIZE', // 衣服尺寸
    edu_grade: 'EDUGRADE', // 学历
    academic_degree: 'ACADEMICDEGREE', // 学位
    employee_status: 'EMPLOYEESTATUS', // 员工状态
    relationship: 'RELATIONSHIP', // 与本人关系
    policy: 'POLICY', // 合同政策
    hire_type: 'HIRETYPE', // 招聘类型
    salary_type: 'SALARYTYPE', // 支薪政策
    rp_type: 'RPTYPE', // 奖惩类型
    penalty_grade: 'PENALTYGRADE' // 处罚等级
};
const actions = {
    getEnumDict({ commit }, params) {
        // enumType[params] 获取正确的参数
        getEnumDict(params)
            .then(response => {
                const { data } = response;
                commit(`SET_${enumType[params]}`, data);
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
