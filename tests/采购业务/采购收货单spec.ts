import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/testConfig';
import { PurchaseOrderPage } from '../../pages/purchaseOrder.page';
import { setupTestEnvironment } from '../../pages/testUtils';
import { TEST_DATA } from '../../data/testData';
import { TEST_Menu } from '../../data/testmenu';
import { OpenTheMenuPage } from '../../pages/openTheMenu.page';

// 在测试配置中添加
//test.use({ storageState: 'cookies/auth.json' });
// 复用登录状态


test.describe('采购收货单', () => {

  let context;
  let page;
  let purchaseOrderPage;
  let openTheMenuPage;
  // 所有用例开始前执行
  test.beforeAll(async ({ browser }) => {
    const result = await setupTestEnvironment(browser);
    //const context = result.context;
    const page = result.page;
    purchaseOrderPage = new PurchaseOrderPage(page);
    openTheMenuPage = new OpenTheMenuPage(page);
  });

  // 每个用例执行前执行
  test.beforeEach(async () => {

        await openTheMenuPage.openMenu(TEST_Menu.Purchase, TEST_Menu.purchaseOrder);

  });

  // 每个用例执行前执行
  test.beforeEach(async () => {
    await purchaseOrderPage.navigateToPurchaseOrder();

  });

  // 第一条用例
  test('采购收货单正常保存', async ({}) => {
    await purchaseOrderPage.setAddSupplierCell();   // 打开供应商界面
    await purchaseOrderPage.selectSupplier();   // 选择供应商
    await purchaseOrderPage.setDeliveryDate();  // 设置交货日期
    await purchaseOrderPage.selectProduct(TEST_DATA.product);    // 选择商品
    await purchaseOrderPage.setQuantity(5);      // 设置数量
    await purchaseOrderPage.setUnitPrice(100);     // 设置单价
    await purchaseOrderPage.setAmount(500);        // 设置金额
    await purchaseOrderPage.saveOrder();        // 保存订单
    await expect(purchaseOrderPage.messageContent).toHaveText('采购订单，保存审核成功！');
    // 等待messageContent消失
    await purchaseOrderPage.messageContent.waitFor({ state: 'hidden', timeout: 5000 });  
    
  });



  // 每个用例执行后执行
  test.afterEach(async () => {
    await purchaseOrderPage.closeOrder();
    await purchaseOrderPage.handleDialogMessage1('saveDraftAndContinue');
  });

  // 所有用例结束后执行
  test.afterAll(async () => {
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
  });

});
