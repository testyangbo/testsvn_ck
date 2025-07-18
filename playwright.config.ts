import { defineConfig, devices } from '@playwright/test';

/**
 * 配置Playwright测试环境
 * 启用HTML报告、截图和视频录制
 */
export default defineConfig({
  // 测试报告配置
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],

  // 全局测试配置
  use: {
    // 启用截图功能（仅在失败时截图）
    screenshot: 'only-on-failure',
    
    // 启用视频录制（仅在失败时录制）
    video: 'retain-on-failure',
    
  

  },

  // 项目配置
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
