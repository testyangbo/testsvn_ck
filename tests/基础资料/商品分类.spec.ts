import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { generateRandomUpperCase } from '../../common/randomUpperCaseGenerator';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { TEST_Menu } from '../../data/testmenu';


// 使用serial模式确保测试用例按顺序执行
test.describe('商品分类', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let ptypeClassPage: any;
    let ptypeClassValue: string;


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
        // 打开基础资料->商品分类
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.ptypeClass);
        // 初始化商品分类页面对象
        ptypeClassPage = new BasicPage(page);
    });

    // 测试用例1：新增商品分类
    test('新增商品分类', async () => {
        ptypeClassValue = generateRandomUpperCase() + new Date().getTime();
        // 点击新增按钮
        await ptypeClassPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.clickNew);
        // 输入分类编号
        await ptypeClassPage.inputLabelValue(TEST_BASIC_ELEMENT.ptypeClassDetails.ptypeClassScopeCode, ptypeClassValue);
        // 输入分类名称
        await ptypeClassPage.inputLabelValue(TEST_BASIC_ELEMENT.ptypeClassDetails.ptypeClassScopeName, ptypeClassValue);
        // 输入分类描述
        await ptypeClassPage.labelTextareaInputValue(TEST_BASIC_ELEMENT.ptypeClassDetails.ptypeClassRemark, ptypeClassValue);
        // 点击保存按钮
        await ptypeClassPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
        // 断言列表数据结果
        await ptypeClassPage.assertElementVisible(ptypeClassValue);
    });

    // 测试用例2：删除商品分类
    test('删除商品分类-最后一行', async () => {
        // 列表最后行数据操作
        await ptypeClassPage.listLastRowOperation(TEST_BASIC_ELEMENT.listOperationButton.delete);
        // 点击确定按钮
        await ptypeClassPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
    });


    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 刷新页面，关闭当前菜单
        await openTheMenuPage.closeMenu(TEST_Menu.ptypeClass);
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


