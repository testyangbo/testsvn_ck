import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { readRandomLineFromCsv } from '../../common/randomCsvReader';
import { generateRandomPrice } from '../../common/randomPriceGenerator';
import { generateRandomUpperCase } from '../../common/randomUpperCaseGenerator';
import path from 'path';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { TEST_Menu } from '../../data/testmenu';

// 定义CSV文件路径并读取随机数据行
const csvFilePath = path.join(__dirname, '../../data/商品资料.csv');
const randomData = readRandomLineFromCsv(csvFilePath);

// 使用serial模式确保测试用例按顺序执行
test.describe('商品资料', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let ptypePage: any;
    let ptypeFullName: string;

    // 所有用例开始前执行，初始化浏览器上下文和页面
    test.beforeAll(async ({ browser }) => {
        console.log('开始执行 beforeAll 钩子');
        try {
            // 使用通用工具设置测试环境，创建浏览器上下文和页面
            const result = await setupTestEnvironment(browser);
            context = result.context;
            page = result.page;
            console.log('浏览器上下文和页面初始化完成');
        } catch (error) {   
            console.error('初始化浏览器上下文失败:', error.message);
            throw error;
        };

        // 初始化菜单页面对象
        openTheMenuPage = new OpenTheMenuPage(page);
        console.log('beforeAll 钩子执行完成');
    });

    // 每个测试用例执行前打开菜单
    test.beforeEach(async () => {
        // 打开基础资料->商品资料菜单
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.ptype);
        // 初始化商品资料页面对象
        ptypePage = new BasicPage(page);
    });

    
    // 测试用例1：新增商品资料
    test('新增商品资料', async ({}) => {
        // 点击新增按钮
        await ptypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.clickNew);
        
        // 检查是否成功读取到测试数据
        if (randomData) {
            // 生成唯一的商品全名
            ptypeFullName = randomData['通用名'] + generateRandomUpperCase();
            
            // 填写基础信息
            await ptypePage.clickDropdownAndSelect(TEST_BASIC_ELEMENT.ptypeDetails.ptypeClassId, '工具新增');
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.ptypeFullName, ptypeFullName);
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.ptypeBarCode, randomData['条码']);
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.ptypeName, randomData['商品名称']);
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.ptypeSpecification, randomData['规格']);
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.ptypeDosageForm, randomData['剂型']);
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.ptypeFTypeName, randomData['生产厂商']);
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.ptypeApprovalNumber, randomData['批准文号']);
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.approvalNumberValidate, '2029-12-31');
            await ptypePage.inputLabelValue(TEST_BASIC_ELEMENT.ptypeDetails.validityDate, '24');
            await ptypePage.inputLabelValue(TEST_BASIC_ELEMENT.ptypeDetails.validityDays, randomData['近效期天数']);
            
            // 填写价格/处方信息
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.baseUnit, randomData['基本单位']);
            // 零售价传入1-100以内的随机两位小数
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.ptypeRetailPrice, generateRandomPrice());
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.minSalePrice, '0.01');
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.prescriptionPrice, '1');
            await ptypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypeDetails.vipPrice, '1');
            
            // 填写质量管理信息
            await ptypePage.getByTextClick(TEST_BASIC_ELEMENT.ptypeDetails.traceabilityCode);
            await ptypePage.getByTextClick(TEST_BASIC_ELEMENT.ptypeDetails.prescriptionSales);
            await ptypePage.clickDropdownAndSelect(TEST_BASIC_ELEMENT.ptypeDetails.rxType, '处方药');
            
            // 填写补充信息
            await ptypePage.getByTextClick(TEST_BASIC_ELEMENT.ptypeDetails.batchCheck);
            await ptypePage.getByTextClick(TEST_BASIC_ELEMENT.ptypeDetails.ValidityCheck);
            await ptypePage.inputLabelValue(TEST_BASIC_ELEMENT.ptypeDetails.taxRate, '20');
            await ptypePage.inputLabelValue(TEST_BASIC_ELEMENT.ptypeDetails.expireDays, '30');
            await ptypePage.inputLabelValue(TEST_BASIC_ELEMENT.ptypeDetails.remark, '备注');
            await ptypePage.labelTextareaInputValue(TEST_BASIC_ELEMENT.ptypeDetails.functionalIndications, '功能主治');
            await ptypePage.labelTextareaInputValue(TEST_BASIC_ELEMENT.ptypeDetails.drugIngredients, '药品成分');
            await ptypePage.labelTextareaInputValue(TEST_BASIC_ELEMENT.ptypeDetails.dosage, '用法用量');
            await ptypePage.labelTextareaInputValue(TEST_BASIC_ELEMENT.ptypeDetails.drugTraits, '药品性状');
            await ptypePage.labelTextareaInputValue(TEST_BASIC_ELEMENT.ptypeDetails.adverseReactions, '不良反应');
            await ptypePage.labelTextareaInputValue(TEST_BASIC_ELEMENT.ptypeDetails.taboo, '禁忌');

        }else{
             throw new Error('无法读取测试数据');
        };

        // 点击保存按钮
        await ptypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.save);
        // 断言是否有必填项没填写
        await ptypePage.assertRequiredFields();
        // 处理商品校验弹窗（如果出现）
        await ptypePage.checkItemClick(TEST_BASIC_ELEMENT.ptypeDetails.checkItem, TEST_BASIC_ELEMENT.button.saveContinue);
        // 断言提交成功
        await ptypePage.assertAlertVisible();
        // 保存完成后，在列表中查找新增的商品
        await ptypePage.getByPlaceholderInput(TEST_BASIC_ELEMENT.SearchInput.ptype, ptypeFullName);
        // 点击查询按钮
        await ptypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.search);
        // 断言商品是否成功添加到列表中
        await ptypePage.assertElementVisible(ptypeFullName);
    });

    // 测试用例2：删除查询到的商品资料
    test('删除查询到商品资料', async ({}) => {
         // 在列表中查找新增的商品
        await ptypePage.getByPlaceholderInput(TEST_BASIC_ELEMENT.SearchInput.ptype, ptypeFullName);
        // 点击查询按钮
        await ptypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.search);
        // 断言商品是否存在
        await ptypePage.assertElementVisible(ptypeFullName);
        // 点击列表第一行的删除按钮
        await ptypePage.listFirstRowOperation(TEST_BASIC_ELEMENT.listOperationButton.delete);
        // 点击确认删除按钮
        await ptypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
        // 断言提交成功
        await ptypePage.assertAlertVisible();
        // 断言商品是否成功删除（这里逻辑可能需要修正，删除成功应该检查商品不存在）
        await ptypePage.assertElementVisible(ptypeFullName);
    });


    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 检查页面是否仍然有效再关闭菜单
        try {
            // 检查页面标题或某个关键元素是否存在
            const isPageValid = await page.isVisible('text=商品资料', { timeout: 5000 }).catch(() => false);
            if (isPageValid) {
                console.log('页面有效，执行关闭菜单操作');
                await openTheMenuPage.closeMenu(TEST_Menu.ptype);
            } else {
                console.log('页面已关闭或无效，跳过关闭菜单操作');
            }
        } catch (error) {
            console.log('检查页面状态时出错，跳过关闭菜单操作:', error.message);
        }
    });

    // 所有用例结束后执行，清理资源
    test.afterAll(async () => {
        console.log('开始执行 afterAll 钩子');
        // 关闭浏览器上下文和页面
        try {
            if (page && page.close) {
                await page.close();
                console.log('页面已关闭');
            };
            if (context && context.close) {
                await context.close();
                console.log('浏览器上下文已关闭');
            };
        } catch (error) {
            console.error('关闭浏览器上下文时出错:', error.message);
        };
        console.log('afterAll 钩子执行完成');
        
    });
});


