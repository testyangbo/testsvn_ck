import { test, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { generateRandomUpperCase } from '../../common/randomUpperCaseGenerator';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { BasicPage } from '../../pages/basic.page';
import { TEST_BASIC_ELEMENT } from '../../data/testBasicElement';
import { TEST_Menu } from '../../data/testmenu';


test.describe('配伍禁忌', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let ptypetabooPage: any;
    let ptypetabooName: string;

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

        // 定义配伍禁忌名称
        ptypetabooName = "配伍禁忌" + generateRandomUpperCase();
        console.log('beforeAll 钩子执行完成');
    });

    // 每个测试用例执行前打开菜单
    test.beforeEach(async () => {
        // 打开基础资料->配伍禁忌菜单
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.ptypetaboo);
        // 初始化配伍禁忌页面对象
        ptypetabooPage = new BasicPage(page);

    });

    // 用例1：新增
    test('新增配伍禁忌', async () => {
        // 新增配伍禁忌
        await ptypetabooPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.clickNew);
        // 输入配伍禁忌名称
        await ptypetabooPage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypetabooDetails.billName, ptypetabooName);
        // 点击药品关键字-添加
        await ptypetabooPage.labelBrotherButtonClick(TEST_BASIC_ELEMENT.ptypetabooDetails.ingredient);
        // 输入药品关键字
        await ptypetabooPage.inputLabelValue(TEST_BASIC_ELEMENT.ptypetabooDetails.ingredient, '霉素');
        // 点击禁忌药品关键字-添加
        await ptypetabooPage.labelBrotherButtonClick(TEST_BASIC_ELEMENT.ptypetabooDetails.tabooIngredient);
        // 输入禁忌药品关键字
        await ptypetabooPage.inputLabelValue(TEST_BASIC_ELEMENT.ptypetabooDetails.tabooIngredient, '氨基糖苷类');
        // 输入配伍使用结果描述
        await ptypetabooPage.getByRoleInputValue(TEST_BASIC_ELEMENT.ptypetabooDetails.tabooResult, '霉素类药物无法与氨基糖苷类药物配合使用');
        // 点击保存
        await ptypetabooPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.save);
        // 断言新增成功
        await ptypetabooPage.assertElementVisible(ptypetabooName);
    });

    // 用例2：删除
    test('删除列表最后一条数据', async () => {
        // 点击删除按钮
        await ptypetabooPage.listLastRowOperation(TEST_BASIC_ELEMENT.listOperationButton.delete);
        // 确认删除
        await ptypetabooPage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
        // 断言删除成功
        await ptypetabooPage.assertElementVisible(ptypetabooName);

    });




    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 刷新页面，关闭当前菜单
        await openTheMenuPage.closeMenu(TEST_Menu.ptypetaboo);

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


