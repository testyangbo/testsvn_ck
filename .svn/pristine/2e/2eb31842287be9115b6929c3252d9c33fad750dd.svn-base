import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { generateRandomUpperCase } from '../../common/randomUpperCaseGenerator';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { TEST_Menu } from '../../data/testmenu';


test.describe('费用支出', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let expensesPage: any;
    let expensesName: string;

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
        // 定义费用支出名称
        expensesName = "费用支出" + generateRandomUpperCase();
        console.log('beforeAll 钩子执行完成');
    });

    // 每个测试用例执行前打开菜单
    test.beforeEach(async () => {
        // 打开基础资料->费用支出菜单
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.expenses);
        // 初始化费用支出页面对象
        expensesPage = new BasicPage(page);

    });

    // 用例1：新增
    test('新增费用支出', async () => {
        // 新增费用支出
        await expensesPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.clickNew);
        // 输入项目名称
        await expensesPage.inputLabelValue(TEST_BASIC_ELEMENT.expensesDetails.expensesName, expensesName);
        // 选择所属分类
        await expensesPage.clickDropdownAndSelect(TEST_BASIC_ELEMENT.expensesDetails.atypeClassId, '默认分类');
        // 输入备注
        await expensesPage.labelTextareaInputValue(TEST_BASIC_ELEMENT.expensesDetails.expensesRemark, '备注');
        // 点击保存
        await expensesPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.save);
        // 断言提交成功
        await expensesPage.assertAlertVisible();
    });


    // 用例2：查询
    test('查询---删除', async () => {
        // 输入项目名称
        await expensesPage.getByPlaceholderInput(TEST_BASIC_ELEMENT.SearchInput.expenses, expensesName);
        // 点击查询
        await expensesPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.search);
        // 断言查询结果
        await expensesPage.assertElementVisible(expensesName);
        // 点击删除
        await expensesPage.listLastRowOperation(TEST_BASIC_ELEMENT.listOperationButton.delete);
        // 点击确定
        await expensesPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
        // 断言删除成功
        await expensesPage.assertElementVisible(expensesName);

    });


    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 刷新页面，关闭当前菜单
        await openTheMenuPage.closeMenu(TEST_Menu.expenses);

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


