import * as fs from 'fs';
import * as path from 'path';

/**
 * 随机读取 CSV 文件中的一行数据
 * @param filePath CSV 文件路径
 * @returns 返回一个对象，包含每一列的键值对
 */
function readRandomLineFromCsv(filePath: string): Record<string, string> | null {
    try {
        // 读取文件内容
        const data = fs.readFileSync(filePath, 'utf-8');
        // 按行分割
        const lines = data.split('\n');
        
        // 移除空行
        const filteredLines = lines.filter(line => line.trim() !== '');
        
        if (filteredLines.length <= 1) {
            console.error('CSV 文件没有足够的数据行');
            return null;
        }
        
        // 随机选择一行（排除标题行）
        const randomIndex = Math.floor(Math.random() * (filteredLines.length - 1)) + 1;
        const randomLine = filteredLines[randomIndex];
        
        // 获取标题行
        const headers = filteredLines[0].split(',');
        
        // 解析随机行的数据
        const values = randomLine.split(',');
        
        // 创建返回对象
        const result: Record<string, string> = {};
        for (let i = 0; i < headers.length; i++) {
            result[headers[i]] = values[i] || '';
        }
        
        return result;
    } catch (error) {
        console.error('读取文件时发生错误:', error);
        return null;
    }
}

// // 使用示例
// const csvFilePath = path.join(__dirname, '../data/商品资料.csv');
// const randomData = readRandomLineFromCsv(csvFilePath);
// if (randomData) {
//     console.log('随机读取的数据:');
//     for (const [key, value] of Object.entries(randomData)) {
//         console.log(`${key}: ${value}`);
//     }
// }


/**
 * 获取随机商品数据中的通用名
 * @param filePath CSV 文件路径
 * @returns 返回随机商品的通用名
 */
function getRandomProductGenericName(filePath: string): string | null {
    const productData = readRandomLineFromCsv(filePath);
    if (productData && productData['通用名']) {
        return productData['通用名'];
    }
    console.error('未能获取到通用名');
    return null;
}

export { readRandomLineFromCsv, getRandomProductGenericName };