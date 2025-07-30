import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/testConfig';

// 在测试配置中添加
test.use({ storageState: 'cookies/auth.json' });
// 复用登录状态

test('业务草稿测试', async ({ page }) => {
  await page.goto(`${testConfig.baseURL}`);
  await page.getByText('数据报表', { exact: true }).hover();
  // 等待业务草稿元素可见
  await page.getByText('业务草稿').waitFor({ state: 'visible' });
  await page.getByText('业务草稿').click();

});

