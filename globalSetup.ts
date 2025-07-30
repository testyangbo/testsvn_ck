import { chromium, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { TEST_ACCOUNT } from './data/testData'; // 从数据文件导入测试数据

async function globalSetup() {
    const fs = require('fs');
    
    // 检查cookies/auth.json文件是否存在
    const authFilePath = 'cookies/auth.json';
    
    if (fs.existsSync('cookies/auth.json')) {
        const stats = fs.statSync(authFilePath);
        const modifiedTime = stats.mtime;
        const currentTime = new Date();
        const timeDifference = (currentTime.getTime() - modifiedTime.getTime()) / (1000 * 60); // 转换为分钟

        if (timeDifference <= 60) {
            console.log('检测到已保存的登录状态且未过期，跳过登录操作');
            return;
        }
    }
    
    // 创建浏览器（无头模式）
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // 登录
    try {
        console.log('未检测到已保存的登录状态或者已过期，开始执行登录操作...');
        // 导航到登录页
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(TEST_ACCOUNT.username, TEST_ACCOUNT.password);

        // 检查元素是否存在，如果存在则执行选择门店操作
        // const element = page.getByText('账套机构选择 退出创建账套');
        // if (await element.isVisible()) {
        //     // 选择门店点击进入主界面
        //     await loginPage.navigateToMainInterface();
        // }

        // 选择门店
        await loginPage.navigateToMainInterface();
        // 保存cookies到文件
        const storageState = await page.context().storageState();
        fs.writeFileSync('cookies/auth.json', JSON.stringify(storageState, null, 2));
        console.log('登录状态已保存到cookies/auth.json');

    } catch (error) {
        console.error('登录失败:', error);
    }
    
}


export default globalSetup; // 严格导出单个函数