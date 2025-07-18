import { test, expect } from '@playwright/test';
import { TEST_ACCOUNT } from '../data/testData';
import { LoginPage } from '../pages/login.page';

// 复用登录状态
test('报表类型页面访问测试', async ({ page }) => {
  // 使用已登录的页面状态
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(TEST_ACCOUNT.username, TEST_ACCOUNT.password);
  
  // 导航到报表类型页面
  await page.goto('http://www.qfbjyun.com/qiankun/report/ptype');
  
  // 验证页面加载成功
  await expect(page).toHaveURL(/\/report\/ptype/);
  await expect(page).toHaveTitle(/报表类型/);
});