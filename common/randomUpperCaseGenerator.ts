/**
 * 生成两个随机的大写字母
 * @returns 两个随机大写字母组成的字符串
 */
export function generateRandomUpperCase(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 2; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
}