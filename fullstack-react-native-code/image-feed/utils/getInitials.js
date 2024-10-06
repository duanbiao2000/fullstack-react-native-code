/**
 * 获取姓名的首字母
 * 
 * 该函数旨在从一个全名中提取出首字母，用于一些场景下简化名称显示例如用户头像、列表显示等
 * 它尝试从全名中匹配出第一个和第二个单词的首字母，并将它们连接起来返回如果全名不符合预期格式，
 * 则返回空字符串
 * 
 * @param {string} fullname - 期望格式为“名 姓”的全名字符串
 * @returns {string} - 全名的首字母，如果匹配失败则为""
 */
export default function getInitials(fullname) {
  // 尝试从全名中匹配出第一个和第二个单词的首字母
  const match = fullname.match(/(\w)?\w*\s*(\w)?/);
  // 如果成功匹配到首字母，则将它们连接起来返回；否则返回空字符串
  return match ? match.slice(1).join('') : '';
}