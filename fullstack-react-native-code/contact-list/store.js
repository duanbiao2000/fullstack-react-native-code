// 定义一个名为state的对象，用于存储应用状态
let state = {
  // 表示是否正在获取联系人信息
  isFetchingContacts: true,
  // 表示是否正在获取用户信息
  isFetchingUser: true,
  // 存储联系人列表
  contacts: [],
  // 存储用户信息
  user: {},
  // 标识是否发生错误
  error: false,
};

// 定义一个数组，用于存储监听器函数
const listeners = [];

// 导出一个默认对象，提供状态管理相关的方法
export default {
  // 获取当前状态
  getState() {
    return state;
  },
  // 更新状态
  setState(newState) {
    // 合并新旧状态
    state = { ...state, ...newState };
    // 执行所有监听器函数
    listeners.forEach(listener => listener());
  },
  // 注册状态改变监听器
  onChange(newListener) {
    // 将新的监听器函数添加到监听器数组中
    listeners.push(newListener);
    // 返回一个用于取消注册的函数
    return () => listeners.filter(listener => listener !== newListener);
  },
};