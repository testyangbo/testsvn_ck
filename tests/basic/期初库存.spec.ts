import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { generateRandomUpperCase } from '../../common/randomUpperCaseGenerator';
import { generateRandomPrice } from '../../common/randomPriceGenerator';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { TEST_Menu } from '../../data/testmenu';


test.describe('期初库存', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let goodsstocksinitialPage: any;


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
        // 打开基础资料->期初库存菜单
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.goodsstocksinitial);
        // 初始化期初库存页面对象
        goodsstocksinitialPage = new BasicPage(page);

    });


    // 测试用例1：新增期初库存
    test('新增期初库存', async () => {
        // 点击新增期初库存按钮
        await goodsstocksinitialPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.newPeriod);

        // 点击商品编号，打开商品选择器
        await goodsstocksinitialPage.getByRoleClickInput(TEST_BASIC_ELEMENT.qiChuDialog.ptypeCode);

        // 点击选中第一行商品
        await goodsstocksinitialPage.tableElementClick(1, TEST_BASIC_ELEMENT.ptypeDialog.ptypeCode, 
            TEST_BASIC_ELEMENT.dialogTitleName.ptypeName);

        // 点击确定
        await goodsstocksinitialPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.sure);

        // 双击货位，打开货位选择器
        await goodsstocksinitialPage.tableElementDblClick(1, TEST_BASIC_ELEMENT.qiChuDialog.gtype, 
            TEST_BASIC_ELEMENT.dialogTitleName.qiChuName);

        // 点击选中第一行货位
        await goodsstocksinitialPage.tableElementClick(1, TEST_BASIC_ELEMENT.gtypeDialog.gtypeName, 
            TEST_BASIC_ELEMENT.dialogTitleName.gtypeName);

        // 点击确定
        await goodsstocksinitialPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.sure);

        // 第一行输入批号
        await goodsstocksinitialPage.tableElementTextInput(1, TEST_BASIC_ELEMENT.qiChuDialog.batchNumber, 
            generateRandomUpperCase(), TEST_BASIC_ELEMENT.dialogTitleName.qiChuName);

        // 第一行输入生产日期
        await goodsstocksinitialPage.tableElementTextInput(1, TEST_BASIC_ELEMENT.qiChuDialog.productionDate, 
            '2023-01-01', TEST_BASIC_ELEMENT.dialogTitleName.qiChuName);

        // 第一行输入有效期至
        await goodsstocksinitialPage.tableElementTextInput(1, TEST_BASIC_ELEMENT.qiChuDialog.expirationDate, 
            '2099-12-31', TEST_BASIC_ELEMENT.dialogTitleName.qiChuName);

        // 第一行输入数量
        await goodsstocksinitialPage.tableElementNumberInput(1, TEST_BASIC_ELEMENT.qiChuDialog.quantity, 
            '100', TEST_BASIC_ELEMENT.dialogTitleName.qiChuName);

        // 第一行输入单价
        await goodsstocksinitialPage.tableElementNumberInput(1, TEST_BASIC_ELEMENT.qiChuDialog.unitPrice, 
            generateRandomPrice(), TEST_BASIC_ELEMENT.dialogTitleName.qiChuName);

        // 点击保存
        await goodsstocksinitialPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.save);

    });

    // 测试用例2：删除期初库存
    test('删除期初库存', async () => {
        // 点击删除期初库存按钮
        await goodsstocksinitialPage.listLastRowOperation(TEST_BASIC_ELEMENT.listOperationButton.deletes);

        // 点击确定
        await goodsstocksinitialPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
    });


    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 刷新页面，关闭当前菜单
        await openTheMenuPage.closeMenu(TEST_Menu.goodsstocksinitial);


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


