/**
 * 测试数据配置文件
 * 集中管理所有测试环境使用的敏感数据和配置参数
 */

export const TEST_ACCOUNT = {
  username: '19136127446', // 测试账号手机号
  password: 'Qf810101'    // 测试账号密码
};

export const TEST_DATA = {
  supplier: '成都',             // 默认供应商
  product: '奥美拉唑肠溶胶囊1', // 默认测试商品
  quantity: '1'                // 默认商品数量
};

// 其他测试数据
// export const INVALID_ACCOUNT = {
//   username: '13800138000',
//   password: 'wrongpassword'
// };

// export const LONG_PASSWORD = {
//   username: '19136127446',
//   password: 'Qf810101'.repeat(10)
// };