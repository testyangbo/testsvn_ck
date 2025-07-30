/**
 * 生成1到100之间的随机数，最多保留两位小数
 * @returns 随机价格字符串
 */
export function generateRandomPrice(): string {
    return (Math.random() * 99 + 1).toFixed(2);
}