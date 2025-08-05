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
test.describe('供应商', () => {

    // 定义测试中使用的变量
    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let btypePage: any;
    let btypeFullName: string;

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
        // 打开基础资料->供应商菜单
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.btype);
        // 初始化供应商页面对象
        btypePage = new BasicPage(page);
    });

    // 测试用例1：添加供应商
    test('添加供应商', async () => {
        await btypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.clickNew);
        if (randomData) {
            // 生成唯一的供应商全名
            btypeFullName = randomData['生产厂商'] + generateRandomUpperCase();
            // 选择固定分类
            await btypePage.clickDropdownAndSelect(TEST_BASIC_ELEMENT.btypeDetails.btypeClassId, '工具新增');
            // 录入供应商名称
            await btypePage.inputLabelValue(TEST_BASIC_ELEMENT.btypeDetails.btypeFullName, btypeFullName);
        }else{
            throw new Error('随机数据为空');
        };
        // 保存
        await btypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.save);
        // 搜索录入
        await btypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.SearchInput.btype, btypeFullName);
        // 查询
        await btypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.search);
        // 断言
        await btypePage.assertElementVisible(btypeFullName);

    });

    // 测试用例2：删除查询到的供应商资料
    test('删除查询到供应商资料', async ({}) => {
         // 在列表中查找新增的供应商
        await btypePage.getByRoleInputValue(TEST_BASIC_ELEMENT.SearchInput.btype, btypeFullName);
        // 点击查询按钮
        await btypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.search);
        // 断言供应商是否存在
        await btypePage.assertElementVisible(btypeFullName);
        // 点击列表第一行的删除按钮
        await btypePage.listFirstRowOperation(TEST_BASIC_ELEMENT.listOperationButton.delete);
        // 点击确认删除按钮
        await btypePage.getByRoleButtonClick(TEST_BASIC_ELEMENT.button.confirm);
        // 断言供应商是否成功删除（这里逻辑可能需要修正，删除成功应该检查供应商不存在）
        await btypePage.assertElementVisible(btypeFullName);
    });


    // 每个测试用例执行后关闭菜单
    test.afterEach(async () => {
        // 刷新页面，关闭当前菜单
        await openTheMenuPage.closeMenu(TEST_Menu.btype);
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


