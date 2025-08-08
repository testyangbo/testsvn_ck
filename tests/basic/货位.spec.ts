import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { readRandomLineFromCsv } from '../../common/randomCsvReader';
import { generateRandomUpperCase } from '../../common/randomUpperCaseGenerator';
import path from 'path';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { TEST_Menu } from '../../data/testmenu';

// 定义CSV文件路径并读取随机数据行
const csvFilePath = path.join(__dirname, '../../data/供应商.csv');
const randomData = readRandomLineFromCsv(csvFilePath);

// 使用serial模式确保测试用例按顺序执行
test.describe('货位', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let gtypePage: any;
    let gtypeFullName: string;


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
        // 打开基础资料->货位菜单
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.gtype);
        // 初始化货位页面对象
        gtypePage = new BasicPage(page);
    });

    // 测试用例1：新增货位
    test('新增货位', async () => {
        // 点击新增按钮
        await gtypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.gtypeDetails.newGtype);
        // 点击所属货区
        await gtypePage.getByRoleClickInput(TEST_BASIC_ELEMENT.gtypeDetails.disabled);
        // 点击打开陈列区001
        await gtypePage.getByTextClick(TEST_BASIC_ELEMENT.gtypeDetails.gtypeArea);
        // 选择一号柜001
        await gtypePage.getByTextClick(TEST_BASIC_ELEMENT.gtypeDetails.gtypeCubicle);
        // 获取货位名称，用于后面断言
        gtypeFullName = await gtypePage.getInputValue(TEST_BASIC_ELEMENT.gtypeDetails.gtypeFullName);
        // 点击保存按钮
        await gtypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.save);
        // 断言提交成功
        await gtypePage.assertAlertVisible();
        // 断言货位名称
        await gtypePage.assertElementVisible(gtypeFullName);

    });

    // 用例2，查询货位，后删除
    test('查询货位', async () => {
        // 输入货位名称
        await gtypePage.getByPlaceholderInput(TEST_BASIC_ELEMENT.SearchInput.gtype, gtypeFullName);
        // 点击查询按钮
        await gtypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.search);
        // 断言查询结果
        await gtypePage.assertElementVisible(gtypeFullName);
        // 点击列表第一行操作按钮
        await gtypePage.listLastRowOperation(TEST_BASIC_ELEMENT.listOperationButton.delete);
        // 确认删除
        await gtypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
        // 断言提交成功
        await gtypePage.assertAlertVisible();
        // 断言删除成功
        await gtypePage.assertElementVisible(gtypeFullName);

    });


    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 刷新页面，关闭当前菜单
        await openTheMenuPage.closeMenu(TEST_Menu.gtype);
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


