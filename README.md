# Playwright 测试项目

## 运行测试

```bash
npm run test
```

## 查看测试报告

```bash
npm run report
```

测试报告将生成在 `playwright-report` 目录中，可以通过浏览器打开 `playwright-report/index.html` 文件查看。

## 截图配置

当前配置在测试用例执行成功和失败时都会进行截图，截图文件将保存在测试报告目录中。

如需修改截图配置，可以在 `playwright.config.ts` 文件中修改 `screenshot` 选项：
- `'on'` - 在成功和失败时都截图
- `'only-on-failure'` - 仅在失败时截图
- `'off'` - 禁用截图

## 视频录制配置

当前配置在测试用例执行成功和失败时都会进行视频录制，视频文件将保存在测试报告目录中。

如需修改视频录制配置，可以在 `playwright.config.ts` 文件中修改 `video` 选项：
- `'on'` - 在成功和失败时都录制
- `'retain-on-failure'` - 仅在失败时录制
- `'off'` - 禁用视频录制

## 项目结构

- `tests/` - 测试用例目录
  - 包含各个业务模块的测试用例，如采购业务、零售管理等
  - 每个业务模块下包含具体的测试文件
- `pages/` - 页面对象模型
  - 封装了各个页面的元素定位和交互方法
- `data/` - 测试数据
  - 包含测试账号信息、测试商品数据等
- `config/` - 配置文件
  - 包含测试环境配置信息
- `cookies/` - 登录状态文件
  - 保存登录状态，用于复用登录信息
- `common/` - 通用工具函数
  - 包含CSV读取等通用功能
- `playwright-report/` - 测试报告目录
  - 生成的测试报告和截图保存在此目录