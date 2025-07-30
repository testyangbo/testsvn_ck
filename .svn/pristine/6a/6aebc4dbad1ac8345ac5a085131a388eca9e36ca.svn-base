import re
from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://www.qfbjyun.com/login")
    page.get_by_role("textbox", name="请输入手机号").click()
    page.get_by_role("textbox", name="请输入手机号").dblclick()
    page.get_by_role("textbox", name="请输入手机号").fill("19136127446")
    page.get_by_role("textbox", name="请输入登录密码").dblclick()
    page.get_by_role("textbox", name="请输入登录密码").fill("19136127446")
    page.locator("label").filter(has_text="我已阅读并同意 用户协议").locator("span").nth(1).click()
    page.get_by_role("button", name="登录").click()
    page.get_by_role("tabpanel", name="手机号登录").locator("i").nth(3).click()
    page.get_by_role("textbox", name="请输入登录密码").click()
    page.get_by_role("textbox", name="请输入登录密码").click()
    page.get_by_role("textbox", name="请输入登录密码").click()
    page.get_by_role("textbox", name="请输入登录密码").dblclick()
    page.get_by_role("textbox", name="请输入登录密码").fill("Qf810101")
    page.get_by_role("button", name="登录").click()
    expect(page.get_by_text("单体测试")).to_be_visible()
    page.get_by_text("单体测试").dblclick()
    page.get_by_text("采购业务").click()
    page.locator("#el-popover-3736").get_by_text("采购入库单").click()
    page.get_by_role("textbox", name="请选择供应商").dblclick()
    page.get_by_role("cell", name="成都", exact=True).locator("div").click()
    page.get_by_role("cell", name="成都", exact=True).locator("div").dblclick()
    page.get_by_role("textbox", name="请选择内容").dblclick()
    page.get_by_role("textbox", name="请选择内容").dblclick()
    page.get_by_role("textbox", name="请选择内容").dblclick()
    page.get_by_role("cell", name="").locator("i").click()
    page.get_by_label("商品选择").get_by_text("奥美拉唑肠溶胶囊1").dblclick()
    page.get_by_role("spinbutton", name="请输入数量").dblclick()
    page.get_by_role("spinbutton", name="请输入数量").fill("1")
    page.get_by_role("button", name="保存").click()
    page.close()

    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
