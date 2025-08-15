// 为元素定义添加注释，说明其用途
export const TEST_BASIC_ELEMENT = {
    // 按钮元素
    button: {
        clickNew: '新增',
        save: '保存',
        saveContinue: '保存继续',
        search: '查询',
        confirm: '确定',
        cancel: '取消',
        batchOperation: '批量操作',
        batchModify: '批量修改',
        newPeriod: '新增期初',
        sure: '确认',
    },

    // 列表操作按钮
    listOperationButton: {

        delete: '删除',
        edit: '编辑',
        deletes: '删 除',

    },
    
    // 商品资料详情元素
    ptypeDetails: {
        // 基础信息
        ptypeFullName: '请输入通用名',
        ptypeBarCode: '请输入条码',
        ptypeName: '请输入商品名称',
        ptypeSpecification: '请输入规格',
        ptypeDosageForm: '请输入剂型',
        ptypeFTypeName: '请输入生产厂商',
        ptypeApprovalNumber: '请输入批准文号',
        approvalNumberValidate: '批准文号有效期',
        ptypeClassId: '商品分类',
        validityDate: '有效期',
        validityDays: '近效期天数',
        
        // 价格/处方
        baseUnit: '基本单位',
        ptypeRetailPrice: '商品零售价',
        minSalePrice: '最低售价',
        prescriptionPrice: '处方价',
        vipPrice: '会员价',
        rxType: '处方类型',
        
        // 质量管理
        prescriptionSales: '凭处方销售',
        traceabilityCode: '追溯码管控',

        // 补充信息
        batchCheck: '批号必录',
        ValidityCheck: '效期必录',
        taxRate: '税率',
        expireDays: '提前停售天数',
        remark: '备注',
        functionalIndications: '功能主治',
        drugIngredients: '药品成分',
        dosage: '用法用量',
        drugTraits: '药品性状',
        adverseReactions: '不良反应',
        taboo: '禁忌',

        // 商品校验
        checkItem: '商品校验',
        
    },

    // 供应商详情元素
    btypeDetails: {
        btypeFullName: '供应商名称',
        btypeCode: '请输入供应商编码',
        btypeAddress: '请输入供应商地址',
        btypePhone: '请输入供应商电话',
        btypeEmail: '请输入供应商邮箱',
        btypeRemark: '请输入供应商备注',
        btypeClassId: '供应商分类',
    },

    // 商品分类详情元素
    ptypeClassDetails: {
        // 新增
        ptypeClassScopeCode: '编号',
        ptypeClassScopeName: '名称',
        ptypeClassRemark: '分类描述',
    },

    // 服务项目详情元素
    servicePtypeDetails: {
        // 新增
       newItems: '新增项目',
       labelName: '项目名称',
       labelPrice: '单价',


    },

    // 货位详情元素
    gtypeDetails: {
        // 新增
        newGtype: '新增货位',
        disabled: '请选择 所属货区',
        gtypeArea: '陈列区（001）',
        gtypeCubicle: '一号柜（一号柜）',
        gtypeFullName: '货位名称',

    },

    // 辅助资料详情元素
    dictbizDetails: {
        // 新增
        dictbizName: '名称',
        dictbizRemark: '备注',
    },

    // 结算账户详情元素
    accountDetails: {
        // 新增
        atypeFullName: '账户名称',
        accountType: '账户类别',
        accountRemark: '备注',
    },

    // 收入项目详情元素
    otherncomeDetails: {
        // 新增
        otherncomeName: '项目名称',
        atypeClassId: '所属分类',
        otherncomeRemark: '备注',
    },

    // 费用支出项目详情元素
    expensesDetails: {
        // 新增
        expensesName: '项目名称',
        atypeClassId: '所属分类',
        expensesRemark: '备注',
    },

    // 配伍禁忌详情元素
    ptypetabooDetails: {
        // 新增
        billName: '请输入 模板名称',
        ingredient: '药品关键字:',
        tabooIngredient: '禁忌药品关键字:',
        tabooResult: '请输入 配伍使用结果描述',
    },

    // 新增期初弹窗元素
    qiChuDialog: {
        // 新增期初
        ptypeCode: '请输入 商品编号',
        gtype: '货位',
        batchNumber: '批号',
        quantity: '数量',
        unitPrice: '单价',
        productionDate: '生产日期',
        expirationDate: '有效期至',
        supplier: '供应商',

    },

    // 期初往来
    qiChuCome: {
        期初录入: '期初录入',
        btypeFullName: '请选择供应商',
        payTotal00: '期初应付账款:',
        prepayTotal00: '期初预付账款:',
        清零: '清零',


    },


    // 弹窗标题名称
    dialogTitleName: {
        qiChuName: '新增期初',
        ptypeName: '商品选择',
        gtypeName: '货位选择',
        btypeName: '供应商选择',

    },

    // 商品选择弹窗表头名称
    ptypeDialog: {
        ptypeCode: '商品编号',
        ptypeName: '商品名称',
    },

    // 货位选择弹窗表头名称
    gtypeDialog: {
        gtypeCode: '货位编号',
        gtypeName: '货位名称',
    },

    // 供应商选择弹窗表头名称
    btypeDialog: {
        btypeName: '单位名称',
    },

    // 价格设置
    pricesettingDialog: {
        价格调整: '价格调整',
        零售价: '零售价',
        最近进价: '最近进价',
        最低进价: '最低进价',
        会员价: '会员价',
        处方价: '处方价',
        拆零最低价: '拆零最低价',
        会员价1: '会员价1',
        会员价2: '会员价2',
        会员价3: '会员价3',
        会员价4: '会员价4',
        加法: '+',
        减法: '-',
        乘法: '*',
        除法: '/',
        remark: '调整原因=',
    },







    
    // 搜索相关元素
    SearchInput: {

        ptype: '编号、名称、通用名、批准文号、条码查询',
        btype: '表格内过滤',
        servicePtype: '项目编号、名称、拼音码查询',
        gtype: '货位编号、名称、拼音码查询、备注',
        account: '账户编号、名称、拼音码查询',
        otherncome: '账户编号、名称、拼音码查询',
        expenses: '账户编号、名称、拼音码查询',


    },

    // 左侧分类
    leftCategory: {
        baseCategory: '基础分类',
        baseCategory1: '工具新增',
    },


}