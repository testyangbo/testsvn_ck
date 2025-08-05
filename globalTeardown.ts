import fs from 'fs';
import path from 'path';

async function globalTeardown() {
  const authFilePath = path.resolve('cookies', 'auth.json');
  
  try {
    // 检查文件是否存在
    if (fs.existsSync(authFilePath)) {
      // 删除文件
      fs.unlinkSync(authFilePath);
      console.log('成功删除cookies/auth.json文件');
    } else {
      console.log('cookies/auth.json文件不存在，无需删除');
    }
  } catch (error) {
    console.error('删除cookies/auth.json文件时出错:', error);
  }
}

export default globalTeardown;