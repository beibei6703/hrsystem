export const getKeyWord = data => {
    var templates = [];
    if (data.length) {
        for (var i = 0; i < data.length; i++) {
            if (data[i] === 'name') {
                templates.push({
                    prop: data[i],
                    label: '姓名',
                    type: 'model'
                });
            }
            if (data[i] === 'workCode') {
                templates.push({
                    prop: data[i],
                    label: '工号',
                    type: 'model'
                });
            }
            if (data[i] === 'nickname') {
                templates.push({
                    prop: 'nickname',
                    label: '花名',
                    type: 'normal'
                });
            }
            if (data[i] === 'sex') {
                templates.push({
                    prop: data[i],
                    label: '性别',
                    type: 'normal'
                });
            }
            if (data[i] === 'certTypeEname') {
                templates.push({
                    prop: data[i],
                    label: '证件类型',
                    type: 'normal'
                });
            }
            if (data[i] === 'certNo') {
                templates.push({
                    prop: data[i],
                    label: '证件号码',
                    type: 'normal'
                });
            }
            if (data[i] === 'mobile') {
                templates.push({
                    prop: data[i],
                    label: '手机号码',
                    type: 'normal'
                });
            }
            if (data[i] === 'email') {
                templates.push({
                    prop: data[i],
                    label: '公司邮箱',
                    type: 'normal'
                });
            }
            if (data[i] === 'joinDate') {
                templates.push({
                    prop: data[i],
                    label: '入职日期',
                    type: 'normal'
                });
            }
            if (data[i] === 'probation') {
                templates.push({
                    prop: data[i],
                    label: '试用期（月）',
                    type: 'normal'
                });
            }
            if (data[i] === 'securityLevel') {
                templates.push({
                    prop: data[i],
                    label: '安全级别',
                    type: 'normal'
                });
            }
            if (data[i] === 'birthday') {
                templates.push({
                    prop: data[i],
                    label: '生日',
                    type: 'normal'
                });
            }
            if (data[i] === 'married') {
                templates.push({
                    prop: data[i],
                    label: '是否已婚',
                    type: 'normal'
                });
            }
            if (data[i] === 'bankEname') {
                templates.push({
                    prop: data[i],
                    label: '银行名称',
                    type: 'normal'
                });
            }
            if (data[i] === 'cardNo') {
                templates.push({
                    prop: data[i],
                    label: '银行卡号',
                    type: 'normal'
                });
            }
            if (data[i] === 'cardOwner') {
                templates.push({
                    prop: data[i],
                    label: '银行卡持有人',
                    type: 'normal'
                });
            }
            if (data[i] === 'branchBank') {
                templates.push({
                    prop: data[i],
                    label: '开户支行',
                    type: 'normal'
                });
            }
            if (data[i] === 'houseDistrict') {
                templates.push({
                    prop: data[i],
                    label: '现居住地省市区',
                    type: 'normal'
                });
            }
            if (data[i] === 'nativePlace') {
                templates.push({
                    prop: data[i],
                    label: '籍贯',
                    type: 'normal'
                });
            }
            if (data[i] === 'householdPlace') {
                templates.push({
                    prop: data[i],
                    label: '户口所在地',
                    type: 'normal'
                });
            }
            if (data[i] === 'houseAddr') {
                templates.push({
                    prop: data[i],
                    label: '现居详细地址',
                    type: 'normal'
                });
            }
            if (data[i] === 'hadRecord') {
                templates.push({
                    prop: data[i],
                    label: '档案是否在公司内',
                    type: 'normal'
                });
            }
            if (data[i] === 'socialEmployDate') {
                templates.push({
                    prop: data[i],
                    label: '社会雇佣日',
                    type: 'normal'
                });
            }
            if (data[i] === 'university') {
                templates.push({
                    prop: data[i],
                    label: '毕业院校',
                    type: 'normal'
                });
            }
            if (data[i] === 'major') {
                templates.push({
                    prop: data[i],
                    label: '专业',
                    type: 'normal'
                });
            }
            if (data[i] === 'eduGradeEname') {
                templates.push({
                    prop: data[i],
                    label: '最高学历',
                    type: 'normal'
                });
            }
            if (data[i] === 'academicDegreeEname') {
                templates.push({
                    prop: data[i],
                    label: '最高学位',
                    type: 'normal'
                });
            }
            if (data[i] === 'graduateDate') {
                templates.push({
                    prop: data[i],
                    label: '毕业日期',
                    type: 'normal'
                });
            }
            if (data[i] === 'isLatePositive') {
                templates.push({
                    prop: data[i],
                    label: '是否延期转正',
                    type: 'normal'
                });
            }
          
            if (data[i] === 'departmentName') {
                templates.push({
                    prop: data[i],
                    label: '部门名称',
                    type: 'normal'
                });
            }
            if (data[i] === 'departmentTree') {
                templates.push({
                    prop: data[i],
                    label: '组织层级',
                    type: 'normal'
                });
            }
            if (data[i] === 'positionName') {
                templates.push({
                    prop: data[i],
                    label: '岗位',
                    type: 'normal'
                });
            }
            if (data[i] === 'contractCompanyName') {
                templates.push({
                    prop: data[i],
                    label: '合同签署公司',
                    type: 'normal'
                });
            }
            if (data[i] === 'contractStatusEname') {
                templates.push({
                    prop: data[i],
                    label: '合同状态',
                    type: 'normal'
                });
            }
            if (data[i] === 'contractCity') {
                templates.push({
                    prop: data[i],
                    label: '合同签署地',
                    type: 'normal'
                });
            }
            if (data[i] === 'policyEname') {
                templates.push({
                    prop: data[i],
                    label: '合同政策',
                    type: 'normal'
                });
            }
            if (data[i] === 'contractStartDate') {
                templates.push({
                    prop: data[i],
                    label: '合同开始日期',
                    type: 'normal'
                });
            }
            if (data[i] === 'contractEndDate') {
                templates.push({
                    prop: data[i],
                    label: '合同结束日期',
                    type: 'normal'
                });
            }
            if (data[i] === 'socialInsuranceCity') {
                templates.push({
                    prop: data[i],
                    label: '社保所在地',
                    type: 'normal'
                });
            }
            if (data[i] === 'employTypeName') {
                templates.push({
                    prop: data[i],
                    label: '雇佣类型',
                    type: 'normal'
                });
            }
            if (data[i] === 'salaryTypeEname') {
                templates.push({
                    prop: data[i],
                    label: '支薪政策',
                    type: 'normal'
                });
            }
            if (data[i] === 'employeeGradeEname') {
                templates.push({
                    prop: data[i],
                    label: '职级',
                    type: 'normal'
                });
            }
            if (data[i] === 'employeeStatusEname') {
                templates.push({
                    prop: data[i],
                    label: '员工状态',
                    type: 'normal'
                });
            }
            if (data[i] === 'cityEname') {
                templates.push({
                    prop: data[i],
                    label: '工作城市',
                    type: 'normal'
                });
            }
            if (data[i] === 'hrbpName') {
                templates.push({
                    prop: data[i],
                    label: 'HRBP',
                    type: 'normal'
                });
            }
            if (data[i] === 'leaderName') {
                templates.push({
                    prop: data[i],
                    label: '直接上级',
                    type: 'normal'
                });
            }
            if (data[i] === 'politicalStatusEname') {
                templates.push({
                    prop: data[i],
                    label: '政治面貌',
                    type: 'normal'
                });
            }
            if (data[i] === 'nationalityEname') {
                templates.push({
                    prop: data[i],
                    label: '国籍',
                    type: 'normal'
                });
            }
            if (data[i] === 'ethnicityEname') {
                templates.push({
                    prop: data[i],
                    label: '民族',
                    type: 'normal'
                });
            }
            if (data[i] === 'householdTypeEname') {
                templates.push({
                    prop: data[i],
                    label: '户口性质',
                    type: 'normal'
                });
            }
            if (data[i] === 'suitSizeEname') {
                templates.push({
                    prop: data[i],
                    label: '衣服尺码',
                    type: 'normal'
                });
            }
            if (data[i] === 'handlerName') {
                templates.push({
                    prop: data[i],
                    label: '招聘负责人',
                    type: 'normal'
                });
            }
            if (data[i] === 'positiveDate') {
                templates.push({
                    prop: data[i],
                    label: '转正日期',
                    type: 'normal'
                });
            }
            if (data[i] === 'probationEndDate') {
                templates.push({
                    prop: data[i],
                    label: '试用结束日期',
                    type: 'normal'
                });
            }
            if (data[i] === 'lastWorkDate') {
                templates.push({
                    prop: data[i],
                    label: '最后工作日',
                    type: 'normal'
                });
            }
            if (data[i] === 'contacterMobile') {
                templates.push({
                    prop: data[i],
                    label: '紧急联系人电话',
                    type: 'normal'
                });
            }
            if (data[i] === 'contacterAddress') {
                templates.push({
                    prop: data[i],
                    label: '紧急联系人地址',
                    type: 'normal'
                });
            }
            if (data[i] === 'contacterName') {
                templates.push({
                    prop: data[i],
                    label: '紧急联系人姓名',
                    type: 'normal'
                });
            }
            if (data[i] === 'relationshipEname') {
                templates.push({
                    prop: data[i],
                    label: '紧急联系人关系',
                    type: 'normal'
                });
            }
            if (data[i] === 'leaveDate') {
                templates.push({
                    prop: data[i],
                    label: '离职结薪日期',
                    type: 'normal'
                });
            }
            if (data[i] === 'leaveEffectDate') {
                templates.push({
                    prop: data[i],
                    label: '离职生效日期',
                    type: 'normal'
                });
            }
            if (data[i] === 'isCompleteTrain') {
                templates.push({
                    prop: data[i],
                    label: '是否完成新员工培训',
                    type: 'normal'
                });
            }
            if (data[i] === 'leaveReason') {
                templates.push({
                    prop: data[i],
                    label: '离职原因',
                    type: 'normal'
                });
            }
            if (data[i] === 'leaveConfirmId') {
                templates.push({
                    prop: data[i],
                    label: '离职确认',
                    type: 'normal'
                });
            }
            if (data[i] === 'rehireId') {
                templates.push({
                    prop: data[i],
                    label: '重新雇佣标识',
                    type: 'normal'
                });
            }
            if (data[i] === 'rehireDate') {
                templates.push({
                    prop: data[i],
                    label: '重新雇佣日期',
                    type: 'normal'
                });
            }

            if (data[i] === 'hireTypeEname') {
                templates.push({
                    prop: data[i],
                    label: '招聘类型',
                    type: 'normal'
                });
            }
            if (data[i] === 'teacherName') {
                templates.push({
                    prop: data[i],
                    label: '导师',
                    type: 'normal'
                });
            }
            if (data[i] === 'personalEmail') {
                templates.push({
                    prop: data[i],
                    label: '个人邮箱',
                    type: 'normal'
                });
            }
            if (data[i] === 'positionTypeName') {
                templates.push({
                    prop: data[i],
                    label: '职位类别',
                    type: 'normal'
                });
            }
            if (data[i] === 'positionSerialName') {
                templates.push({
                    prop: data[i],
                    label: '序列',
                    type: 'normal'
                });
            }
            if (data[i] === 'positionCategoryName') {
                templates.push({
                    prop: data[i],
                    label: '职类',
                    type: 'normal'
                });
            }
        }
        return templates;
    }
};
