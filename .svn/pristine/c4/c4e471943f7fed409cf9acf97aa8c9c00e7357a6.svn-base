import { Page, expect } from '@playwright/test';

export class AlertHandler {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * 等待弹窗消失并验证
     * @param text 弹窗中应包含的文本
     */
    private async waitForAlertToDisappear(text: string) {
        // 等待包含指定文本的弹窗消失
        await this.page.getByRole('alert').getByText(text).waitFor({ state: 'hidden' });
        // 验证弹窗已消失
        const elementCount = await this.page.getByRole('alert').count();
        expect(elementCount).toBe(0);
    };

    /**
     * 断言提交弹窗是否存在
     */
    async assertAlertVisible() {
        console.log(`是否提交成功....`);
        
        // 获取弹窗数量
        const elementCount = await this.page.getByRole('alert').count();
        
        // 如果没有弹窗，抛出错误
        if (elementCount === 0) {
            console.log('弹窗不存在');
            throw new Error('操作失败，测试终止');
        };
        
        // 获取弹窗文本
        const alertText = (await this.page.getByRole('alert').textContent()) || '';
        console.log(`弹窗文本: ${alertText}`);
        
        // 如果弹窗文本为空，抛出错误
        if (!alertText) {
            console.log('弹窗文本为空');
            throw new Error('操作失败，测试终止');
        };
        
        // 根据弹窗文本处理不同情况
        if (alertText.includes('成功')) {
            // 断言提交成功后，弹窗消失
            await this.waitForAlertToDisappear('成功');
            console.log('当前操作：操作成功，弹窗消失....');
        } else if (alertText.includes('失败')) {
            // 断言提交失败后，弹窗消失
            await this.waitForAlertToDisappear('失败');
            console.log('当前操作：操作失败，弹窗消失....');
            // 抛出错误以终止后续执行
            throw new Error('操作失败，测试终止');
        } else {
            console.log('未知状态');
            // 抛出错误以终止后续执行
            throw new Error('操作失败，测试终止');
        };
    };
}