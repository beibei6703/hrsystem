<template>
  <div class="tableCon">
    <div class="left-top">
      <div class="leftCons">
        <span class="workName">
          <span class="marginR">{{registInfo.positionName}}</span>
          <span class="marginR">{{registInfo.name}}</span>
          的员工入职登记表
        </span>
      </div>
      <div class="entrys">
        <el-button @click="getLooks" type="primary">预览</el-button>
        <el-button @click="getSave">保存</el-button>
      </div>
    </div>
    <div class="tables">
      <div class="itemlist">
        <span class="titlesSpan">基本信息</span>
        <div class="infoCon">
          <div class="items">
            <span class="itemtit">中文姓名</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.name"></el-input>
          </div>
          <div class="items">
            <span class="itemtit">性别</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.sex">
              <el-option
                :key="sexitem.id"
                :label="sexitem.name"
                :value="sexitem.id"
                v-for="sexitem in sexOptions"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">婚姻状况</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.married">
              <el-option
                :key="marryitem.id"
                :label="marryitem.name"
                :value="marryitem.id"
                v-for="marryitem in marryOptions"
              ></el-option>
            </el-select>
          </div>
          <div class="items itemsPosit">
            <span class="itemtit">导师</span>
            <el-input
              @input="getTeacher(1)"
              class="specinput"
              placeholder="请输入内容"
              v-model="registerInfoDetail.teacher"
            ></el-input>
            <div class="leaderlistCon" v-if="isTeacher">
              <ul>
                <li
                  :key="perItem.employeeId"
                  @click="getTeacherId(perItem)"
                  v-for="perItem in peopleList"
                >{{perItem.nickName}}({{perItem.name}})</li>
              </ul>
            </div>
            <div class="noshow" v-if="noTeacher && peopleList.length<=0">
              <span>查找不到员工</span>
            </div>
          </div>
          <div class="items">
            <span class="itemtit">花名</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.nickname"></el-input>
          </div>
          <div class="items">
            <span class="itemtit">衣服尺码</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.suitSizeEid">
              <el-option
                :key="suitITem.eid"
                :label="suitITem.ename"
                :value="suitITem.eid"
                v-for="suitITem in enumeration.suitSize"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">证件类型</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.certTypeEid">
              <el-option
                :key="certItem.eid"
                :label="certItem.ename"
                :value="certItem.eid"
                v-for="certItem in enumeration.certType"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">证件号码</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.certNo"></el-input>
          </div>
          <div class="items">
            <span class="itemtit">生日</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="registerInfoDetail.birthday"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items">
            <span class="itemtit">国籍</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.nationalityEid">
              <el-option
                :key="nationItem.eid"
                :label="nationItem.ename"
                :value="nationItem.eid"
                v-for="nationItem in enumeration.nationality"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">民族</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.ethnicityEid">
              <el-option
                :key="peoItem.eid"
                :label="peoItem.ename"
                :value="peoItem.eid"
                v-for="peoItem in enumeration.ethnicity"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">籍贯</span>
            <el-cascader
              :options="cityoption"
              :props="defaultParams1"
              clearable
              filterable
              placeholder="请输入或选择籍贯"
              v-model="nativePlace"
            ></el-cascader>
            <!-- <el-input placeholder="请输入内容" v-model="registerInfoDetail.nativePlace"></el-input> -->
          </div>
          <div class="items">
            <span class="itemtit">入职日期</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="registerInfoDetail.joinDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items">
            <span class="itemtit">社会雇佣日</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="registerInfoDetail.socialEmployDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items">
            <span class="itemtit">个人邮箱</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.personalEmail"></el-input>
          </div>
          <div class="items">
            <span class="itemtit">档案是否在公司内</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.hadRecord">
              <el-option
                :key="fileitem.id"
                :label="fileitem.name"
                :value="fileitem.id"
                v-for="fileitem in fileOptions"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">出生地</span>
            <el-cascader
              :options="cityoption"
              :props="defaultParams1"
              clearable
              filterable
              placeholder="请输入或选择出生地"
              v-model="birthPlace"
            ></el-cascader>
            <!-- <el-input placeholder="请输入内容" v-model="registerInfoDetail.birthPlace"></el-input> -->
          </div>
          <div class="items">
            <span class="itemtit">职称</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.positionalTitle"></el-input>
          </div>
          <div class="items">
            <span class="itemtit">政治面貌</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.politicalStatusEid">
              <el-option
                :key="politItem.eid"
                :label="politItem.ename"
                :value="politItem.eid"
                v-for="politItem in enumeration.politicalStatus"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">户口性质</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.householdTypeEid">
              <el-option
                :key="hoseItem.eid"
                :label="hoseItem.ename"
                :value="hoseItem.eid"
                v-for="hoseItem in enumeration.householdType"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">招聘类型</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.hireTypeEid">
              <el-option
                :key="hireItem.eid"
                :label="hireItem.ename"
                :value="hireItem.eid"
                v-for="hireItem in enumeration.hireType"
              ></el-option>
            </el-select>
          </div>
          <div class="items1">
            <span class="itemtit">HRBP</span>
            <el-input placeholder="请输入内容" readonly v-model="registerInfoDetail.hrbpName"></el-input>
          </div>
          <div class="items1 itemsPosit">
            <span class="itemtit">招聘负责人</span>
            <el-input
              @input="getTeacher(2)"
              class="specinput"
              placeholder="请输入内容"
              v-model="registerInfoDetail.handlerName"
            ></el-input>
            <div class="leaderlistCon" v-if="isHandlerName">
              <ul>
                <li
                  :key="perItem.employeeId"
                  @click="getTeacherId(perItem)"
                  v-for="perItem in peopleList"
                >{{perItem.nickName}}({{perItem.name}})</li>
              </ul>
            </div>
            <div class="noshow" v-if="noHandlerName && peopleList.length<=0">
              <span>查找不到员工</span>
            </div>
          </div>
          <div class="items1">
            <span class="itemtit">账户持有人</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.cardOwner"></el-input>
          </div>
          <div class="items1">
            <span class="itemtit">银行名称</span>
            <el-input
              placeholder="请输入内容"
              readonly
              v-if="registerInfoDetail.contract"
              v-model="registerInfoDetail.contract.bankEname"
            ></el-input>
          </div>
          <div class="items1">
            <span class="itemtit">银行账号</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.cardNo"></el-input>
          </div>
          <div class="items1">
            <span class="itemtit">开户行全称</span>
            <el-select
            filterable
              @change="getbankCode"
              placeholder="请选择"
              v-model="registerInfoDetail.branchBank"
            >
              <el-option
                :key="subItem.CODE"
                :label="subItem.NAME"
                :value="subItem.NAME"
                v-for="subItem in subBankList"
              ></el-option>
            </el-select>
            <!-- <el-input placeholder="请输入内容" v-model="registerInfoDetail.branchBank"></el-input> -->
          </div>
        </div>
      </div>
      <div class="itemlist" v-if="workInfo.length>0">
        <span class="titlesSpan">工作经历</span>
        <div class="infoCon" v-for="(workitem,index) in workInfo" :key="index">
          <div class="items1">
            <span class="itemtit">工作单位</span>
            <el-input
              maxlength="20"
              @blur="onblurs('company',workitem.company)"
              placeholder="请输入内容"
              v-model="workitem.company"
            ></el-input>
          </div>
          <div class="items">
            <span class="itemtit">担任职务</span>
            <el-input
              maxlength="10"
              @blur="onblurs('position',workitem.position)"
              placeholder="请输入内容"
              v-model="workitem.position"
            ></el-input>
          </div>
          <div class="items">
            <span class="itemtit">开始日期</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="workitem.startDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items">
            <span class="itemtit">结束日期</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="workitem.endDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items">
            <span class="itemtit">证明人</span>
            <el-input
              maxlength="10"
              @blur="onblurs('witness',workitem.witness)"
              placeholder="请输入内容"
              v-model="workitem.witness"
            ></el-input>
          </div>
          <div class="items">
            <span class="itemtit">联系方式</span>
            <el-input
              maxlength="20"
              @blur="onblurs('witnessMobile',workitem.witnessMobile)"
              placeholder="请输入内容"
              v-model="workitem.witnessMobile"
            ></el-input>
          </div>
          <div class="items1">
            <span class="itemtit">工作地点</span>
            <el-input
              maxlength="30"
              @blur="onblurs('address',workitem.address)"
              placeholder="请输入内容"
              v-model="workitem.address"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="itemlist">
        <span class="titlesSpan">受教育情况</span>
        <div class="infoCon">
          <div class="items">
            <span class="itemtit">最高学历</span>
            <el-select
              placeholder="请选择"
              v-if="registerInfoDetail.lastEducation"
              v-model="registerInfoDetail.lastEducation.eduGradeEid"
            >
              <el-option
                :key="eduGitem.eid"
                :label="eduGitem.ename"
                :value="eduGitem.eid"
                v-for="eduGitem in enumeration.eduGrade"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">最高学位</span>
            <el-select
              placeholder="请选择"
              v-if="registerInfoDetail.lastEducation"
              v-model="registerInfoDetail.lastEducation.academicDegreeEid"
            >
              <el-option
                :key="degreeItem.eid"
                :label="degreeItem.ename"
                :value="degreeItem.eid"
                v-for="degreeItem in enumeration.academicDegree"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">毕业日期</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-if="registerInfoDetail.lastEducation"
              v-model="registerInfoDetail.lastEducation.graduateDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items1">
            <span class="itemtit">专业</span>
            <el-input
              placeholder="请输入内容"
              v-if="registerInfoDetail.lastEducation"
              v-model="registerInfoDetail.lastEducation.major"
            ></el-input>
          </div>
          <div class="items1">
            <span class="itemtit">毕业学校</span>
            <el-input
              placeholder="请输入内容"
              v-if="registerInfoDetail.lastEducation"
              v-model="registerInfoDetail.lastEducation.university"
            ></el-input>
          </div>
          <div class="items">
            <span class="itemtit">第一学历</span>
            <el-select
              placeholder="请选择"
              v-if="registerInfoDetail.lastEducation"
              v-model="registerInfoDetail.firstEducation.eduGradeEid"
            >
              <el-option
                :key="eduitem.eid"
                :label="eduitem.ename"
                :value="eduitem.eid"
                v-for="eduitem in enumeration.eduGrade"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">第一学位</span>
            <el-select
              placeholder="请选择"
              v-if="registerInfoDetail.firstEducation"
              v-model="registerInfoDetail.firstEducation.academicDegreeEid"
            >
              <el-option
                :key="degreeItem.eid"
                :label="degreeItem.ename"
                :value="degreeItem.eid"
                v-for="degreeItem in enumeration.academicDegree"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">毕业时间</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-if="registerInfoDetail.firstEducation"
              v-model="registerInfoDetail.firstEducation.graduateDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items1">
            <span class="itemtit">专业</span>
            <el-input
              placeholder="请输入内容"
              v-if="registerInfoDetail.firstEducation"
              v-model="registerInfoDetail.firstEducation.major"
            ></el-input>
          </div>
          <div class="items1">
            <span class="itemtit">毕业学校</span>
            <el-input
              placeholder="请输入内容"
              v-if="registerInfoDetail.firstEducation"
              v-model="registerInfoDetail.firstEducation.university"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="itemlist">
        <span class="titlesSpan">家庭情况</span>
        <div class="infoCon">
          <div class="items1">
            <span class="itemtit">本人联系电话</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.mobile"></el-input>
          </div>
          <div class="items1">
            <span class="itemtit">户籍地址</span>
            <el-cascader
              :options="cityoption"
              :props="defaultParams1"
              clearable
              filterable
              placeholder="请选择户籍地址"
              v-model="householdPlace"
            ></el-cascader>
            <el-input
              placeholder="详细地址"
              style="margin-left:10px"
              v-model="registerInfoDetail.householdPlaceAddr"
            ></el-input>
          </div>
          <div class="itemsL">
            <span class="itemtit">现居住地址</span>
            <div class="addressCon">
              <el-cascader
                :options="cityoption"
                :props="defaultParams1"
                clearable
                filterable
                placeholder="请输入或选择现居地址"
                v-model="houseDistrict"
              ></el-cascader>
              <el-input placeholder="具体地址" v-model="registerInfoDetail.houseAddr"></el-input>
            </div>
          </div>
          <div class="items">
            <span class="itemtit">紧急联系人</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.contacterName"></el-input>
          </div>
          <div class="items">
            <span class="itemtit">与本人关系</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.relationshipEid">
              <el-option
                :key="relationItem.eid"
                :label="relationItem.ename"
                :value="relationItem.eid"
                v-for="relationItem in enumeration.relationshipList"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">紧急联系人电话</span>
            <el-input placeholder="请输入内容" v-model="registerInfoDetail.contacterMobile"></el-input>
          </div>
        </div>
      </div>
      <div class="itemlist">
        <span class="titlesSpan">雇佣信息</span>
        <div class="infoCon">
          <div class="items">
            <span class="itemtit">组织架构</span>
            <el-cascader
              :options="treeOption"
              :props="defaultParams"
              :show-all-levels="false"
              @change="gethrbp"
              clearable
              filterable
              placeholder="请输入或选择部门"
              v-model="departmentName"
            ></el-cascader>
          </div>
          <div class="items">
            <span class="itemtit">所属公司</span>
            <el-select
              @change="getBankDetail"
              placeholder="请选择"
              v-if="registerInfoDetail.contract"
              v-model="registerInfoDetail.contract.contractCompanyId"
            >
              <el-option
                :key="companyItem.id"
                :label="companyItem.name"
                :value="companyItem.id"
                v-for="companyItem in contractCompanyList"
              ></el-option>
            </el-select>
          </div>
          <div class="items itemsPosit">
            <span class="itemtit">上级主管</span>
            <el-input
              @input="getTeacher(3)"
              class="specinput"
              placeholder="请输入内容"
              v-model="registerInfoDetail.leaderName"
            ></el-input>
            <div class="leaderlistCon" v-if="isLeader">
              <ul>
                <li
                  :key="perItem.employeeId"
                  @click="getTeacherId(perItem)"
                  v-for="perItem in peopleList"
                >{{perItem.nickName}}({{perItem.name}})</li>
              </ul>
            </div>
            <div class="noshow" v-if="noLeader && peopleList.length<=0">
              <span>查找不到员工</span>
            </div>
          </div>
          <div class="items">
            <span class="itemtit">职级</span>
            <el-select class="inputIcon" clearable v-model="registerInfoDetail.employeeGradeEid">
              <el-option
                :key="gradeitem.eid"
                :label="gradeitem.ename"
                :value="gradeitem.eid"
                v-for="gradeitem in enumeration.employeeGrade"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">职位类别</span>
            <el-select
              filterable
              @change="getPostLists"
              placeholder="请选择"
              v-if="positionTypeList.length>0"
              v-model="registerInfoDetail.positionTypeId"
            >
              <el-option
                :key="positTypeItem.id"
                :label="positTypeItem.name"
                :value="positTypeItem.id"
                v-for="positTypeItem in positionTypeList"
              ></el-option>
            </el-select>
            <!-- <el-input
              placeholder="请输入内容"
              readonly
              v-else
              v-model="registerInfoDetail.positionCategory"
            ></el-input>-->
          </div>
          <div class="items">
            <span class="itemtit">中文岗位</span>
            <el-select
              class="inputIcon"
              clearable
              filterable
              v-model="registerInfoDetail.positionId"
            >
              <el-option
                :key="posititem.id"
                :label="posititem.name"
                :value="posititem.id"
                v-for="posititem in positionList"
              ></el-option>
            </el-select>
          </div>

          <div class="items">
            <span class="itemtit">职类</span>
            <el-input placeholder="请输入内容" readonly v-model="registerInfoDetail.positionCategory"></el-input>
          </div>
          <div class="items">
            <span class="itemtit">序列</span>
            <el-input placeholder="请输入内容" readonly v-model=" registerInfoDetail.positionSerial"></el-input>
          </div>
          <div class="items">
            <span class="itemtit">发展通道</span>
            <el-input placeholder="请输入内容" readonly v-model=" registerInfoDetail.developWay"></el-input>
          </div>
          <div class="items">
            <span class="itemtit">雇佣类型</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.employTypeId">
              <el-option
                :key="employs.id"
                :label="employs.name"
                :value="employs.id"
                v-for="employs in employTypelist"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">合同政策</span>
            <el-input placeholder="请输入内容" readonly v-model="registerInfoDetail.policyEname"></el-input>
          </div>
          <div class="items emilSPan">
            <span class="itemtit">工作邮箱</span>
            <el-input class="emailinput" placeholder="请输入" v-model="registerInfoDetail.email">
              <template slot="append">@api.com</template>
            </el-input>
            <!-- <span class="emails">@api.com</span> -->
          </div>
          <div class="items">
            <span class="itemtit">社保所在地</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.socialInsurancePlaceEid">
              <el-option
                :key="socialItem.eid"
                :label="socialItem.ename"
                :value="socialItem.eid"
                v-for="socialItem in enumeration.city"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">工作城市</span>
            <el-select placeholder="请选择" v-model="registerInfoDetail.cityEid">
              <el-option
                :key="workItem.eid"
                :label="workItem.ename"
                :value="workItem.eid"
                v-for="workItem in enumeration.city"
              ></el-option>
            </el-select>
            <!-- <el-input placeholder="请输入内容" v-model="registerInfoDetail.cityEname"></el-input> -->
          </div>
          <div class="items">
            <span class="itemtit">合同签署地</span>
            <el-select
              placeholder="请选择"
              v-if="registerInfoDetail.contract"
              v-model="registerInfoDetail.contract.cityEid"
            >
              <el-option
                :key="contractS.eid"
                :label="contractS.ename"
                :value="contractS.eid"
                v-for="contractS in enumeration.city"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">是否有试用期</span>
            <span
              class="specSpn"
              v-if="registerInfoDetail.contract.probation !==null && registerInfoDetail.contract.probation>0"
            >是</span>
            <span class="specSpn" v-else>否</span>
          </div>
          <div class="items">
            <span class="itemtit">试用期月数</span>
            <el-select
              @change="getend"
              placeholder="请选择"
              v-if="registerInfoDetail.contract"
              v-model="registerInfoDetail.contract.probation"
            >
              <el-option
                :key="probatitem.id"
                :label="probatitem.name"
                :value="probatitem.id"
                v-for="probatitem in probationList"
              ></el-option>
            </el-select>
          </div>
          <div class="items">
            <span class="itemtit">试用期结束日期</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-if="registerInfoDetail.contract"
              v-model="registerInfoDetail.probationEndDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items">
            <span class="itemtit">合同开始日</span>
            <el-date-picker
              @change="getSoicalMonth"
              placeholder="选择日期"
              type="date"
              v-if="registerInfoDetail.contract"
              v-model="registerInfoDetail.contract.startDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items">
            <span class="itemtit">合同截止日</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-if="registerInfoDetail.contract"
              v-model="registerInfoDetail.contract.endDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="items">
            <span class="itemtit">合同签订状态</span>
            <el-input placeholder="请输入内容" readonly v-model="registerInfoDetail.contractPolicy"></el-input>
          </div>
          <div class="itemsL">
            <span class="itemtit">社保、公积金缴交起始月份</span>
            <el-input
              placeholder="请输入内容"
              readonly
              v-if="registerInfoDetail.contract"
              v-model="registerInfoDetail.socialInsuranceStartMonth"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    // entryTableDetail,
    editEntryInfo,
    // positTypes,
    bankByBankName,
    bankDetail,
    peopleByName,
    getpositionTypeList, // 岗位类别
    getPostList // 岗位列表
} from '@src/api/relation/index.js';
import { getDepartmentName } from '@src/api/roster/index.js';
import { getHrm } from '@src/api/organization/organize.js';
import { getContractCompany } from '@src/api/baseSetting/contract.js';
import qs from 'qs';
import { mapGetters } from 'vuex';
import { getEmployType } from '@src/api/baseSetting/employ.js';
import { departmentDetail } from '@src/api/organization/department.js';
import { city } from '@src/utils/city.js';
export default {
    name: 'RegisterEdit',
    props: ['registerInfoDetail', 'registInfo', 'isEdit', 'workInfo'],

    data() {
        return {
            employeeWorkHist: [],
            departmentName: [], // 部门,
            defaultParams1: {
                children: 'children',
                label: 'label',
                value: 'label',
                checkStrictly: true
            },
            birthPlace: [], // 出生地
            nativePlace: [], // 籍贯
            householdPlace: [], // 户籍
            houseDistrict: [], // 现居地址
            subBankList: [], // 支行
            sexOptions: [
                {
                    id: 0,
                    name: '未知'
                },
                {
                    id: 1,
                    name: '男'
                },
                {
                    id: 2,
                    name: '女'
                }
            ],
            marryOptions: [
                {
                    id: 0,
                    name: '未婚'
                },
                {
                    id: 1,
                    name: '已婚'
                }
            ],
            fileOptions: [
                {
                    id: 0,
                    name: '否'
                },
                {
                    id: 1,
                    name: '是'
                }
            ],
            employTypelist: [],
            categoryList: [], // 职类
            input: '',
            options: [],
            value: '',
            value1: '',
            sex: '',
            serialList: [], // 序列
            cityoption: [],
            positionList: [], // 岗位列表
            positionTypeList: [], // 岗位类别
            probationList: [
                {
                    id: 0,
                    name: '0'
                },
                {
                    id: 1,
                    name: '1个月'
                },
                {
                    id: 3,
                    name: '3个月'
                },
                {
                    id: 6,
                    name: '6个月'
                }
            ], // 试用期option
            peopleList: [], // 人员leader，teacher
            isTeacher: false, // 是否展示人员列表
            noTeacher: true, // 导师列表为空
            isHandlerName: false,
            noHandlerName: true, // 招聘负责人为空
            isLeader: false,
            noLeader: true, // leader列表为空
            treeOption: [],
            contractCompanyList: [], // 合同签署公司
            defaultParams: {
                children: 'childrenDepartment',
                label: 'name',
                value: 'name',
                checkStrictly: true
            },
            type: ''
            // registerInfoDetail: {}
        };
    },
    computed: {
    // 证件类型
        ...mapGetters(['enumeration'])
    },
    created() {
        this.cityoption = this.getTreeData(city);
        this.getCompanyList();
        this.getDepart();
        // this.getDetail();
        this.$store.dispatch('enumeration/getEnumDict', 'cert_type');
        // 合同签署地 社保所在地 工作城市：
        this.$store.dispatch('enumeration/getEnumDict', 'city');
        // 职级
        this.$store.dispatch('enumeration/getEnumDict', 'employee_grade');
        // 员工尺码
        this.$store.dispatch('enumeration/getEnumDict', 'suit_size');
        // 招聘类型
        this.$store.dispatch('enumeration/getEnumDict', 'hire_type');
        // 国籍
        this.$store.dispatch('enumeration/getEnumDict', 'nationality');
        // 银行
        if (this.registerInfoDetail.contract.contractCompanyId) {
            this.getBank();
        }
        // this.$store.dispatch('enumeration/getEnumDict', 'bank');
        // 民族
        this.$store.dispatch('enumeration/getEnumDict', 'ethnicity');
        // 政治面貌
        this.$store.dispatch('enumeration/getEnumDict', 'political_status');
        // 户口性质
        this.$store.dispatch('enumeration/getEnumDict', 'household_type');
        // 与本人关系relationship
        this.$store.dispatch('enumeration/getEnumDict', 'relationship');
        // 合同政策policy
        this.$store.dispatch('enumeration/getEnumDict', 'policy');
        // 学位academic_degree
        this.$store.dispatch('enumeration/getEnumDict', 'academic_degree');
        // 学历edu_grade
        this.$store.dispatch('enumeration/getEnumDict', 'edu_grade');
        // this.getPositionList();
        this.getPositionType();
        if (this.registerInfoDetail.positionTypeId) {
            this.getpostFn();
        }
        // 雇佣类型
        this.getemployTypes();

    // 职类
    // this.getCategoryType();
    },
    mounted() {
        if (this.registerInfoDetail) {
            if (this.registerInfoDetail.birthPlace) {
                this.birthPlace = this.registerInfoDetail.birthPlace.split('/');
            }
            if (this.registerInfoDetail.nativePlace) {
                this.nativePlace = this.registerInfoDetail.nativePlace.split('/');
            }
            if (this.registerInfoDetail.householdPlace) {
                this.householdPlace = this.registerInfoDetail.householdPlace.split('/');
            }
            if (this.registerInfoDetail.houseDistrict) {
                this.houseDistrict = this.registerInfoDetail.houseDistrict.split('/');
            }
            if (this.registerInfoDetail.departmentTree) {
                this.departmentName = this.registerInfoDetail.departmentTree.split('/');
                this.departId = this.registerInfoDetail.departmentId;
            }
            if (this.registerInfoDetail.email) {
                var indexs = this.registerInfoDetail.email.indexOf('@');
                var temp = this.registerInfoDetail.email.split('');
                temp.splice(indexs);
                this.registerInfoDetail.email = temp.join('');
            }
        }
        // 银行支行
        if (this.registerInfoDetail.contract.bankEname) {
            this.getSubBank();
        }
        document.addEventListener('click', e => {
            if (e.target.className !== 'specinput') {
                this.isTeacher = false;
                this.isHandlerName = false;
                this.isLeader = false;
                this.noTeacher = false;
                this.noLeader = false;
                this.noHandlerName = false;
            }
        });
    },
    methods: {
    // 获取岗位类别
        getPositionType() {
            getpositionTypeList().then(res => {
                if (res.success && res.data) {
                    this.positionTypeList = res.data;
                }
            });
        },
        // 验证长度
        onblurs(type, value) {
            if (type === 'company') {
                if (value.length > 20) {
                    this.errorMsg('工作单位长度不超过20字');
                }
            }
            if (type === 'address') {
                if (value.length > 30) {
                    this.errorMsg('工作地点长度不超过20字');
                }
            }
            if (type === 'position') {
                if (value.length > 10) {
                    this.errorMsg('担任职务长度不超过20字');
                }
            }
            if (type === 'witness') {
                if (value.length > 10) {
                    this.errorMsg('证明人长度不超过10字');
                }
            }
            if (type === 'witnessMobile') {
                if (value.length > 20) {
                    this.errorMsg('证明人联系方式长度不超过20字');
                }
            }
        },
        // 岗位类别获取岗位
        getpostFn() {
            const parms = qs.stringify({
                typeId: this.registerInfoDetail.positionTypeId
            });
            getPostList(parms).then(res => {
                if (res.success && res.data) {
                    this.positionList = res.data;
                }
            });
        },
        // 职位类别查岗位
        getPostLists(val) {
            this.registerInfoDetail.positionCategory = '';
            this.registerInfoDetail.positionSerial = '';
            this.positionList = [];
            this.registerInfoDetail.positionId = '';
            this.getpostFn();
            if (this.positionTypeList.length > 0) {
                const types = this.positionTypeList;
                for (var i = 0; i < types.length; i++) {
                    if (this.positionTypeList[i].id === val) {
                        this.registerInfoDetail.positionCategory = types[i].positionCategoryName;
                        this.registerInfoDetail.positionSerial = types[i].positionSerialName;
                        this.registerInfoDetail.developWay =
              types[i].positionCategoryName + '--' + types[i].positionSerialName;
                        return;
                    }
                }
            }
        },
        // 银行支行code
        getbankCode(val) {
            if (this.subBankList.length > 0) {
                var subBanks = this.subBankList;
                for (var i = 0; i < subBanks.length; i++) {
                    if (val === subBanks[i].NAME) {
                        this.registerInfoDetail.branchBankId = subBanks[i].CODE;
                        return;
                    }
                }
            }
        },
        getend(val) {
            // 根据选择是的试用期约束获取试用期结束日期
            if (this.registerInfoDetail.contract.startDate !== null) {
                var dates = this.registerInfoDetail.contract.startDate.split('-');
                var Month = parseInt(dates[1]) + val;
                var day = parseInt(dates[2]) - 1;
                dates[1] = Month;
                dates[2] = day;
                var dateNew = dates.join('-');
                this.registerInfoDetail.probationEndDate = dateNew;
            }
        },
        // 合同签署公司id确定银行
        getBankDetail(val) {
            this.registerInfoDetail.contract.contractCompanyId = val;
            if (this.registerInfoDetail.contract.contractCompanyId) {
                this.getBank();
            }
        },
        getPeople(parms) {
            peopleByName(parms).then(res => {
                if (res.success) {
                    if (res.data.length) {
                        if (this.type === 1) {
                            this.isTeacher = true;
                            this.noTeacher = false;
                        } else if (this.type === 2) {
                            this.isHandlerName = true;
                            this.noHandlerName = false;
                        } else if (this.type === 3) {
                            this.isLeader = true;
                            this.noLeader = false;
                        }
                        this.peopleList = res.data;
                    } else {
                        this.isTeacher = false;
                        this.isHandlerName = false;
                        this.isLeader = false;
                        if (this.type === 1) {
                            this.noTeacher = true;
                        } else if (this.type === 2) {
                            this.noHandlerName = true;
                        } else if (this.type === 3) {
                            this.noLeader = true;
                        }
                    }
                } else {
                    this.peopleList = [];
                    this.isTeacher = false;
                    if (this.type === 1) {
                        this.noTeacher = true;
                    } else if (this.type === 2) {
                        this.noHandlerName = true;
                    } else if (this.type === 3) {
                        this.noLeader = true;
                    }
                }
            });
        },
        // 输入查询导师
        getTeacher(num) {
            this.type = num;
            this.peopleList = [];
            if (this.type === 1) {
                if (this.registerInfoDetail.teacher.length) {
                    const parms = qs.stringify({
                        name: this.registerInfoDetail.teacher
                    });
                    this.getPeople(parms);
                } else {
                    this.isTeacher = false;
                    this.noTeacher = false;
                }
            } else if (this.type === 2) {
                if (this.registerInfoDetail.handlerName.length) {
                    const parms = qs.stringify({
                        name: this.registerInfoDetail.handlerName
                    });
                    this.getPeople(parms);
                } else {
                    this.isHandlerName = false;
                    this.noHandlerName = false;
                }
            } else if (this.type === 3) {
                if (this.registerInfoDetail.leaderName.length) {
                    const parms = qs.stringify({
                        name: this.registerInfoDetail.leaderName
                    });
                    this.getPeople(parms);
                } else {
                    this.isLeader = false;
                    this.noLeader = false;
                }
            }
        },
        getTeacherId(val) {
            if (this.type === 1) {
                this.registerInfoDetail.teacherId = val.employeeId;
                this.registerInfoDetail.teacher = val.name;
                this.isTeacher = false;
            } else if (this.type === 2) {
                this.registerInfoDetail.handlerId = val.employeeId;
                this.registerInfoDetail.handlerName = val.name;
                this.isHandlerName = false;
            } else if (this.type === 3) {
                this.registerInfoDetail.leaderId = val.employeeId;
                this.registerInfoDetail.leaderName = val.name;
                this.isLeader = false;
            }
        },
        // 合同开始日期算出社保日期
        getSoicalMonth(val) {
            this.registerInfoDetail.socialInsuranceStartMonth = '';
            var endDates;
            const timeArr = val.split('-');
            var MonthDay = timeArr[1];
            // 合同开始日期算合同结束日期
            if (MonthDay > 2 && MonthDay < 9) {
                endDates = parseInt(timeArr[0]) + 3 + '-' + '9-01';
                this.registerInfoDetail.contract.endDate = endDates;
            } else {
                endDates = parseInt(timeArr[0]) + 4 + '-' + '3-01';
                this.registerInfoDetail.contract.endDate = endDates;
            }

            const socialtime = timeArr.pop();
            if (socialtime <= 15) {
                this.registerInfoDetail.socialInsuranceStartMonth = timeArr.join('-');
            } else {
                timeArr[1] = parseInt(timeArr[1]) + 1;
                this.registerInfoDetail.socialInsuranceStartMonth = timeArr.join('-');
            }
            // 合同开始日期算试用期结束日期
            if (this.registerInfoDetail.contract.startDate !== null) {
                var dates = this.registerInfoDetail.contract.startDate.split('-');
                var Month = parseInt(dates[1]) + this.registerInfoDetail.contract.probation;
                dates[1] = Month;
                dates[2] = parseInt(dates[2]) - 1;
                var dateNew = dates.join('-');
                this.registerInfoDetail.probationEndDate = dateNew;
            }
        },
        // 根据合同签署公司获取银行
        getBank() {
            const parms = qs.stringify({
                id: this.registerInfoDetail.contract.contractCompanyId
            });
            bankDetail(parms).then(res => {
                if (res.success && res.data) {
                    this.registerInfoDetail.contract.bankEname = res.data.bankEname;
                    if (this.registerInfoDetail.contract.bankEname) {
                        this.getSubBank();
                    }
                }
            });
        },
        // 根据部门查询hrbp
        gethrbp(val) {
            const depart = qs.stringify({
                departmentName: val[val.length - 1]
            });
            getDepartmentName(depart).then(res => {
                if (res.success && res.data) {
                    this.departId = res.data[0].id;
                    const parms = {
                        id: res.data[0].id
                    };
                    departmentDetail(parms).then(res => {
                        if (res.success) {
                            if (res.data) {
                                this.registerInfoDetail.hrbpName = res.data.hrbp;
                                this.registerInfoDetail.hrbpId = res.data.hrbpId;
                            }
                        }
                    });
                }
            });
        },
        // 获取支行全称
        getSubBank() {
            const parms = qs.stringify({
                bankName: this.registerInfoDetail.contract.bankEname
            });
            bankByBankName(parms).then(res => {
                if (res.success) {
                    if (res.data) {
                        this.subBankList = res.data;
                    }
                }
            });
        },

        // 部门
        getDepart() {
            getHrm().then(res => {
                if (res.success && res.data) {
                    this.treeOption = this.getTreeData(res.data.childrenDepartment);
                }
            });
        },
        // 获取合同签署公司列表
        getCompanyList() {
            getContractCompany().then(res => {
                if (res.success && res.data) {
                    this.contractCompanyList = res.data;
                }
            });
        },
        // 预览
        getLooks() {
            this.$emit('changeLooks');
        },
        // 雇佣类型
        getemployTypes() {
            getEmployType().then(res => {
                if (res.success && res.data) {
                    this.employTypelist = res.data;
                }
            });
        },
        // 保存
        getSave() {
            this.employeeWorkHist = [];
            if (this.workInfo && this.workInfo.length > 0) {
                for (var i = 0; i < this.workInfo.length; i++) {
                    this.employeeWorkHist.push({
                        id: this.workInfo[i].id,
                        startDate: this.workInfo[i].startDate,
                        endDate: this.workInfo[i].endDate,
                        company: this.workInfo[i].company,
                        address: this.workInfo[i].address,
                        position: this.workInfo[i].position,
                        witness: this.workInfo[i].witness,
                        witnessMobile: this.workInfo[i].witnessMobile
                    });
                }
            }
            const parms = {
                name: this.registerInfoDetail.name,
                sex: this.registerInfoDetail.sex,
                joinDate: this.registerInfoDetail.joinDate,
                hrbpId: this.registerInfoDetail.hrbpId,
                departmentId: this.departId,
                employTypeId: this.registerInfoDetail.employTypeId,
                employeeGradeEid: this.registerInfoDetail.employeeGradeEid,
                positionId: this.registerInfoDetail.positionId,
                positionTypeId: this.registerInfoDetail.positionTypeId,
                cityEid: this.registerInfoDetail.cityEid,
                contractCityEid: this.registerInfoDetail.contract.cityEid,
                contractCompanyId: this.registerInfoDetail.contract.contractCompanyId,
                mobile: this.registerInfoDetail.mobile,
                startDate: this.registerInfoDetail.contract.startDate,
                endDate: this.registerInfoDetail.contract.endDate,
                probation: this.registerInfoDetail.contract.probation,
                probationEndDate: this.registerInfoDetail.probationEndDate,
                handlerId: this.registerInfoDetail.handlerId,
                hireTypeEid: this.registerInfoDetail.hireTypeEid,
                // 导师
                teacherId: this.registerInfoDetail.teacherId,
                certTypeEid: this.registerInfoDetail.certTypeEid,
                rehireId: this.registerInfoDetail.rehireId,
                id: this.registerInfoDetail.id,
                certNo: this.registerInfoDetail.certNo,
                nickname: this.registerInfoDetail.nickname,
                suitSizeEid: this.registerInfoDetail.suitSizeEid,
                birthday: this.registerInfoDetail.birthday,
                married: this.registerInfoDetail.married,
                ethnicityEid: this.registerInfoDetail.ethnicityEid,
                nationalityEid: this.registerInfoDetail.nationalityEid,
                socialEmployDate: this.registerInfoDetail.socialEmployDate,
                // nativePlace: this.registerInfoDetail.nativePlace,
                nativePlace: this.nativePlace.join('/'),
                hadRecord: this.registerInfoDetail.hadRecord,
                personalEmail: this.registerInfoDetail.personalEmail,
                positionalTitle: this.registerInfoDetail.positionalTitle,
                // birthPlace: this.registerInfoDetail.birthPlace,
                birthPlace: this.birthPlace.join('/'),
                householdTypeEid: this.registerInfoDetail.householdTypeEid,
                politicalStatusEid: this.registerInfoDetail.politicalStatusEid,
                householdPlace: this.householdPlace.join('/'),
                householdPlaceAddr: this.registerInfoDetail.householdPlaceAddr,
                // houseAddr: this.registerInfoDetail.houseAddr,
                houseDistrict: this.houseDistrict.join('/'),
                houseAddr: this.registerInfoDetail.houseAddr,
                contacterName: this.registerInfoDetail.contacterName,
                relationshipEid: this.registerInfoDetail.relationshipEid,
                contacterMobile: this.registerInfoDetail.contacterMobile,
                firstEducation: {
                    eduGradeEid: this.registerInfoDetail.firstEducation.eduGradeEid,
                    academicDegreeEid: this.registerInfoDetail.firstEducation.academicDegreeEid,
                    graduateDate: this.registerInfoDetail.firstEducation.graduateDate,
                    major: this.registerInfoDetail.firstEducation.major,
                    university: this.registerInfoDetail.firstEducation.university
                },
                lastEducation: {
                    eduGradeEid: this.registerInfoDetail.lastEducation.eduGradeEid,
                    academicDegreeEid: this.registerInfoDetail.lastEducation.academicDegreeEid,
                    graduateDate: this.registerInfoDetail.lastEducation.graduateDate,
                    major: this.registerInfoDetail.lastEducation.major,
                    university: this.registerInfoDetail.lastEducation.university
                },
                cardOwner: this.registerInfoDetail.cardOwner,
                cardNo: this.registerInfoDetail.cardNo,
                branchBank: this.registerInfoDetail.branchBank,
                branchBankId: this.registerInfoDetail.branchBankId,
                email: this.registerInfoDetail.email
                    ? this.registerInfoDetail.email + '@api.com'
                    : '',
                socialInsurancePlaceEid: this.registerInfoDetail.socialInsurancePlaceEid,
                socialInsuranceStartMonth: this.registerInfoDetail.socialInsuranceStartMonth,
                leaderId: this.registerInfoDetail.leaderId,
                employeeWorkHis: this.employeeWorkHist
            };
            editEntryInfo(parms).then(res => {
                if (res.success) {
                    this.successMsg(res.message);
                    this.$emit('changeLooks');
                } else {
                    this.errorMsg(res.message);
                }
            });
        }
    }
};
</script>
<style scoped>
.top-tit {
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
  background: #fff;
  border-bottom: 1px solid #eeeeee;
}
.tableCon {
  padding: 0 20px 20px 0;
  background: #f3f5f7;
  /*display:flex;*/
}
.itemsPosit {
  position: relative;
}
.noshow {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 280px;
  position: absolute;
  top: 40px;
  left: 132px;
  z-index: 99;
  height: 50px;
}
.noshow span {
  padding-left: 20px;
  line-height: 50px;
}
.leaderlistCon {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 280px;
  position: absolute;
  top: 40px;
  left: 132px;
  z-index: 99;
}
.leaderlistCon > ul {
  min-height: 40px;
  max-height: 240px;
  overflow: hidden;
  overflow-y: auto;
  /* padding-left:10px; */
}
.leaderlistCon li {
  display: inline-block;
  width: 280px;
  height: 40px;
  line-height: 40px;
  text-align: left;
  text-indent: 1em;
}
.leaderlistCon li:hover {
  background: #f5f6f8 !important;
  color: #3a404c !important;
}
.specSpn {
  display: inline-block;
  /* width:100%; */
  height: 30px;
  border: 1px solid #ddd;
}
.workName {
  margin-left: 20px;
  font-size: 16px;
}
.marginR {
  margin-right: 6px;
  font-size: 16px;
}
.titlesSpan {
  display: block;
  line-height: 50px;
  font-size: 16px;
  padding: 0 25px;
  margin-top: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.itemlist {
  /* padding:0 25px; */
  background: #fff;
}
.infoCon {
  /* padding: 0 20px; */
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.items1 {
  display: flex;
  align-items: center;
  width: 48%;
  margin: 15px 0;
}
.emilSPan {
  position: relative !important;
}
.emails {
  position: absolute;
  top: 0;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: right;
  right: 5px;
  z-index: 99;
}
.items {
  display: flex;
  align-items: center;
  width: 32%;
  margin: 15px 0;
}
.itemsL {
  display: flex;
  align-items: center;
  width: 96%;
  margin: 15px 0;
}
.items > span {
  display: block;
}
.items >>> .el-input {
  flex: 1;
  height: 30px;
}
.items >>> .el-input__inner {
  flex: 1;
  height: 30px;
}
.items >>> .el-cascader {
  flex: 1;
  height: 30px;
}
.items1 >>> .el-cascader {
  flex: 1;
  line-height: 30px;
  height: 30px;
}
.items >>> .el-input__icon {
  line-height: 30px;
}
.items1 >>> .el-input__icon {
  line-height: 30px;
}
.itemsL >>> .el-input__icon {
  line-height: 30px;
}
.items > .specSpn {
  flex: 1;
  line-height: 30px;
  text-indent: 1em;
}
.items1 >>> .el-input {
  flex: 1;
  height: 30px;
}
.items1 >>> .el-input__inner {
  flex: 1;
  height: 30px;
}
.itemsL >>> .el-input {
  flex: 1;
  height: 30px;
}
.items >>> .el-select {
  flex: 1;
}
.itemsL >>> .el-select {
  flex: 1;
}

.items1 >>> .el-select {
  flex: 1;
}
.addressCon {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.addressCon >>> .el-cascader {
  flex: 1 !important;
  margin-right: 10px;
}
.addressCon >>> .el-input {
  flex: 2 !important;
}
.address >>> select {
  padding: 5px !important;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
}
.itemsL >>> .el-input__inner {
  height: 30px;
}
.itemtit {
  /* flex:2; */
  width: 112px;
  margin-right: 20px;
  line-height: 30px;
  text-align: right;
  font-size: 14px;
}
.itemcon {
  flex: 1;
  color: #0f0f0f;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  padding-left: 8px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.left-top {
  background: #fff;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
  /* margin: 0 0 20px 0; */
}

.leftCons >>> .el-button {
  padding: 6px 15px;
  margin-right: 10px;
}

.entrys >>> .el-button {
  padding: 6px 15px;
  margin-right: 10px;
}
.emailinput >>> .el-input-group__append {
  padding: 0 4px !important;
}
</style>
