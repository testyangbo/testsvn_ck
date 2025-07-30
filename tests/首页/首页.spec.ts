import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/testConfig';

// 在测试配置中添加
test.use({ storageState: 'cookies/auth.json' });
// 复用登录状态

test('首页测试', async ({ page }) => {
  await page.goto(`${testConfig.baseURL}`);
  // 验证导航成功
  await expect(page).toHaveURL(new RegExp(`${testConfig.baseURL}/wel/index/`));
  // 等待页面完全加载
  // 调整为load状态并增加超时时间至60秒
  await page.waitForLoadState('load', { timeout: 60000 });
  await expect(page.getByText('采购建议', { exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('提醒关注', { exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page.locator('#layout-router-id').getByText('待办事项', { exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('今日实况', { exact: true })).toBeVisible({ timeout: 10000 });
});