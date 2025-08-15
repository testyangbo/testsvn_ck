import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_Menu } from '../../data/testmenu';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { generateRandomPrice } from '../../common/randomPriceGenerator';


test.describe('价格设置', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;

    let pricesettingPage: any;


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

        // 打开基础资料->价格设置菜单
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.pricesetting);
        // 初始化价格设置页面对象
        pricesettingPage = new BasicPage(page);
    });


    // 测试用例1：新增价格设置
    test('查询价格设置', async () => {

        // 点击查询按钮
        await pricesettingPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.search);

    });

    // 测试用例2：全选数据
    test('全选价格设置数据', async () => {
        // 点击全选
        await pricesettingPage.tabelCheckAll();

    });

    // 测试用例3：设置数据
    test('设置数据', async () => {
        // 点击价格调整
        await pricesettingPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.pricesettingDialog.价格调整);

        await pricesettingPage.priceAdjustment('零售价', TEST_BASIC_ELEMENT.pricesettingDialog.加法, generateRandomPrice());
        await pricesettingPage.priceAdjustment('处方价', TEST_BASIC_ELEMENT.pricesettingDialog.减法, generateRandomPrice());
        await pricesettingPage.priceAdjustment('会员价', TEST_BASIC_ELEMENT.pricesettingDialog.乘法, '2');
        await pricesettingPage.priceAdjustment('会员价1', TEST_BASIC_ELEMENT.pricesettingDialog.除法, '2');

        await pricesettingPage.labelTextareaInputValue(TEST_BASIC_ELEMENT.pricesettingDialog.remark, '调整原因');

        // 点击保存
        await pricesettingPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.sure);

    });


    // 所有用例结束后执行，清理资源
    test.afterAll(async () => {
        console.log('开始执行 afterAll 钩子');

        // 关闭价格设置菜单
        await openTheMenuPage.closeMenu(TEST_Menu.pricesetting);

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

