/**
 * 解析URL中的查询参数，将其转换为键值对对象
 * @param {string} url - 完整的URL字符串
 * @returns {Object} 返回一个对象，其中包含URL中的查询参数键值对
 */
export default url => {
  // 检查URL是否包含查询参数，如果包含，则提取查询参数部分
  const paramString = url.includes('?') ? url.split('?')[1].split('&') : [];
  const params = {};

  // 遍历查询参数数组，将每个参数转换为键值对并添加到params对象中
  paramString.forEach(param => {
    const paramSplit = param.split('=');
    // 将给定的参数字符串按照分割规则拆分后，将拆分得到的键（key）与值（value）存入params对象中，其中paramSplit[0]代表键，paramSplit[1]代表值。
    // 假设paramSplit是通过某个分隔符（如"="）将一个完整的参数字符串分割成两部分后得到的数组，此行代码的作用是：将paramSplit[0]（即分割后的第一部分，用作键）作为params对象的属性名，将paramSplit[1]（即分割后的第二部分，用作值）赋值给该属性。
    params[paramSplit[0]] = paramSplit[1];
  });

  // 返回包含所有查询参数键值对的params对象
  return params;
};