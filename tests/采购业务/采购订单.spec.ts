import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/testConfig';
import { PurchaseOrderPage } from '../../pages/purchaseOrder.page';
import { handleAlerts, initializeBrowserContext } from '../../pages/testUtils';

// 在测试配置中添加
//test.use({ storageState: 'cookies/auth.json' });
// 复用登录状态


test.describe('采购订单', () => {

  let context;
  let page;
  let purchaseOrderPage;

  // 所有用例开始前执行
  test.beforeAll(async ({ browser }) => {

    try {
      // 使用通用工具初始化浏览器上下文
      const result = await initializeBrowserContext(browser);
      context = result.context;
      page = result.page;

      // 处理所有弹窗
      await handleAlerts(page);

      } catch (error) {   
        console.error('初始化浏览器上下文失败:', error.message);
        throw error;
      }

      purchaseOrderPage = new PurchaseOrderPage(page);
  });

  // 每个用例执行前执行
  test.beforeEach(async () => {
    await purchaseOrderPage.navigateToPurchaseOrder();

  });

  // 第一条用例
  test('采购订单正常过账', async ({}) => {
    await purchaseOrderPage.createNewOrder();
    await purchaseOrderPage.selectSupplier();
    await purchaseOrderPage.setDeliveryDate();
    await purchaseOrderPage.selectProduct();
    await purchaseOrderPage.setQuantity();
    await purchaseOrderPage.attached();
    await purchaseOrderPage.saveOrder();
  });
  
  // 第二条用例
  test('采购订单不正常过账', async ({}) => {
    await purchaseOrderPage.createNewOrder();
    await purchaseOrderPage.selectSupplier();
    await purchaseOrderPage.setDeliveryDate();
    await purchaseOrderPage.selectProduct();
    await purchaseOrderPage.setQuantity();
    await purchaseOrderPage.saveOrder();
  })
  
  // 每个用例执行后执行
  test.afterEach(async () => {
    await purchaseOrderPage.closeOrder();
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