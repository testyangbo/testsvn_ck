import { Page, expect} from '@playwright/test';

/**
 * PtypePage 类
 * 
 * 该类封装了与商品资料相关的页面交互方法，
 * 主要用于在测试过程中对商品资料进行操作。
 */
export class PtypePage {
    private  page: Page;

    /**
     * 构造函数
     * @param page Playwright Page 对象
     */
    constructor(page: Page) { 
        this.page = page;
    }

    /**
     * 点击指定名称的按钮
     * @param objectName 按钮名称
     */
    async buttonClick(objectName: string) {
        console.log(`点击按钮: ${objectName}`);
        await this.page.getByRole('button', { name: objectName, exact: true}).click();
    }

    /**
     * 点击指定名称的录入框
     * @param inputName 录入框名称
     */
    async clickInput(inputName: string) {
        console.log(`点击录入框: ${inputName}`);
        await this.page.getByRole('textbox', { name: inputName }).click();
    }
    

    /**
     * 在指定名称的录入框中输入值
     * @param inputName 录入框名称
     * @param inputValue 要输入的值
     */
    async inputValue(inputName: string, inputValue: string) {
        console.log(`在录入框 '${inputName}' 中输入值: ${inputValue}`);
        await this.page.getByRole('textbox', { name: inputName }).fill(inputValue);
    }

    /**
     * 选择下拉列表中的指定选项
     * @param selectValue 选项名称
     */
    async optionSelectValue(selectValue: string) {
        console.log(`选择下拉列表选项: ${selectValue}`);
        await this.page.getByText(selectValue).click();
    }

    /**
     * 通过占位符定位录入框并输入值
     * @param placeholder 占位符
     * @param inputValue 要输入的值
     */
    async placeholderInput(placeholder: string, inputValue: string) {
        console.log(`在录入框 '${placeholder}' 中输入值: ${inputValue}`);
        await this.page.getByPlaceholder(placeholder, { exact: true }).fill(inputValue);
    }


    /**
     * 定位指定标签关联的第一个输入框元素
     * 该函数通过标签文本查找与之关联的第一个输入框元素，用于后续操作
     * @param label 标签名称
     * @returns 返回定位到的第一个输入框元素的 Promise 对象
     */
    async Dropdown(label: string) {
        console.log(`指定标签 '${label}' 的输入框`);
        return this.page.locator("label").filter({ hasText: label }).locator('xpath=following-sibling::*').locator('input').first();
    }


    /**
     * 点击指定标签的下拉框并选择选项
     * @param label 标签名称
     * @param option 选项名称
     */
    async clickDropdownAndSelect(label: string, option: string) {
        console.log(`点击下拉框 '${label}' 并选择选项 '${option}'`);
        await (await this.Dropdown(label)).click();
        await this.optionSelectValue(option);
    }

    /**
     * 输入指定标签的输入框
     * @param label 标签名称
     * @param inputValue 输入值
     */
    async inputDropdownValue(label: string, inputValue: string) {
        console.log(`在 '${label}' 输入值: ${inputValue}`);
        await (await this.Dropdown(label)).fill(inputValue);
    }

    // 断言元素存在且可见，数量大于等于1
    async assertElementVisible(ptypeSearch: string) {
        console.log(`断言元素 '${ptypeSearch}' 存在且可见，数量大于等于1`);
        // 使用更宽松的定位策略，通过文本内容查找元素
        const locator = this.page.getByText(ptypeSearch);
        // 增加超时时间，确保页面加载完成后再进行断言
        await expect(locator.first()).toBeVisible({ timeout: 10000 });
        const count = await locator.count();
        expect(count).toBeGreaterThanOrEqual(1);
        console.log(`断言结果: 元素 '${ptypeSearch}' 的数量为 ${count}`);
    }
    

}