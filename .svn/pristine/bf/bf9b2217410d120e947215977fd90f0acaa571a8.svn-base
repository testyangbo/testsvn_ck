import { test, expect, Page } from '@playwright/test';
import { setupTestEnvironment } from '../../pages/testUtils';
import { readRandomLineFromCsv } from '../../common/randomCsvReader';
import { generateRandomPrice } from '../../common/randomPriceGenerator';
import { generateRandomUpperCase } from '../../common/randomUpperCaseGenerator';
import path from 'path';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';
import { PtypePage } from '../../pages/ptype.page';
import { TEST_PTYPE_ELEMENT } from '../../data/testPtypeElement';
import { TEST_Menu } from '../../data/testmenu';

// 使用示例
const csvFilePath = path.join(__dirname, '../../data/商品资料.csv');
const randomData = readRandomLineFromCsv(csvFilePath);

test.describe('商品资料', () => {

    let context: any;
    let page: Page;
    let openTheMenuPage: any;
    let ptypePage: any;
    let ptypeFullName: string;

    // 所有用例开始前执行
    test.beforeAll(async ({ browser }) => {
        try {
            // 使用通用工具设置测试环境
            const result = await setupTestEnvironment(browser);
            context = result.context;
            page = result.page;
        } catch (error) {   
            console.error('初始化浏览器上下文失败:', error.message);
            throw error;
        }

        openTheMenuPage = new OpenTheMenuPage(page);
        await openTheMenuPage.openMenu(TEST_Menu.basicInformation, TEST_Menu.ptype);
        ptypePage = new PtypePage(page);
    });



    test('新增商品资料', async ({}) => {
        await ptypePage.buttonClick(TEST_PTYPE_ELEMENT.buttonClickNew);
        await ptypePage.clickDropdownAndSelect(TEST_PTYPE_ELEMENT.ptypeDetails.ptypeClassId, '工具新增');

        if (randomData) {
            ptypeFullName = randomData['通用名'] + generateRandomUpperCase();
            await ptypePage.inputValue(TEST_PTYPE_ELEMENT.ptypeDetails.ptypeFullName, ptypeFullName);
            await ptypePage.inputValue(TEST_PTYPE_ELEMENT.ptypeDetails.ptypeBarCode, randomData['条码']);
            await ptypePage.inputValue(TEST_PTYPE_ELEMENT.ptypeDetails.ptypeName, randomData['商品名称']);
            await ptypePage.inputValue(TEST_PTYPE_ELEMENT.ptypeDetails.ptypeSpecification, randomData['规格']);
            await ptypePage.inputValue(TEST_PTYPE_ELEMENT.ptypeDetails.ptypeDosageForm, randomData['剂型']);
            await ptypePage.inputValue(TEST_PTYPE_ELEMENT.ptypeDetails.ptypeFTypeName, randomData['生产厂商']);
            await ptypePage.inputValue(TEST_PTYPE_ELEMENT.ptypeDetails.ptypeApprovalNumber, randomData['批准文号']);
            await ptypePage.inputDropdownValue(TEST_PTYPE_ELEMENT.ptypeDetails.validityDate, '24');
            await ptypePage.inputDropdownValue(TEST_PTYPE_ELEMENT.ptypeDetails.validityDays, randomData['近效期天数']);
            await ptypePage.inputValue(TEST_PTYPE_ELEMENT.ptypeDetails.baseUnit, randomData['基本单位']);
            // 零售价传入1-100以内的随机两位小数
            await ptypePage.inputValue(TEST_PTYPE_ELEMENT.ptypeDetails.ptypeRetailPrice, generateRandomPrice());

        }
        await ptypePage.buttonClick(TEST_PTYPE_ELEMENT.ptypeDetails.buttonClickSave);

        // 保存完成后，在列表中查找新增的商品
        await ptypePage.placeholderInput(TEST_PTYPE_ELEMENT.ptypeSearch, ptypeFullName);
        // 查询按钮
        await ptypePage.buttonClick(TEST_PTYPE_ELEMENT.ptypeSearchButton);
        // 断言
        await ptypePage.assertElementVisible(ptypeFullName);

        // 睡眠10秒钟
        //await page.waitForTimeout(10000);
    });

    // 所有用例结束后执行
    test.afterAll(async () => {
        // 不关闭浏览器上下文
        console.log('跳过关闭浏览器上下文');
        /*
        // 关闭浏览器上下文
        try {
            if (page && page.close) {
                await page.close();
                console.log('页面已关闭');
            }
            if (context && context.close) {
                await context.close();
                console.log('浏览器上下文已关闭');
            }
        } catch (error) {
            console.error('关闭浏览器上下文时出错:', error.message);
        }
        */
    });
});


