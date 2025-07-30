import { Page } from '@playwright/test';
import { TEST_DATA } from '../data/testData';
import { TEST_Menu } from '../data/testmenu';

export class PurchaseOrderPage {
  private readonly page: Page;

  // 业务单据页面元素选择器
  private get confirmButton() { return this.page.getByRole('button', { name: '确认' }); }
  private get cancelButton() { return this.page.getByRole('button', { name: '取消' }); }
  private get confirmButton1() { return this.page.getByRole('button', { name: '确 认' }); }     //确认按钮带空格
  private get cancelButton1() { return this.page.getByRole('button', { name: '取 消' }); }     //取消按钮带空格
  private get attachmentsclose() { return this.page.getByRole('button', { name: 'Close'}); }      // 弹窗的叉叉

  //表头元素
  private get purchaseBusinessMenu() { return this.page.getByText(TEST_Menu.Purchase); }
  private get purchaseOrderMenu() { return this.page.locator('.title.textOver').getByText(TEST_Menu.purchaseOrder, { exact: true }); }
  private get deliveryDateInput() { return this.page.getByRole('textbox', { name: '请选择 交货日期' }); }
  private get saveButton() { return this.page.getByRole('button', { name: '保存' }); }
  private get saveDraftButton() { return this.page.getByRole('button', { name: '存草稿' }); } 
  private get closeButton() { return this.page.getByRole('button', { name: '' }); }  
  private get Scancode() { return this.page.getByRole('button', { name: '光标移入此处扫码'}); }     //扫码
  private get handoverPersonInput() { return this.page.getByRole('textbox', { name: '请选择经手人' }); } 

  //工具栏元素
  private get attachments() { return this.page.locator('//*[@id="layout-router-id"]/div[1]/div/div/div[6]/span/button'); }  //附件
  private get printButton() { return this.page.locator('//*[@id="layout-router-id"]/div[1]/div/div/div[6]/button[1]'); }   //打印
  private get discountButton() { return this.page.getByRole('button', { name: '工具 ' }); }   //工具
  private get discountMenu() { return this.page.getByText('整单折让'); }   //折让

  // 折让弹窗元素
  private get discountAmountInput() { return this.page.locator('div').filter({ hasText: /^折让金额:$/ }).getByRole('spinbutton'); }   //折让金额
  private get discountAfterAmountInput() { return this.page.locator('div').filter({ hasText: /^折后金额:$/ }).getByRole('spinbutton'); }   //折后金额

  //表体元素
  private get addButton() { return this.page.getByRole('button', { name: '' }).first(); }
  private get supplierCell() { return this.page.getByRole('cell', { name: TEST_DATA.supplier, exact: true }).locator('div'); }
  private get remarkInput() { return this.page.getByRole('textbox', { name: '请输入备注' }); }
  private get priceTypeSelect() { return this.page.locator('#bid_0_priceType span'); }        //赠品
  private get productSelectIcon() { return this.page.getByRole('cell', { name: '' }).locator('i'); }
  private get productItem() { return this.page.getByLabel('商品选择').getByText(TEST_DATA.product); }
  private get quantityInput() { return this.page.getByRole('spinbutton', { name: '请输入数量' }); }
  private get insertRowButton() { return this.page.getByTitle('插入行').first(); }   
  private get deleteRowButton() { return this.page.getByTitle('删除行').first(); }
  private get unitPriceInput() { return this.page.getByRole('spinbutton', { name: '请输入单价' }); }
  private get amountInput() { return this.page.getByRole('spinbutton', { name: '请输入金额' }); }
  private get modifyButton() { return this.page.locator('//*[@id="layout-router-id"]/div[2]/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div[2]/table/tbody/tr[1]/td[14]/div/button[1]'); } //删除按钮
  
  
  
  //修改商品信息界面元素
  private get realNameRegistrationCheckbox() { return this.page.locator('label').filter({ hasText: '实名登记' }).locator('span').nth(1); }
  private get fourCategoryDrugCheckbox() { return this.page.locator('label').filter({ hasText: '四类药品' }).locator('span').nth(1); }
  private get prescriptionDrugCheckbox() { return this.page.locator('label').filter({ hasText: '凭处方销售' }).locator('span').nth(1); }
  private get specialPriceCheckbox() { return this.page.locator('label').filter({ hasText: '特价商品' }).locator('span').nth(1); }
  private get priceAdjustmentCheckbox() { return this.page.locator('label').filter({ hasText: '允许前台调价' }).locator('span').nth(1); }
  private get allowSplitCheckbox() { return this.page.locator('label').filter({ hasText: '允许拆零' }).locator('span').nth(1); }
  private get conversionRateInput() { return this.page.getByRole('spinbutton', { name: '换算率' }); }
  private get unitNameInput() { return this.page.getByRole('textbox', { name: '单位名称' }); }
  private get barcodeInput() { return this.page.getByRole('textbox', { name: '请输入商品条码' }); }
  private get memberPriceInput() { return this.page.getByRole('textbox', { name: '请输入会员价' }); }
  private get splitPriceInput() { return this.page.getByRole('textbox', { name: '请输入拆零价' }); }
  private get minimumPrice() { return this.page.getByRole('textbox', { name: '请输入最低售价' }); }
  private get retailPriceInput() { return this.page.getByRole('textbox', { name: '请输入零售价' }); }
  private get modifyProductInfoButton() { return this.page.getByTitle('修改商品信息'); }



   //定位界面元素   
  private get rowLocation() { return this.page.getByTitle('定位行').click(); }
  private get productCodeInput() { return this.page.getByRole('textbox', { name: '商品编号/通用名/拼音码/生产厂商 (按下Enter键)' }); }
  private get findButton() { return this.page.getByRole('button', { name: '查找' }); }
  private get nextButton() { return this.page.getByRole('button', { name: '下一个' }); }
  private get closeButton1() { return this.page.getByRole('button', { name: '关 闭' }); }



  constructor(page: Page) {
    this.page = page;
  }

  // 业务单据页面操作方法
  async navigateToPurchaseOrder() {
    console.log('开始导航到采购订单页面...');
    await this.purchaseBusinessMenu.hover();
    await this.purchaseOrderMenu.click();
    console.log('成功导航到采购订单页面');
  }

  async createNewOrder() {
    console.log('开始创建新订单...');
    await this.addButton.click();
    console.log('成功创建新订单');
  }
  

  async selectSupplier() {
    console.log('开始选择供应商...');
    await this.supplierCell.dblclick();
    console.log('成功选择供应商');
  }

  async setDeliveryDate() {
    console.log('开始设置交货日期...');
    await this.deliveryDateInput.fill(TEST_DATA.deliveryDate);
    console.log('成功设置交货日期');
  }

  async selectProduct() {
    console.log('开始选择商品...');
    await this.productSelectIcon.click();
    await this.productItem.dblclick();
    console.log('成功选择商品');
  }

  async setQuantity() {
    console.log('开始设置数量...');
    await this.quantityInput.fill(TEST_DATA.orderQuantity);
    console.log('成功设置数量');
  }

  async saveOrder() {
    console.log('开始保存订单...');
    await this.saveButton.click();
    console.log('成功保存订单');
  }

  async saveOrderDraft() {
    console.log('开始保存订单草稿...');
    await this.saveDraftButton.click();
    console.log('成功保存订单草稿');
  }

  async setmodifyButton() {
    console.log('开始删除第一行商品信息...');
    await this.modifyButton.click();
    console.log('成功删除第一行商品信息');
  }


  async closeOrder() {
    console.log('开始关闭单据...');
    await this.closeButton.click();
    console.log('成功关闭单据');
  }

    async attached () {
    console.log('打开添加附件...');
    await this.attachments.click();
    console.log('执行成功');
  }
  
    async attachedclose () {
    console.log('关闭添加附件...');
    await this.attachmentsclose.click();
    console.log('执行成功');
  }
   async print () {
    console.log('打印...');
    await this.printButton.click();
    console.log('执行成功');
  }

  // 扫码按钮操作
  async clickScancode() {
    console.log('点击扫码按钮...');
    await this.Scancode.click();
    console.log('扫码按钮点击成功');
  }

  //修改商品信息按钮
  async clickModifyProductInfoButton() {
    console.log('点击修改商品信息按钮...');
    await this.modifyProductInfoButton.click();
    console.log('修改商品信息按钮点击成功');
  }

  // 备注输入框操作
  async setRemark(remark: string = TEST_DATA.remark) {
    console.log(`设置备注: ${remark}`);
    await this.remarkInput.fill(remark);
    console.log('备注输入成功');
  }


  // 实名登记复选框操作
  async setRealNameRegistration(realNameRegistration: boolean) {
    console.log(`设置实名登记: ${realNameRegistration}`);
    if (realNameRegistration !== await this.realNameRegistrationCheckbox.isChecked()) {
      await this.realNameRegistrationCheckbox.click();
    }
    console.log('实名登记设置成功');
  }

  // 四类药品复选框操作
  async setFourCategoryDrug(fourCategoryDrug: boolean) {
    console.log(`设置四类药品: ${fourCategoryDrug}`);
    if (fourCategoryDrug !== await this.fourCategoryDrugCheckbox.isChecked()) {
      await this.fourCategoryDrugCheckbox.click();
    }
    console.log('四类药品设置成功');
  }

  // 凭处方销售复选框操作
  async setPrescriptionDrug(prescriptionDrug: boolean) {
    console.log(`设置凭处方销售: ${prescriptionDrug}`);
    if (prescriptionDrug !== await this.prescriptionDrugCheckbox.isChecked()) {
      await this.prescriptionDrugCheckbox.click();
    }
    console.log('凭处方销售设置成功');
  }

  // 特价商品复选框操作
  async setSpecialPrice(specialPrice: boolean) {
    console.log(`设置特价商品: ${specialPrice}`);
    if (specialPrice !== await this.specialPriceCheckbox.isChecked()) {
      await this.specialPriceCheckbox.click();
    }
    console.log('特价商品设置成功');
  }

  // 允许前台调价复选框操作
  async setPriceAdjustment(priceAdjustment: boolean) {
    console.log(`设置允许前台调价: ${priceAdjustment}`);
    if (priceAdjustment !== await this.priceAdjustmentCheckbox.isChecked()) {
      await this.priceAdjustmentCheckbox.click();
    }
    console.log('允许前台调价设置成功');
  }

  // 允许拆零复选框操作
  async setAllowSplit(allowSplit: boolean) {
    console.log(`设置允许拆零: ${allowSplit}`);
    if (allowSplit !== await this.allowSplitCheckbox.isChecked()) {
      await this.allowSplitCheckbox.click();
    }
    console.log('允许拆零设置成功');
  }

  // 换算率输入框操作
  async setConversionRate(conversionRate: string) {
    console.log(`设置换算率: ${conversionRate}`);
    await this.conversionRateInput.fill(conversionRate);
    console.log('换算率设置成功');
  }

  // 单位名称输入框操作
  async setUnitName(unitName: string) {
    console.log(`设置单位名称: ${unitName}`);
    await this.unitNameInput.fill(unitName);
    console.log('单位名称设置成功');
  }

  // 商品条码输入框操作
  async setBarcode(barcode: string) {
    console.log(`设置商品条码: ${barcode}`);
    await this.barcodeInput.fill(barcode);
    console.log('商品条码设置成功');
  }


  // 商品条码输入框操作
  async setMinimumPrice(minimumPrice: string) {
    console.log(`设置最低价格: ${minimumPrice}`);
    await this.minimumPrice.fill(minimumPrice);
    console.log('最低价格设置成功');
  }

  // 单价输入框操作
  async setUnitPrice(unitPrice: string) {
    console.log(`设置单价: ${unitPrice}`);
    await this.unitPriceInput.fill(unitPrice);
    console.log('单价设置成功');
  }

  // 金额输入框操作
  async setAmount(amount: string) {
    console.log(`设置金额: ${amount}`);
    await this.amountInput.fill(amount);
    console.log('金额设置成功');
  }

  // 经手人输入框操作
  async setHandoverPerson(handoverPerson: string = TEST_DATA.handoverPerson) {
    console.log(`设置经手人: ${handoverPerson}`);
    await this.handoverPersonInput.fill(handoverPerson);
    console.log('经手人设置成功');
  }

  // 会员价输入框操作
  async setMemberPrice(memberPrice: string) {
    console.log(`设置会员价: ${memberPrice}`);
    await this.memberPriceInput.fill(memberPrice);
    console.log('会员价设置成功');
  }

  // 拆零价输入框操作
  async setSplitPrice(splitPrice: string) {
    console.log(`设置拆零价: ${splitPrice}`);
    await this.splitPriceInput.fill(splitPrice);
    console.log('拆零价设置成功');
  }

  // 零售价输入框操作
  async setRetailPrice(retailPrice: string) {
    console.log(`设置零售价: ${retailPrice}`);
    await this.retailPriceInput.fill(retailPrice);
    console.log('零售价设置成功');
  }

  // 确认按钮操作
  async clickConfirm() {
    console.log('点击确认按钮...');
    await this.confirmButton.click();
    console.log('确认按钮点击成功');
  }

  // 带空格确认按钮操作
  async clickConfirm1() {
    console.log('点击带空格确认按钮...');
    await this.confirmButton1.click();
    console.log('带空格确认按钮点击成功');
  }

  // 取消按钮操作
  async clickCancel() {
    console.log('点击取消按钮...');
    await this.cancelButton.click();
    console.log('取消按钮点击成功');
  }

  // 带空格取消按钮操作
  async clickCancel1() {
    console.log('点击带空格取消按钮...');
    await this.cancelButton1.click();
    console.log('带空格取消按钮点击成功');
  }

  // 折让按钮操作
  async clickDiscountButton() {
    console.log('点击折让按钮...');
    await this.discountButton.click();
    console.log('折让按钮点击成功');
  }

  // 整单折让菜单操作
  async selectDiscountMenu() {
    console.log('选择整单折让菜单...');
    await this.discountMenu.click();
    console.log('整单折让菜单选择成功');
  }

  // 折让金额输入框操作
  async setDiscountAmount(amount: string = TEST_DATA.discountAmount) {
    console.log(`设置折让金额: ${amount}`);
    await this.discountAmountInput.fill(amount);
    console.log('折让金额设置成功');
  }

  // 折后金额输入框操作
  async setDiscountAfterAmount(amount: string = TEST_DATA.discountAfterAmount) {
    console.log(`设置折后金额: ${amount}`);
    await this.discountAfterAmountInput.fill(amount);
    console.log('折后金额设置成功');
  }

  // 添加按钮操作
  async clickAddButton() {
    console.log('点击添加按钮...');
    await this.addButton.click();
    console.log('添加按钮点击成功');
  }

  // 价格类型选择操作
  async selectPriceType() {
    console.log('选择价格类型...');
    await this.priceTypeSelect.click();
    console.log('价格类型选择成功');
  }

  // 商品选择图标操作
  async clickProductSelectIcon() {
    console.log('点击商品选择图标...');
    await this.productSelectIcon.click();
    console.log('商品选择图标点击成功');
  }

  // 商品项选择操作
  async selectProductItem() {
    console.log('选择商品项...');
    await this.productItem.click();
    console.log('商品项选择成功');
  }

  // 插入行按钮操作
  async clickInsertRow() {
    console.log('点击插入行按钮...');
    await this.insertRowButton.click();
    console.log('插入行按钮点击成功');
  }

  // 删除行按钮操作
  async clickDeleteRow() {
    console.log('点击删除行按钮...');
    await this.deleteRowButton.click();
    console.log('删除行按钮点击成功');
  }

  // 定位行操作
  async clickRowLocation() {
    console.log('点击定位行...');
    await this.rowLocation;
    console.log('定位行点击成功');
  }

  // 商品编码输入框操作
  async setProductCode(code: string = TEST_DATA.code) {
    console.log(`设置商品编码: ${code}`);
    await this.productCodeInput.fill(code);
    console.log('商品编码设置成功');
  }

  // 查找按钮操作
  async clickFind() {
    console.log('点击查找按钮...');
    await this.findButton.click();
    console.log('查找按钮点击成功');
  }

  // 下一个按钮操作
  async clickNext() {
    console.log('点击下一个按钮...');
    await this.nextButton.click();
    console.log('下一个按钮点击成功');
  }

  // 关闭按钮1操作
  async clickClose1() {
    console.log('点击关闭按钮...');
    await this.closeButton1.click();
    console.log('关闭按钮点击成功');
  }

}


