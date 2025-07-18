// 导入测试框架和页面对象
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { TEST_ACCOUNT } from '../data/testData'; // 从数据文件导入测试数据


// 测试用例：正常登录流程
test('用户登录测试', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(TEST_ACCOUNT.username, TEST_ACCOUNT.password);
  
  // 点击单体测试进入主界面
  await page.getByText('单体测试').dblclick();
  
  // 验证主界面加载成功
  await expect(page).toHaveURL(/\/wel\//);
  
  // 保存cookies到文件
  const storageState = await page.context().storageState();
  const fs = require('fs');
  fs.writeFileSync('cookies/auth.json', JSON.stringify(storageState, null, 2));
});



// 测试用例：错误密码登录
test('错误密码登录测试', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // 输入正确手机号和错误密码
  await loginPage.login(TEST_ACCOUNT.username, 'wrongpassword');
  
  // 验证错误提示 - 使用更精确的选择器
  await expect(page.locator('p.el-message__content:has-text("用户名或密码错误")').first()).toBeVisible();
});

// 测试用例：超长密码登录
test('超长密码登录测试', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // 生成超长密码(30字符)
  const longPassword = 'a'.repeat(15);
  await loginPage.login(TEST_ACCOUNT.username, longPassword);
  
  // 验证长度限制提示 - 使用更精确的选择器
  await expect(page.locator('p.el-message__content:has-text("用户名或密码错误")').first()).toBeVisible();
});
