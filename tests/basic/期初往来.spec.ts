import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { generateRandomPrice } from '../../common/randomPriceGenerator';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { TEST_Menu } from '../../data/testmenu';


test.describe('期初往来', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let goodstockcomePage: any;


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
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.goodstockcome);
        // 初始化期初库存页面对象
        goodstockcomePage = new BasicPage(page);

    });

    // 测试用例1：新增期初往来
    test('新增期初往来', async () => {
        // 点击新增按钮
        await goodstockcomePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.qiChuCome.期初录入);
        // 选择供应商
        await goodstockcomePage.getByRoleClickInput(TEST_BASIC_ELEMENT.qiChuCome.btypeFullName);
        await goodstockcomePage.tableElementClick(1, TEST_BASIC_ELEMENT.btypeDialog.btypeName, 
            TEST_BASIC_ELEMENT.dialogTitleName.btypeName);

        await goodstockcomePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.sure);
        //输入期初应付账款
        await goodstockcomePage.inputLabelValue(TEST_BASIC_ELEMENT.qiChuCome.payTotal00, generateRandomPrice());
        //输入期初预付账款
        await goodstockcomePage.inputLabelValue(TEST_BASIC_ELEMENT.qiChuCome.prepayTotal00, generateRandomPrice());
        
        await goodstockcomePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.save);

    });


    // 测试用例2：编辑期初往来
    test('清零期初往来', async () => {

        //点击清零按钮
        await goodstockcomePage.listLastRowOperation(TEST_BASIC_ELEMENT.qiChuCome.清零);
        // 确认弹窗
        await goodstockcomePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);


    });

    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 刷新页面，关闭当前菜单
        await openTheMenuPage.closeMenu(TEST_Menu.goodstockcome);


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


