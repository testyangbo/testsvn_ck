import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { readRandomLineFromCsv } from '../../common/randomCsvReader';
import { generateRandomUpperCase } from '../../common/randomUpperCaseGenerator';
import path from 'path';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { TEST_Menu } from '../../data/testmenu';


test.describe('辅助资料', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let dictbizPage: any;
    let dictbizName: string;



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
        // 打开基础资料->辅助资料菜单
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.dictbiz);
        // 初始化辅助资料页面对象
        dictbizPage = new BasicPage(page);

    });

    // 测试用例1：新增辅助资料
    test('新增辅助资料', async () => {
        // 生成随机的辅助资料名称
        dictbizName = generateRandomUpperCase();
        // 点击新增按钮
        await dictbizPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.clickNew);
        // 输入辅助资料名称
        await dictbizPage.inputLabelValue(TEST_BASIC_ELEMENT.dictbizDetails.dictbizName, dictbizName);
        // 输入辅助资料备注
        await dictbizPage.inputLabelValue(TEST_BASIC_ELEMENT.dictbizDetails.dictbizRemark, '备注Remark');
        // 点击保存按钮
        await dictbizPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.save);
        // 断言提交成功
        await dictbizPage.assertAlertVisible();
        // 验证新增成功
        await dictbizPage.assertElementVisible(dictbizName);

    });

    // 测试用例2：删除
    test('删除最后一条', async () => {
        // 断言辅助资料存在
        await dictbizPage.assertElementVisible(dictbizName);
        // 点击删除按钮
        await dictbizPage.listLastRowOperation(TEST_BASIC_ELEMENT.listOperationButton.delete);
        // 点击确认删除按钮
        await dictbizPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
        // 断言提交成功
        await dictbizPage.assertAlertVisible();
        // 断言删除成功
        await dictbizPage.assertElementVisible(dictbizName);

    }); 




    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 刷新页面，关闭当前菜单
        await openTheMenuPage.closeMenu(TEST_Menu.dictbiz);
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


