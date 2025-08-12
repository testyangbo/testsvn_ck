import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { generateRandomUpperCase } from '../../common/randomUpperCaseGenerator';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { TEST_Menu } from '../../data/testmenu';


test.describe('结算账户', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let accountPage: any;
    let accountName: string;



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
        // 打开基础资料->结算账户菜单
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.account);
        // 初始化结算账户页面对象
        accountPage = new BasicPage(page);

    });

    //  用例1：新增结算账户
    test('新增结算账户', async () => {
        accountName = '现金' + generateRandomUpperCase();
        // 新增结算账户
        await accountPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.clickNew);
        // 输入结算账户名称
        await accountPage.inputLabelValue(TEST_BASIC_ELEMENT.accountDetails.atypeFullName, accountName);
        // 选择结算账户类别
        await accountPage.clickDropdownAndSelect(TEST_BASIC_ELEMENT.accountDetails.accountType, '现金');
        // 点击保存
        await accountPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.save);
        // 断言保存成功
        await accountPage.assertAlertVisible();
        // 断言新增成功
        await accountPage.assertElementVisible(accountName);


    });

    //  用例2：搜索--删除
    test('删除结算账户', async () => {
        // 搜索结算账户
        await accountPage.getByPlaceholderInput(TEST_BASIC_ELEMENT.SearchInput.account, accountName);
        // 点击搜索
        await accountPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.search);
        // 断言搜索结果
        await accountPage.assertElementVisible(accountName);
        // 点击删除
        await accountPage.listLastRowOperation(TEST_BASIC_ELEMENT.listOperationButton.delete);
        // 确认删除
        await accountPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
        // 断言删除成功
        await accountPage.assertElementVisible(accountName);

    });



    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 刷新页面，关闭当前菜单
        await openTheMenuPage.closeMenu(TEST_Menu.account);

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


