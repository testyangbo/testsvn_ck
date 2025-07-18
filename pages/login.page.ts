// 登录页面对象模型
import { Page, expect } from '@playwright/test';

/**
 * 登录页面对象
 * 封装所有登录页面的元素定位和交互方法
 */
export class LoginPage {
  // 页面对象构造函数
  constructor(private readonly page: Page) {}

  /**
   * 导航到登录页面
   * @param url 可选的自定义登录页URL
   */
  async goto(url: string = 'http://www.qfbjyun.com/login') {
    await this.page.goto(url);
  
  }

  /**
   * 执行登录操作
   * @param username 登录手机号
   * @param password 登录密码
   */
  async login(username: string, password: string) {
    // 输入手机号
    const phoneInput = this.page.getByRole('textbox', { name: '请输入手机号' });
    await phoneInput.click();
    await phoneInput.fill(username);
    await expect(phoneInput).toHaveValue(username);

    // 输入密码
    const passwordInput = this.page.getByRole('textbox', { name: '请输入登录密码' });
    await passwordInput.click();
    await passwordInput.fill(password);
    await expect(passwordInput).toHaveValue(password);

    // 勾选同意条款
    await this.page
      .locator('label')
      .filter({ hasText: '我已阅读并同意 用户协议' })
      .locator('span')
      .nth(1)
      .click();

    // 点击登录按钮
    await this.page.getByRole('button', { name: '登录' }).click();
  }
}